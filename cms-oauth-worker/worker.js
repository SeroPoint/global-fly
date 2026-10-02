/**
 * Cloudflare Worker: GitHub OAuth proxy for Decap CMS
 *
 * Decap CMS 的 /auth 端點。使用者在後台登入時會導向 GitHub OAuth，
 * GitHub 跳回這個 Worker 帶 code，Worker 用 client_id/client_secret 換 access_token，
 * 再 postMessage 回 Decap 開的那個分頁。
 *
 * 部署步驟請見專案根目錄 ADMIN_SETUP.md。
 *
 * 需要在 Cloudflare Worker 設定 Environment Variables / Secrets:
 *   OAUTH_CLIENT_ID      = GitHub OAuth App Client ID
 *   OAUTH_CLIENT_SECRET  = GitHub OAuth App Client Secret
 *   ALLOWED_ORIGIN       = https://rogerworldflight.com  (admin 所在網域; 多個用逗號分隔)
 */

const GITHUB_AUTHORIZE = "https://github.com/login/oauth/authorize";
const GITHUB_ACCESS_TOKEN = "https://github.com/login/oauth/access_token";
const SCOPE = "repo,user";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "");

    if (path === "" || path === "/") {
      return new Response("Decap CMS GitHub OAuth proxy. Use /auth to start.", {
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }

    if (path === "/auth") {
      const state = crypto.randomUUID();
      const redirectUri = `${url.origin}/callback`;
      const authorizeUrl = new URL(GITHUB_AUTHORIZE);
      authorizeUrl.searchParams.set("client_id", env.OAUTH_CLIENT_ID);
      authorizeUrl.searchParams.set("redirect_uri", redirectUri);
      authorizeUrl.searchParams.set("scope", SCOPE);
      authorizeUrl.searchParams.set("state", state);
      return Response.redirect(authorizeUrl.toString(), 302);
    }

    if (path === "/callback") {
      const code = url.searchParams.get("code");
      if (!code) {
        return htmlError("Missing OAuth 'code' parameter.");
      }

      const tokenRes = await fetch(GITHUB_ACCESS_TOKEN, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          client_id: env.OAUTH_CLIENT_ID,
          client_secret: env.OAUTH_CLIENT_SECRET,
          code,
        }),
      });

      if (!tokenRes.ok) {
        return htmlError(`GitHub token exchange failed: ${tokenRes.status}`);
      }

      const data = await tokenRes.json();
      if (data.error || !data.access_token) {
        return htmlError(`OAuth error: ${data.error || "no access_token"}`);
      }

      const allowedOrigin = env.ALLOWED_ORIGIN || "*";
      const payload = JSON.stringify({
        token: data.access_token,
        provider: "github",
      });

      // Decap CMS listens for the "authorization:github:success:<payload>" message
      const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>Authenticated</title></head>
<body>
<script>
(function() {
  function send(status, content) {
    var msg = "authorization:github:" + status + ":" + content;
    var allowedOrigins = ${JSON.stringify(allowedOrigin.split(",").map((o) => o.trim()))};
    function post(target) {
      try { allowedOrigins.forEach(function(o){ target.postMessage(msg, o); }); } catch (e) {}
    }
    if (window.opener) post(window.opener);
    if (window.parent && window.parent !== window) post(window.parent);
  }
  window.addEventListener("message", function(e) {
    if (e.data === "authorizing:github") {
      send("success", ${JSON.stringify(payload)});
    }
  }, false);
  // Nudge in case Decap already finished loading
  send("success", ${JSON.stringify(payload)});
  setTimeout(function(){ window.close(); }, 1500);
})();
</script>
<p>登入成功，正在返回後台…</p>
</body></html>`;

      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }

    return new Response("Not found", { status: 404 });
  },
};

function htmlError(message) {
  const safe = String(message).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));
  return new Response(
    `<!doctype html><meta charset="utf-8"><h1>OAuth Error</h1><pre>${safe}</pre>`,
    { status: 400, headers: { "content-type": "text/html; charset=utf-8" } }
  );
}
