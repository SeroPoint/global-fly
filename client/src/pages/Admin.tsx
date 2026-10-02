import { useEffect, useMemo, useState, type FormEvent } from "react";
import heroData from "@/content/hero.json";
import aboutData from "@/content/about.json";
import routeData from "@/content/route.json";
import sponsorsData from "@/content/sponsors.json";
import socialData from "@/content/social.json";
import storiesData from "@/content/stories.json";
import ctaData from "@/content/cta.json";
import linepayData from "@/content/linepay.json";
import footerData from "@/content/footer.json";
import navData from "@/content/nav.json";

/**
 * Admin Backend - 內容後台
 *
 * 登入後可直接編輯網站所有內容，儲存時透過 GitHub API 自動 commit 到 repo，
 * 之後 GitHub Actions 會自動重建並部署網站 (約 1~3 分鐘生效)。
 *
 * ⚠️  安全性說明：GitHub Token 在 build 時嵌入前端 JS，任何人檢視 source 都看得到。
 *     務必使用 fine-grained PAT 只授權本 repo 的 Contents:write，並定期更換。
 */

const ADMIN_EMAIL = "admin@flight.com";
const ADMIN_PASSWORD = "admin000";

const REPO_OWNER = "louishoaone";
const REPO_NAME = "global-fly";
const REPO_BRANCH = "main";

const SESSION_KEY = "gfadmin_session";

type ContentKey =
  | "hero"
  | "about"
  | "route"
  | "sponsors"
  | "social"
  | "stories"
  | "cta"
  | "linepay"
  | "footer"
  | "nav";

const FILES: { key: ContentKey; label: string; path: string; initial: unknown }[] = [
  { key: "hero", label: "Hero 首頁橫幅", path: "client/src/content/hero.json", initial: heroData },
  { key: "about", label: "關於林睿哲", path: "client/src/content/about.json", initial: aboutData },
  { key: "route", label: "環球飛行路線", path: "client/src/content/route.json", initial: routeData },
  { key: "sponsors", label: "贊助商", path: "client/src/content/sponsors.json", initial: sponsorsData },
  { key: "social", label: "社群實時動態", path: "client/src/content/social.json", initial: socialData },
  { key: "stories", label: "林睿哲的故事", path: "client/src/content/stories.json", initial: storiesData },
  { key: "cta", label: "行動呼籲區塊", path: "client/src/content/cta.json", initial: ctaData },
  { key: "linepay", label: "Line Pay 贊助區", path: "client/src/content/linepay.json", initial: linepayData },
  { key: "footer", label: "Footer", path: "client/src/content/footer.json", initial: footerData },
  { key: "nav", label: "導覽列", path: "client/src/content/nav.json", initial: navData },
];

const LABELS: Record<string, string> = {
  title: "標題",
  subtitle: "副標題",
  taglineZh: "中文標語",
  taglineEn: "英文標語",
  backgroundImage: "背景圖",
  stats: "數據統計",
  value: "數值",
  label: "顯示文字",
  heading: "區塊標題",
  identity: "身份與角色",
  education: "教育背景",
  qualification: "飛行資格",
  items: "項目",
  text: "內文",
  quote: "引言",
  mapImage: "路線圖",
  aircraft: "飛機詳情",
  waypoints: "主要航點",
  lines: "航點行",
  liveTracking: "即時追蹤",
  iframeSrc: "iframe 網址",
  alt: "名稱 (alt)",
  whiteBg: "白色背景",
  image: "圖片",
  facebook: "Facebook",
  threads: "Threads",
  description: "描述",
  bullets: "條列項目",
  icon: "Icon (emoji)",
  buttonText: "按鈕文字",
  buttonUrl: "按鈕連結",
  threadsUrl: "Threads 連結",
  instagramUrl: "Instagram 連結",
  id: "ID",
  paragraphs: "段落",
  intro: "前言",
  requirementsHeading: "條件區塊標題",
  requirements: "條件列表",
  number: "編號",
  highlight: "底部標語",
  subheading: "副標",
  primaryButton: "主按鈕文字",
  secondaryButton: "次按鈕文字",
  social: "社群連結",
  instagram: "Instagram",
  youtube: "YouTube",
  qrImage: "QR Code 圖",
  qrCaption: "QR 下方說明",
  note: "備註",
  stepsHeading: "步驟區塊標題",
  steps: "步驟",
  formButton: "表單按鈕",
  emailButton: "Email 按鈕",
  url: "連結",
  disclaimer: "免責聲明",
  copyright: "版權文字",
  prefix: "前綴文字",
  links: "連結列表",
  brand: "品牌名",
  anchor: "錨點 (#id)",
};

const IMAGE_KEYS = new Set(["backgroundImage", "mapImage", "image", "qrImage"]);

const labelize = (key: string) => LABELS[key] || key;

const GH_TOKEN = (import.meta.env.VITE_GH_TOKEN as string | undefined) || "";

async function ghGetFile(path: string): Promise<{ sha: string; content: string }> {
  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${REPO_BRANCH}`,
    { headers: { Authorization: `Bearer ${GH_TOKEN}`, Accept: "application/vnd.github+json" } }
  );
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  const data = await res.json();
  return { sha: data.sha, content: atob(data.content.replace(/\n/g, "")) };
}

function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

async function ghPutFile(path: string, newContent: string, sha: string, message: string) {
  const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${GH_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      content: utf8ToBase64(newContent),
      sha,
      branch: REPO_BRANCH,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PUT ${path} failed: ${res.status} ${err}`);
  }
  return res.json();
}

async function ghPutBinary(path: string, base64Content: string, message: string) {
  // check if file exists for sha
  let sha: string | undefined;
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${REPO_BRANCH}`,
      { headers: { Authorization: `Bearer ${GH_TOKEN}`, Accept: "application/vnd.github+json" } }
    );
    if (res.ok) sha = (await res.json()).sha;
  } catch {}
  const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${GH_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, content: base64Content, sha, branch: REPO_BRANCH }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Upload ${path} failed: ${res.status} ${err}`);
  }
  return res.json();
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ----------------------------- Login ---------------------------- */

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem(SESSION_KEY, "1");
      onSuccess();
    } else {
      setError("帳號或密碼錯誤");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-gray-900 p-8 rounded-lg border border-cyan-500/30 space-y-4">
        <h1 className="text-2xl font-bold text-center text-cyan-400 mb-6">內容後台登入</h1>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-black border border-gray-700 rounded focus:border-cyan-500 outline-none"
            autoFocus
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">密碼</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-black border border-gray-700 rounded focus:border-cyan-500 outline-none"
          />
        </div>
        {error && <div className="text-sm text-red-400">{error}</div>}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded hover:shadow-lg hover:shadow-cyan-500/50 transition"
        >
          登入
        </button>
      </form>
    </div>
  );
}

/* --------------------------- JSON editor -------------------------- */

type OnChange = (next: unknown) => void;

function ImageField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  const upload = async (file: File) => {
    setUploading(true);
    setErr("");
    try {
      const base64 = await fileToBase64(file);
      const safeName = file.name.replace(/[^\w.\-]/g, "_");
      const timestamp = Date.now();
      const filename = `${timestamp}_${safeName}`;
      const path = `client/public/images/${filename}`;
      await ghPutBinary(path, base64, `admin: upload image ${filename}`);
      onChange(`images/${filename}`);
    } catch (e) {
      setErr(String(e));
    } finally {
      setUploading(false);
    }
  };

  const previewSrc = value
    ? value.startsWith("http")
      ? value
      : `/${value.replace(/^\//, "")}`
    : "";

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-black border border-gray-700 rounded focus:border-cyan-500 outline-none text-sm"
        placeholder="images/..."
      />
      <div className="flex items-center gap-3">
        {previewSrc && (
          <img src={previewSrc} alt="preview" className="h-16 w-16 object-contain bg-gray-800 rounded" />
        )}
        <label className="cursor-pointer px-3 py-2 border border-cyan-500/40 text-cyan-300 rounded text-sm hover:bg-cyan-500/10">
          {uploading ? "上傳中…" : "上傳新圖片"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
            }}
          />
        </label>
      </div>
      {err && <div className="text-xs text-red-400 break-all">{err}</div>}
    </div>
  );
}

function JsonEditor({ value, onChange, path = [] }: { value: unknown; onChange: OnChange; path?: string[] }) {
  const lastKey = path[path.length - 1] || "";

  // Image upload field
  if (typeof value === "string" && IMAGE_KEYS.has(lastKey)) {
    return <ImageField value={value} onChange={(v) => onChange(v)} />;
  }

  // String
  if (typeof value === "string") {
    const isLong = value.length > 80 || value.includes("\n");
    if (isLong) {
      return (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={Math.min(10, Math.max(3, value.split("\n").length))}
          className="w-full px-3 py-2 bg-black border border-gray-700 rounded focus:border-cyan-500 outline-none text-sm"
        />
      );
    }
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-black border border-gray-700 rounded focus:border-cyan-500 outline-none text-sm"
      />
    );
  }

  // Boolean
  if (typeof value === "boolean") {
    return (
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="accent-cyan-500 w-4 h-4"
        />
        <span className="text-sm text-gray-400">{value ? "是" : "否"}</span>
      </label>
    );
  }

  // Number
  if (typeof value === "number") {
    return (
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-3 py-2 bg-black border border-gray-700 rounded focus:border-cyan-500 outline-none text-sm"
      />
    );
  }

  // Array
  if (Array.isArray(value)) {
    const items = value as unknown[];
    const updateItem = (i: number, next: unknown) => {
      const copy = [...items];
      copy[i] = next;
      onChange(copy);
    };
    const removeItem = (i: number) => {
      const copy = items.filter((_, idx) => idx !== i);
      onChange(copy);
    };
    const addItem = () => {
      const sample = items[0];
      let fresh: unknown = "";
      if (sample !== undefined) {
        if (typeof sample === "string") fresh = "";
        else if (typeof sample === "number") fresh = 0;
        else if (typeof sample === "boolean") fresh = false;
        else if (Array.isArray(sample)) fresh = [];
        else if (sample && typeof sample === "object") {
          fresh = Object.fromEntries(
            Object.entries(sample as Record<string, unknown>).map(([k, v]) => [
              k,
              typeof v === "string" ? "" : typeof v === "number" ? 0 : typeof v === "boolean" ? false : Array.isArray(v) ? [] : {},
            ])
          );
        }
      }
      onChange([...items, fresh]);
    };
    const move = (i: number, delta: number) => {
      const j = i + delta;
      if (j < 0 || j >= items.length) return;
      const copy = [...items];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      onChange(copy);
    };

    return (
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="border border-gray-800 rounded p-3 bg-gray-900/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">#{i + 1}</span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="text-xs px-2 py-1 text-gray-400 hover:text-cyan-400 disabled:opacity-30"
                >↑</button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === items.length - 1}
                  className="text-xs px-2 py-1 text-gray-400 hover:text-cyan-400 disabled:opacity-30"
                >↓</button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("確定刪除？")) removeItem(i);
                  }}
                  className="text-xs px-2 py-1 text-red-400 hover:text-red-300"
                >刪除</button>
              </div>
            </div>
            <JsonEditor value={item} onChange={(next) => updateItem(i, next)} path={[...path, String(i)]} />
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="text-sm px-3 py-1 border border-cyan-500/40 text-cyan-300 rounded hover:bg-cyan-500/10"
        >+ 新增項目</button>
      </div>
    );
  }

  // Object
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    return (
      <div className="space-y-4">
        {Object.entries(obj).map(([k, v]) => (
          <div key={k}>
            <div className="text-xs font-semibold text-cyan-400 mb-1">{labelize(k)}</div>
            <JsonEditor
              value={v}
              onChange={(next) => onChange({ ...obj, [k]: next })}
              path={[...path, k]}
            />
          </div>
        ))}
      </div>
    );
  }

  // null / undefined - render as empty text
  return (
    <input
      type="text"
      value=""
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 bg-black border border-gray-700 rounded focus:border-cyan-500 outline-none text-sm"
      placeholder="(空白)"
    />
  );
}

/* --------------------------- Admin Shell -------------------------- */

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeKey, setActiveKey] = useState<ContentKey>("hero");
  const [drafts, setDrafts] = useState<Record<ContentKey, unknown>>(() => {
    const d: Record<string, unknown> = {};
    for (const f of FILES) d[f.key] = structuredClone(f.initial);
    return d as Record<ContentKey, unknown>;
  });
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [statusType, setStatusType] = useState<"ok" | "err" | "info">("info");

  const activeFile = useMemo(() => FILES.find((f) => f.key === activeKey)!, [activeKey]);

  const save = async () => {
    if (!GH_TOKEN) {
      setStatusType("err");
      setStatusMsg("找不到 GitHub Token (VITE_GH_TOKEN)。請在 repo Settings → Secrets 設定後重新部署。");
      return;
    }
    setSaving(true);
    setStatusType("info");
    setStatusMsg("儲存中…");
    try {
      const { sha } = await ghGetFile(activeFile.path);
      const newJson = JSON.stringify(drafts[activeKey], null, 2) + "\n";
      await ghPutFile(activeFile.path, newJson, sha, `admin: update ${activeFile.key}`);
      setStatusType("ok");
      setStatusMsg(`已儲存 ✓ GitHub Actions 會在 1~3 分鐘內自動部署。`);
    } catch (e) {
      setStatusType("err");
      setStatusMsg(String(e));
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    if (!confirm("放棄目前所有未儲存的變更？")) return;
    setDrafts((prev) => ({ ...prev, [activeKey]: structuredClone(activeFile.initial) }));
    setStatusMsg("");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-10 bg-gray-950 border-b border-cyan-500/20 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-cyan-400">內容後台</span>
          <span className="text-xs text-gray-500 hidden md:inline">
            {REPO_OWNER}/{REPO_NAME}@{REPO_BRANCH}
          </span>
        </div>
        <button
          onClick={onLogout}
          className="text-sm px-3 py-1 border border-gray-700 text-gray-300 rounded hover:bg-gray-800"
        >
          登出
        </button>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="md:w-64 md:min-h-[calc(100vh-57px)] border-b md:border-b-0 md:border-r border-cyan-500/20 p-4">
          <div className="text-xs text-gray-500 uppercase mb-2">區塊</div>
          <nav className="flex md:flex-col flex-wrap gap-1">
            {FILES.map((f) => (
              <button
                key={f.key}
                onClick={() => {
                  setActiveKey(f.key);
                  setStatusMsg("");
                }}
                className={`text-left px-3 py-2 rounded text-sm transition ${
                  activeKey === f.key
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "text-gray-300 hover:bg-gray-900"
                }`}
              >
                {f.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{activeFile.label}</h2>
            <div className="text-xs text-gray-500">{activeFile.path}</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded p-6 mb-6">
            <JsonEditor
              value={drafts[activeKey]}
              onChange={(next) => setDrafts((prev) => ({ ...prev, [activeKey]: next }))}
            />
          </div>

          {statusMsg && (
            <div
              className={`mb-4 p-3 rounded text-sm ${
                statusType === "ok"
                  ? "bg-green-500/10 border border-green-500/30 text-green-300"
                  : statusType === "err"
                  ? "bg-red-500/10 border border-red-500/30 text-red-300"
                  : "bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"
              }`}
            >
              {statusMsg}
            </div>
          )}

          <div className="flex gap-3 sticky bottom-0 bg-black py-4">
            <button
              onClick={save}
              disabled={saving}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded hover:shadow-lg hover:shadow-cyan-500/50 transition disabled:opacity-50"
            >
              {saving ? "儲存中…" : "完成編輯 (儲存並發布)"}
            </button>
            <button
              onClick={reset}
              className="px-6 py-2 border border-gray-700 text-gray-300 rounded hover:bg-gray-900"
            >
              放棄變更
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ----------------------------- Entry ------------------------------ */

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(localStorage.getItem(SESSION_KEY) === "1");
  }, []);

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setLoggedIn(false);
  };

  if (!loggedIn) return <Login onSuccess={() => setLoggedIn(true)} />;
  return <Dashboard onLogout={logout} />;
}
