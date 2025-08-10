

# DEVELOPMENT

> **Project:** Strzykawa — coffee shop & roastery (landing + coffee catalogue)
> **Goal:** A fast, simple website to present the café, showcase coffees, and surface what’s *available right now* in the shop. Designed to be CMS‑ready and easy to extend (e.g., blog).

---

## 1) Tech stack
- **Build:** Vite + React
- **Routing:** `react-router-dom`
- **Icons:** `react-icons`
- **Styling:** single global stylesheet `src/index.css` (to be split — see §5)
- **Assets:** imported via Vite (e.g. `new URL('...', import.meta.url).href`)

### Scripts
```bash
npm install
npm run dev      # Vite dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

---

## 2) Project structure (current)
```
src/
  assets/                # images (hero, logo, placeholders)
  components/
    CoffeeCard.jsx       # card with overlay + mobile info toggle
    ContactSection.jsx
    Footer.jsx
    Header.jsx           # fixed; transparent over hero; solid on scroll
    HeroSection.jsx
  data/
    coffees.js           # sample data in CMS‑ready schema
  pages/
    AvailableInCafe.jsx  # "Dostępne w kawiarni" — 4 availability sections
    Coffees.jsx          # "Nasze kawy" — all coffees grid
    Home.jsx             # landing: hero + contact
  App.jsx                # layout + routes
  index.css              # global styles (to be split)
  main.jsx               # React bootstrap
```

---

## 3) Coffee data model (summary)
**Keys are English (CMS‑friendly); UI strings are Polish.**
```ts
export type Coffee = {
  id: string;
  name: string;              // display name (PL)
  image: string;             // pack / artwork
  origin: Array<{
    country: string;         // PL values (e.g., "Etiopia")
    region?: string;
    farm?: string;
    variety?: string[];      // e.g., ["Yellow Bourbon", "SL28"]
    altitudeMasl?: number | string;
    processing?: string;     // PL labels (Washed → "Washed" or "Mokra" if desired)
    fermentation?: string;
  }>;
  species: string[];         // e.g., ["Arabica"]
  roastLevel?: string;       // PL: "Jasny", "Średni", "Ciemny"
  roastType?: string;        // mapped to PL in UI: Filter → "Przelew", Espresso → "Espresso"
  roastDate?: string | null; // ISO or null
  tastingNotes?: string[];   // PL notes
  description?: string;      // short PL description
  availability: {
    espressoGrinders: boolean; // on the espresso grinders
    quickFilter: boolean;      // batch brew / szybki przelew
    brewBar: boolean;          // drip / Aeropress at the bar
    retailShelf: boolean;      // on the shelf for retail
  };
}
```

### Blends
`origin` is an array so a coffee can carry multiple countries/regions/varieties. Helpers in components deduplicate and join values for display.

---

## 4) Pages & components
- **Header** — fixed; transparent over hero; gains semi‑transparent background + blur after scroll. Nav links: Start / Nasze kawy / Dostępne w kawiarni / Kontakt (#anchor).
- **HeroSection** — full‑viewport background image (placeholder now; video possible later), centered headline + CTA.
- **CoffeeCard** — shows image, name, countries, roast type and tasting notes. On hover: a slide‑up overlay with details (Region, Obróbka, Odmiana, Farma, Gatunek, Wysokość, Wypał). On mobile: small “i” button toggles the overlay.
- **Coffees** — responsive grid of all coffees.
- **AvailableInCafe** — four sections with icons and counters: *Na młynkach*, *Szybki przelew*, *Do parzenia na miejscu*, *Na półce*.
- **ContactSection** — address, hours, phone, email, map.
- **Footer** — socials + copyright.

---

## 5) Styling guidelines & planned split
Right now everything lives in `src/index.css`. Planned split:
```
src/styles/
  base.css        # variables (colors, fonts), resets, typography
  layout.css      # containers, grids, spacing utilities
  components.css  # buttons, chips, cards, header, footer
  pages.css       # hero, coffees page, available page, contact
```
**Rules:**
- Use CSS variables for all colors and spacing (already present under `:root`).
- Prefer component‑scoped selectors over broad globals.
- Keep transitions subtle (180–300ms, cubic‑bezier ease).
- Maintain contrast for readability on dark backgrounds.

> Optionally consider CSS Modules or Tailwind if the project grows.

---

## 6) Routing
- `/` — Home (hero + contact)
- `/kawy` — Nasze kawy
- `/dostepne-w-kawiarni` — Dostępne w kawiarni

Active link styling is handled via `NavLink` in the `Header`.

---

## 7) Accessibility (a11y)
- Hover overlay also opens via `:focus-within`.
- Mobile overlay toggled by a clearly labelled button.
- Link and button focus states are visible.
- Images have meaningful `alt` text (to be refined with real assets).

---

## 8) CMS direction (proposal)
**Target:** Strapi (or Directus) when we switch from static data.
- Collection: `coffee` matching the schema above.
- Controlled vocabularies: `processing`, `species`, `roastLevel`, `roastType`.
- Simple toggle UI for `availability` so baristas can update the current menu quickly.
- Public read token; frontend fetch with graceful fallback to `coffees.js` if API is down.

Migration plan:
1. Keep `coffees.js` as seed data.
2. Add `VITE_USE_CMS` flag; when true, fetch from CMS; otherwise use local data.
3. Normalise values so filters remain consistent.

---

## 9) Deployment
**Netlify** (free tier) recommended for now.
- Connect GitHub repo → build command `npm ci && npm run build`, publish directory `dist/`.
- Optional: headers for long‑term image caching; `noindex` for preview branches.

---

## 10) Conventional commits (suggested)
- `feat:` new feature
- `fix:` bug fix
- `style:` CSS/visual only
- `refactor:` code change without features/bug fixes
- `docs:` documentation
- `chore:` tooling/config

Examples:
```
feat(available): add four availability sections with icons and counters
style(header): add blur + solid background after scroll
fix(card): prevent overlay from covering title; enable focus‑within
```

---

## 11) Roadmap
- [ ] Split `index.css` into `base/layout/components/pages`
- [ ] Add filters on "Nasze kawy" (country, processing, roast)
- [ ] Detail page: `/kawy/:id` with full story and images
- [ ] "Chips" badges on cards (e.g., “też na półce”) for the Available page
- [ ] SEO: meta, OpenGraph, alt texts, sitemap
- [ ] CMS integration and data fetching
- [ ] Lighthouse > 90 across categories

---

## 12) Dev notes
- Header becomes solid after ~40px scroll; background uses semi‑transparent brand color + `backdrop-filter: blur(8px)`.
- CoffeeCard overlay only covers the media area; on mobile the `i` button toggles an `.open` class.
- Available page grids: `repeat(auto-fit, minmax(250px, 1fr))`, forced to 4 columns on ≥1200px.

---

**Maintainer:** @enowuigrek — repo `strzykawa-site`
# Dokumentacja developerska – Strzykawa Coffee Site

## 📌 Stos technologiczny
- **React 18 + Vite** – szybkie budowanie i HMR
- **JavaScript (ES6+)**
- **CSS (na start)** – później możliwe przejście na moduły CSS lub styled-components
- **Node.js + npm** – zarządzanie paczkami
- **Git + GitHub** – kontrola wersji

## 📂 Struktura katalogów
```
src/
  assets/        → obrazy, logotypy
  components/    → komponenty wielokrotnego użytku (Header, Footer, HeroSection itd.)
  data/          → statyczne dane (np. coffees.js)
  pages/         → widoki stron (Home, Coffees, AvailableInCafe)
  App.jsx        → główny komponent aplikacji
  main.jsx       → punkt wejścia
  index.css      → globalne style (do rozbicia)
```

## ☕ Model danych kawy
Każdy obiekt w `coffees.js`:
```js
{
  id: 1,
  name: "Espresso",
  description: "Krótka, intensywna kawa",
  image: "coffee-placeholder.jpg",
  availableInCafe: true
}
```

## 🎨 Plan stylowania
- Obecnie wszystkie style w `index.css`.
- Plan: rozbicie na **moduły CSS**:
  - `Header.module.css`
  - `Footer.module.css`
  - `HeroSection.module.css`
  - `CoffeeCard.module.css`
- Ustalić paletę kolorów (brandowe + neutralne tło).
- Responsywność: min. 3 progi (`<640px`, `641–1024px`, `>1024px`).

## 🧩 Główne komponenty
- **Header** – nawigacja, logo
- **HeroSection** – zdjęcie główne + CTA
- **CoffeeCard** – karta produktu
- **ContactSection** – dane kontaktowe + mapa
- **Footer** – prawa autorskie, linki

## 🛣 Routing
- `/` → Home.jsx
- `/coffees` → Coffees.jsx
- `/available` → AvailableInCafe.jsx

## 🗂 Plan CMS
Docelowo dane (np. kawy) będą ładowane z CMS lub API (np. Strapi, Contentful). Na start dane statyczne w `coffees.js`.

## 🚀 Deploy
- Build: `npm run build`
- Hosting: Netlify / Vercel
- Automatyczny deploy z `main` po pushu

## 💡 Konwencje commitów
- `feat:` – nowa funkcja
- `fix:` – poprawka błędu
- `style:` – zmiany w CSS
- `refactor:` – zmiany w kodzie bez zmiany działania
- `docs:` – zmiany w dokumentacji

## 📅 Roadmapa
1. Rozbicie styli z `index.css` na moduły
2. Dodanie responsywności
3. Dodanie strony kaw dostępnych w kawiarni
4. Integracja z API/CMS
5. Finalny deploy

## 📝 Notatki developerskie
- Dbać o semantyczny HTML
- Opisy alternatywne dla obrazów
- Testować w Chrome, Firefox i Safari