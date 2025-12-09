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

## 🖥️ DESKTOP - Priorytet wysoki

### 5. **Poprawić wysokość wyskakujących okien (modals)**
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

### 6. **Footer uporządkować**
- [ ] Przejrzeć layout footera
- [ ] Uporządkować sekcje (szczegóły do ustalenia)
- [ ] Plik do edycji:
  - `src/components/layout/Footer.jsx`

### 7. **Dodać sekcję z teamem Strzykawy**
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

**Najpilniejsze (dzisiaj/jutro):**
1. Mobile: Karuzela (UX critical)
2. Desktop: Wysokość modals (UX ważne)
3. Mobile: Timeline - ukryć lub poprawić

**Ważne (ten tydzień):**
4. Mobile: Wyszukiwarka keyboard issue
5. Mobile: Nawigator - pomniejszenie
6. Footer uporządkowanie

**Średni priorytet:**
7. Team section
8. Nawigator - animacje slide

---

**Maintainer:** @enowuigrek
**Last Updated:** 9 Grudnia 2025
