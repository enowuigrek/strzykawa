# Strzykawa - Zaktualizowana Roadmapa 🚀☕

## 📅 AKTUALNY STAN (Październik 2025)

**STATUS:** Content Updates Ukończone - Focus na UX Fixes + E-commerce 🛒  
**CURRENT FOCUS:** Mobile UX Issues + Shopify Integration

---

## ✅ OSTATNIO UKOŃCZONE

### 🎨 Content Updates (Feedback Damiana) ✅ UKOŃCZONE
- [x] Zmiana "Only Specialty Coffee" → "Częstochowska palarnia kawy" ✅
- [x] Timeline 2020-2025 w sekcji "O Strzykawie" ✅ (wymaga poprawek)
- [x] Uproszczenie nawigacji (usunięcie zbędnych zakładek) ✅
- [x] Podstawowa struktura landing page ✅

---

## 🚨 PILNE PROBLEMY DO NAPRAWY

### 1. Timeline Component - Animation Issues 🔥 NATYCHMIASTOWE
**Problem:**
- Animacja przeskakuje niezależnie od user interaction
- Ręczna zmiana daty powinna zatrzymać auto-odliczanie
- Wersja mobilna wygląda źle

**Do naprawienia:**
- [ ] **Manual override** - user interaction zatrzymuje auto-play
- [ ] **Mobile responsive design** - kompaktowy layout na telefonie
- [ ] **Animation control** - smooth transitions, no jumping
- [ ] **UX improvement** - lepsze kontrolki nawigacji

### 2. Shop Filters - Mobile UX Problem 🔥 NATYCHMIASTOWE
**Problem:**
- Filtry są wielkie i niepraktyczne na telefonie
- Zajmują za dużo miejsca na małych ekranach
- Trudne w obsłudze na mobile

**Do naprawienia:**
- [ ] **Compact mobile filters** - dropdown/accordion design
- [ ] **Filter drawer** - slide-out panel na mobile
- [ ] **Quick filter chips** - małe tagowanie zamiast dużych przycisków
- [ ] **Mobile-first redesign** - optymalizacja pod telefony

### 3. Galeria zdjęć - Display Issues 🟡 WAŻNE
- [ ] Problemy wyświetlania na mobile i desktop
- [ ] Responsive images i aspect ratio
- [ ] Loading states i optimization

---

## 🔥 PRIORYTETOWE ZADANIA (NAJBLIŻSZE 2 TYGODNIE)

### TYDZIEŃ 1: Mobile UX Fixes
**DNI 1-2: Timeline Fixes**
- Naprawienie animation control (manual override)
- Redesign mobile version (kompaktowy layout)
- Testing na różnych screen sizes

**DNI 3-4: Shop Filters Mobile**
- Implementacja filter drawer/accordion na mobile
- Quick filter chips design
- Touch-friendly controls

**DNI 5-7: Polish & Testing**
- Cross-device testing
- Performance optimization
- Bug fixes

### TYDZIEŃ 2: E-commerce Prep
**DNI 1-3: Shopify Planning**
- Shopify account setup (jeśli jeszcze nie)
- API analysis i integration planning
- Service layer architecture

**DNI 4-7: Basic Integration**
- Pierwszy fetch produktów z Shopify
- Data mapping Coffee model
- Testing synchronizacji

---

## 📱 MOBILE UX IMPROVEMENTS (ROZSZERZONE)

### Timeline Component Fixes
```
Problems:
- Auto-animation conflicts z manual control
- Mobile layout zbyt szeroki/wysokie
- Animation jumping

Solutions:
- useState dla manual control override  
- Compact vertical timeline na mobile
- Smooth CSS transitions
- Touch gestures support
```

### Shop Filters Redesign
```
Current: Duże przyciski w rzędzie
Mobile Problem: Za dużo miejsca, trudne do tapnięcia

New Design:
- Filter drawer (slide z boku)
- Compact chips z count badges
- Search w filtrach
- Apply/Clear buttons
```

### Responsive Strategy
```
Mobile-first approach:
- Filters: Drawer/accordion
- Timeline: Vertical, compact
- Cards: Stacked, nie grid
- Navigation: Hamburger menu
```

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
  - Persistent cart (localStorage alternative)
- [ ] **Cart Integration**
  - Shopify cart API integration
  - Price calculations
  - Shipping options preview

### Faza 3: Checkout & Payments (2-3 TYGODNIE)
- [ ] **Checkout Flow**
  - Customer information form
  - Shipping options
  - Order summary
  - Shopify Checkout integration
- [ ] **Payment Processing**
  - Shopify Payments integration
  - Multiple payment methods
  - Order confirmation
  - Email notifications
- [ ] **Post-Purchase**
  - Order tracking
  - Customer account (optional)
  - Return/exchange info

---

## 🎨 DESIGN IMPROVEMENTS

### Short-term (Mówimy o najbliższych tygodniach)
- [ ] **Timeline mobile redesign** 🔥
- [ ] **Filter system mobile** 🔥
- [ ] **Coffee cards hover improvements**
- [ ] **Footer visual polish**

### Medium-term (Miesiąc-dwa)
- [ ] **Professional product photography**
- [ ] **Brand assets replacement** (placeholders → oficial)
- [ ] **Custom icons** (replace react-icons)
- [ ] **Micro-animations polish**

### Long-term (Przyszłość)
- [ ] **Complete visual refresh**
- [ ] **Photography session** (products + cafe)
- [ ] **Video content integration**
- [ ] **3D product previews** (jeśli budget pozwoli)

---

## 📊 TECHNICAL PRIORITIES

### Performance & UX
```
Critical Issues:
1. Mobile filters UX ← ASAP
2. Timeline animation control ← ASAP  
3. Gallery display issues ← Soon
4. Loading states improvement ← Soon

Performance:
- Image optimization
- Bundle size analysis
- Core Web Vitals audit
- Mobile performance focus
```

### Code Quality
```
Refactoring needs:
- Timeline component cleanup
- Filter system architecture
- Mobile-responsive utilities
- Animation system cleanup
```

---

## 🎯 SUCCESS METRICS

### Mobile UX Goals
- [ ] **Timeline**: Smooth manual control, no animation conflicts
- [ ] **Filters**: <50% screen height na mobile, touch-friendly
- [ ] **Overall**: Lighthouse Mobile Score >90

### E-commerce Goals
- [ ] **Integration**: Successful Shopify connection
- [ ] **Performance**: Product fetch <2s
- [ ] **UX**: Complete purchase flow working

---

## 📞 IMMEDIATE ACTION PLAN

### JUTRO:
1. **Fix Timeline Animation** - manual control override
2. **Start Filter Mobile Redesign** - architecture planning

### TEN TYDZIEŃ:
1. **Complete Timeline mobile version**
2. **Implement mobile filter drawer**
3. **Test cross-device compatibility**

### NASTĘPNY TYDZIEŃ:
1. **Shopify account setup** (jeśli nie zrobione)
2. **Basic API integration test**
3. **Plan product pages architecture**

---

## 💭 NOTES & CONSIDERATIONS

### Mobile-First Strategy
```
Observation: Większość problemów to mobile UX
Strategy: Wszystkie nowe komponenty mobile-first
Testing: Każda zmiana testowana na małych ekranach
```

### Timeline Technical Notes
```
Current Issue: setInterval conflicts z manual setState
Solution: useRef dla interval control + cleanup
Mobile Design: Vertical scroll, compact cards
```

### Filter Architecture
```
Current: Grid layout filters
Mobile Problem: Zajmuje za dużo vertical space
Solution: Accordion/Drawer + chip tags
```

---

**Ostatnia aktualizacja:** Październik 2025  
**STATUS:** 🟡 Mobile UX Fixes in Progress  
**NEXT:** 🔥 Timeline Animation + Mobile Filters