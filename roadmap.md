# 🗺️ STRZYKAWA - ROADMAP ROZWOJU

> **Ostatnia aktualizacja:** 10 Listopada 2025  
> **Status:** Faza 2 - Cart & Checkout PRIORITY 🔥

---

## 📍 AKTUALNY FOCUS - CART & CHECKOUT

### 🔥 PRIORYTET 1: Koszyk + Testowy zakup
**CEL:** Możliwość kupienia testowej kawy end-to-end

#### **Do zrobienia:**
1. **CartModal redesign** (2h)
  - [ ] Sharp corners (usuń rounded)
  - [ ] Z-index z-[100] (nad filtrami)
  - [ ] QuantitySelector zamiast +/- buttons
  - [ ] Auto-remove przy quantity=0
  - [ ] Fix overflow na "Przejdź do płatności"

2. **Shopify Cart API verification** (1h)
  - [ ] Test cartLinesAdd - czy działa poprawnie
  - [ ] Test cartLinesUpdate - quantity changes
  - [ ] Test cartLinesRemove - usuwanie z koszyka
  - [ ] Verify cart totals calculation

3. **Checkout flow** (30min)
  - [ ] Test redirect do Shopify Checkout
  - [ ] Verify cart.checkoutUrl
  - [ ] Test complete purchase flow

4. **Shopify Admin Config** (1h)
  - [ ] Setup test product z DOSTĘPNYM wariantem
  - [ ] Configure shipping zones (Polska)
  - [ ] Setup payment provider (Shopify Payments lub test mode)
  - [ ] Tax settings (VAT 23%)
  - [ ] Test checkout policies

**Oszacowany czas:** 4-5h total

---

## ✅ UKOŃCZONE 10 Listopada - UI Fixes & Availability

### **Cart Button Improvements** ✅
- [x] Hover na całym buttonie (nie tylko ikonie)
- [x] Green success state po dodaniu (2s)
- [x] Badge z liczbą sztuk przy każdym produkcie
- [x] Badge wystawający (overflow-visible)
- [x] Konsystentna pozycja badge (jak w headerze)

### **Availability System** ✅
- [x] Blokada niedostępnych wariantów (availableForSale: false)
- [x] Czerwone tło + opacity + line-through dla niedostępnych
- [x] Auto-select pierwszego dostępnego wariantu
- [x] Disabled button gdy wariant niedostępny
- [x] Fix w QuickAddModal (modal)
- [x] Fix w VariantSelector (strona produktu)
- [x] Fix w CoffeeDetail (button disabled + price display)

### **UI Polish** ✅
- [x] Pastylki (rounded-full) w QuickAddModal
- [x] QuantitySelector size="md" (mniejszy, bardziej proporcjonalny)
- [x] Z-index fixes (QuickAddModal z-[100])
- [x] Sharp corners gdzie potrzebne

**Pliki zmienione (7):**
- `CoffeeCardActions.jsx` - badge + green state + hover fix
- `CoffeeCard.jsx` - overflow-visible dla badge
- `QuickAddModal.jsx` - availability check + pastylki + size md
- `VariantSelector.jsx` - availability check + czerwone disabled
- `CoffeeDetail.jsx` - availability check + size md
- `CoffeeCardMedia.jsx` - z-index fix (z-50 dla oczka)

---

## ✅ UKOŃCZONE 4 Listopada - Split Button + Routing

- [x] **CoffeeCard redesign** - Split button (Zobacz szczegóły + Koszyk)
- [x] **Clickable nazwa i zdjęcie** - prowadzą do strony produktu
- [x] **Route `/kawy/:handle`** - dodany w App.jsx
- [x] **CoffeeDetail.jsx** - pełna strona produktu z galeriami
- [x] **ProductGallery, ProductMeta, ProductBreadcrumb** - komponenty utworzone

---

## ✅ UKOŃCZONE 3 Listopada - Fundament Shopify

- [x] **Setup metafields** - country, region, variety, processing, tasting_notes, roast_type, roast_level
- [x] **Dodane produkty** - Kenia + Kolumbia z pełnymi danymi
- [x] **Integracja API** - shopify.js z GraphQL
- [x] **Mapowanie roast_type** - "Przelew" → "Filter"
- [x] **Sortowanie wariantów** po cenie (250g pierwszy)
- [x] **Dynamiczne ceny** z variants
- [x] **Filtry działają** - Espresso/Przelew/Wszystkie + liczniki

---

## 🛒 E-COMMERCE ROADMAP

### ✅ Faza 1: Fundament Shopify (UKOŃCZONA!)

#### **1.1 Setup Shopify Store** ✅
- Metafields configured
- Warianty: Typ (Ziarna/Mielona) × Gramatura (250g/1kg)
- Testowe produkty z pełnymi danymi

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

#### **1.5 Product Detail Page** ✅
- Full CoffeeDetail.jsx implementation
- Gallery, Meta, Breadcrumb components
- Variant selector working
- Add to cart functional

#### **1.6 Availability System** ✅
- Blocking unavailable variants
- Visual indicators (red + line-through)
- Disabled states throughout

---

### 🔥 Faza 2: Koszyk & Checkout (W TOKU - PRIORITY!)

#### **2.1 CartModal Redesign** (NASTĘPNE)
- [ ] Sharp corners (no rounded)
- [ ] Z-index z-[100]
- [ ] QuantitySelector component (pastylki)
- [ ] Auto-remove przy quantity=0
- [ ] Fix overflow issues
- [ ] Polish UI consistency

#### **2.2 Shopify Cart API**
- [ ] Verify cartLinesAdd
- [ ] Verify cartLinesUpdate
- [ ] Verify cartLinesRemove
- [ ] Test total calculations
- [ ] Error handling

#### **2.3 Checkout Flow**
- [ ] "Przejdź do płatności" button working
- [ ] Redirect do Shopify Checkout
- [ ] Test complete purchase
- [ ] Thank you page (optional)

#### **2.4 Shopify Admin Configuration**
- [ ] Test product setup (available variant!)
- [ ] Shipping zones (Polska)
- [ ] Payment provider setup
- [ ] Tax settings (VAT 23%)
- [ ] Policies (shipping, returns, privacy)

---

### 🛍️ Faza 3: Produkcja (1-2 TYGODNIE)

#### **3.1 Content**
- [ ] 10-15 produktów
- [ ] Profesjonalna fotografia
- [ ] Rozwinięte opisy

#### **3.2 Transfer na produkcję**
- [ ] Nowe konto Shopify
- [ ] Nowe API keys
- [ ] Płatności (Przelewy24)
- [ ] Konfiguracja wysyłki

#### **3.3 Deploy**
- [ ] Update env variables
- [ ] End-to-end testing
- [ ] Domena custom
- [ ] Analytics

---

## 🐛 ZNANE PROBLEMY

### ✅ NAPRAWIONE
- [x] Filtry pokazują 0 - FIXED
- [x] Kolor naklejki - FIXED
- [x] Złe ceny - FIXED
- [x] Grid za bardzo po lewej - FIXED
- [x] Produkcja pokazuje mock data - FIXED
- [x] Hover tylko na ikonie - FIXED
- [x] Badge przycięty - FIXED
- [x] Niedostępne warianty za 0 zł - FIXED
- [x] Przyciski różnej wysokości - FIXED

### 🔄 DO NAPRAWY (Cart)
- [ ] CartModal rounded corners → sharp
- [ ] CartModal z-index (chowa się za filtrami)
- [ ] Liczniki +/- → QuantitySelector (pastylki)
- [ ] Auto-remove przy 0 sztuk
- [ ] Overflow na "Przejdź do płatności"

---

## 🚀 SHOPIFY ADMIN - CHECKLIST

### Przed testem zakupu:
1. **Product Setup**
  - [ ] Dodaj testową kawę (np. "Testowa Kenia 250g")
  - [ ] Ustaw wariant jako AVAILABLE (availableForSale: true)
  - [ ] Ustaw cenę (np. 65 zł)
  - [ ] Dodaj zdjęcie

2. **Shipping**
  - [ ] Settings → Shipping and delivery
  - [ ] Create shipping zone: Polska
  - [ ] Add shipping rate (np. "Kurier - 15 zł")

3. **Payments**
  - [ ] Settings → Payments
  - [ ] Enable Shopify Payments (test mode)
  - [ ] Lub skonfiguruj Bogus Gateway dla testów

4. **Tax**
  - [ ] Settings → Taxes and duties
  - [ ] Poland: 23% VAT
  - [ ] Include tax in prices

5. **Checkout**
  - [ ] Settings → Checkout
  - [ ] Customer accounts: Optional
  - [ ] Email marketing: Disable for test

6. **Test**
  - [ ] Add product to cart
  - [ ] Go to checkout
  - [ ] Complete test purchase
  - [ ] Verify order in Shopify Admin

---

## 📅 TIMELINE

### Ten tydzień (10-17 Listopada)
- **CartModal redesign** - sharp corners, QuantitySelector, z-index
- **Shopify config** - shipping, payments, tax
- **Test purchase** - end-to-end checkout flow

### Następne 2 tygodnie (17 Listopada - 1 Grudnia)
- **Content** - 10-15 produktów
- **Fotografia** - profesjonalne zdjęcia
- **Polish** - dopracowanie UX/UI

### Początek grudnia
- **Pre-production testing**
- **Transfer na konto produkcyjne**
- **Launch!** 🚀

---

## 🎯 METRYKI SUKCESU

### Techniczne
- [x] Integracja Shopify działa ✅
- [x] Filtry działają ✅
- [x] Dynamiczne ceny z API ✅
- [x] Routing do stron produktów ✅
- [x] Availability system ✅
- [ ] Funkcjonalny koszyk
- [ ] Checkout flow działa
- [ ] Test purchase successful
- [ ] Lighthouse score > 90
- [ ] Czas ładowania < 2s

### Biznesowe
- [ ] 10+ produktów online
- [ ] Profesjonalna fotografia
- [ ] Smooth checkout experience
- [ ] Email marketing setup
- [ ] Analytics tracking

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
- **Reusable** - CoffeeCard, Button, QuantitySelector
- **Atomic design** - atoms → molecules → organisms
- **Named exports** - łatwiejsze refactoring

---

## 🔗 WAŻNE LINKI

- **Live site:** https://strzykawa.netlify.app
- **Shopify Admin (TEST):** https://bew92i-nu.myshopify.com/admin
- **Shopify API Docs:** https://shopify.dev/docs/api/storefront
- **Shopify Cart API:** https://shopify.dev/docs/api/storefront/latest/mutations/cartCreate

---

## 📞 NOTATKI Z SESJI

### 10 Listopada 2025 - Availability System & UI Polish
**Ukończone:**
- Availability system (blokada niedostępnych wariantów)
- Cart button improvements (badge, hover, green state)
- UI polish (pastylki, size md, z-index fixes)
- Bug fix: niedostępne warianty za 0 zł

**Pliki zmienione (7):**
- `CoffeeCardActions.jsx` - badge + green + hover
- `CoffeeCard.jsx` - overflow-visible
- `QuickAddModal.jsx` - availability + pastylki
- `VariantSelector.jsx` - availability + czerwone
- `CoffeeDetail.jsx` - availability check
- `CoffeeCardMedia.jsx` - z-index fix

**Następna sesja:**
1. **CartModal redesign** - sharp corners, QuantitySelector, z-index
2. **Shopify config** - shipping, payments, checkout
3. **Test purchase** - end-to-end flow

### 4 Listopada 2025 - Split Button & Routing
**Ukończone:**
- Split button redesign
- Product detail page (CoffeeDetail.jsx)
- Routing + clickable elements

### 3 Listopada 2025 - Shopify Integration
**Ukończone:**
- Setup metafields + testowe produkty
- API integration (shopify.js)
- Mapowanie + sortowanie + filtry

---

**Status:** 🔥 Availability DONE! Next: Cart redesign + Test purchase! 🚀