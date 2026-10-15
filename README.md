# GB Studios Documents

Private document generator: invoice, receipt, proposal, agreement. A static Vite app hosted on Netlify. Everything you edit lives inside the app (Settings and Services list).

## Run locally
    npm install
    npm run dev

## Deploy
1. Create a **private** GitHub repo and push this folder.
2. Netlify: Add new site > Import from Git > pick the repo (build settings come from `netlify.toml`).
3. Protect the site (Netlify password protection, if your plan includes it).

## Where data lives
- `content/` in the repo: starter text only (service names, default terms, copyright, agreement clauses). Changing these files changes the starting point after a redeploy.
- This browser only (localStorage): logo, bank accounts, invoice counter, your service-list changes, and your edited default terms. Use Settings > Export backup regularly, and Import backup on a new browser.
- Never commit bank details, clients or invoices to this repo.

## Not included yet
Saved clients and documents, server-issued invoice numbers, multi-device sync. These need a database (for example Supabase) and are the next phase.
