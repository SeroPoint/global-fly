# 內容後台使用說明

## ⚠️ 安全性說明（必讀）

這個後台方案為了「極簡」，把 GitHub Token 編譯進前端 JS，**任何人打開瀏覽器 DevTools 都可以抽出這個 token**。因此：

- **一定要使用 Fine-grained PAT**，只授權本 repo (`louishoaone/global-fly`) 的 `Contents: Read and write`，不要給任何其他權限
- 建議每 3 個月換一次 token
- `admin@flight.com` / `admin000` 的登入只是防呆（擋住一般人誤觸），**擋不住惡意攻擊**
- 不要在 README 等公開地方貼出後台網址

---

## 一次性設定（約 5 分鐘）

### 步驟 1：建立 GitHub Fine-grained PAT

1. 打開 <https://github.com/settings/personal-access-tokens/new>
2. 設定：
   - **Token name**：`global-fly-admin`
   - **Expiration**：建議 90 天
   - **Repository access**：**Only select repositories** → 選 `louishoaone/global-fly`
   - **Repository permissions**：
     - `Contents` → **Read and write**
     - `Metadata` → **Read-only**（必要）
     - 其他全部 **No access**
3. 按 **Generate token**，複製產生的 token（開頭是 `github_pat_...`）

### 步驟 2：把 Token 加到 repo Secret

1. 打開 <https://github.com/louishoaone/global-fly/settings/secrets/actions>
2. 按 **New repository secret**
3. **Name**：`GH_TOKEN`
4. **Secret**：貼上剛剛複製的 token
5. **Add secret**

### 步驟 3：觸發重新部署

隨便 push 一次（或到 Actions 頁面手動 re-run），讓新的 build 把 token 編進去。

```bash
git commit --allow-empty -m "Rebuild with GH_TOKEN"
git push
```

等 Actions 綠燈，就完成了。

---

## 使用方式

1. 打開 **<https://rogerworldflight.com/admin/>**
2. 登入：
   - Email: `admin@flight.com`
   - 密碼: `admin000`
3. 左邊選單選要編輯的區塊（Hero / 關於 / 路線 / 贊助商 / ... / Footer）
4. 編輯後按 **「完成編輯 (儲存並發布)」**
5. 系統會自動 commit 到 GitHub，GitHub Actions 1~3 分鐘後自動部署
6. 重新整理網站即可看到變更

### 圖片上傳

有圖片的欄位（例如背景圖、QR Code、贊助商 Logo）會有「上傳新圖片」按鈕：

- 點按鈕選檔案 → 自動上傳到 `client/public/images/<timestamp>_<filename>`
- 路徑會自動填入 input
- 按「完成編輯」才會真正 commit JSON 變更

### 修改登入帳密

編輯 `client/src/pages/Admin.tsx` 這兩行：

```ts
const ADMIN_EMAIL = "admin@flight.com";
const ADMIN_PASSWORD = "admin000";
```

改完 push，重新 build 後生效。

---

## 故障排除

**登入後點「完成編輯」出現「找不到 GitHub Token」**

- `GH_TOKEN` secret 沒設；或設完後還沒重新 build
- 到 Actions 看最新 build 有沒有跑過

**出現 `PUT ... failed: 404`**

- Token 權限不夠，請確認 fine-grained PAT 的 Contents 是 **Read and write**
- Repository 選擇是否包含 `louishoaone/global-fly`

**出現 `PUT ... failed: 409 Conflict`**

- 檔案在你編輯期間被別人（或你自己在另一分頁）改過
- 重新整理頁面後再編輯

**圖片上傳成功但網站看不到**

- Build 還沒完成，等 1~3 分鐘
- 到 <https://github.com/louishoaone/global-fly/actions> 看 build 狀態

---

## Token 失效 / 更換

Fine-grained PAT 有效期到了會自動失效，網站不會壞，只是「完成編輯」會噴錯。
重複步驟 1~3 換一組新的即可。
