# Meera Silks — Saree Catalog Website

A production-ready **business catalog** (not e-commerce) for a local saree boutique. Customers browse
sarees and enquire via WhatsApp; the shop owner manages the catalog through a password-protected
admin dashboard.

## Tech Stack

- **Frontend:** React 18 + Vite, Tailwind CSS, React Router, React Hook Form, Axios-ready, Recharts, react-hot-toast
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Deployment:** Vercel (frontend) + Supabase (backend)

## Project Structure

```
src/
  assets/          static images/icons bundled at build time
  components/
    ui/            reusable primitives (Badge, Modal, Spinner, Skeleton, ConfirmDialog…)
    layout/        Navbar, Footer, ErrorBoundary, WhatsApp float button, scroll-to-top
    product/       ProductCard, ProductGrid, ProductFilters, ProductGallery
    home/          Hero, FeaturedCollections, WhyChooseUs, Testimonials
    admin/         ProductForm, ProductTable, ImageUploader, StatsCard, charts
  layouts/         PublicLayout (navbar+footer shell), AdminLayout (sidebar shell)
  pages/           Home, Catalog, ProductDetails, About, Gallery, Contact, NotFound
  pages/admin/     Login, Dashboard, ProductsList, AddProduct, EditProduct
  hooks/           useProducts (data fetching + loading/error state)
  services/        productService, authService, storageService (all Supabase calls live here)
  context/         AuthContext (session state via Supabase Auth)
  routes/          ProtectedRoute (guards /admin/* except /admin/login)
  constants/       site info, categories, sort options
  utils/           formatCurrency, buildWhatsAppLink
supabase/
  schema.sql       full DB schema, RLS policies, storage bucket + policies, seed data
```

## 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run the contents of `supabase/schema.sql`. This creates:
   - the `products` table with indexes and an auto-updating `updated_at` trigger
   - Row Level Security policies (public read-only, authenticated admin full access)
   - the `product-images` Storage bucket with matching policies
   - a few seed products so the site isn't empty on first run
3. Go to **Authentication → Users → Add user** and create the single admin account
   (email + password). This app supports exactly one administrator, as specified.
4. Copy your **Project URL** and **anon public key** from **Settings → API**.

## 2. Local Development

```bash
npm install
cp .env.example .env.local
# then edit .env.local with your Supabase URL, anon key, and WhatsApp number (country code + number, no + or spaces)
npm run dev
```

## 3. Deploying the Frontend to Vercel

1. Push this project to a GitHub repository.
2. In Vercel, **Add New Project** → import the repo.
3. Framework preset: **Vite**. Build command `npm run build`, output directory `dist` (auto-detected).
4. Add environment variables in Vercel → Project Settings → Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_WHATSAPP_NUMBER`
5. Deploy. Every push to `main` will auto-redeploy.

## 4. Admin Access

Visit `/admin/login` and sign in with the single admin account created in Supabase Auth.
Unauthenticated visitors are redirected away from any `/admin/*` route except the login page.

## Notes on Design Decisions

- **No shopping cart or checkout** — by design. The "Add to Cart" pattern was intentionally left
  out; every product page ends in a WhatsApp enquiry instead.
- **Images** live in Supabase Storage; deleting a product also removes its images from the bucket
  so nothing is orphaned.
- **SEO**: meta/OG tags are in `index.html`, plus `public/robots.txt` and `public/sitemap.xml`
  (update the sitemap domain once you have a real one).
- **Performance**: images use `loading="lazy"`, routes/vendor code are split via `vite.config.js`
  `manualChunks`, and lists show skeleton loaders while fetching.
- **Accessibility**: semantic landmarks, ARIA labels on icon-only buttons, visible focus rings,
  and `prefers-reduced-motion` is respected globally in `index.css`.
