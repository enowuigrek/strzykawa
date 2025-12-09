# 🔧 ZADANIA DO WYKONANIA - Strzykawa

> **Data utworzenia:** 9 Grudnia 2025
> **Status:** Do wykonania

---

## 📱 MOBILE - Priorytet wysoki

### 1. **Naprawić karuzelę zdjęć**
- [ ] Problem: Można zmieniać zdjęcia i scrollować równocześnie
- [ ] Rozwiązanie: Zablokować scroll strony gdy użytkownik swipe'uje karuzelę
- [ ] Pliki do sprawdzenia:
  - `src/components/molecules/MobileCarousel.jsx`
  - `src/components/molecules/ProductGallery.jsx`

### 2. **Nawigator dolny - pomniejszyć i animacje**
- [ ] Pomniejszyć rozmiar dolnego nawigatora
- [ ] Dodać animacje slide przy zmianie sekcji:
  - Kliknięcie w lewo → przesunięcie w lewo
  - Kliknięcie w prawo → przesunięcie w prawo
- [ ] Plik do edycji:
  - `src/components/header/MobileBottomNavigation.jsx`

### 3. **Wyszukiwarka - fix skakania okna**
- [ ] Problem: Przy kliknięciu "szukaj" okno skacze
- [ ] Problem: Dolny nawigator wędruje do góry gdy pojawia się klawiatura
- [ ] Rozwiązanie: Poprawić layout i pozycjonowanie
- [ ] Pliki do sprawdzenia:
  - Komponent wyszukiwarki (znaleźć w `src/components/`)
  - Sprawdzić czy to problem z `position: fixed` vs keyboard

### 4. **Sekcja "O Strzykawie" - kalendarz (timeline)**
- [ ] **Mobile:** Rozważyć całkowite usunięcie timeline (nie pomaga UX)
- [ ] **Desktop:** Zostawić timeline, poprawić scroll behavior:
  - [ ] Poprawić miejsce przewijania po kliknięciu w datę
  - [ ] Pasek zasłania treść - dodać offset
  - [ ] Na ostatniej dacie timeline znika - powinien być jeszcze widoczny
- [ ] Pliki do edycji:
  - `src/components/organisms/TimelineBar.jsx`
  - `src/components/molecules/TimelineSection.jsx`
  - `src/pages/About.jsx`

---

## 🛒 SHOPIFY & CHECKOUT - Priorytet KRYTYCZNY

### 5. **Dokończyć strony Checkout Success i Checkout Canceled**
**Status:** Obecnie są tylko wstępne wersje - trzeba je rozbudować!

#### **CheckoutSuccess** (`src/pages/CheckoutSuccess.jsx`):
- [ ] Dodać ikonę sukcesu (✓) / ilustrację
- [ ] Podsumowanie zamówienia:
  - Co kupiono (lista produktów)
  - Łączna cena
  - Adres dostawy (jeśli dostępny z Shopify)
- [ ] Informacje o następnych krokach:
  - "Zamówienie zostało przyjęte ✓"
  - "Potwierdzenie wysłane na e-mail: [email]"
  - "Przesyłka zostanie wysłana w ciągu 2-3 dni roboczych"
- [ ] Numer zamówienia (jeśli dostępny z Shopify)
- [ ] Przyciski akcji:
  - **Główny CTA:** "Wróć do sklepu" (rounded-full, bg-cta)
  - "Zobacz moje zamówienia" (gdy będzie account system)
  - "Kontakt z obsługą" (link do /kontakt)

#### **CheckoutCanceled** (`src/pages/CheckoutCanceled.jsx`):
- [ ] Dodać ikonę anulowania (⚠️ lub ❌)
- [ ] Wyjaśnienie sytuacji:
  - "Płatność została anulowana lub nie powiodła się"
  - "Nie martw się - produkty nadal są w koszyku"
- [ ] Informacje pomocnicze:
  - Możliwe przyczyny (wycofanie się, błąd połączenia, brak środków)
  - Link do FAQ o płatnościach
- [ ] Przyciski akcji:
  - **Główny CTA:** "Wróć do koszyka" (rounded-full, bg-cta)
  - "Kontynuuj zakupy" (secondary button)
  - "Potrzebujesz pomocy?" → /kontakt

#### **Design:**
- Minimalistyczny, zgodny z Strzykawa branding
- Ikony z react-icons:
  - Success: `FaCheckCircle` (text-success)
  - Canceled: `FaExclamationTriangle` lub `FaTimesCircle` (text-danger)
- Używać kolorów z tailwind.config.js:
  - Success: `text-success`, `bg-success/10`
  - Danger: `text-danger`, `bg-danger/10`
- Layout: wyśrodkowany, max-width, dużo breathing room
- Buttony: `rounded-full` (pastylki!)

---

## 🖥️ DESKTOP - Priorytet wysoki

### 6. **Poprawić wysokość wyskakujących okien (modals)**
- [ ] Login Modal - dostosować wysokość
- [ ] Quick Add Modal - dostosować wysokość
- [ ] Register Modal - dostosować wysokość
- [ ] Cel: Modals nie powinny być zbyt wysokie ani zbyt niskie
- [ ] Pliki do edycji:
  - `src/components/modals/LoginModal.jsx`
  - `src/components/modals/QuickAddModal.jsx`
  - `src/components/modals/RegisterModal.jsx`

---

## 🎨 DESIGN & LAYOUT

### 7. **Footer uporządkować**
- [ ] Przejrzeć layout footera
- [ ] Uporządkować sekcje (szczegóły do ustalenia)
- [ ] Plik do edycji:
  - `src/components/layout/Footer.jsx`

### 8. **Dodać sekcję z teamem Strzykawy**
- [ ] Utworzyć nową sekcję "Nasz zespół" / "Team"
- [ ] Dodać zdjęcia i opisy:
  - Damian (właściciel/barista?)
  - Inni członkowie zespołu Strzykawy
- [ ] Zdecydować gdzie umieścić:
  - Strona "O nas" (`src/pages/About.jsx`)
  - Osobna sekcja na Home?
- [ ] Pliki do utworzenia/edycji:
  - Nowy komponent: `src/components/features/about/TeamSection.jsx`
  - Edycja: `src/pages/About.jsx`

---

## 💡 SUGESTIE & PRZEMYŚLENIA

### Sugestie od Claude:

1. **Karuzela na mobile:**
   - Rozważ użycie `touch-action: pan-y` dla zablokowania horizontal scroll podczas swipe
   - Może warto dodać indykatory kropek (dots) pod karuzelą?

2. **Timeline w mobile:**
   - Jeśli timeline nie pomaga w mobile, można go ukryć z `hidden md:block`
   - W desktop można dodać smooth scroll z offset dla header

3. **Modals wysokość:**
   - Obecnie używają `max-h-[90vh]` - może warto zmienić na `max-h-[80vh]` dla desktop?
   - Dodać lepsze scrollowanie wewnętrznej zawartości

4. **Wyszukiwarka mobile:**
   - Problem z keyboard overlay - rozważ użycie `position: absolute` zamiast `fixed`
   - Lub dodaj listener na `window.visualViewport` dla iOS

5. **Team Section:**
   - Grid layout 2-3 osoby w rzędzie na desktop
   - Stack layout (jedna osoba pod drugą) na mobile
   - Dodać social media links dla każdej osoby?

6. **Nawigator dolny:**
   - Animacje: użyć `framer-motion` lub zwykłe CSS transitions z `translateX`
   - Pomniejszenie: zmniejszyć padding i font-size

---

## 📋 CHECKLIST PRZED COMMITEM

- [ ] Przetestować na mobile (Chrome DevTools + prawdziwe urządzenie)
- [ ] Przetestować na desktop (różne rozdzielczości)
- [ ] Sprawdzić zgodność z Design System (DESIGN_SYSTEM.md)
- [ ] Uruchomić `npm run lint` - brak błędów
- [ ] Uruchomić `npm run format` - kod sformatowany
- [ ] Sprawdzić console - brak errors/warnings

---

## 🎯 PRIORYTETYZACJA

**🔥 KRYTYCZNE (dzisiaj!):**
1. 🛒 **Checkout Success/Canceled** - KLIENCI TO ZOBACZĄ PO ZAKUPIE!

**Najpilniejsze (jutro):**
2. 📱 Mobile: Karuzela (UX critical)
3. 🖥️ Desktop: Wysokość modals (UX ważne)
4. 📱 Mobile: Timeline - ukryć lub poprawić

**Ważne (ten tydzień):**
5. 📱 Mobile: Wyszukiwarka keyboard issue
6. 📱 Mobile: Nawigator - pomniejszenie
7. 🎨 Footer uporządkowanie

**Średni priorytet:**
8. 👥 Team section
9. 📱 Nawigator - animacje slide

---

**Maintainer:** @enowuigrek
**Last Updated:** 9 Grudnia 2025
