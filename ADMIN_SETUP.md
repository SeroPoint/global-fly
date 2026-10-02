# 內容後台 (Decap CMS) 使用與設定說明

這個網站已接上 **Decap CMS**，可以透過瀏覽器登入後台直接編輯內容，
儲存後會自動 commit 到 GitHub，然後 GitHub Actions 會自動重新部署網站。

後台網址（部署完成後）：

```
https://rogerworldflight.com/admin/
```

或：

```
https://seropoint.github.io/global-fly/admin/
```

---

## 一次性設定 (約 15 分鐘，只需做一次)

Decap CMS 使用 GitHub 帳號登入，需要兩個東西：

1. 一個 **GitHub OAuth App**（讓 CMS 可以用你的帳號 commit）
2. 一個 **Cloudflare Worker**（代理 OAuth 流程；免費方案就夠用）

### 步驟 1：建立 GitHub OAuth App

1. 打開 <https://github.com/settings/developers>
2. 點 **New OAuth App**
3. 填寫：
   - **Application name**：`Global Fly CMS`
   - **Homepage URL**：`https://rogerworldflight.com`
   - **Authorization callback URL**：**先隨便填** `https://example.com/callback`（步驟 3 會改回來）
4. 建立後會看到 **Client ID**；按 **Generate a new client secret** 產生 **Client Secret**
5. 把這兩個值先記下來

### 步驟 2：部署 Cloudflare Worker (OAuth proxy)

Cloudflare 有免費方案，每天 100,000 次請求綽綽有餘。

**選項 A：用網頁介面 (最快)**

1. 打開 <https://dash.cloudflare.com/> → **Workers & Pages** → **Create** → **Create Worker**
2. 名稱填 `global-fly-cms-oauth`，Deploy
3. 進入 Worker → **Edit code**
4. 把 `cms-oauth-worker/worker.js` 的內容整個貼進去，按 **Save and deploy**
5. 回到 Worker 主頁 → **Settings** → **Variables and Secrets** → **Add variable**（Type 選 **Secret**）：
   - `OAUTH_CLIENT_ID` = 步驟 1 的 Client ID
   - `OAUTH_CLIENT_SECRET` = 步驟 1 的 Client Secret
   - `ALLOWED_ORIGIN` = `https://rogerworldflight.com,https://seropoint.github.io`
6. 複製 Worker 的網址，例如：`https://global-fly-cms-oauth.<account>.workers.dev`

**選項 B：用 wrangler CLI**

```bash
cd cms-oauth-worker
npx wrangler login
npx wrangler deploy
npx wrangler secret put OAUTH_CLIENT_ID
npx wrangler secret put OAUTH_CLIENT_SECRET
npx wrangler secret put ALLOWED_ORIGIN
```

### 步驟 3：把 Callback URL 填回 GitHub OAuth App

回到步驟 1 的 OAuth App 設定頁面，把 **Authorization callback URL** 改成：

```
https://global-fly-cms-oauth.<account>.workers.dev/callback
```

（換成你實際的 Worker 網址 + `/callback`）

按 **Update application**。

### 步驟 4：把 Worker URL 寫進 CMS 設定

編輯 `client/public/admin/config.yml`，把這一行：

```yaml
base_url: https://REPLACE-WITH-YOUR-WORKER.workers.dev
```

換成你的 Worker 網址（**不要**加 `/auth`，只到網域就好）：

```yaml
base_url: https://global-fly-cms-oauth.<account>.workers.dev
```

commit + push：

```bash
git add client/public/admin/config.yml
git commit -m "Configure Decap CMS OAuth base_url"
git push origin main
```

等 GitHub Actions 跑完，就可以打開 `https://rogerworldflight.com/admin/` 登入了。

---

## 日常使用

1. 打開 <https://rogerworldflight.com/admin/>
2. 點 **Login with GitHub**
3. 授權（第一次會問一次）
4. 進去後左邊會看到：
   - Hero 首頁橫幅
   - 關於林睿哲
   - 環球飛行路線
   - 贊助商
   - 社群實時動態
   - 林睿哲的故事
   - 行動呼籲區塊
   - Line Pay 贊助區
   - Footer
   - 導覽列
5. 點進任一項，改好後按 **Publish → Publish now**
6. GitHub Actions 會自動部署，約 1~3 分鐘後網站就會更新

---

## 權限管理

只要在 GitHub 上是 `SeroPoint/global-fly` repo 的 **collaborator**（Settings → Collaborators 加人），
就可以用該 GitHub 帳號登入後台。

要收回權限：到 repo 設定移除 collaborator 即可。

---

## 故障排除

**登入後跳 404 / 空白頁**

- Worker URL 填錯；確認 `base_url` 沒多 `/` 或 `/auth`
- GitHub OAuth App 的 Callback URL 和 Worker 不一致

**登入後說 `Config Errors`**

- `client/public/admin/config.yml` 有縮排或語法錯誤
- 直接到瀏覽器打開 `https://rogerworldflight.com/admin/config.yml` 看是否能顯示

**改完內容後網站沒更新**

- 到 <https://github.com/SeroPoint/global-fly/actions> 看最新的 workflow 有沒有跑綠燈
- 如果 Actions 失敗，點進去看錯誤訊息

**想本地測試後台**

```bash
# terminal 1
pnpm dev
# terminal 2
npx decap-server
```

然後編輯 `config.yml` 暫時加一行 `local_backend: true`，打開 `http://localhost:3000/admin/`
（記得測完要把 `local_backend: true` 拿掉再 push）
