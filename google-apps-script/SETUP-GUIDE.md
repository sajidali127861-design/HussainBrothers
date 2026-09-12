# Hussain Brothers — Order Backend Setup Guide (Google Apps Script)

Follow these steps in order. Total time: about 15–20 minutes.

---

## Step 1 — Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) → **Blank spreadsheet**
2. Rename it (top-left) to: **Hussain Brothers Orders**
3. Rename the sheet tab at the bottom (double-click "Sheet1") to: **Orders**
   — this exact name matters, it must match `SHEET_NAME` in the script.

## Step 2 — Add the header row

In row 1, type these column headers exactly, one per cell (A1 through L1):

| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Order Ref | Date | Time | Customer Name | Phone | City | Address | Note | Items | Subtotal | Total | Status |

## Step 3 — Open the Apps Script editor

1. In your Google Sheet, click **Extensions → Apps Script**
2. A new tab opens with a default `Code.gs` file containing a placeholder `function myFunction() {}`

## Step 4 — Paste the script code

1. Select all the placeholder code in `Code.gs` and delete it
2. Open `google-apps-script/Code.gs` from this project (given to you alongside this guide)
3. Copy its **entire contents** and paste into the Apps Script editor
4. Click the 💾 save icon (or `Ctrl+S` / `Cmd+S`)

## Step 5 — Set your Gmail address

Near the top of the script, find this line:
```js
const OWNER_EMAIL = 'OWNER_EMAIL_HERE';
```
Replace `OWNER_EMAIL_HERE` with the real Gmail address that should receive order notifications, e.g.:
```js
const OWNER_EMAIL = 'hussainbrothers@gmail.com';
```
Save again.

## Step 6 — Deploy as a Web App

1. Click **Deploy** (top-right) → **New deployment**
2. Click the ⚙️ gear icon next to "Select type" → choose **Web app**
3. Fill in:
   - **Description:** `Hussain Brothers order API` (or anything memorable)
   - **Execute as:** `Me (your-email@gmail.com)`
   - **Who has access:** `Anyone`

   > ⚠️ "Anyone" is required so your public website can call this endpoint
   > without asking visitors to log into Google. This is safe — the script
   > only accepts order data and never exposes your Sheet or Gmail directly;
   > see the **Security Considerations** section below.

4. Click **Deploy**
5. Google will ask you to **authorize** the script the first time:
   - Click **Authorize access**
   - Choose your Google account
   - You'll see an "unverified app" warning — this is normal for your own
     script. Click **Advanced** → **Go to (your project name) (unsafe)**
   - Click **Allow**

## Step 7 — Copy the Web App URL

After deployment finishes, you'll see a **Web app URL** that looks like:
```
https://script.google.com/macros/s/AKfycb..................../exec
```
Click **Copy**. You'll need this in the next step.

> If you ever edit the script later, you must create a **new deployment**
> (or use "Manage deployments" → edit → new version) for changes to go
> live — saving the file alone does not update an already-deployed Web App.

## Step 8 — Add the URL to your React project

1. In your project folder (`hussain-brothers/`), find the file `.env.example`
2. Make a copy of it named exactly `.env` (same folder, same level as `package.json`)
3. Open `.env` and paste your URL:
   ```
   VITE_ORDER_API_URL=https://script.google.com/macros/s/AKfycb..................../exec
   ```
4. Save the file

**If deploying to Vercel:** also add this as an environment variable there —
Vercel dashboard → your project → **Settings → Environment Variables** →
add `VITE_ORDER_API_URL` with the same value → redeploy.

`.env` is already excluded from Git (see `.gitignore`), so this URL won't be
committed to your repository — though note this URL is not a secret in the
same way a password is; it only accepts specifically-shaped order data (see
Security Considerations below).

## Step 9 — Run it locally and test

```bash
npm install
npm run dev
```

Go through the full flow: add a product to cart → Cart → Checkout → fill in
the form → **Confirm Order**.

You should see "Processing your order..." briefly, then land on the Order
Success page showing your Order Reference and full order summary.

## Step 10 — Verify everything actually worked

Check all four of these:

1. **Google Sheet** — open your "Hussain Brothers Orders" spreadsheet, the
   "Orders" tab should have one new row with your test order
2. **Gmail** — the `OWNER_EMAIL` inbox should have a new email titled
   `New Order — HB-XXXX — Rs ...`
3. **PDF invoice** — that email should have `Invoice-HB-XXXX.pdf` attached;
   open it to confirm it looks correct
4. **Website** — the Order Success page should have shown the correct
   order reference, customer details, and item breakdown

If any of these didn't happen, see Troubleshooting below.

## Step 11 — Test the failure path too (recommended)

Temporarily break the URL on purpose (e.g. delete the last character of
`VITE_ORDER_API_URL` in `.env`), restart `npm run dev`, and try placing an
order. You should see a red error message ("We couldn't complete your
order...") and the cart should NOT be cleared. This confirms the "don't show
false success" requirement is working. Fix the URL back afterward.

---

## Troubleshooting

**"Sheet 'Orders' not found" error** — the tab name in your spreadsheet
doesn't exactly match `SHEET_NAME` in the script (case-sensitive). Rename
the tab to exactly `Orders`.

**Order succeeds on the website but nothing appears in the Sheet** — you
likely edited the script after deploying but didn't create a new deployment
version. Go to **Deploy → Manage deployments → Edit (pencil icon) → New
version → Deploy**.

**CORS / network error in the browser console** — double-check "Who has
access" was set to **Anyone** during deployment, and that you copied the
`/exec` URL (not the `/dev` one shown during testing).

**No email arrives** — check the Gmail spam folder first. Also confirm
`OWNER_EMAIL` was saved correctly and that you authorized the script (Step 6).

---

## Security Considerations

- **No credentials ever live in the React frontend.** The browser only ever
  knows the public Web App URL — never a password, API key, or Google
  credential of any kind.
- **The Web App runs as your Google account** ("Execute as: Me"), but the
  script only performs the specific actions written into it (append a row,
  build a PDF, send one email) — it does not expose your Sheet, Drive, or
  Gmail generally to whoever calls the URL.
- **Anyone with the URL can technically submit a POST request to it.** This
  is inherent to any public web endpoint without its own login system —
  the same is true of a real backend without added protection. For this
  MVP, that's an accepted tradeoff (matches the "no traditional backend"
  requirement). If abuse ever becomes a concern, options include: adding a
  simple shared-secret field checked inside `doPost`, rate-limiting by IP
  (harder in Apps Script), or migrating to the FastAPI backend roadmap for
  proper request validation and rate limiting.
- **Google Apps Script Web Apps have a daily quota** (varies by account
  type, generally generous for a small business's order volume, but not
  unlimited) — worth being aware of if order volume grows significantly.
- Keep `.env` out of version control (already handled by `.gitignore`) —
  while the URL itself isn't a traditional secret, there's no reason to
  publish it unnecessarily either.
