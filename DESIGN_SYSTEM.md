# 🎨 STRZYKAWA - DESIGN SYSTEM

> **Wersja:** 1.2
> **Ostatnia aktualizacja:** 4 Lutego 2026
> **Status:** Aktualne

---

## 📖 SPIS TREŚCI

1. [Logo & Branding](#logo--branding)
2. [Kolory](#kolory)
3. [Typografia](#typografia)
4. [Zasady Designu](#zasady-designu)
5. [Komponenty](#komponenty)
6. [Spacing & Layout](#spacing--layout)
7. [Animacje & Transitions](#animacje--transitions)
8. [Assets & Resources](#assets--resources)

---

## 🖼️ LOGO & BRANDING

### **Wersje Logo**

| Plik | Użycie | Wymiary |
|------|--------|---------|
| `logo-icon.jpg` | Favicon, ikony, mobile menu | Kwadrat, jasne tło |
| `horizontal-logo.png` | Header desktop, footer | Panorama, "COFFEE ROASTERY" |
| `logo-full.jpg` | Hero section, ciemne tła | Pełne logo z "COFFEE SHOP" |
| `vertical-logo.png` | Mobile header, splash screen | Pionowe z "COFFEE ROASTERY" |

### **Symbol Marki**
- **Ikona:** Stylizowany Aeropress w okręgu
- **Elementy:** Kubek + kropla + ziarna kawy
- **Styl:** Minimalistyczny, geometric, clean lines

### **Kolor Logo**
- **Główny:** `#2F4538` (ciemny zielony) - lub podobny
- **Tło:** Białe/jasne lub ciemne zielone (w zależności od wersji)

---

## 🎨 KOLORY

### **Paleta Główna**

```javascript
// tailwind.config.js
colors: {
  primary: {
    DEFAULT: '#1E2A25',  // Ciemny zielony (zbliżone do logo)
    light: '#2C3A35',     // Jaśniejszy odcień
    dark: '#141C18'       // Najciemniejszy
  },
  accent: '#6B7F73',      // Średni zielony (akcenty)
  muted: '#9CA8A1'        // Jasny zielony (tekst secondary)
}
```

### **Zastosowanie Kolorów**

| Kolor | Użycie |
|-------|--------|
| `primary.DEFAULT` | Tło strony, główne sekcje |
| `primary.light` | Hover states, karty produktów |
| `primary.dark` | Footer, header scroll |
| `accent` | Linki, buttony secondary, ikony |
| `muted` | Tekst pomocniczy, placeholder |
| `white` | Tekst główny na ciemnym tle |

### **Dodatkowe Kolory**

```javascript
// Funkcjonalne kolory
success: {
  DEFAULT: '#0E8C6F',  // Zielony (sukces, COUNT BADGES, dodano do koszyka)
  dark: '#0B6F55'      // Ciemniejszy odcień success
},
danger: {
  DEFAULT: '#C9423A',  // Czerwony (błędy, niedostępne)
  dark: '#A7322D'      // Ciemniejszy odcień danger
},
cta: {
  DEFAULT: '#3A5F55',  // Zielony CTA (przyciski płatności, checkout)
  hover: '#2F4F46'     // CTA hover state
},
badge: {
  blue: '#7A8FA6',     // Badge FILTER/PRZELEW (typ parzenia)
  orange: '#C48F62'    // Badge ESPRESSO (typ parzenia)
}
```

**WAŻNE:** Count badges (liczba produktów) są **ZAWSZE `bg-success`** (nie accent!), aby wskazywać aktywny stan/sukces.

---

## ✍️ TYPOGRAFIA

### **Font Family**

```javascript
// tailwind.config.js
fontFamily: {
  sans: ['Dosis', 'Arial', 'sans-serif']
}
```

**Importy (index.css):**
```css
@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@400;500;600;700&display=swap');
```

### **Font Weights**

| Weight | Użycie |
|--------|--------|
| 400 (Regular) | Tekst body, nagłówki, ceny, opisy - **domyślny weight** |
| 500 (Medium) | Przyciski, form labels, linki, akcentowane elementy |
| 700 (Bold) | **TYLKO count badges** (koszyk, filtry) |

**ZASADY:**
- **NIE używamy font-semibold (600)** - zastąpiony przez font-medium (500)
- **font-bold (700)** zarezerwowany WYŁĄCZNIE dla badge'y count
- Nagłówki sekcji, ceny, tytuły kart - zawsze font-normal (400)
- Form labels, buttony, podkreślone elementy - font-medium (500)

### **Kolory Tekstu**

| Kolor | Użycie |
|-------|--------|
| `text-white` | Nazwy produktów, nagłówki, główny tekst |
| `text-muted` | Ceny, prefix "od", tekst secondary |
| `text-white/70` | Opisy, tekst trzeciorzędny |
| `text-accent` | Linki, aktywne stany |

**ZASADA:** Ceny zawsze `text-muted` (zarówno na kartach jak i na stronie produktu).

### **Rozmiary Tekstu**

```javascript
// Tailwind classes
text-xs      // 12px - meta info, badges (small)
text-sm      // 14px - secondary text, badges (large)
text-base    // 16px - body text
text-lg      // 18px - emphasized text
text-xl      // 20px - H6
text-2xl     // 24px - H5
text-3xl     // 30px - H4
text-4xl     // 36px - H3
text-5xl     // 48px - H2
text-6xl     // 60px - H1, hero
```

---

## 📐 ZASADY DESIGNU

### **🔲 Corners & Borders**

#### **GŁÓWNA ZASADA:**

**Przyciski i interaktywne elementy:**
- ✅ **Przyciski (buttons, links)** → `rounded-full` (pastylki!)
- ✅ **Badges** → `rounded-full`

**Elementy dekoracyjne i layout:**
- ✅ **Info boxes, code containers, demo boxes** → `rounded-lg` (delikatne zaokrąglenie)
- ✅ **Karty produktów, modals, główne sekcje** → **sharp corners** (brak rounded)

#### **Przykłady:**

```jsx
// ✅ PRZYCISKI - rounded-full (pastylki)
<button className="rounded-full px-8 py-3 bg-accent">Kup teraz</button>
<Link className="rounded-full px-6 py-3">Wróć</Link>

// ✅ BADGES - rounded-full
<span className="rounded-full px-3 py-1 bg-success">3</span>

// ✅ INFO BOXES - rounded-lg (delikatne)
<div className="rounded-lg bg-primary-light p-4">User info</div>
<pre className="rounded-lg bg-black p-4">Code example</pre>

// ✅ KARTY - sharp corners (brak rounded)
<div className="bg-primary">...</div>

// ❌ ŹLE - nie mieszamy stylów
<button className="rounded-lg">...</button>  // Buttony MUSZĄ być rounded-full
<div className="rounded-full">...</div>      // Diva nie robimy w pastylkę
```

### **🎯 Design Philosophy**

1. **Minimalizm** - Clean, uncluttered, dużo białej przestrzeni
2. **Geometric** - Proste kształty, ostre krawędzie
3. **Functional** - Form follows function
4. **Coffee-focused** - Wszystko podkreśla produkt
5. **Success indicators** - Zielone badges = aktywny stan

---

## 🧩 KOMPONENTY

### **🔘 Buttons**

#### **Primary Button (Pastylka)**
```jsx
<button className="
  rounded-full 
  px-8 py-3 
  bg-accent 
  text-white 
  font-medium
  hover:bg-accent/90 
  hover:scale-105
  transition-all
  duration-200
">
  Kliknij mnie
</button>
```

#### **Secondary Button**
```jsx
<button className="
  rounded-full 
  px-8 py-3 
  border-2 
  border-accent 
  text-accent
  hover:bg-accent 
  hover:text-white
  transition-all
  duration-200
">
  Więcej
</button>
```

#### **Success State** (np. dodano do koszyka)
```jsx
<button className="
  rounded-full
  px-8 py-3
  bg-success
  text-white
">
  ✓ Dodano!
</button>
```

---

### **🎴 Cards**

#### **Product Card**
```jsx
<div className="
  bg-primary-light
  overflow-hidden
  hover:transform 
  hover:scale-[1.02]
  transition-all
  duration-300
">
  {/* Sharp corners, NO rounded */}
</div>
```

#### **Info Card**
```jsx
<div className="
  bg-white 
  border 
  border-gray-200 
  p-6
">
  {/* Sharp corners */}
</div>
```

---

### **🪟 Modals**

```jsx
<div className="
  fixed 
  inset-0 
  z-[100]          /* Nad wszystkim */
  bg-black/50      /* Backdrop */
  backdrop-blur-sm
">
  <div className="
    bg-white 
    max-w-2xl 
    mx-auto 
    p-8
    /* NO rounded - sharp corners! */
  ">
    {/* Modal content */}
  </div>
</div>
```

---

### **❌ Close Button**

#### **CloseButton Component** (reusable w modalach)
```jsx
import { CloseButton } from './atoms/CloseButton';

// W headerze modala:
<CloseButton onClick={onClose} ariaLabel="Zamknij" />
```

**Design:**
- Minimalistyczny X z 2 kresek (jak hamburger)
- Sharp corners (brak rounded)
- **Hover:** Ramiona rozciągają się (w-6 → w-7) + accent color
- **Active:** scale-95 (kliknięcie kurczy)
- Smooth transitions (200ms)

**Użycie:**
- LoginModal, RegisterModal
- CartModal (CartHeader)
- Inne modals

**NIE używamy w:**
- MobileMenuToggle - tam jest animowany hamburger ↔ X (ale też z rozciąganiem hover)

---

### **📝 Inputs & Selectors**

#### **Input Field**
```jsx
<input className="
  w-full 
  px-4 py-2 
  border 
  border-gray-300
  focus:border-accent 
  focus:ring-2 
  focus:ring-accent/20
  /* NO rounded */
" />
```

#### **Select Dropdown**
```jsx
<select className="
  px-4 py-2 
  border 
  border-gray-300
  bg-white
  focus:border-accent
  /* NO rounded */
">
  <option>Opcja 1</option>
</select>
```

#### **QuantitySelector (Pastylka)**
```jsx
<div className="
  flex
  items-center
  bg-primary-light
  rounded-full    /* Pastylka! */
  border border-accent/30
  overflow-hidden
">
  <button className="w-8 h-10">-</button>
  <input className="w-10 text-center" />
  <button className="w-8 h-10">+</button>
</div>

/* Sizes (wersje):
 * sm: buttons w-6, input w-8, height h-8
 * md: buttons w-8, input w-10, height h-10 (domyślny)
 * lg: buttons w-10, input w-14, height h-12
 */
```

---

### **🏷️ Badges**

#### **Count Badge (Liczba produktów) - ZIELONY**
```jsx
/* DUŻY (large) - do użycia w headers, modals */
<span className="
  px-3 py-1              /* lg: większy padding */
  bg-success             /* ZAWSZE zielony (success) */
  text-white
  text-sm
  font-bold
  rounded-full           /* Pastylka */
">
  3
</span>

/* MAŁY (small) - mobile, inline */
<span className="
  px-2 py-0.5            /* Mniejszy padding */
  bg-success
  text-white
  text-xs
  font-bold
  rounded-full
">
  3
</span>
```

**ZASADA:** Count badges są **ZAWSZE ZIELONE** (`bg-success`), aby wskazywać aktywny stan/sukces:
- ✅ CartHeader - "Koszyk **[3]**"
- ✅ MobileNavigation - "Koszyk **[3]**"
- ✅ MobileBottomNavigation - badge przy ikonie koszyka
- ✅ HeaderActions - badge przy ikonie koszyka (desktop)
- ✅ CoffeeCardActions - badge przy cart button (produkt)

**Użycie:**
1. **Duży (lg):** `px-3 py-1 text-sm` - headers, modals
2. **Mały (sm):** `px-2 py-0.5 text-xs` - inline, mobile, ikonki

---

#### **Cart Icon Badge** (przy ikonie koszyka)
```jsx
<span className="
  absolute
  -top-2 -right-2
  bg-success             /* ZIELONY, nie accent! */
  text-white
  text-xs
  font-bold
  w-5 h-5
  rounded-full           /* Badge to pastylka */
  flex
  items-center
  justify-center
">
  3
</span>
```

**Użycie:**
- HeaderActions (desktop) - przy ikonie FaShoppingCart
- MobileBottomNavigation - przy ikonie koszyka
- CoffeeCardActions - przy cart button (po dodaniu do koszyka)

---

#### **Country Badge** (naklejka na kawie)
```jsx
<span className="
  absolute 
  top-4 right-4 
  px-4 py-2 
  bg-[countryColor]    /* Dynamiczny kolor */
  text-white 
  text-sm 
  font-semibold
  /* Sharp corners */
">
  Etiopia
</span>
```

**ZASADA:** Country badges są sharp corners (nie rounded), z dynamicznym kolorem zależnym od kraju.

---

#### **Variant Badge** (Gramatura, Typ)
```jsx
<span className="
  inline-flex 
  items-center 
  px-2 py-0.5 
  bg-accent/20 
  border 
  border-accent/30 
  text-accent 
  text-xs 
  font-medium
  rounded-full        /* Pastylka */
">
  250g
</span>
```

**Użycie:**
- CartItem - wyświetla opcje wariantu (Gramatura + Typ)
- QuickAddModal - opcje wariantu
- VariantSelector - opcje wyboru

---

## 📏 SPACING & LAYOUT

### **Container Widths**

```javascript
// Max widths dla różnych sekcji
max-w-7xl     // 1280px - główny content
max-w-6xl     // 1152px - produkty grid
max-w-4xl     // 896px - tekst content
max-w-2xl     // 672px - modals, forms
```

### **Grid Systems**

```jsx
// Products Grid (Coffees.jsx)
<div className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  xl:grid-cols-4
  gap-6
">
```

### **Padding/Margin Scale**

```javascript
// Używamy Tailwind spacing scale
p-4    // 16px - standard
p-6    // 24px - cards
p-8    // 32px - sections
p-12   // 48px - large sections
p-16   // 64px - hero sections
```

---

## 🎬 ANIMACJE & TRANSITIONS

### **Hover Effects**

#### **Cards**
```jsx
hover:transform 
hover:scale-[1.02]
transition-all 
duration-300
```

#### **Buttons**
```jsx
hover:scale-105
transition-all 
duration-200
```

#### **Links**
```jsx
hover:text-accent
transition-colors 
duration-200
```

### **Success States**

```jsx
// Dodano do koszyka - zielony na 2s
const [showSuccess, setShowSuccess] = useState(false);

// Po dodaniu:
setShowSuccess(true);
setTimeout(() => setShowSuccess(false), 2000);

// W JSX:
className={showSuccess ? 'bg-success' : 'bg-accent'}
```

### **Loading States**

```jsx
// Skeleton loader
<div className="animate-pulse bg-gray-200 h-64"></div>
```

---

## 🎨 Z-INDEX HIERARCHY

```javascript
// Z-index scale
z-0      // Base layer
z-10     // Overlays (coffee detail overlay)
z-20     // Dropdowns, tooltips
z-30     // Sticky elements (filters)
z-40     // Fixed header (scrolled)
z-50     // Media elements (coffee card image)
z-[100]  // Modals, cart drawer, mobile bottom nav
z-[150]  // Mobile hamburger toggle (nad modalami)
```

---

## 📦 ASSETS & RESOURCES

### **Logo Files**
```
public/logo/
  ├── icon-logo.png            # Favicon, ikona
  ├── horizontal-logo.png      # Header, footer (panorama)
  └── vertical-logo.png        # Mobile, hero (pionowe)

src/assets/
  ├── logo-icon.jpg            # Logo kwadratowe (starsze)
  └── logo-full.jpg            # Pełne logo (ciemne tło)
```

### **Media & Assets**
```
src/assets/
  ├── hero-desktop.mp4         # Video hero (desktop)
  ├── hero-mobile.mp4          # Video hero (mobile)
  ├── coffee-placeholder.jpg   # Placeholder produktu
  ├── footer.jpg               # Tło footera
  ├── history/                 # Zdjęcia do osi czasu (O nas)
  └── team/                    # Zdjęcia zespołu
```

### **Icons**
- **Library:** `react-icons` (już zainstalowane)
- **Import:** `import { FaShoppingCart } from 'react-icons/fa'`

---

## 📱 RESPONSIVE BREAKPOINTS

```javascript
// tailwind.config.js
screens: {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
  '3xl': '1600px'   // Custom breakpoint
}
```

### **Responsive Patterns**

```jsx
// Mobile-first approach
<div className="
  text-2xl           /* Mobile */
  md:text-4xl        /* Tablet */
  lg:text-5xl        /* Desktop */
">

// Grid responsive
<div className="
  grid 
  grid-cols-1        /* Mobile: 1 kolumna */
  md:grid-cols-2     /* Tablet: 2 kolumny */
  lg:grid-cols-3     /* Desktop: 3 kolumny */
  xl:grid-cols-4     /* Large: 4 kolumny */
">
```

---

## ✅ DO'S & DON'TS

### **✅ DO:**
- **Buttony i linki:** ZAWSZE `rounded-full` (pastylki)
- **Badges:** `rounded-full`
- **Info boxes/containers:** `rounded-lg` dozwolone
- **Karty produktów:** sharp corners (brak rounded)
- **Count badges ZAWSZE bg-success** (nie accent!)
- Konsekwentny spacing (Tailwind scale)
- Minimalistyczny design
- Dużo breathing room
- Focus na produkcie (kawa)

### **❌ DON'T:**
- **NIE dawaj buttonom `rounded-lg`** - TYLKO `rounded-full`!
- **Nie używaj bg-accent dla count badges** - tylko bg-success!
- Nie mieszaj różnych border-radius na tym samym typie elementu
- Nie rób divów w `rounded-full` (to tylko dla buttonów/badges)
- Nie przeładowuj animacjami
- Nie używaj jaskrawych kolorów (poza success/danger states)
- Nie ignoruj availability states

---

## 🔗 RELATED DOCS

- `README.md` - Project overview
- `CLAUDE.md` - AI assistant guide
- `tailwind.config.js` - Tailwind configuration

---

## 📝 CHANGELOG

### **4 Lutego 2026 - Cleanup & Aktualizacja**
- Zaktualizowano ścieżki logo (public/logo/ zamiast src/assets/)
- Zaktualizowano sekcję assets z faktyczną strukturą plików
- Dodano z-[150] do z-index hierarchy (mobile hamburger)
- Usunięto odniesienia do nieistniejących plików (DEVELOPMENT.md, roadmap.md)
- Zaktualizowano listę powiązanych dokumentów

### **25 Listopada 2025 - Synchronizacja Design System**
- **UPDATED:** Zsynchronizowano kolory z tailwind.config.js
- **BREAKING:** Count badges używają **bg-success** zamiast bg-green-500 (custom Tailwind color)
- Zaktualizowano wszystkie przykłady kodu w dokumentacji (bg-green-500 → bg-success)
- Zaktualizowano palety kolorów: success, danger (custom colors z tailwind.config)
- Poprawiono kolory: primary (#1E2A25), accent (#6B7F73), muted (#9CA8A1)
- Naprawiono HeaderActions - badge używa bg-success zamiast bg-accent

### **14 Listopada 2025 - Count Badges (ZIELONE)**
- **BREAKING:** Count badges teraz **bg-success** zamiast bg-accent
- Dodano wytyczne: Count Badge (large + small)
- Zaktualizowano CartHeader - zielony badge
- Zaktualizowano MobileNavigation - zielony badge zamiast nawiasu
- Dodano przykłady użycia: gdzie stosować zielone badges
- Zaktualizowano sekcję Kolory - success dla success states

### **14 Listopada 2025 - Evening Session**
- Dodano **CloseButton** component (reusable X dla modali)
- Fixed LoginModal - sharp corners + CloseButton
- Fixed RegisterModal - sharp corners + CloseButton
- Fixed CartHeader - CloseButton zamiast FaTimes
- Zaktualizowano zasady: CloseButton w modalach, MobileMenuToggle dla menu

### **14 Listopada 2025**
- Dodano oficjalne loga (4 wersje)
- Ustalono zasady corner/border (sharp + pastylki)
- Zaktualizowano kolory (zbliżone do logo)
- Dodano przykłady komponentów

---

**Maintainer:** @enowuigrek
**Last Review:** 4 Lutego 2026