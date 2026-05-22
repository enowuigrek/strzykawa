# Agents / AI context

Przed pracą w tym repo przeczytaj kontekst biznesowy projektu:
~/Documents/nowy-kontekst/projekty/strzykawa.md

Tam znajdziesz: czym jest projekt, dla kogo, co już zrobione,
co bieżąco i jak o tym pisać. Tu (w AGENTS.md / CLAUDE.md)
trzymamy tylko kontekst techniczny specyficzny dla tego repo.

## DESIGN.md — system wizualny

`~/Documents/nowy-kontekst/design/strzykawa-site.md`

Czytaj go PRZED każdą zmianą stylów, kolorów, typografii lub layoutu.

Gdy Cowork zaktualizuje ten plik i poprosi o synchronizację — przepisz zmiany
do odpowiednich plików: `tailwind.config.js` (kolory, font, animacje),
`src/index.css` → blok `:root` (CSS vars), komponentów JSX.

Nowe komponenty buduj zgodnie z tokenami z tego pliku — nie dodawaj nowych
wartości hex/rgba bez jednoczesnej aktualizacji DESIGN.md.

**Gdzie żyją tokeny w kodzie:**
- Kolory + font + animacje → `tailwind.config.js`
- CSS custom properties (focus, autofill, fallbacki) → `src/index.css` `:root`
- Dane kontaktowe → `src/constants/contact.js`
- Kolory krajów / social → `src/constants/colors.js` / `tailwind.config.js` → `social`
- Timings logiki (nie CSS) → `src/constants/timings.js`

## CONTENT.md — treści strony

`~/Documents/nowy-kontekst/content/strzykawa.md`

Czytaj przed każdą zmianą tekstów na stronie. Zawiera:
- aktualne copy dla każdej sekcji (Hero, O palarni, Historia, Misja, Social Proof, CTA)
- mapowanie treść → plik React (który komponent edytować)
- dane kontaktowe i godziny (źródło: `src/constants/contact.js`)
- SEO meta dla strony głównej

**Gdy Cowork zaktualizuje treści:**
1. Przeczytaj `content/strzykawa.md` — znajdź zmienioną sekcję
2. Sprawdź kolumnę "Plik w kodzie" — edytuj wskazany komponent
3. Zaktualizuj `content/strzykawa.md` żeby był zgodny z kodem
4. Wpis do `## Log zmian` w tym pliku

**Wyjątek — dane kontaktowe i godziny:** edytuj WYŁĄCZNIE `src/constants/contact.js`,
nigdy bezpośrednio w JSX.

**Wyjątek — produkty:** zarządzane przez Shopify, nie w kodzie.

## Stack

- **Frontend:** React 18.2 + Vite 7.3, React Router v6, Zustand 5.0 (cart/auth/checkout stores)
- **Stylowanie:** Tailwind CSS 3.4 + @tailwindcss/typography, tailwind-scrollbar-hide
- **E-commerce:** Shopify Storefront API (GraphQL, headless), Przelewy24, InPost (paczkomat widget)
- **SEO/AEO:** react-helmet-async, JSON-LD schema markup
- **Analytics:** Google Analytics 4 (G-HX2M6NVVW9), Google Tag (GT-55VC5CSV), Consent Mode v2
- **Inne:** vanilla-cookieconsent 3.1, qr-code-styling 1.9, react-icons 4.10, prop-types
- **Hosting:** Netlify (auto-deploy z main), Cloudflare DNS
- **AEO Tracker:** osobny projekt — `../strzykawa-aeo-tracker/`, Node.js/Express/SSE, port 3000

## Konwencje

### Struktura folderów

```
src/
├── assets/          # Obrazy, wideo (hero-desktop.mp4, hero-mobile.mp4, history/, team/)
├── components/
│   ├── atoms/       # Button, Chip, Logo, CloseButton, Spinner...
│   ├── molecules/   # FilterSection, ProductGallery, VariantSelector...
│   ├── organisms/   # CoffeeGrid, FilterDrawer, CoffeeFilterBar...
│   ├── layout/      # Header, Footer, PageLayout, ModalWrapper...
│   ├── features/    # hero/, about/, contact/ (sekcje stron)
│   ├── coffee/      # CoffeeCard, CoffeeOverlay, ParametrSelector...
│   ├── cart/        # CartModal, CartItem, ShippingProgress...
│   ├── checkout/    # AddressForm, InPostWidget, DeliveryMethodSelector...
│   ├── header/      # DesktopNav, MobileNav, MobileBottomNavigation...
│   ├── modals/      # LoginModal, RegisterModal, QuickAddModal
│   ├── profile/     # ChangePasswordForm, EditAddressForm
│   └── styleguide/
├── constants/       # navigation.js, colors.js, shipping.js, timings.js, preview.js, layout.js
├── hooks/           # useScrollAnimation, useHeroAnimation, useScrollZoom, useVideoLoop...
├── pages/           # 16 stron: Home, Coffees, CoffeeDetail, About, Contact, CheckoutPage...
├── services/shopify/ # client.js, products.js, cart.js, customer.js, mapper.js, index.js
├── store/           # cartStore.js, authStore.js, checkoutStore.js
├── styles/
└── utils/           # logger.js (dev-only console wrapper), analytics.js (GA4 events)
```

### Uruchomienie lokalne

```bash
npm install
npm run dev          # dev server → http://localhost:5173
npm run build        # sitemap + product feed + vite build → dist/
npm run preview      # podgląd builda
npm run lint         # ESLint (max-warnings 0)
npm run lint:fix     # autofix ESLint
npm run format       # Prettier
npm run generate-sitemap   # scripts/generate-sitemap.mjs
npm run generate-feed      # scripts/generate-product-feed.mjs
```

### Zmienne środowiskowe (tylko nazwy)

```
VITE_SHOPIFY_DOMAIN           # np. xxx.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN # Storefront API access token
VITE_COMING_SOON              # true/false — tryb "Wkrótce"
```

Pliki: `.env.development` (COMING_SOON=false), `.env.production` (COMING_SOON=false aktualnie).
Lokalne nadpisanie: `.env.local` (gitignored).

### Path aliases (vite.config.js)

```
@            → src/
@components  → src/components/
@services    → src/services/
@store       → src/store/
@hooks       → src/hooks/
@constants   → src/constants/
@pages       → src/pages/
@assets      → src/assets/
```

### Kluczowe zasady designu (szczegóły w DESIGN_SYSTEM.md)

- **Przyciski:** zawsze `rounded-full` (pastylki), nigdy `rounded-lg`
- **Odznaki z licznikami:** `rounded-full` + `bg-success` (nie `bg-accent`)
- **Karty/modale:** ostre rogi, bez zaokrągleń
- **Kolor primary:** `#1E2A25` (ciemna zieleń), accent: `#6B7F73`

## Log zmian (najnowsze na górze)

- 2026-05 — Design audit + cleanup: CSS vars w :root, fix body color (#1f→#1E), tokeny social-facebook/instagram, bg-primary-dark w MobileNavigation, H1 QRGenerator wyrównany, duplikat fade-in usunięty

- 2026-05 — QR generator UX tweaks: kolejność trybów, większy tekst adresu, usunięcie logo z logowania
- 2026-05 — Redesign generatora QR: czarno-białe kolory, opcja adresu, inwersja logo na canvasie
- 2026-05 — Generator kodów QR z GA4 tracking (narzędzie wewnętrzne)
- 2026-05 — Strona Coming Soon / tryb maintenance (2-kolumnowy layout)
- 2026-04 — Fix zarządzania adresami: update zamiast create, lista adresów
- 2026-04 — Contact intent tracking: click_phone, click_email, click_social, click_maps (Footer, ContactDetails, CafeLocation)
- 2026-04 — Newsletter: subscribe/unsubscribe toggle w profilu, opt-in checkbox przy rejestracji
- 2026-04 — Pole NIP w rejestracji/profilu, fix przekierowania na checkout
