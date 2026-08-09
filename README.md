# Yeşil Rüya Cennet Çamuru — Premium Dessert Homepage

Luxury Turkish dessert e-commerce homepage built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS**.

## Design system

| Token | Value | Use |
|---|---|---|
| `emerald` | `#0E4B3C` | Primary brand surface / text |
| `emerald-light` | `#1B6E56` | Hover / secondary surfaces |
| `emerald-dark` | `#092E25` | Deepest shadows, footer base |
| `cream` | `#F8F3EA` | Page background |
| `cream-dark` | `#EFE6D3` | Alternate section background |
| `gold` | `#D4AF37` | Accent, CTAs, badges |
| `gold-light` / `gold-dark` | `#E8C766` / `#A6832A` | Gradient sheen stops |

**Type system:** Playfair Display (display/headlines), Manrope (body/UI), Cormorant Garamond italic (editorial accent lines) — loaded via `next/font/google` in `app/layout.tsx`.

**Signature element:** a slow gold "pour" swirl (`SectionDivider.tsx` + the hero's drifting SVG) — a visual nod to *çamur* (velvet ganache being poured), used as the seam between major sections instead of a plain rule.

## Project structure

```
app/
  layout.tsx        # Root layout, font loading, metadata
  page.tsx           # Composes all homepage sections
  globals.css         # Tailwind layers, glass/grain utilities, tokens
components/
  Navbar.tsx          # Sticky glass navbar, search, cart badge, login
  Hero.tsx            # Hero banner with floating glass product spotlight
  ProductCard.tsx      # Single product card (image, favorite, price, CTA)
  FeaturedProducts.tsx # Grid of 6 product cards
  WhyChooseUs.tsx      # 4 feature cards
  Reviews.tsx          # Customer reviews on emerald glass section
  InstagramGallery.tsx # 6-post Instagram-style gallery
  Footer.tsx           # Brand blurb, link columns, newsletter, socials
  SectionDivider.tsx    # Signature gold pour divider
lib/
  data.ts             # Product, review, feature and Instagram content
types/
  index.ts            # Shared TypeScript interfaces
tailwind.config.ts     # Brand color tokens, shadows, gradients, keyframes
next.config.ts         # Remote image domain (Unsplash) config
```

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Notes

- Product photography uses Unsplash placeholder URLs — swap the `image` fields in `lib/data.ts` for your own product photography before launch.
- All interactive bits (favorite toggle, search reveal, mobile menu, sticky navbar state) are plain React state — no external state library needed for this page.
- `prefers-reduced-motion` is respected globally in `globals.css`.
- Colors are defined once in `tailwind.config.ts`; change the three brand hexes there to re-theme the whole site.
