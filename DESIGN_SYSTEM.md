# 🎨 STRZYKAWA - DESIGN SYSTEM

> **Wersja:** 1.0  
> **Ostatnia aktualizacja:** 14 Listopada 2025  
> **Status:** Aktualne - oficjalne loga dodane

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
    DEFAULT: '#1f2a25',  // Ciemny zielony (zbliżone do logo)
    light: '#2a3630',     // Jaśniejszy odcień
    dark: '#151e1a'       // Najciemniejszy
  },
  accent: '#51685f',      // Średni zielony (akcenty)
  muted: '#8a9d94'        // Jasny zielony (tekst secondary)
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
success: '#10b981'   // Zielony (sukces, dodano do koszyka)
error: '#ef4444'     // Czerwony (błędy, niedostępne)
warning: '#f59e0b'   // Pomarańczowy (ostrzeżenia)
```

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
| 400 (Regular) | Tekst body |
| 500 (Medium) | Przyciski, linki |
| 600 (SemiBold) | Nagłówki H3-H6, labels |
| 700 (Bold) | Nagłówki H1-H2, CTA |

### **Rozmiary Tekstu**

```javascript
// Tailwind classes
text-xs      // 12px - meta info, badges
text-sm      // 14px - secondary text
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
- ❌ **NIGDY `rounded` (rounded-lg, rounded-xl, etc.)**
- ✅ **ZAWSZE sharp corners** (brak border-radius)
- ✅ **WYJĄTEK: Buttony typu "pastylka"** → `rounded-full`

#### **Przykłady:**

```jsx
// ❌ ŹLE
<div className="rounded-lg bg-primary">...</div>
<button className="rounded-xl">...</button>

// ✅ DOBRZE
<div className="bg-primary">...</div>               // Sharp corners
<button className="rounded-full px-8 py-3">...</button>  // Pastylka
```

### **🎯 Design Philosophy**

1. **Minimalizm** - Clean, uncluttered, dużo białej przestrzeni
2. **Geometric** - Proste kształty, ostre krawędzie
3. **Functional** - Form follows function
4. **Coffee-focused** - Wszystko podkreśla produkt

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
  bg-green-500 
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
  gap-2 
  bg-primary-light 
  rounded-full    /* Pastylka! */
  px-2 py-1
">
  <button className="rounded-full w-8 h-8">-</button>
  <span className="w-8 text-center">1</span>
  <button className="rounded-full w-8 h-8">+</button>
</div>
```

---

### **🏷️ Badges**

#### **Cart Badge** (liczba produktów)
```jsx
<span className="
  absolute 
  -top-2 -right-2 
  bg-accent 
  text-white 
  text-xs 
  font-bold
  w-5 h-5 
  rounded-full     /* Badge to pastylka */
  flex 
  items-center 
  justify-center
">
  3
</span>
```

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
className={showSuccess ? 'bg-green-500' : 'bg-accent'}
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
z-[100]  // Modals, cart drawer (highest)
```

---

## 📦 ASSETS & RESOURCES

### **Logo Files**
```
src/assets/
  ├── logo-icon.jpg          # Favicon, icon only
  ├── logo-full.jpg          # Full logo (dark bg)
  ├── horizontal-logo.png    # Header/footer
  └── vertical-logo.png      # Mobile, splash
```

### **Images**
```
src/assets/
  ├── hero/              # Hero section backgrounds
  ├── products/          # Coffee product photos
  ├── cafe/              # Interior photos
  └── placeholders/      # Temporary placeholders
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
- Używaj sharp corners (brak rounded)
- Używaj pastylki (rounded-full) dla buttonów
- Konsekwentny spacing (Tailwind scale)
- Minimalistyczny design
- Dużo breathing room
- Focus na produkcie (kawa)

### **❌ DON'T:**
- Nie używaj rounded-lg, rounded-xl nigdzie poza buttonami
- Nie mieszaj różnych border-radius
- Nie przeładowuj animacjami
- Nie używaj jaskrawych kolorów (poza accent)
- Nie ignoruj availability states

---

## 🔗 RELATED DOCS

- `README.md` - Project overview
- `DEVELOPMENT.md` - Full development plan
- `roadmap.md` - Current priorities
- `tailwind.config.js` - Tailwind configuration

---

## 📝 CHANGELOG

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
**Last Review:** 14 Listopada 2025  
**Next Review:** Po zakończeniu integracji Shopify
