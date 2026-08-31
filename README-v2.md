# Parallel Inbound Check - Full Rebuild (v2)

This replaces the earlier simplified version with the full feature set:
Admin/Checker view split, a searchable Admin dashboard, Handling Unit
tracking with print, file upload supporting CSV and Excel with a
guarded reset, and a redesigned checking page with manual submit,
SKU/name preview, and HU handling.

## Files in this package

- `index.html` - main page, choose Admin View or Checker View
- `admin.html` - dashboard (searchable SKU/store progress table, exports, nav)
- `handling-units.html` - list of HUs, print label for closed ones
- `upload.html` - upload CSV/Excel master data, reset with confirmation
- `login.html` - checker login (10 slots)
- `checking.html` - the scanning page (portrait layout, for handhelds)
- `firebase-config.js` - your Firebase project keys (already filled in)
- `master_sample.csv` - example master data with the new Name column

## Replacing your existing GitHub repo

Your existing repo (`warehouse-inbound-check`) has 6 files:
`index.html`, `admin.html`, `login.html`, `scan.html`, `dashboard.html`,
`firebase-config.js`. Here's how to swap in this new version:

1. Go to your repo on GitHub.
2. **Delete the old files that no longer exist in this version:**
   `scan.html` and `dashboard.html` - open each one in GitHub, click the
   trash/delete icon, commit the deletion. (They're replaced by
   `checking.html` and functionality folded into `admin.html`.)
3. **Upload all 7 new files** (`index.html`, `admin.html`,
   `handling-units.html`, `upload.html`, `login.html`, `checking.html`,
   `firebase-config.js`) using "Add file > Upload files" - when GitHub
   asks whether to overwrite the existing `index.html`, `admin.html`,
   `login.html`, and `firebase-config.js`, confirm yes.
4. Commit the changes.
5. Wait a minute for GitHub Pages to rebuild, then open your same site
   URL - it should now show the new Main Page with Admin View / Checker
   View buttons.

No changes needed to your Firebase project itself - same database, same
config keys, just new pages using it differently.

## Important: re-upload your master data

The master data structure changed to include the new Name column and a
different internal shape (to support Handling Units). **Your previously
uploaded master data will not work correctly with this version** - go to
Upload File and upload a fresh CSV/Excel (see the new format below)
after deploying.

## Master data format (updated)

First column SKU, **second column is now the item Name**, remaining
columns are store names with the qty target as the cell value:

```
SKU,Name,Storage A,Storage B,Storage C
SKU001,Blue Cotton T-Shirt,50,,10
SKU002,Wireless Mouse,30,,
SKU003,Ceramic Mug,,20,
SKU004,USB-C Cable 1m,,45,5
SKU005,Notebook A5,,,15
```

Both `.csv` and `.xlsx` are accepted - only the first sheet is read for
Excel files.

## What's new in this version

- **Main page** splits into Admin View and Checker View.
- **Admin dashboard** shows a live, searchable table of every SKU's fill
  progress per store (e.g. "5/14"), plus buttons to download a Summary
  CSV, a Detail CSV, and navigate to Handling Units / Upload.
- **Handling Units** are now tracked: when a checker scans a SKU for a
  store with no open HU yet, they're prompted to scan/enter an HU code.
  Subsequent scans for that store attach to the same HU automatically.
  A "Close HU" button on the checking page marks it closed.
- **Handling Units page** lists every HU with its checker, store, and
  status, and lets you print a sorted label list (grouped by SKU, e.g.
  SKU A, SKU A, SKU B, SKU B) for any closed HU. This is currently a
  simple placeholder print layout - the real label design (barcode
  format, exact fields, 4"x6" layout) is still being finalized
  separately and will replace this.
- **Upload page** now accepts Excel (.xlsx) as well as CSV, and has a
  guarded "Reset Document" flow - a confirmation popup with a required
  checkbox before it will delete the master data and all scan/HU
  results.
- **Checking page** no longer auto-submits on scan - you must click
  Submit. It also now previews the SKU + item name before you submit,
  and shows all 4 columns (SKU, Name, Handling Unit, Store) plus the
  fulfilled/target count after each scan.
- **Checker sessions** now auto-release if the browser tab is closed
  (using Firebase's `onDisconnect`, more reliable than a page-close
  event) or if a checker is inactive for 3 hours - both in addition to
  the manual Logout button.

## What's still not built

- The real label design (barcode, exact layout) - Handling Units page
  currently prints a plain placeholder list, not actual scannable labels.
- Any authentication/access control (still open test-mode Firebase rules).
- Migration to PostgreSQL (pending IT providing a database + hosting).

## Testing checklist

1. Upload `master_sample.csv` via Upload File.
2. Go to Checker View, pick a checker, scan `SKU001` - confirm the
   preview shows "SKU001 - Blue Cotton T-Shirt" before you submit.
3. Click Submit - you should be prompted to scan an HU code (since none
   is open yet for Storage A). Enter something like `HU-001` and submit.
4. Scan `SKU001` again and submit - this time it should NOT ask for an
   HU again, since one is already open for that store under this checker.
5. Click "Close HU" - confirm it closes.
6. Go to Admin Dashboard - search for "SKU001" and confirm the fill
   count matches what you scanned.
7. Go to Handling Units - find the closed HU, click "Print Label" and
   confirm the print preview shows the SKUs grouped correctly.
8. Go to Upload File, click Reset Document, confirm the checkbox gates
   the Yes button, and confirm data is actually cleared afterward.
