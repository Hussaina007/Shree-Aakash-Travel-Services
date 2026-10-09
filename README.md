# Shree Aakash Travel Services website

## Open and edit in VS Code

1. Copy the complete `outputs` folder to the location where you want to keep the site.
2. In VS Code, select **File → Open Folder…** and choose that copied folder.
3. Install Node.js, then open VS Code's terminal in this folder and run `pnpm install` followed by `pnpm dev`. Open the local URL printed in the terminal. Use the Vite server instead of opening `index.html` directly so the environment variables load correctly.
4. Edit `config.js` for business details, WhatsApp, rates, package cards, and image paths. Edit a page’s `.html` file for its headings and explanatory text. Edit `styles.css` only if you want to change the layout or appearance.
5. Keep the HTML pages, `config.js`, `site-shell.js`, `script.js`, `supabase-inquiry.js`, `styles.css`, `india-outline.svg`, logo files, and `assets` folder together.

## Owner updates

Edit `config.js`:

- `WHATSAPP_NUMBER`: the single WhatsApp destination number in international format, digits only, without `+` or spaces. The current value was transcribed from the business listing image; verify it before publishing.
- Foreign exchange customers can check live reference rates at [X-Rates](https://www.x-rates.com/); contact the agency to confirm the applicable transaction rate.
- `tourPackages`: edit each destination's `name`, `description`, `image`, and `alt`. These destinations and photos are sample content until confirmed. Replace each image URL with a local image path or another suitable image URL, and update its alt text.
- The About page’s Uniglobe mark is `assets/uniglobe-logo.png`. Keep it only if you are permitted to display the official logo; you can replace this file with an approved current logo.
- `assets/iata-agent-logo.png` is the IATA Accredited Agent logo supplied by the owner. The About page and footer link it to `https://www.iata.org/`; the Uniglobe logo links to `https://www.uniglobe.com/`. The footer partner row shows only these two marks; the agency logo remains in the footer brand lockup and links home.
- `airlines`: update the airline list or filenames in `config.js`. Real airline logo files are in `assets/airlines/`; the source links are listed in `assets/airlines/SOURCES.md`. Keep configured filenames in sync if you replace files. These airline marks are for identification only and do not imply a partnership.
- `name`, `logo`, `phoneNumbers`, `WHATSAPP_NUMBER`, `instagramHandle`, `instagramUrl`, `email`, `serviceArea`, `address`, and `mapQuery`: update these business details. Phone numbers and email reflect the details supplied by the owner. The shared header and footer logo is `assets/shree-aakash-logo.png`; replace this file to change the logo sitewide. The browser tab icon is `assets/favicon.png`.
- `googleReviews`: add only genuine review excerpts that you have verified and approved. The review carousel is empty until entries are added. `googleRating` and `googleReviewCount` reflect the supplied listing screenshot and should be rechecked before publishing.
- `heroImage`, `destinations`, and `services`: update the existing homepage image, destination cards, and service descriptions as needed.

### Supabase trip enquiry setup

The Quick Trip Inquiry form saves one record to `public.trip_inquiries` using `@supabase/supabase-js`. It does not request or read the saved record. Anonymous visitors have insert permission only; no public read policy is created.

Environment values are in `.env` for local work. Vite reads these names and exposes them to the browser bundle:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

The provided `.env` already contains the project URL and publishable key supplied for this project. `.env` is git-ignored; `.env.example` is a safe template. Do not put a Supabase secret/service-role key in a `VITE_` variable or browser code. The publishable key is designed for browser use only when Row Level Security and table policies are correctly configured.

To set up and test:

1. In the Supabase dashboard, open **SQL Editor**, paste and run `supabase-schema.sql`. This creates the table and an insert-only policy for the `anon` role.
2. In this folder, run `pnpm install` once, then `pnpm dev` and open the local URL Vite prints.
3. Submit an inquiry with test details. A successful save shows an on-page confirmation; failed submissions keep the entered values and show an error. Verify the row in the Supabase Table Editor.
4. For deployment, run `pnpm build` and publish the generated `dist` folder. Add the same two `VITE_SUPABASE_*` values to the hosting provider's environment-variable settings before building there.

The expected columns are `full_name` (text), `phone` (text), `email` (text, nullable), `destination` (text), `travel_date` (date, nullable), `travelers` (integer, nullable), `trip_type` (text, nullable), and `message` (text, nullable), plus generated `id` and `created_at`. The header and footer are shared from `site-shell.js`; edit that file once to change them across all pages.

## Pages

- `index.html` — home, company teaser, route map, services, review panel, and contact.
- `about.html` — company story, IATA accreditation, Uniglobe Travel connection, customer benefits, agency values, and trip-planning calls to action. Replace the bracketed founder, establishment year, and customer-count details, and confirm the exact Uniglobe relationship wording before publishing.
- `services.html` — service overview.
- `visa-service.html`, `passport-service.html`, `foreign-exchange.html` — service information.
- `tour-packages.html`, `domestic-tours.html`, `international-tours.html`, `gujarat-tours.html` — package overview and destination cards.
- `air-tickets.html` — ticket enquiry, airline marquee, and travel checks.
- `destinations.html` — destination gallery grouped into domestic, Gujarat, and international ideas, with 12 destinations in each group.

The Domestic Tours, International Tours, Gujarat Tours, and Destinations pages use the matching 12-entry groups in `config.js` under `tourPackages`. Several Gujarat images include a linked source and license credit shown on each card.

Passport and visa document rules vary by applicant and destination. Confirm current requirements with the official Passport Seva service or relevant embassy/consulate before advising a traveller.

The India outline file `india-outline.svg` is adapted from [Wikimedia Commons, India outline.svg](https://commons.wikimedia.org/wiki/File:India_outline.svg), licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). Attribution is also shown below the map.
