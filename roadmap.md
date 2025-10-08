# Strzykawa - Zaktualizowana Roadmapa 🚀☕

## 📅 AKTUALNY STAN (Październik 2025)

**STATUS:** Phase 1 Component Refactoring Complete ✅  
**CURRENT FOCUS:** Sticky Bar Z-index Fix + Header Positioning

---

## ✅ OSTATNIO UKOŃCZONE

### 🧩 Component Refactoring - Phase 1 ✅ COMPLETE
- [x] Atomic Design pattern implemented ✅
- [x] Button, Chip atoms created ✅
- [x] FilterSection molecule created ✅
- [x] FilterDrawer, CoffeeFilterBar, CoffeeGrid organisms created ✅
- [x] PageLayout wrapper component ✅
- [x] Coffees.jsx refactored (~60% code reduction) ✅
- [x] Mobile filter drawer with sticky bar ✅
- [x] All filters dynamic and data-driven ✅

### 🎨 Content Updates (Feedback Damiana) ✅ UKOŃCZONE
- [x] Zmiana "Only Specialty Coffee" → "Częstochowska palarnia kawy" ✅
- [x] Timeline 2020-2025 w sekcji "O Strzykawie" ✅ (wymaga poprawek)
- [x] Uproszczenie nawigacji (usunięcie zbędnych zakładek) ✅
- [x] Podstawowa struktura landing page ✅

---

## 📝 CODING CONVENTIONS (WAŻNE!)

### ⚠️ ZASADY EKSPORTOWANIA KOMPONENTÓW

**ZAWSZE stosuj tę konwencję:**

```javascript
// ✅ POPRAWNIE - Komponenty
export function ComponentName() {
  // Arrow functions wewnątrz dla event handlers
  const handleClick = () => { ... };
  const handleChange = () => { ... };
  
  return (
    // JSX
  );
}

// ✅ Import
import { ComponentName } from './path';
```

```javascript
// ❌ BŁĘDNIE - NIE UŻYWAJ
const ComponentName = () => { ... };
export default ComponentName;

// ❌ Import
import ComponentName from './path';
```

### 📋 Szczegółowe Zasady:

1. **Komponenty React:**
  - `export function ComponentName()` - zawsze named export
  - Import z nawiasami klamrowymi: `import { ComponentName }`

2. **Funkcje pomocnicze WEWNĄTRZ komponentów:**
  - Arrow functions: `const handleClick = () => { ... }`
  - Callbacks: `const processData = () => { ... }`

3. **Demo/Example komponenty:**
  - Też `export function`: `export function ComponentExamples()`

4. **NIGDY nie mieszaj:**
  - ❌ `export default` + arrow function
  - ❌ Podwójny export (`export function` + `export default`)

### 🎯 Dlaczego ta konwencja?

- ✅ Spójność w całym projekcie
- ✅ Łatwiejsze refaktoryzacje (auto-import działa lepiej)
- ✅ Wyraźne rozróżnienie: komponenty vs funkcje pomocnicze
- ✅ Mniej błędów przy importach

---

## 🚨 PILNE PROBLEMY DO NAPRAWY

### 1. Sticky Filter Bar - Z-index Issue 🔥 NATYCHMIASTOWE
**Problem:**
- Sticky bar chowa się pod header przy scrollu
- Header ma wyższy z-index

**Do naprawienia:**
- [ ] **Opcja A:** Zwiększ z-index sticky bar (z-40)
- [ ] **Opcja B:** Schowaj header przy scrollu
- [ ] **Decyzja:** TBD

### 2. Header Positioning - Inconsistency 🔥 NATYCHMIASTOWE
**Problem:**
- Nagłówek na różnych wysokościach na różnych stronach
- Brak konsystencji padding/margin

**Do naprawienia:**
- [ ] Sprawdź PageLayout usage na wszystkich stronach
- [ ] Ujednolić `pt-20` i `py-16` spacing
- [ ] Test na wszystkich page'ach

### 3. Timeline Component - Animation Issues 🟡 NASTĘPNE
**Problem:**
- Animacja przeskakuje niezależnie od user interaction
- Ręczna zmiana daty powinna zatrzymać auto-odliczanie
- Wersja mobilna wygląda źle

**Do naprawienia:**
- [ ] **Manual override** - user interaction zatrzymuje auto-play
- [ ] **Mobile responsive design** - kompaktowy layout na telefonie
- [ ] **Animation control** - smooth transitions, no jumping
- [ ] **UX improvement** - lepsze kontrolki nawigacji

---

## 🏗️ COMPONENT ARCHITECTURE

### ✅ Utworzone Komponenty (Phase 1)

```
src/components/
├── atoms/
│   ├── Button.jsx          ✅ (export function Button)
│   └── Chip.jsx            ✅ (export function Chip)
│
├── molecules/
│   └── FilterSection.jsx   ✅ (export function FilterSection)
│
├── organisms/
│   ├── FilterDrawer.jsx       ✅ (export function FilterDrawer)
│   ├── CoffeeFilterBar.jsx    ✅ (export function CoffeeFilterBar)
│   └── CoffeeGrid.jsx         ✅ (export function CoffeeGrid)
│
├── PageLayout.jsx          ✅ (export function PageLayout)
└── PageHeader.jsx          ✅ (export function PageHeader - existing)
```

### 📋 Do Refaktoryzacji (Phase 2-4)

**Phase 2: Timeline (HIGH PRIORITY)**
```
About.jsx
├── Timeline (organism)
│   ├── TimelineCard (molecule)
│   ├── TimelineControls (molecule)
│   └── useTimelineAnimation (hook)
```

**Phase 3: CoffeeCard**
```
CoffeeCard.jsx (organism)
├── CoffeeCardImage (atom)
├── CoffeeCardOverlay (molecule)
│   ├── CoffeeOriginInfo (molecule)
│   ├── CoffeeTastingNotes (molecule)
│   └── CoffeeAvailabilityBadges (molecule)
```

**Phase 4: Header/Footer**
```
Header.jsx → Navigation components
Footer.jsx → Footer sections
```

---

## 🔥 PRIORYTETOWE ZADANIA

### DZISIAJ (Po kawie ☕):
1. **Fix sticky bar z-index** - zdecydować: zwiększyć z-index czy schować header
2. **Fix header positioning** - sprawdzić wszystkie strony, ujednolicić spacing

### TEN TYDZIEŃ:
1. **Timeline refactor** - wydzielić komponenty
2. **Timeline animation fix** - manual control + smooth transitions
3. **Timeline mobile** - responsive design

### NASTĘPNY TYDZIEŃ:
1. **CoffeeCard refactor** - podzielić na mniejsze komponenty
2. **Hover improvements** - lepsze UX na kartach
3. **Testing** - cross-device compatibility

---

## 🛒 E-COMMERCE ROADMAP (ZAKTUALIZOWANA)

### Faza 1: Shopify Foundation (2-3 TYGODNIE)
- [ ] **Shopify Store Setup**
  - Konfiguracja podstawowych ustawień
  - Dodanie pierwszych produktów (test data)
  - API keys i permissions setup
- [ ] **Storefront API Integration**
  - SDK installation i configuration
  - Pierwszy fetch produktów
  - Error handling i loading states
- [ ] **Data Mapping**
  - Shopify product → Coffee model mapping
  - Image handling i CDN
  - Inventory sync planning

### Faza 2: Product Pages & Cart (3-4 TYGODNIE)
- [ ] **Individual Product Pages** `/kawy/:id`
  - Detailed product view
  - Image gallery
  - Options selector (mielona/ziarna, rozmiary)
  - Add to cart functionality
- [ ] **Shopping Cart**
  - Cart state management (Zustand)
  - Add/remove/modify items
  - Cart drawer/page
  - Persistent cart (memory-based)
- [ ] **Cart Integration**
  - Shopify cart API integration
  - Price calculations
  - Shipping options preview

### Faza 3: Checkout & Payments (2-3 TYGODNIE)
- [ ] **Checkout Flow**
- [ ] **Payment Processing**
- [ ] **Post-Purchase**

---

## 📊 TECHNICAL PRIORITIES

### Code Quality & Architecture
```
✅ Completed:
- Atomic Design pattern
- Component library foundation
- PageLayout wrapper
- Consistent export conventions

🔄 In Progress:
- Sticky bar z-index fix
- Header positioning consistency

📋 Next:
- Timeline component refactor
- CoffeeCard refactor
- Custom hooks extraction
```

### Performance & UX
```
Critical Issues:
1. Sticky bar z-index ← TODAY
2. Header positioning ← TODAY
3. Timeline animation ← THIS WEEK
4. Mobile timeline layout ← THIS WEEK

Performance:
- Image optimization
- Bundle size analysis
- Core Web Vitals audit
```

---

## 🎯 SUCCESS METRICS

### Component Refactoring Goals
- [x] **Coffees.jsx**: Reduced from 400+ to ~100 lines ✅
- [x] **Reusable atoms**: Button, Chip ✅
- [x] **Mobile UX**: Filter drawer implemented ✅
- [ ] **Sticky bar**: Z-index fixed
- [ ] **All pages**: Using PageLayout consistently

### Mobile UX Goals
- [x] **Filters**: Mobile drawer with sticky bar ✅
- [ ] **Timeline**: Smooth manual control
- [ ] **Overall**: Lighthouse Mobile Score >90

---

## 📞 IMMEDIATE ACTION PLAN

### PO KAWIE ☕:
1. **Sticky bar z-index** - fix conflict z header
2. **Header positioning** - sprawdzić wszystkie strony

### JUTRO:
1. **Timeline animation** - manual control override
2. **Timeline mobile** - compact layout

### TEN TYDZIEŃ:
1. Complete Timeline component refactor
2. Test Timeline na różnych devices
3. Start CoffeeCard refactor planning

---

## 💭 DEVELOPMENT NOTES

### Component Creation Checklist
Przy tworzeniu KAŻDEGO nowego komponentu:
- [ ] `export function ComponentName()` - nie arrow function!
- [ ] Import z `{ }` - `import { ComponentName }`
- [ ] Event handlers jako arrow functions wewnątrz
- [ ] Props documentation w komentarzu
- [ ] Mobile-first approach
- [ ] Test na małych ekranach

### Git Commit Convention
```bash
# Format:
<type>(<scope>): <subject>

# Types:
feat: nowa funkcjonalność
fix: naprawa buga
refactor: refaktoryzacja kodu
docs: dokumentacja
style: formatowanie
test: testy
chore: maintenance
```

### File Naming
- Components: `PascalCase.jsx`
- Hooks: `useSomething.js`
- Utils: `camelCase.js`
- Constants: `UPPER_SNAKE_CASE.js`

---

## 🔗 RELATED DOCS

- `COMPONENT-REFACTORING.md` - Pełny plan refaktoryzacji komponentów
- `DEVELOPMENT.md` - Technical documentation
- `.gitignore` - Git ignore rules

---

**Ostatnia aktualizacja:** Październik 2025  
**STATUS:** 🟢 Phase 1 Complete - Moving to fixes  
**NEXT:** 🔥 Sticky Bar Z-index + Header Positioning

**Maintainer:** @enowuigrek  
**Coffee Count Today:** ☕ (w trakcie)