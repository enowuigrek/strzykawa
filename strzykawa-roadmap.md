# Strzykawa - Roadmapa Rozwoju 🚀☕

## 📅 AKTUALNY STAN (22 września 2025)

**STATUS:** Landing MVP Ukończony - Przygotowanie do E-commerce ✅  
**FOCUS:** Konfiguracja Shopify i Integracja E-commerce 🛒

---

## ✅ WYKONANE ZADANIA

### 🏗️ Infrastruktura i Build ✅ UKOŃCZONE
- [x] Vite + React setup - Nowoczesny stack technologiczny ✅
- [x] Tailwind CSS - Pełna implementacja z custom paletą kolorów ✅
- [x] React Router - Routing `/`, `/o-nas`, `/kawy`, `/dostepne-w-kawiarni`, `/kontakt` ✅
- [x] Wdrożenie Netlify - Auto-deploy z GitHub ✅
- [x] PWA ready - Manifest, ikony, service worker gotowy ✅

### 🎨 Design System i UI ✅ UKOŃCZONE
- [x] Ciemny motyw - Spójne kolory primary/accent/muted ✅
- [x] Responsywny design - Mobile-first approach ✅
- [x] Typografia - Dosis font family ✅
- [x] Animacje - Fade-in, pulse-slow, custom keyframes ✅
- [x] Glass-morphism effects - Backdrop blur, przezroczystości ✅

### 📱 Komponenty Core ✅ UKOŃCZONE
- [x] **Header** - Fixed z scroll effects, menu mobile ✅
- [x] **HeroSection** - Pełnoekranowy z CTA ✅
- [x] **Footer** - Wzbogacony o social media linki ✅
- [x] **CoffeeCard** - Hover overlays, toggle na mobile ✅
- [x] **ContactSection** - Mapa, godziny, dane kontaktowe ✅

### 🏪 Strony Landing ✅ UKOŃCZONE
- [x] **Home** - Hero + contact section ✅
- [x] **About** - Podstawowa strona o firmie ✅
- [x] **Coffees** - Katalog z filtrami (kraj, obróbka, typ wypału) ✅
- [x] **AvailableInCafe** - 4 sekcje z licznikami dostępności ✅
- [x] **Contact** - Dedykowana strona kontakt ✅

### 📊 Model Danych Kawy ✅ UKOŃCZONE
- [x] Struktura Coffee - Kompletny model z origin, species, roast, tasting notes ✅
- [x] Flagi dostępności - espressoGrinders, quickFilter, brewBar, retailShelf ✅
- [x] Dane testowe - Rozszerzone dane kaw w `coffees.js` ✅
- [x] Filtrowanie - Zaawansowane filtry po kraju, obróbce, typie ✅

---

## 🔥 ZADANIA W TRAKCIE

### Faza 4: Konfiguracja Shopify i Integracja E-commerce 🔄 PRIORYTET
- [ ] **Konfiguracja sklepu Shopify** 🔥 ROZPOCZĄĆ TERAZ
  - Założenie konta Shopify
  - Konfiguracja podstawowych ustawień sklepu
  - Dodanie pierwszych produktów (kawy)
  - Sprawdzenie jakie JSON/API zwraca Shopify
- [ ] **Analiza Shopify API** 🔥 KLUCZOWE
  - Testowanie Storefront API
  - Sprawdzenie struktury danych produktów
  - Mapowanie Shopify → model Coffee
  - Planowanie integracji koszyka
- [ ] **Przygotowanie integracji**
  - Konfiguracja Shopify SDK w projekcie
  - Utworzenie service layer dla Shopify API
  - Przygotowanie environment variables

---

## 🚨 PILNE ZADANIA (FEEDBACK DAMIANA - 22.09.2025)

### 1. Aktualizacja strony "O Strzykawie" 🔥 JUTRO
**Materiały od Damiana:**
- Nowe zdjęcia kawiarni i palarni (do uploadowania)
- Jedno zdjęcie z ulicy do przycięcia (szyld sąsiadów u góry)
- Timeline 2020-2025 do implementacji
- Nowy opis pod filmem hero

**Do zrobienia:**
- Przycięcie zdjęcia z ulicy (usunięcie szyldu sąsiadów)
- Dodanie timeline z historią Strzykawy (2020-2025)
- Wymiana opisu pod filmem hero
- Upload nowych zdjęć do galerii

### 2. Uproszczenie nawigacji i struktury 🔥 JUTRO
**Zmiany requested by Damian:**
- Usunięcie zakładek "Przyjdź do kawiarni" i "Dostępne w kawiarni"
- Zmiana "Dostępne w kawiarni" → "B2B"
- Uproszczenie filtrów sklepu do 3: Espresso, Przelew, Akcesoria
- Zmiana "Only Specialty Coffee" → "Częstochowska palarnia kawy"

### 3. Content updates 🔥 JUTRO
**Nowe teksty:**
- Hero: "Częstochowska palarnia kawy" zamiast "Only Specialty Coffee"
- Opis pod hero: Nowy tekst o sourcing i współpracy z farmami
- Timeline "O Strzykawie": Historia 2020-2025
- Sekcja B2B: Do opracowania z Damianem

### 4. Poprzednie pilne poprawki 🟡
**Galeria zdjęć - problemy wyświetlania**
- Złe wyświetlanie na mobile i desktop
- Sprawdzenie responsive images i aspect ratio

**Footer - poprawki wizualne**
- Dopracowanie layoutu i stylowania

**Karty kaw - ulepszenia UX**
- Przesunięcie overlay bardziej na dół
- Dodanie opcji "mielona/ziarna"

---

## 📋 NASTĘPNE FAZY

### Faza 5: E-commerce Core (NASTĘPNE 2-3 TYGODNIE)
- [ ] **Integracja Shopify Storefront API**
  - Połączenie z Shopify
  - Pobieranie listy produktów
  - Synchronizacja danych kaw
  - Obsługa inventory/dostępności
- [ ] **Funkcjonalność Koszyka**
  - Dodawanie produktów do koszyka
  - Stan koszyka (Zustand)
  - Przegląd koszyka
  - Modyfikacja ilości
- [ ] **Strony Produktów**
  - `/kawy/:id` - indywidualne strony kaw
  - Szczegółowy opis produktu
  - Selektor opcji (mielona/ziarna)
  - Opcje wielkości (250g, 500g, 1kg)
  - Galeria zdjęć produktu

### Faza 6: Checkout i Płatności (3-4 TYGODNIE)
- [ ] **Proces Checkout**
  - Formularz danych klienta
  - Wybór sposobu dostawy
  - Podsumowanie zamówienia
  - Integracja z Shopify Checkout
- [ ] **System Płatności**
  - Bramka płatności (przez Shopify)
  - Obsługa różnych metod płatności
  - Potwierdzenia płatności
  - Email notifications
- [ ] **Zarządzanie Zamówieniami**
  - Status zamówienia
  - Tracking przesyłki
  - Historia zakupów
  - Panel klienta (opcjonalnie)

### Faza 7: Content Management i Blog (1-2 MIESIĄCE)
- [ ] **Content Updates (Feedback Damiana)**
  - Timeline "O Strzykawie" z historią 2020-2025 ✅
  - Nowy opis pod hero o sourcing i współpracy z farmami ✅
  - Sekcja B2B zamiast "Dostępne w kawiarni" ✅
  - Uproszczenie nawigacji (usunięcie zbędnych zakładek) ✅
- [ ] **System Blog (Przyszłość - Strapi)**
  - Strona `/blog` z listą postów
  - Indywidualne strony postów
  - Kategorie i tagi
  - CMS do zarządzania treścią (Strapi)
- [ ] **Przewodniki Parzenia**
  - Sekcja `/przewodniki-parzenia`
  - Step-by-step tutoriale
  - Rekomendacje sprzętu
  - Dopasowanie kawa-metoda
- [ ] **Zarządzanie Treścią**
  - Profile zespołu (Damian + team)
  - Historie pochodzenia kaw
  - Content o zrównoważonym rozwoju
  - Regularne updates bloga

---

## 🎨 ULEPSZENIA DESIGNU I UX

### Design Priorities (Krótkoterminowe)
- [ ] **Galeria produktów** 🔥
  - Naprawienie problemów wyświetlania
  - Lepsze hover effects na kartach kaw
  - Optymalizacja obrazów
- [ ] **Karty kaw - UX improvements**
  - Przesunięcie overlay na dół
  - Dodanie opcji mielona/ziarna
  - Lepsze mobile experience
- [ ] **Footer redesign**
  - Poprawa wizualna
  - Lepszy layout
  - Spójność z resztą strony

### Branding (Średnioterminowe)
- [ ] **Wymiana placeholderów**
  - Oficjalny branding Strzykawy
  - Nowe logo w całej aplikacji
  - Profesjonalne zdjęcia produktów
  - Zdjęcia wnętrz kawiarni
- [ ] **Custom ikony**
  - Zaprojektowanie własnych ikon
  - Spójny zestaw ikon
  - Zamiana react-icons na własne
- [ ] **Fotografia produktowa**
  - Profesjonalne zdjęcia kaw
  - Consistent styling
  - Różne kąty/prezentacje
  - Zdjęcia procesu parzenia

---

## 🚀 FUNKCJE ZAAWANSOWANE (PRZYSZŁOŚĆ)

### Faza 8: Rozszerzenie Asortymentu (2-3 MIESIĄCE)
- [ ] **Kategoria Akcesoria**
  - Rozszerzenie katalogu o akcesoria do kawy
  - Młynki, dzbanki, filtry itp.
  - Integracja z tym samym systemem Shopify
  - Cross-selling z kawami
- [ ] **Zestawy i Bundle**
  - Pakiety kawa + akcesoria
  - Zestawy degustacyjne
  - Prezentowe packaging
  - Dynamic pricing dla zestawów

### Faza 9: Loyalty i Marketing (3-6 MIESIĘCY)
- [ ] **Program Lojalnościowy**
  - Punkty za zakupy
  - Exclusive access do nowych kaw
  - Seasonal discounts
  - Newsletter integration
- [ ] **Recenzje i Rating**
  - System opinii o kawach
  - Star ratings
  - Photo reviews
  - Moderacja treści
- [ ] **Social Commerce**
  - Instagram shopping integration
  - Social media feeds
  - User-generated content
  - Influencer partnerships

### Faza 10: Analytics i Optymalizacja (6+ MIESIĘCY)
- [ ] **E-commerce Analytics**
  - Conversion tracking
  - Sales analytics
  - Popular products analysis
  - Customer behavior insights
- [ ] **SEO i Marketing**
  - Product schema markup
  - Blog SEO optimization
  - Social media automation
  - Email marketing campaigns
- [ ] **Performance Optimization**
  - Core Web Vitals optimization
  - Image optimization
  - Caching strategies
  - CDN implementation

---

## 📊 STATUS OBECNEGO WDROŻENIA

| Komponent | Status | Platforma | URL | Notatki |
|-----------|---------|-----------|-----|---------|
| **Frontend** | ✅ LIVE | Netlify | https://golden-blini-2ab47b.netlify.app | Landing complete |
| **Shopify Store** | 🔄 TODO | Shopify | - | Do skonfigurowania |
| **Domain** | 📋 PLANOWANE | - | - | Custom domain |
| **Analytics** | 📋 PLANOWANE | Google Analytics | - | Tracking setup |

---

## 🏆 KAMIENIE MILOWE

### ✅ KAMIEŃ MILOWY 1: Landing MVP (UKOŃCZONY)
- Kompletna strona landing
- Responsywny design
- Katalog kaw z filtrami
- Wdrożenie Netlify
- Profesjonalny wygląd

### 🔄 KAMIEŃ MILOWY 2: E-commerce Foundation (W TRAKCIE)
- Konfiguracja Shopify
- Integracja API
- Podstawowa funkcjonalność sklepu
- Strony produktów
- System koszyka

### 🎯 KAMIEŃ MILOWY 3: Full E-commerce (NASTĘPNY)
- Kompletny proces zakupowy
- System płatności
- Zarządzanie zamówieniami
- Customer experience
- Mobile commerce

### 🚀 KAMIEŃ MILOWY 4: Content & Marketing (PRZYSZŁOŚĆ)
- System blog/CMS
- SEO optimization
- Loyalty program
- Analytics dashboard
- Marketing automation

---

## 💡 KLUCZOWE DECYZJE TECHNICZNE

### Stack Technologiczny ✅
```
Frontend: React + Vite + Tailwind CSS
E-commerce: Shopify (Storefront API)
Hosting: Netlify
State Management: Zustand
Routing: React Router
```

### Architektura Danych 📋
```
Products: Shopify → Coffee model mapping
Images: Shopify CDN
Inventory: Real-time sync z Shopify
Payments: Shopify Checkout
```

---

## 📈 TRACKER POSTĘPU

**Ogólny postęp:** 75% (Landing ukończony, e-commerce w planach)

### ✅ Faza 1: Fundament i Setup - UKOŃCZONE (100%)
- [x] Vite + React + Tailwind setup ✅
- [x] Routing i podstawowa struktura ✅
- [x] Design system i responsywność ✅

### ✅ Faza 2: Komponenty Core - UKOŃCZONE (100%)
- [x] Header, Footer, Hero ✅
- [x] CoffeeCard z funkcjami ✅
- [x] Contact section ✅

### ✅ Faza 3: Strony Landing - UKOŃCZONE (100%)
- [x] Wszystkie główne strony ✅
- [x] Katalog z filtrami ✅
- [x] Model danych kaw ✅

### 🔄 Faza 4: Shopify Setup - W TRAKCIE (10%)
- [ ] Konfiguracja sklepu Shopify 🔄
- [ ] Analiza API i integracja 📋
- [ ] Przygotowanie SDK 📋

### 📋 Pozostałe fazy - PLANOWANE
- [ ] Faza 5: E-commerce Core
- [ ] Faza 6: Checkout i Płatności
- [ ] Faza 7: Content Management

---

## 🎯 PLAN DZIAŁANIA (NAJBLIŻSZE 2 TYGODNIE)

### TYDZIEŃ 1: Content Updates od Damiana (PRIORITY)
**DZIEŃ 1 (JUTRO):**
- Przycięcie zdjęcia z ulicy (usunięcie szyldu sąsiadów)
- Upload nowych zdjęć do projektu
- Implementacja timeline 2020-2025 w "O Strzykawie"
- Zmiana hero text: "Częstochowska palarnia kawy"

**DZIEŃ 2:**
- Nowy opis pod hero (tekst o sourcing i farmach)
- Usunięcie zakładek "Przyjdź do kawiarni" i "Dostępne w kawiarni"
- Dodanie sekcji "B2B" w nawigacji
- Uproszczenie filtrów sklepu (Espresso, Przelew, Akcesoria)

**DNI 3-4:**
- Shopify setup (jeśli content ready)
- Naprawa galerii zdjęć (mobile/desktop issues)

**DNI 5-7:**
- Poprawki footer design
- Ulepszenie kart kaw (overlay position)
- Testing i polish nowych zmian

### TYDZIEŃ 2: Integration Prep
**DNI 1-3:**
- Setup Shopify SDK w projekcie
- Utworzenie service layer dla API
- Konfiguracja environment variables

**DNI 4-5:**
- Pierwsza integracja - pobieranie produktów
- Mapowanie Shopify data → Coffee model
- Testowanie synchronizacji

**DNI 6-7:**
- Planowanie architektury koszyka
- Przygotowanie stron produktów
- Code review i refaktoring

---

## ⚠️ RYZYKO I MITYGACJA

### Techniczne
**Shopify API Limits**
- Ryzyko: Rate limiting, quota
- Mitygacja: Caching, intelligent fetching

**Data Synchronization**
- Ryzyko: Rozbieżność inventory
- Mitygacja: Real-time webhooks

### Business
**Product Photography**
- Ryzyko: Brak profesjonalnych zdjęć
- Mitygacja: Plan sesji fotograficznej

**Content Creation**
- Ryzyko: Czas na tworzenie opisów
- Mitygacja: Template system, batch processing

---

## 📞 NASTĘPNE KROKI AKCJI

### NATYCHMIAST (Ten tydzień):
1. **Założyć konto Shopify** ✅ PRIORYTET
2. **Dodać pierwsze produkty** - przetestować system
3. **Naprawić galerię** - problemy mobile/desktop
4. **Poprawić footer** - wizualnie

### KRÓTKOTERMINOWO (2 tygodnie):
1. **Przeanalizować Shopify API** - structure, limits, best practices
2. **Zintegrować podstawowo** - fetch products, display
3. **Ulepszyć karty kaw** - overlay na dół, opcje mielona/ziarna
4. **Strony produktów** - `/kawy/:id` routing i basic layout

### ŚREDNIOTERMINOWO (Miesiąc):
1. **Kompletny e-commerce** - koszyk, checkout, płatności
2. **Custom branding** - logo, ikony, fotografia
3. **Kategoria akcesoria** - rozszerzenie asortymentu
4. **SEO i analytics** - marketing foundation

---

**Ostatnia aktualizacja:** 22 września 2025  
**STATUS:** 🟢 Landing Ready - E-commerce in Progress!  
**FOCUS:** 🛒 Shopify Configuration & API Integration