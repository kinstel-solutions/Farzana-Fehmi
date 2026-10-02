# Sanity CMS & Studio Operations Guide

## 1. Quick Overview
* **Sanity Project ID:** `o4igymxx`
* **Dataset:** `production`
* **Studio URL:** `/studio` (e.g. `https://farzanafehmi.com/studio` or `http://localhost:3000/studio`)
* **CMS Mode:** Set via `CMS_MODE=sanity` (defaults to Sanity with automatic fallback to mock data).

---

## 2. Inviting the Client
1. Visit [manage.sanity.io](https://manage.sanity.io) and log in.
2. Select the **fehmifarz** project (`o4igymxx`).
3. Click on the **Members** tab → **Invite new member**.
4. Enter the client's email and select their role (**Editor**).
5. The client will accept the email invite and can then log in at `/studio`.

---

## 3. How to Control the Studio Access Toggle (Kill Switch)

When the toggle is **closed/off**, visiting `/studio` renders a standard **404 Not Found** page. The live store continues running normally with all products.

### Method A: Environment Variable in Vercel (Default)
1. Go to your project on **Vercel** → **Settings** → **Environment Variables**.
2. Set `ENABLE_STUDIO` to:
   * `true`: Studio is open.
   * `false`: Studio is locked (returns 404).
3. Click **Redeploy** to apply the change.

### Method B: Secret Bypass Link (Instant — No Redeploy Needed)
You can share a secret access link with her (or use it yourself) anytime without touching Vercel:
```
https://farzanafehmi.com/studio?access=ff-studio-access-2026
```
*(Key configured in `.env.local` as `STUDIO_ACCESS_KEY`)*

### Method C: Vercel Edge Config (Instant 1-Click Toggle — Zero Redeploy)
1. In your Vercel Dashboard, go to **Storage** → create or link an **Edge Config**.
2. Add a key:
   ```json
   {
     "enable_studio": false
   }
   ```
3. Whenever she needs to edit, change `"enable_studio": true` and click **Save**. Access is live globally in 15 milliseconds without rebuilding!

---

## 4. On-Demand Instant Cache Revalidation (Webhooks)
When the client clicks **Publish** in Sanity, to have the live website update instantly without a rebuild:
1. In [manage.sanity.io](https://manage.sanity.io), go to your project → **API** → **Webhooks** → **Create webhook**.
2. Set:
   * **Name:** Next.js Live Cache Invalidator
   * **URL:** `https://farzanafehmi.com/api/revalidate?secret=sanity-revalidate-2026&tag=products`
   * **Dataset:** `production`
   * **Trigger on:** Create, Update, Delete
   * **Filter:** `_type in ["product", "collection"]`

---

## 5. Adding & Editing Products
Inside the Studio:
* **Product Name & Slug:** Enter the product name and click "Generate" on the slug.
* **Price:** Enter the display price (e.g. `$300 AUD`) and numeric price (e.g. `300`).
* **Cover Image & Hotspot:** Upload photo and click "Hotspot" to drag the circle over the model's face / primary dress detail. The website will automatically center crops around this point on all devices.
* **Gallery Images:** Upload additional angles and close-up embroidery shots.
* **Featured Toggle:** Turn on to feature on the homepage carousel/grid.
* **Publish:** Click the green **Publish** button at the bottom right.
