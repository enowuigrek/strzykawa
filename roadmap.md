# 🗺️ STRZYKAWA - ROADMAP ROZWOJU

> **Ostatnia aktualizacja:** 3 Listopada 2025  
> **Status:** Faza 1 integracji Shopify ZAKOŃCZONA ✅

---

## 📍 AKTUALNY FOCUS

### ✅ UKOŃCZONE DZISIAJ - Fundament integracji Shopify
- [x] **Setup metafields w Shopify Admin**
  - Utworzone definicje metafields dla produktów (po polsku w UI, angielskie klucze w API)
  - Lista pól: country, region, variety, processing, tasting_notes, roast_type, roast_level
  - Wszystkie z opcją "Dostęp do Storefront API" włączoną
  - Namespace: `custom` dla wszystkich
- [x] **Dodany testowy produkt** - Kenia New Gikaru z pełnymi danymi
  - Warianty: Typ (Ziarna/Mielona) × Gramatura (250g/1kg) = 4 warianty
  - Wszystkie metafields wypełnione
  - Ceny ustawione (do weryfikacji: 250g = 65 zł, 1kg = 150 zł)
- [x] **Integracja API** - shopify.js zaktualizowany o nowe metafields
- [x] **Mapowanie danych** - Shopify product → Coffee model działa
- [x] **Frontend integration** - Coffees.jsx pobiera z Shopify API zamiast lokalnego pliku
- [x] **Wyświetlanie działa** - karta kawy pokazuje dane z Shopify poprawnie

### 🔧 DO NAPRAWY (Następna sesja)
- [ ] **Liczniki w filtrach** - Espresso/Przelew pokazują 0 (problem z mapowaniem roast_type)
  - Przyczyna: W Shopify wpisana wartość "Przelew", w filtrze szukamy "Filter"
  - Rozwiązanie: Zmapować wartości lub zmienić w Shopify na angielskie
- [ ] **Kolor naklejki Filter/Espresso** - naklejka "Przelew" ma brązowy kolor zamiast niebieskiego
  - Problem w CoffeeCard.jsx - warunek sprawdza roastType === 'Filter', a z Shopify leci 'Przelew'
  - Rozwiązanie: Dodać mapowanie lub dostosować warunki w komponencie
- [ ] **Weryfikacja cen** - Sprawdzić dlaczego 1kg pokazuje 180 zł zamiast 150 zł
  - Zweryfikować ceny wariantów w Shopify Admin
- [ ] **Dodać więcej produktów** - 2-3 kawy testowe żeby sprawdzić czy filtry działają

### 📝 UWAGA TECHNICZNA
- W `Coffees.jsx` zostawiony stary kod zakomentowany (import z pliku) do porównania
- Po naprawieniu filtrów można go usunąć

---

## 🛒 E-COMMERCE ROADMAP

### ✅ Faza 1: Fundament Shopify (UKOŃCZONA!)

#### **1.1 Setup Shopify Store**
✅ **Metafields - Definicje dla produktów:**

Utworzone w: `Ustawienia → Dane niestandardowe → Produkty → Dodaj definicję`

| Nazwa (PL) | Namespace.Key | Typ | Opis |
|------------|---------------|-----|------|
| Kraj | `custom.country` | Tekst jednowierszowy | Kraj pochodzenia kawy |
| Region | `custom.region` | Tekst jednowierszowy | Region uprawy |
| Odmiana | `custom.variety` | Tekst jednowierszowy | Odmiana kawy (np. SL28, SL34) |
| Obróbka | `custom.processing` | Tekst jednowierszowy | Metoda obróbki (Washed, Natural, Honey) |
| Profil smakowy | `custom.tasting_notes` | Tekst jednowierszowy | Nuty smakowe (np. porzeczka, agrest, karmel) |
| Typ palenia | `custom.roast_type` | Tekst jednowierszowy | Filter lub Espresso |
| Stopień palenia | `custom.roast_level` | Tekst jednowierszowy | Jasny, Średni, Ciemny |

**WAŻNE:**
- Wszystkie pola mają **"Dostęp do Storefront API"** włączony
- Używamy **angielskich kluczy** (country, variety, etc.) dla lepszej pracy z kodem
- **Nazwy po polsku** w Shopify UI dla Damiana
- Można dodać opcjonalne: `altitude` (liczba), `farm` (tekst), `species` (tekst)

✅ **Warianty produktów:**
- **Opcja 1:** Typ → Ziarna, Mielona
- **Opcja 2:** Gramatura → 250g, 1kg
- Shopify automatycznie tworzy wszystkie kombinacje (4 warianty)
- Ceny ustawiane osobno dla każdej gramatury (mielenie nie wpływa na cenę)

✅ **Testowy produkt:**
- Nazwa: Kenia New Gikaru
- Handle: `kenia-new-gikaru`
- Wszystkie metafields wypełnione
- 4 warianty z cenami

#### **1.2 Storefront API Integration**
✅ **API Configuration:**
- Klucze w `.env.local`:
  ```
  VITE_SHOPIFY_DOMAIN=bew92i-nu.myshopify.com
  VITE_SHOPIFY_STOREFRONT_TOKEN=f0f9c06f71a7b96b347d3e84d5fe687a
  ```
- GraphQL queries działają
- Error handling i loading states zaimplementowane

✅ **Data Mapping:**
- `shopify.js` - service do komunikacji z API
- Funkcja `mapProduct()` mapuje Shopify product → Coffee model
- Parsing metafields jako arrays (variety, tasting_notes)
- Warianty (gramatura + mielenie) obsługiwane

#### **1.3 Frontend Integration**
✅ **Coffees.jsx:**
- Zmiana z `import coffees from '../data/coffees.js'` na `shopify.fetchProducts()`
- State: `products`, `loading`, `error`
- useEffect - fetch przy montowaniu
- Loading state - spinner podczas ładowania
- Error handling - komunikat błędu + przycisk "Spróbuj ponownie"
- Filtry działają tak samo jak wcześniej (po naprawieniu mapowania)

---

### 🔄 Faza 1.5: Poprawki i dopracowanie (TERAZ - 1-2 dni)

#### **Priorytet 1: Fix filtrów**
**Problem:** Liczniki pokazują 0 dla Espresso/Przelew

**Analiza:**
- W Shopify metafield `roast_type` ma wartość "Przelew" (po polsku)
- W kodzie filtry szukają "Filter" i "Espresso" (po angielsku)
- Rozwiązanie A: Zmienić w Shopify na angielskie wartości
- Rozwiązanie B: Dodać mapowanie w kodzie

**Rekomendacja:**
Zmienić w Shopify na angielskie wartości dla spójności:
- "Filter" zamiast "Przelew"
- "Espresso" zamiast "Espresso" (OK)

W kodzie mamy już mapowanie Filter → "Przelew" do wyświetlenia.

**Kroki:**
1. Shopify Admin → Produkty → Kenia
2. Metapola: Produkt → Typ palenia
3. Zmień z "Przelew" na "Filter"
4. Zapisz
5. Odśwież stronę - liczniki powinny działać

#### **Priorytet 2: Fix koloru naklejki**
**Problem:** Naklejka "Przelew" ma brązowy kolor zamiast niebieskiego

**Lokalizacja:** `src/components/coffee/CoffeeCard.jsx` (lub podobny komponent)

**Przyczyna:** Warunek:
```javascript
coffee.roastType === 'Filter' ? 'bg-blue-500' : 'bg-brown-500'
```
Gdy z Shopify leci 'Przelew', warunek nie matchuje → brązowy kolor (default).

**Rozwiązanie:**
Po zmianie wartości w Shopify na "Filter" (patrz Priorytet 1), powinno działać automatycznie.

**Alternatywnie (jeśli zostawiasz "Przelew"):**
```javascript
const isFilter = coffee.roastType === 'Filter' || coffee.roastType === 'Przelew';
const badgeColor = isFilter ? 'bg-blue-500' : 'bg-brown-500';
```

#### **Priorytet 3: Weryfikacja cen**
**Problem:** 1kg pokazuje 180 zł zamiast 150 zł

**Sprawdź:**
1. Shopify Admin → Produkty → Kenia → Warianty
2. Kliknij "2 wariantów" pod "Ziarna" i "Mielona"
3. Zobacz ceny dla 1kg - czy to 150 zł czy 180 zł?
4. Jeśli 180 zł - zmień na 150 zł i zapisz
5. Odśwież stronę

#### **Priorytet 4: Dodać więcej produktów**
**Cel:** Przetestować filtry z wieloma kawami

**Dodaj 2-3 kawy:**
- 1x Espresso (np. Brazylia Santos)
- 1x Filter (np. Etiopia Sidamo)
- Różne kraje i obróbki

**Szablon - szybkie dodanie:**
1. Duplikuj Kenię (przycisk "Duplikuj" w Shopify)
2. Zmień:
  - Nazwę
  - Metafields (kraj, region, odmiana, aromat)
  - Zdjęcie (opcjonalnie)
3. Zapisz

---

### 📋 Faza 2: Strony produktów & Koszyk (2-3 TYGODNIE)

#### **2.1 Indywidualne strony produktów** `/kawy/:handle`
- [ ] Route w React Router
- [ ] Fetch pojedynczego produktu przez `shopify.fetchProduct(handle)`
- [ ] Layout strony:
  - Galeria zdjęć (główne + thumbnails)
  - Nazwa, kraj, region
  - Pełny opis
  - Metafields w ładnym formacie
  - Selektor wariantów (gramatura + mielenie)
  - Cena (zmienia się z wariantem)
  - Przycisk "Dodaj do koszyka"
  - Sekcja "Podobne kawy"

#### **2.2 Koszyk**
- [ ] Zustand store dla koszyka (już istnieje w `cartStore.js`!)
- [ ] Drawer/strona koszyka
- [ ] Dodawanie/usuwanie/zmiana ilości
- [ ] Persistent state (localStorage)
- [ ] Integracja z Shopify Cart API
- [ ] Przycisk "Przejdź do kasy"

#### **2.3 Checkout**
- [ ] Redirect do Shopify Checkout
- [ ] Strona potwierdzenia zamówienia
- [ ] Email notifications

---

### 🛍️ Faza 3: Produkcja (1-2 TYGODNIE)

#### **3.1 Content**
- [ ] Zdjęcia produktów - profesjonalna fotografia paczek
- [ ] Opisy kaw - rozwinięte dla każdej kawy
- [ ] 10-15 prawdziwych produktów dodanych

#### **3.2 Transfer na produkcję**
- [ ] Założyć nowe konto Shopify na Strzykawie (lub transfer obecnego)
- [ ] Promocja 1€/miesiąc dla nowego konta
- [ ] Zmienić API keys w `.env.local`
- [ ] Transfer wszystkich produktów i ustawień
- [ ] Konfiguracja płatności (Shopify Payments lub Przelewy24)
- [ ] Konfiguracja wysyłki

#### **3.3 Deploy**
- [ ] Hosting (Netlify/Vercel)
- [ ] Domena niestandardowa
- [ ] SSL
- [ ] Environment variables w hosting
- [ ] Test end-to-end checkout

---

## 🐛 ZNANE PROBLEMY

### Krytyczne (blokują użycie)
- [ ] **Filtry pokazują 0** - fix w toku (zmienić wartości w Shopify)
- [ ] **Kolor naklejki** - zależne od fix filtrów

### Kosmetyczne (nie blokują)
- [ ] Sticky bar z-index - konflikt z headerem
- [ ] Header positioning - niespójny spacing na różnych stronach
- [ ] Timeline animation - brak manual control

### Do weryfikacji
- [ ] Ceny - sprawdzić czy 1kg = 150 zł

---

## 📸 POTRZEBY CONTENT

### Zdjęcia
- [ ] Zdjęcia paczek kaw (priorytet!)
- [ ] Zdjęcia wnętrza kawiarni
- [ ] Zdjęcia zespołu (strona O nas)
- [ ] Zdjęcia procesu parzenia

### Teksty
- [ ] Opisy produktów - rozwinięte dla każdej kawy
- [ ] Przepisanie strony O nas - bardziej autentycznie
- [ ] Meta descriptions (SEO)
- [ ] Content blog (opcjonalnie)

---

## 🚀 DEPLOYMENT

### Obecna konfiguracja
- **Środowisko:** Development (localhost)
- **Shopify:** Testowe konto (bew92i-nu.myshopify.com)
- **Build:** `npm run build` → dist/

### Przed produkcją
- [ ] Transfer na konto Strzykawa
- [ ] Aktualizacja API keys
- [ ] Dodanie prawdziwych produktów (10-15)
- [ ] Zdjęcia produktów
- [ ] Test checkout (prawdziwa płatność testowa)
- [ ] Domena i SSL
- [ ] Analytics (Google Analytics / Shopify Analytics)

---

## 📅 TIMELINE

### Ten tydzień (3-10 Listopada)
- Fix filtrów (roast_type mapping)
- Fix koloru naklejek
- Weryfikacja cen
- Dodanie 5 testowych produktów
- Start pracy nad stroną produktu (jeśli starczy czasu)

### Następne 2 tygodnie (10-24 Listopada)
- Dokończenie strony produktu
- Implementacja koszyka
- Integracja z Shopify Cart API

### Następny miesiąc (24 Listopada - 24 Grudnia)
- Checkout flow
- Content creation (zdjęcia, opisy)
- Przygotowanie do produkcji
- Testing & QA

### Styczeń 2025
- Launch produkcji
- Blog (opcjonalnie)
- Przewodniki parzenia (opcjonalnie)

---

## 🎯 METRYKI SUKCESU

### Techniczne
- [x] Integracja Shopify działa ✅
- [ ] Czas ładowania strony < 2s
- [ ] Lighthouse score > 90
- [ ] 100% responsive
- [ ] Conversion rate checkout > 2%

### Biznesowe
- [ ] 10+ produktów online
- [ ] Profesjonalna fotografia
- [ ] Jasna tożsamość marki
- [ ] Smooth checkout experience
- [ ] Email marketing setup

---

## 💡 PRZYSZŁE USPRAWNIENIA (Post-launch)

### Funkcje Fazy 2
- [ ] Konta użytkowników
- [ ] Historia zamówień
- [ ] Subskrypcje kawy (co-weekly/monthly)
- [ ] Karty podarunkowe
- [ ] Program lojalnościowy
- [ ] Recenzje i oceny

### Content
- [ ] Blog z poradami parzenia
- [ ] Przewodniki metod parzenia
- [ ] Tutoriale wideo
- [ ] Newsletter
- [ ] Integracja Instagram feed

### Techniczne
- [ ] PWA (Progressive Web App)
- [ ] Zaawansowane wyszukiwanie
- [ ] Wishlist
- [ ] Powiadomienia o dostępności
- [ ] Dashboard analytics

---

## 📝 DECYZJE ARCHITEKTONICZNE

### Wybory technologiczne
- **Shopify dla e-commerce** - łatwość użycia, obsługa płatności, zarządzanie zapasami
- **React SPA** - lepsze UX, łatwiejsze zarządzanie stanem
- **Tailwind CSS** - szybki development, spójny design system
- **Metafields po angielsku** - łatwiej dla developerów, polski w UI

### Decyzje biznesowe
- **Testowe konto najpierw** - walidacja przed produkcją
- **Ręczne dodawanie produktów** - OK dla małego katalogu (~20-30 kaw)
- **Shopify hosted checkout** - używamy gotowego checkoutu Shopify (bezpieczniej)

---

## 🔗 WAŻNE LINKI

- **Shopify Admin (TEST):** https://bew92i-nu.myshopify.com/admin
- **Shopify API Docs:** https://shopify.dev/docs/api/storefront
- **Tailwind Docs:** https://tailwindcss.com/docs
- **React Router:** https://reactrouter.com

---

## 📞 NOTATKI Z SESJI

### 3 Listopada 2025 - Integracja Shopify
**Ukończone:**
- Setup kompletny: metafields, testowy produkt, API integration
- Frontend zaciąga z Shopify i wyświetla poprawnie
- Routing i filtering działają (poza licznikami)

**Problemy do rozwiązania:**
- Liczniki filtrów (roast_type: "Przelew" vs "Filter")
- Kolor naklejki (ten sam problem)
- Weryfikacja ceny 1kg

**Stary kod:**
- W `Coffees.jsx` zostawiony zakomentowany import z pliku lokalnego
- Można usunąć po naprawieniu filtrów

**Następna sesja:**
1. Fix wartości roast_type w Shopify ("Filter" zamiast "Przelew")
2. Verify prices
3. Add more test products
4. Start product page if time

---

**Status:** 🟢 Zielone światło! Fundament działa, drobne poprawki do następnej sesji.