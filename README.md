# ☕ Strzykawa - Coffee Shop & Roastery

> Nowoczesna strona e-commerce dla kawiarni i palarni kawy specialty w Częstochowie

**Live:** https://strzykawa.netlify.app
**Status:** 🚧 W aktywnym rozwoju (Coming Soon mode: ON)

---

## 📋 O Projekcie

Strzykawa to pełnoprawny sklep internetowy z integracją Shopify, prezentujący kawy specialty z całego świata. Projekt łączy w sobie:

- 🛒 **E-commerce** - pełna integracja z Shopify Storefront API
- 🎨 **Design System** - spójny, minimalistyczny design (sharp corners + pastylki)
- 📱 **Mobile-first** - responsywny design z dedykowaną mobilną nawigacją
- ⚡ **Performance** - Vite + React z optymalizacją obrazów
- 🎬 **Rich Media** - video hero, galerie produktów, interactive timeline

---

## 🚀 Quick Start

### Wymagania
- Node.js 18+
- npm/yarn
- Konto Shopify (Storefront API)

### Instalacja
```bash
# Clone repo
git clone <repo-url>
cd strzykawa-site

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Wypełnij VITE_SHOPIFY_DOMAIN i VITE_SHOPIFY_STOREFRONT_TOKEN

# Run dev server
npm run dev
```

Strona będzie dostępna pod: `http://localhost:5173`

---

## 🛠 Tech Stack

### Core
- **Framework:** React 18 + Vite
- **Routing:** React Router v6
- **Styling:** Tailwind CSS 3
- **State:** Zustand (cart, auth)
- **Icons:** React Icons

### E-commerce
- **Platform:** Shopify Storefront API (GraphQL)
- **Cart:** Shopify Cart API
- **Checkout:** Redirect do Shopify Checkout

### Deployment
- **Hosting:** Netlify (auto-deploy z GitHub)
- **Env Variables:** Netlify dashboard

---

## 📁 Struktura Projektu
```
src/
├── assets/              # Obrazy, video, logo
├── components/
│   ├── atoms/          # Podstawowe komponenty (Button, Logo, Chip)
│   ├── molecules/      # Złożone komponenty (FilterSection, ProductGallery)
│   ├── organisms/      # Kompleksowe sekcje (CoffeeGrid, FilterDrawer)
│   ├── layout/         # Layout components (Header, Footer)
│   ├── features/       # Feature-specific (hero, about, contact)
│   ├── coffee/         # Coffee card components
│   ├── cart/           # Cart modal & components
│   └── header/         # Header navigation components
├── pages/              # Route pages (Home, Coffees, CoffeeDetail)
├── services/
│   └── shopify/        # Shopify API client & helpers
├── store/              # Zustand stores (cart, auth)
├── hooks/              # Custom React hooks
├── constants/          # App constants (navigation, layout)
└── App.jsx             # Main app component
```

---

## 🎨 Design System

Pełna dokumentacja: [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)

### Kluczowe zasady:
- ❌ **NO rounded corners** (poza buttonami i badges)
- ✅ **Rounded-full** dla buttonów i badges
- ✅ **Count badges ZAWSZE zielone** (`bg-success`)
- ✅ **Sharp corners** dla kart i modalów
- ✅ **Font:** Dosis (400, 500, 600, 700)

### Paleta kolorów:
- **Primary:** `#1E2A25` (tło)
- **Accent:** `#6B7F73` (linki, secondary)
- **Success:** `#0E8C6F` (cart badges, success states)
- **CTA:** `#3A5F55` (przyciski płatności)

---

## 🛒 Funkcje E-commerce

### ✅ Zaimplementowane:
- Pobieranie produktów z Shopify (GraphQL)
- Dynamiczne ceny i warianty (250g, 1kg, ziarna/mielona)
- Filtrowanie (roast type, kraj, obróbka, search)
- Strony produktów (`/kawy/:handle`)
- Koszyk (Shopify Cart API)
- Dodawanie/usuwanie/aktualizacja ilości w koszyku
- Blokada niedostępnych wariantów (`availableForSale: false`)

### 🔄 W trakcie:
- Checkout flow (redirect do Shopify) - PRIORITY
- Success/Canceled pages
- Integracja z płatnościami (Przelewy24)

### 📋 Planowane:
- Auth system (logowanie/rejestracja)
- Historia zamówień
- Wishlist
- Blog & brewing guides

---

## 🗺️ Roadmap

Szczegółowy roadmap: [`roadmap.md`](./roadmap.md)

### Obecny sprint (Listopad 2025):
- ✅ Integracja Shopify - DONE
- ✅ Cart redesign - DONE
- ✅ Availability system - DONE
- 🔥 **Checkout flow** - IN PROGRESS
- 🔥 **Shopify admin config** - IN PROGRESS

### Następne kroki:
1. Test purchase flow (end-to-end)
2. Shipping zones + payment setup
3. 10-15 produktów + fotografia
4. Pre-production testing
5. Transfer na konto produkcyjne Shopify
6. **LAUNCH! 🚀**

---

## 🔧 Development

### Skrypty:
```bash
npm run dev        # Dev server (localhost:5173)
npm run build      # Production build
npm run preview    # Preview production build
```

### Environment Variables:
```env
VITE_SHOPIFY_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your-storefront-token
```

### Coming Soon Mode:
```javascript
// src/App.jsx
const COMING_SOON_MODE = true; // Zmień na false gdy gotowy do launch
```

---

## 📖 Dokumentacja

- [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) - Design guidelines ⭐

---

## 🤝 Contributing

Projekt prywatny - development by [@enowuigrek](https://github.com/enowuigrek)

---

## 📞 Kontakt

**Strzykawa Coffee Shop & Roastery**
📍 ul. Dąbrowskiego 4, 42-200 Częstochowa
📧 kontakt@strzykawa.com
☎️ +48 668 011 806

**Social Media:**
- [Facebook](https://www.facebook.com/StrzykawaCoffeeShop)
- [Instagram](https://www.instagram.com/strzykawa_coffee_shop)

---

## 📄 License

© 2025 Strzykawa. All rights reserved.

**Projekt i wykonanie:** [lukasznowak.dev](https://lukasznowak.dev)