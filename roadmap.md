# 🗺️ STRZYKAWA - ROADMAP ROZWOJU

> **Ostatnia aktualizacja:** 4 Listopada 2025  
> **Status:** Faza 1.5 - Shopify integration ZAKOŃCZONA ✅ | Split button & routing DONE ✅

---

## 📍 AKTUALNY FOCUS

### ✅ UKOŃCZONE 4 Listopada - Split Button + Routing
- [x] **CoffeeCard redesign** - Split button (Zobacz szczegóły + Koszyk)
    - Lewa część (70%): Link do strony produktu z ikoną
    - Prawa część (30%): Dodaj do koszyka (accent color)
    - Badge z ilością w koszyku
- [x] **Clickable nazwa i zdjęcie** - prowadzą do strony produktu
- [x] **Route `/kawy/:handle`** - dodany w App.jsx
- [x] **Placeholder CoffeeDetail.jsx** - tymczasowa strona produktu
- [x] **Fix eksportu** - CoffeeCardContent.jsx poprawiony

### ✅ UKOŃCZONE 3 Listopada - Fundament Shopify
- [x] **Setup metafields** w Shopify Admin (country, region, variety, processing, tasting_notes, roast_type, roast_level)
- [x] **Dodane produkty** - Kenia New Gikaru + Kolumbia Santa Maria z pełnymi danymi
- [x] **Integracja API** - shopify.js zaktualizowany
- [x] **Mapowanie roast_type** - "Przelew" → "Filter" w kodzie
- [x] **Sortowanie wariantów** po cenie (250g jako pierwszy)
- [x] **Dynamiczne ceny** - z coffee.variants zamiast hardcoded
- [x] **Container wrapper** - grid wycentrowany na /kawy
- [x] **Netlify env variables** - produkcja używa prawdziwego Shopify
- [x] **Wszystkie filtry działają** - Espresso/Przelew/Wszystkie + liczniki

---

## 🎯 NASTĘPNE ZADANIE

### 📋 Faza 2.1: Pełna strona produktu `/kawy/:handle`

**PRIORYTET 1:** Zbudować kompletną stronę CoffeeDetail.jsx

**Layout (sections):**
1. **Hero** - Breadcrumb + nazwa kawy
2. **Media** - Galeria zdjęć (główne + thumbnails)
3. **Info** - Kraj, region, wysokość, odmiana, obróbka
4. **Price & Variants** - Selektor gramatury + mielenia + cena
5. **Add to Cart** - Funkcjonalny przycisk (z cartStore)
6. **Tasting Notes** - Profil smakowy
7. **Description** - Pełny opis kawy
8. **Similar Products** - 3-4 podobne kawy (opcjonalnie)

**Tech:**
- Fetch: `shopify.fetchProduct(handle)` w useEffect
- Loading state + Error handling
- Responsive layout (mobile-first)
- Komponenty: podzielić na małe, reusable części

**Oszacowany czas:** 2-3h (jedna sesja)

---

## 🛒 E-COMMERCE ROADMAP

### ✅ Faza 1: Fundament Shopify (UKOŃCZONA!)

#### **1.1 Setup Shopify Store** ✅
- Metafields: country, region, variety, processing, tasting_notes, roast_type, roast_level
- Warianty: Typ (Ziarna/Mielona) × Gramatura (250g/1kg) = 4 warianty
- 2 testowe produkty z pełnymi danymi

#### **1.2 Storefront API Integration** ✅
- API configuration (keys w .env.local + Netlify)
- GraphQL queries działają
- Error handling + loading states

#### **1.3 Frontend Integration** ✅
- Coffees.jsx: fetch z Shopify API
- Filtry działają (roast_type, country, processing)
- Dynamiczne ceny z variants
- Container wrapper dla gridu

#### **1.4 Card Redesign** ✅
- Split button (Details 70% + Cart 30%)
- Clickable tytuł + zdjęcie
- Badge z ilością w koszyku
- Routing do strony produktu

---

### 🔄 Faza 2: Strony produktów & Koszyk (W TOKU - 1-2 TYGODNIE)

#### **2.1 Strona produktu** `/kawy/:handle` (NASTĘPNE)
- [ ] Hero section z breadcrumb
- [ ] Galeria zdjęć (main + thumbnails)
- [ ] Info grid (origin, variety, processing, altitude)
- [ ] Variant selector (gramatura + mielenie)
- [ ] Dynamic price display
- [ ] Funkcjonalny "Dodaj do koszyka"
- [ ] Tasting notes + description
- [ ] Similar products (opcjonalnie)
- [ ] Mobile responsive

#### **2.2 Koszyk**
- [ ] CartDrawer UI (już istnieje w components/cart/!)
- [ ] Integracja z cartStore.js (Zustand)
- [ ] Shopify Cart API sync
- [ ] Quantity +/- controls
- [ ] Remove item
- [ ] Total price calculation
- [ ] Persistent state (localStorage)

#### **2.3 Checkout**
- [ ] "Przejdź do płatności" button
- [ ] Redirect do Shopify Checkout (cart.checkoutUrl)
- [ ] Thank you page (opcjonalnie)

---

### 🛍️ Faza 3: Produkcja (1-2 TYGODNIE)

#### **3.1 Content**
- [ ] Zdjęcia produktów (10-15 kaw)
- [ ] Opisy rozwinięte
- [ ] Profesjonalna fotografia

#### **3.2 Transfer na produkcję**
- [ ] Nowe konto Shopify (lub transfer obecnego)
- [ ] Nowe API keys
- [ ] Konfiguracja płatności (Przelewy24)
- [ ] Konfiguracja wysyłki

#### **3.3 Deploy**
- [ ] Update env variables w Netlify
- [ ] End-to-end testing
- [ ] Domena niestandardowa
- [ ] Analytics

---

## 🐛 ZNANE PROBLEMY

### ✅ NAPRAWIONE
- [x] Filtry pokazują 0 - FIXED (mapowanie roast_type)
- [x] Kolor naklejki - FIXED (po mapowaniu)
- [x] Złe ceny - FIXED (sortowanie variants + dynamiczne weightOptions)
- [x] Grid za bardzo po lewej - FIXED (container wrapper)
- [x] Produkcja pokazuje mock data - FIXED (env variables w Netlify)

### Kosmetyczne (low priority)
- [ ] Sticky bar z-index - możliwy konflikt z headerem
- [ ] Timeline animation - brak manual control

---

## 📸 POTRZEBY CONTENT

### Zdjęcia (PRIORYTET)
- [ ] 10-15 paczek kaw (profesjonalna fotografia)
- [ ] Multiple angles dla galerii produktu
- [ ] Zdjęcia wnętrza kawiarni
- [ ] Zdjęcia zespołu (O nas)

### Teksty
- [ ] Rozwinięte opisy produktów (200-300 słów każda kawa)
- [ ] Przepisanie strony O nas
- [ ] Meta descriptions (SEO)

---

## 🚀 DEPLOYMENT

### Obecna konfiguracja ✅
- **Frontend:** Netlify (live)
- **Shopify:** Testowe konto (bew92i-nu.myshopify.com)
- **Env variables:** Skonfigurowane w Netlify
- **Build:** `npm run build` → deploy automatyczny z GitHub

### Przed produkcją
- [ ] Transfer produktów (10-15 kaw)
- [ ] Profesjonalne zdjęcia
- [ ] Test checkout end-to-end
- [ ] Domena + SSL

---

## 📅 TIMELINE

### Ten tydzień (4-10 Listopada)
- **Strona produktu** - pełna implementacja CoffeeDetail.jsx
- **Koszyk** - dopięcie CartDrawer + Shopify Cart API
- **Testing** - end-to-end flow (browse → details → cart → checkout)

### Następne 2 tygodnie (10-24 Listopada)
- **Content** - dodanie 10-15 produktów
- **Fotografia** - profesjonalne zdjęcia paczek
- **Polish** - dopracowanie UX/UI

### Koniec listopada
- **Pre-production testing**
- **Transfer na konto Strzykawa**
- **Launch produkcji**

---

## 🎯 METRYKI SUKCESU

### Techniczne
- [x] Integracja Shopify działa ✅
- [x] Filtry działają ✅
- [x] Dynamiczne ceny z API ✅
- [x] Routing do stron produktów ✅
- [ ] Funkcjonalny koszyk
- [ ] Checkout flow
- [ ] Lighthouse score > 90
- [ ] Czas ładowania < 2s

### Biznesowe
- [ ] 10+ produktów online
- [ ] Profesjonalna fotografia
- [ ] Smooth checkout experience
- [ ] Email marketing setup

---

## 📝 DECYZJE ARCHITEKTONICZNE

### Wybory technologiczne
- **Shopify Storefront API** - GraphQL, flexible, real-time inventory
- **React SPA** - lepsze UX, client-side routing
- **Tailwind CSS** - rapid development, consistent design
- **Zustand** - lightweight state management (koszyk)
- **Netlify** - auto-deploy z GitHub, env variables

### Component structure
- **Małe komponenty** - max ~100 linii, single responsibility
- **Reusable** - CoffeeCard, Button, etc.
- **Atomic design** - atoms → molecules → organisms
- **Named exports** - łatwiejsze refactoring

---

## 🔗 WAŻNE LINKI

- **Live site:** https://strzykawa.netlify.app (lub inna domena)
- **Shopify Admin (TEST):** https://bew92i-nu.myshopify.com/admin
- **GitHub repo:** [link]
- **Shopify API Docs:** https://shopify.dev/docs/api/storefront

---

## 📞 NOTATKI Z SESJI

### 4 Listopada 2025 - Split Button & Routing
**Ukończone:**
- Redesign CoffeeCard - split button (details + cart)
- Clickable nazwa + zdjęcie → strona produktu
- Route `/kawy/:handle` dodany
- Placeholder CoffeeDetail.jsx (breadcrumb + handle display)
- Fix eksportu CoffeeCardContent.jsx

**Pliki zmienione (6):**
- `App.jsx` - dodany route
- `CoffeeDetail.jsx` - NOWY placeholder
- `CoffeeCard.jsx` - przekazuje coffee prop
- `CoffeeCardActions.jsx` - split button
- `CoffeeCardMedia.jsx` - Link na zdjęciu
- `CoffeeCardContent.jsx` - Link na nazwie

**Następna sesja:**
1. Pełna strona produktu (CoffeeDetail.jsx)
2. Koszyk (CartDrawer + Shopify Cart API)
3. Testing checkout flow

### 3 Listopada 2025 - Shopify Integration
**Ukończone:**
- Setup metafields + testowe produkty
- API integration (shopify.js)
- Mapowanie roast_type + sortowanie variants
- Dynamiczne ceny + container wrapper
- Env variables w Netlify
- Wszystkie filtry działają

**Pliki zmienione (4):**
- `shopify.js` - mapowanie + sortowanie
- `Coffees.jsx` - container wrapper
- `CoffeeCardContent.jsx` - dynamiczne ceny
- `ParametrSelector.jsx` - weightOptions jako prop

---

**Status:** 🟢 Split button DONE! Następny krok: pełna strona produktu 🚀