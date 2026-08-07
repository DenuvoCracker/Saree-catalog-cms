create extension if not exists "pgcrypto";
create extension if not exists pg_trgm;

-- -----------------------------------------------------------------
-- Table: products
-- -----------------------------------------------------------------
create table if not exists public.products (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  price         numeric(10, 2) not null check (price >= 0),
  description   text not null default '',
  category      text not null,
  image_urls    text[] not null default '{}',
  stock_status  text not null default 'in_stock' check (stock_status in ('in_stock', 'sold_out')),
  featured      boolean not null default false,   -- "Best Seller" badge
  trending      boolean not null default false,   -- "Trending" badge
  new_arrival   boolean not null default false,   -- "New Arrival" badge
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Speed up catalog search / filter / sort
create index if not exists idx_products_category on public.products (category);
create index if not exists idx_products_stock_status on public.products (stock_status);
create index if not exists idx_products_created_at on public.products (created_at desc);
create index if not exists idx_products_name_trgm on public.products using gin (name gin_trgm_ops);

-- Keep updated_at fresh automatically on every UPDATE
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_products_updated_at on public.products;
create trigger trg_products_updated_at
before update on public.products
for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------
-- Row Level Security
-- Public (anon) visitors: read-only access to the catalog.
-- Authenticated admin: full read/write/delete access.
-- -----------------------------------------------------------------
alter table public.products enable row level security;

drop policy if exists "Public can view products" on public.products;
create policy "Public can view products"
  on public.products for select
  to anon, authenticated
  using (true);

drop policy if exists "Admin can insert products" on public.products;
create policy "Admin can insert products"
  on public.products for insert
  to authenticated
  with check (true);

drop policy if exists "Admin can update products" on public.products;
create policy "Admin can update products"
  on public.products for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admin can delete products" on public.products;
create policy "Admin can delete products"
  on public.products for delete
  to authenticated
  using (true);

-- -----------------------------------------------------------------
-- Storage bucket for product images
-- -----------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can view product images" on storage.objects;
create policy "Public can view product images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'product-images');

drop policy if exists "Admin can upload product images" on storage.objects;
create policy "Admin can upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

drop policy if exists "Admin can update product images" on storage.objects;
create policy "Admin can update product images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images');

drop policy if exists "Admin can delete product images" on storage.objects;
create policy "Admin can delete product images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');

-- -----------------------------------------------------------------
-- Seed data (optional — remove if you want to start empty)
-- -----------------------------------------------------------------
insert into public.products (name, price, description, category, image_urls, stock_status, featured, trending, new_arrival)
values
  ('Kanjivaram Silk Saree — Maroon & Gold', 18500, 'Handwoven Kanjivaram silk with traditional gold zari border, perfect for weddings.', 'Kanjivaram Silk', array['https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800'], 'in_stock', true, true, true),
  ('Banarasi Silk Saree — Emerald Green', 15200, 'Classic Banarasi weave with intricate floral motifs, woven in Varanasi.', 'Banarasi Silk', array['https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800'], 'in_stock', false, true, false),
  ('Cotton Handloom Saree — Ivory', 3200, 'Lightweight everyday cotton handloom saree with a simple woven border.', 'Cotton', array['https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800'], 'in_stock', false, false, true),
  ('Chiffon Printed Saree — Coral', 2800, 'Breathable chiffon saree with a delicate floral print, ideal for daytime events.', 'Chiffon', array['https://images.unsplash.com/photo-1610030181087-540e4d0a4a20?q=80&w=800'], 'sold_out', false, false, false);

-- =====================================================================
-- Admin user setup:
-- This project supports only ONE administrator. Create that user from
-- Supabase Dashboard → Authentication → Users → "Add user", or via SQL:
--
--   select auth.uid() from auth.users; -- (after creating via dashboard)
--
-- Email/password sign-in is used by src/services/authService.js.
-- =====================================================================
