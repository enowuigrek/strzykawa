# DEVELOPMENT

> **Projekt:** Strzykawa — kawiarnia i palarnia (landing + katalog kaw + e-commerce)
> **Cel:** Nowoczesna, kompleksowa strona prezentująca kawiarnię, katalog kaw z funkcjonalnością sklepu, blog i przewodniki parzenia. Zaprojektowana z myślą o skalowalności i łatwym zarządzaniu treścią.

---

## 1) Stos technologiczny
- **Build:** Vite + React
- **Routing:** `react-router-dom`
- **Ikony:** `react-icons`
- **Stylowanie:** Tailwind CSS (zaimplementowane)
- **Assety:** importowane przez Vite (np. `new URL('...', import.meta.url).href`)
- **E-commerce:** integracja z Shopify (planowana)

### Skrypty
```bash
npm install
npm run dev      # serwer deweloperski Vite
npm run build    # build produkcyjny do dist/
npm run preview  # podgląd buildu produkcyjnego
```

---

## 2) Struktura projektu (obecna)
```
src/
  assets/                # obrazy (hero, logo, placeholdery) - do aktualizacji oficjalnym brandingiem
  components/
    CoffeeCard.jsx       # karta z overlay + toggle na mobile ✓
    ContactSection.jsx   # ✓
    Footer.jsx           # wzbogacony o linki społecznościowe ✓
    Header.jsx           # fixed, przezroczysty nad hero, solidny po scrollu ✓
    HeroSection.jsx      # ✓
  data/
    coffees.js           # rozszerzone dane kaw z flagami dostępności ✓
  pages/
    About.jsx            # strona o firmie ✓ (wymaga przeprojektowania)
    AvailableInCafe.jsx  # "Dostępne w kawiarni" - 4 sekcje z licznikami ✓
    Coffees.jsx          # "Nasze kawy" - wszystkie kawy z filtrami ✓
    ContactSection.jsx   # samodzielna strona kontakt ✓
    Home.jsx             # landing: hero + contact ✓
  App.jsx                # layout + routing ✓
  index.css              # importy Tailwind + niestandardowe style ✓
  main.jsx               # bootstrap React ✓
```

---

## 3) Model danych kawy (zaimplementowany ✓)
**Klucze anglojęzyczne (przyjazne CMS); stringi UI po polsku.**
```ts
export type Coffee = {
  id: string;
  name: string;              // nazwa wyświetlana (PL)
  image: string;             // opakowanie / grafika
  origin: Array<{
    country: string;         // wartości PL (np. "Etiopia")
    region?: string;
    farm?: string;
    variety?: string[];      // np. ["Yellow Bourbon", "SL28"]
    altitudeMasl?: number | string;
    processing?: string;     // etykiety PL
    fermentation?: string;
  }>;
  species: string[];         // np. ["Arabica"]
  roastLevel?: string;       // PL: "Jasny", "Średni", "Ciemny"
  roastType?: string;        // mapowane na PL w UI: Filter → "Przelew", Espresso → "Espresso"
  roastDate?: string | null; // ISO lub null
  tastingNotes?: string[];   // nuty PL
  description?: string;      // krótki opis PL
  availability: {
    espressoGrinders: boolean; // na młynkach do espresso
    quickFilter: boolean;      // batch brew / szybki przelew
    brewBar: boolean;          // drip / Aeropress przy barze
    retailShelf: boolean;      // na półce do sprzedaży detalicznej
  };
}
```

---

## 4) Strony i komponenty (obecny status)

### ✅ UKOŃCZONE
- **Header** — fixed z efektami scroll, menu mobile, właściwa nawigacja ✓
- **HeroSection** — pełnoekranowy z przyciskiem CTA ✓
- **CoffeeCard** — hover overlays, toggle na mobile, szczegółowe dane kaw ✓
- **Coffees** — responsywna siatka z zaawansowanymi filtrami (kraj, obróbka, typ/stopień wypału) ✓
- **AvailableInCafe** — cztery sekcje z licznikami dostępności w czasie rzeczywistym ✓
- **ContactSection** — wzbogacony design z udogodnieniami, mapą, godzinami otwarcia ✓
- **Footer** — nowoczesny design z linkami społecznościowymi i szybkim dostępem do kontaktu ✓
- **About** — podstawowa strona historii firmy ✓

### 📋 DO ZROBIENIA / PLANOWANE ULEPSZENIA
- Aktualizacja strony O nas - mniej korporacyjnie, bardziej autentycznie
- Wymiana placeholderów na oficjalny branding Strzykawy
- Poprawa hover na kartach kaw w sekcji "Nasze kawy"
- Przekształcenie "Nasze kawy" w sklep e-commerce

---

## 5) Stylowanie (zaimplementowane ✓)
- **Tailwind CSS** w pełni zintegrowany z niestandardową paletą kolorów
- **Schemat kolorów:** Ciemny motyw z kolorami akcentowymi (odcienie zieleni/amber)
- **Typografia:** Rodzina czcionek Poppins
- **Niestandardowe narzędzia:** cienie tekstu, stylowanie scrollbar, fallbacki backdrop blur
- **Responsywny design:** Podejście mobile-first z odpowiednimi breakpointami
- **Animacje:** Subtelne efekty hover, przejścia i mikro-interakcje

---

## 6) Routing (obecny ✓)
- `/` — Home (sekcja hero)
- `/o-nas` — Strona About
- `/kawy` — Katalog kaw z filtrami
- `/dostepne-w-kawiarni` — Dostępne w kawiarni
- `/kontakt` — Strona kontakt

### 📋 PLANOWANE TRASY
- `/sklep` lub `/kawy` — Sklep e-commerce
- `/blog` — Sekcja blog
- `/kawy/:id` — Indywidualne strony produktów kaw
- `/przewodniki-parzenia` — Sekcja przewodników parzenia

---

## 7) Plan nowych funkcji

### 🛒 INTEGRACJA E-COMMERCE
**Priorytet: WYSOKI**
- [ ] Konfiguracja integracji Shopify
- [ ] Synchronizacja katalogu produktów
- [ ] Funkcjonalność koszyka
- [ ] Proces płatności
- [ ] Zarządzanie zamówieniami
- [ ] Śledzenie inwentarza

### 📄 STRONY PRODUKTÓW
**Priorytet: WYSOKI**
- [ ] Indywidualne strony produktów kaw (`/kawy/:id`)
- [ ] Szczegółowe opisy produktów
- [ ] Selektor opcji mielenia
- [ ] Opcje zakupu (250g, 500g, 1kg)
- [ ] Integracja "Kup teraz" z Shopify
- [ ] Sugestie powiązanych produktów
- [ ] Sekcja opinii klientów

### 📝 SYSTEM BLOG
**Priorytet: ŚREDNI**
- [ ] Strona listy postów blog
- [ ] Indywidualne strony postów blog
- [ ] Kategorie i tagi
- [ ] Integracja CMS dla treści blog
- [ ] Optymalizacja SEO dla postów blog

### ☕ PRZEWODNIKI PARZENIA
**Priorytet: ŚREDNI**
- [ ] Sekcja przewodnika metod parzenia
- [ ] Tutoriale parzenia krok po kroku
- [ ] Rekomendacje sprzętu
- [ ] Dopasowanie kawa-metoda
- [ ] Obsługa integracji wideo

### 🎨 ULEPSZENIA DESIGNU
**Priorytet: WYSOKI**
- [ ] Wymiana wszystkich placeholderów na oficjalny branding
- [ ] Integracja nowego logo w całej stronie
- [ ] Ulepszone efekty hover kart kaw
- [ ] Lepsza mobilna obsługa przeglądania produktów
- [ ] Wytyczne fotograficzne dla zdjęć produktów

### 📖 ULEPSZENIA TREŚCI
**Priorytet: ŚREDNI**
- [ ] Przeprojektowanie strony O nas - bardziej autentycznie, mniej korporacyjnie
- [ ] Dodanie profili członków zespołu
- [ ] Historie pochodzenia kaw
- [ ] Informacje o zrównoważonym rozwoju i sourcing

---

## 8) Ulepszenia techniczne

### 🔄 ZARZĄDZANIE STANEM
- [ ] Rozważenie Zustand lub Context dla stanu koszyka
- [ ] Funkcjonalność listy życzeń produktów
- [ ] Przechowywanie preferencji użytkownika

### 🚀 WYDAJNOŚĆ
- [ ] Optymalizacja obrazów i lazy loading
- [ ] Optymalizacja rozmiaru bundla
- [ ] Rozważenie możliwości PWA
- [ ] Optymalizacja wyniku Lighthouse

### 🔒 SEO & ANALYTICS
- [ ] Optymalizacja meta tagów
- [ ] Dane strukturalne dla produktów
- [ ] Generowanie sitemap
- [ ] Integracja analytics
- [ ] Funkcjonalność wyszukiwania

---

## 9) CMS i zarządzanie danymi

### 📊 OBECNA STRUKTURA DANYCH
- Statyczne dane kaw w `coffees.js` ✓
- Ustrukturyzowany schemat gotowy na CMS ✓

### 🎯 PLANOWANA INTEGRACJA
- **Shopify** dla e-commerce i inwentarza
- **Strapi/Contentful** dla blog i zarządzania treścią
- Endpointy API dla dostępności w czasie rzeczywistym
- Panel admin dla personelu kawiarni do aktualizacji dostępności

---

## 10) Wdrażanie i DevOps
**Obecne:** Gotowe na wdrożenie Netlify
**Planowane ulepszenia:**
- [ ] Konfiguracja zmiennych środowiskowych dla Shopify
- [ ] Optymalizacja pipeline CI/CD
- [ ] Konfiguracja środowiska staging
- [ ] Monitorowanie wydajności

---

## 11) Dostępność i UX
**Obecny status:** Podstawowa a11y zaimplementowana ✓
**Potrzebne ulepszenia:**
- [ ] Lepsza nawigacja klawiatury w filtrach
- [ ] Optymalizacja czytnika ekranu dla kart produktów
- [ ] Audyt kontrastu kolorów
- [ ] Ulepszenia UX mobile dla zakupów

---

## 12) Strategia treści

### 📸 POTRZEBY FOTOGRAFICZNE
- [ ] Profesjonalna fotografia produktów kaw
- [ ] Zdjęcia wnętrz kawiarni
- [ ] Dokumentacja procesu parzenia
- [ ] Portrety zespołu dla sekcji O nas

### ✍️ POTRZEBY COPYWRITINGU
- [ ] Opisy produktów dla każdej kawy
- [ ] Planowanie treści blog
- [ ] Meta opisy zoptymalizowane pod SEO
- [ ] Treść przewodników parzenia

---

## 13) Fazy rozwoju według priorytetów

### 🚀 FAZA 1 (Natychmiastowa - 2-3 tygodnie)
1. Wymiana placeholderów brandingu na oficjalne assety
2. Implementacja podstaw integracji Shopify
3. Tworzenie indywidualnych stron produktów
4. Przeprojektowanie strony O nas z autentycznym storytelling

### 🛍️ FAZA 2 (Krótkoterminowa - 1 miesiąc)
1. Ukończenie funkcjonalności e-commerce
2. Koszyk i proces płatności
3. Ulepszone interakcje kart kaw
4. Optymalizacja UX mobile

### 📝 FAZA 3 (Średnioterminowa - 2 miesiące)
1. Implementacja systemu blog
2. Sekcja przewodników parzenia
3. Optymalizacja SEO
4. Analytics i monitorowanie wydajności

### 🎨 FAZA 4 (Długoterminowa - 3+ miesiące)
1. Zaawansowane funkcje (lista życzeń, opinie)
2. Możliwości PWA
3. Zaawansowane analytics i personalizacja
4. Ciągła optymalizacja na podstawie opinii użytkowników

---

## 14) Notatki deweloperskie

### 🎨 SYSTEM DESIGNU
- Konsekwentne używanie narzędzi Tailwind
- Ciemny motyw z ciepłymi kolorami akcentowymi
- Subtelne animacje i mikro-interakcje
- Efekty glass-morphism dla nowoczesnego wyglądu

### 📱 PODEJŚCIE RESPONSYWNE
- Rozwój mobile-first
- Interakcje przyjazne dotykowi
- Optymalizacja dla różnych rozmiarów ekranów
- Strategia progressive enhancement

### ⚡ KWESTIE WYDAJNOŚCI
- Minimalny rozmiar bundla
- Optymalizowane obrazy
- Implementacja lazy loading
- Efektywne re-renders

---

**Maintainer:** @enowuigrek — repo `strzykawa-site`
**Ostatnia aktualizacja:** Sierpień 2025
**Następny przegląd:** Po ukończeniu Fazy 1