# graceandbread.org

The Grace and Bread website, moved off Squarespace to GitHub Pages. It has the same pages, text, links, and layout as before, with the new logo and colors taken from it.

| Page | Address | File |
|---|---|---|
| Home | `/` | `index.html` |
| About | `/about` | `about/index.html` |
| Get Involved | `/volunteer` | `volunteer/index.html` |
| Podcast | `/neighbors-on-the-street` | `neighbors-on-the-street/index.html` |
| Form confirmation | `/thank-you` | `thank-you/index.html` |

Impact still opens https://impact.graceandbread.org in a new tab. The page addresses match the old site, so existing links keep working.

**What's new compared with the Squarespace site**
- **Newsletter signups go straight into your Mailchimp audience.** The old Squarespace signup form wasn't connected to anything.
- **Get Involved has a "Want to provide a meal?" button** that opens your Meal Train.

---

## Step 1. Put the site on GitHub

1. At github.com, create a **new public repository** (for example `graceandbread-site`).
2. Click **uploading an existing file**. Drag in everything *inside* this folder, not the folder itself. Click **Commit changes**.
3. Go to **Settings → Pages**. Choose **Deploy from a branch**, then branch **main**, folder **/ (root)**, and **Save**.
4. Set **Custom domain** to `graceandbread.org` and click **Save**.
5. Recommended: verify the domain so no one else can claim it. Click your profile picture → **Settings → Pages → Add a domain**, then add the TXT record GitHub shows you at your registrar.

## Step 2. Point graceandbread.org at GitHub

Make these changes where the domain is registered. **Delete only the records that point the website to Squarespace.** These are usually four `A` records on `@` and a `www` CNAME, grouped as "Squarespace Defaults." Then add:

| Type | Host | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |
| CNAME | www | YOUR-GITHUB-USERNAME.github.io |

> ⚠️ **Leave everything else alone.** The `MX` and `TXT` records carry email for info@showgrace.org, Mailchimp, and verifications. The `impact` record runs the Impact page. Deleting any of these breaks email or the Impact map.

When GitHub's Pages screen shows the domain as working, check **Enforce HTTPS**.

## Step 3. Forward the other domains

In each domain's settings at your registrar, add a **permanent (301) forward**:

| Domain | Forward to |
|---|---|
| showgrace.org | https://graceandbread.org |
| neighborsonthestreet.com | https://graceandbread.org/neighbors-on-the-street/ |
| neighborsonthestreet.org | https://graceandbread.org/neighbors-on-the-street/ |

Test each one with `https://` typed in front. showgrace.org carries your email, so forward only the website. Leave its `MX` and `TXT` records alone.

## Step 4. Test the forms

- **Newsletter:** sign up with a real email address. Mailchimp sends a confirmation email. After you click it, the person appears in your audience. If your audience has extra required fields, Mailchimp's error message will show on the page. Remove those requirements or tell me.
- **Get Involved form:** submit it once. FormSubmit emails info@showgrace.org an activation link. Click it, or nothing gets delivered.

## Step 5. Check everything, then cancel Squarespace

- [ ] All four pages load at graceandbread.org, with photos
- [ ] Impact, Donate, Past Newsletters, Meal Train, Merchandise Store, LinkedIn, Spotify, and Apple Podcasts all open the right pages
- [ ] The newsletter signup lands in Mailchimp, and the Get Involved form reaches info@showgrace.org
- [ ] showgrace.org and both podcast domains forward correctly on `https://`
- [ ] Email to info@showgrace.org still works

Then cancel **only the Squarespace website subscription**. Domains and email are billed separately.

---

## Making changes later

Edit any file right on GitHub: open it, click the pencil icon, edit, and commit. The site updates in about a minute.

- **Text:** find the sentence in that page's `index.html` and change it.
- **Links:** they repeat on every page (header, footer, mobile menu). Search the repo for the old address and update each copy.
- **Colors:** five values at the top of `assets/css/site.css`. The old Squarespace colors are noted there in case you ever want them back.
- **Logo files:** `assets/brand/` holds every lockup as SVG. Files ending in `-ink` are for light backgrounds, and the rest are for dark backgrounds.
- **Photos:** `assets/img/`. To swap one, upload a new file with the same name.
