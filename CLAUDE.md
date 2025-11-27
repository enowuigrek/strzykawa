# 🤖 CLAUDE.md - AI Assistant Guide

> **Version:** 1.0
> **Last Updated:** 27 November 2025
> **Purpose:** Comprehensive guide for AI assistants working on the Strzykawa codebase

---

## 📋 TABLE OF CONTENTS

1. [Project Overview](#project-overview)
2. [Tech Stack & Architecture](#tech-stack--architecture)
3. [Project Structure](#project-structure)
4. [Development Workflow](#development-workflow)
5. [Design System & Coding Conventions](#design-system--coding-conventions)
6. [Shopify Integration](#shopify-integration)
7. [State Management](#state-management)
8. [Key Files & Components](#key-files--components)
9. [Common Tasks](#common-tasks)
10. [Testing & Quality Assurance](#testing--quality-assurance)
11. [Deployment](#deployment)
12. [Troubleshooting](#troubleshooting)
13. [Important Notes for AI Assistants](#important-notes-for-ai-assistants)

---

## 🎯 PROJECT OVERVIEW

### What is Strzykawa?

Strzykawa is a **coffee shop and roastery e-commerce website** built for a specialty coffee business in Częstochowa, Poland. The project combines:

- **E-commerce functionality** via Shopify Storefront API
- **Modern React SPA** with Vite for optimal performance
- **Minimalist design** with sharp corners and geometric aesthetics
- **Mobile-first approach** with responsive layouts

### Current Status

- **Status:** 🚧 Active development
- **Coming Soon Mode:** Controlled via `VITE_COMING_SOON` env variable
- **Live URL:** https://strzykawa.netlify.app
- **Deployment:** Auto-deploy from GitHub to Netlify

### Key Features

✅ **Implemented:**
- Shopify Storefront API integration (GraphQL)
- Product catalog with filtering (roast type, country, processing)
- Dynamic pricing and variants (250g/1kg, whole beans/ground)
- Shopping cart with Shopify Cart API
- Product detail pages with variant selection
- Availability system (blocks unavailable variants)
- Checkout redirect to Shopify
- Mobile navigation with bottom bar

🔄 **In Progress:**
- Checkout success/canceled pages
- Payment integration (Przelewy24)
- Product photography and content

📋 **Planned:**
- Authentication system
- Order history
- Wishlist
- Blog & brewing guides

---

## 🛠 TECH STACK & ARCHITECTURE

### Core Technologies

```javascript
{
  "framework": "React 18.2.0",
  "bundler": "Vite 4.4.9",
  "routing": "React Router v6.15.0",
  "styling": "Tailwind CSS 3.4.0",
  "stateManagement": "Zustand 5.0.8",
  "icons": "React Icons 4.10.1",
  "ecommerce": "Shopify Storefront API (GraphQL)"
}
```

### Architecture Pattern

- **Component Architecture:** Atomic Design (atoms → molecules → organisms)
- **State Management:** Zustand with persistence (cart & auth stores)
- **Data Fetching:** Native Fetch API with GraphQL
- **Styling:** Utility-first with Tailwind CSS + custom theme
- **Routing:** Client-side routing with React Router

### Build Configuration

**Vite Config (`vite.config.js`):**
```javascript
// Path aliases configured:
'@' → './src'
'@components' → './src/components'
'@services' → './src/services'
'@store' → './src/store'
'@hooks' → './src/hooks'
'@constants' → './src/constants'
'@pages' → './src/pages'
'@assets' → './src/assets'
```

**Environment Variables:**
- `VITE_SHOPIFY_DOMAIN` - Shopify store domain
- `VITE_SHOPIFY_STOREFRONT_TOKEN` - Storefront API access token
- `VITE_COMING_SOON` - Controls Coming Soon mode (true/false)

---

## 📁 PROJECT STRUCTURE

```
strzykawa-site/
├── public/                    # Static assets (favicon, etc.)
├── src/
│   ├── assets/               # Images, videos, logos
│   │   ├── logo-icon.jpg
│   │   ├── logo-full.jpg
│   │   ├── horizontal-logo.png
│   │   └── vertical-logo.png
│   │
│   ├── components/           # React components (Atomic Design)
│   │   ├── atoms/           # Basic building blocks
│   │   │   ├── Button.jsx
│   │   │   ├── Logo.jsx
│   │   │   ├── CloseButton.jsx
│   │   │   ├── MobileMenuToggle.jsx
│   │   │   ├── QuantitySelector.jsx
│   │   │   └── Spinner.jsx
│   │   │
│   │   ├── molecules/       # Composite components
│   │   │   ├── FilterSection.jsx
│   │   │   ├── ProductGallery.jsx
│   │   │   └── SearchBar.jsx
│   │   │
│   │   ├── organisms/       # Complex sections
│   │   │   ├── CoffeeGrid.jsx
│   │   │   ├── FilterDrawer.jsx
│   │   │   └── MobileBottomNavigation.jsx
│   │   │
│   │   ├── layout/          # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── PageHeader.jsx
│   │   │   └── PageLayout.jsx
│   │   │
│   │   ├── features/        # Feature-specific components
│   │   │   ├── hero/        # Hero section components
│   │   │   ├── about/       # About page components
│   │   │   └── contact/     # Contact page components
│   │   │
│   │   ├── coffee/          # Coffee product components
│   │   │   ├── CoffeeCard.jsx
│   │   │   ├── CoffeeCardActions.jsx
│   │   │   ├── CoffeeCardContent.jsx
│   │   │   ├── CoffeeCardMedia.jsx
│   │   │   ├── CoffeeOverlay.jsx
│   │   │   └── ParametrSelector.jsx
│   │   │
│   │   ├── cart/            # Cart components
│   │   │   ├── CartModal.jsx
│   │   │   ├── CartHeader.jsx
│   │   │   ├── CartContent.jsx
│   │   │   ├── CartFooter.jsx
│   │   │   └── CartItem.jsx
│   │   │
│   │   ├── header/          # Header navigation components
│   │   │   ├── DesktopNavigation.jsx
│   │   │   ├── MobileNavigation.jsx
│   │   │   └── HeaderActions.jsx
│   │   │
│   │   └── modals/          # Modal components
│   │       ├── LoginModal.jsx
│   │       └── RegisterModal.jsx
│   │
│   ├── pages/               # Route pages
│   │   ├── Home.jsx
│   │   ├── Coffees.jsx
│   │   ├── CoffeeDetail.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── B2B.jsx
│   │   ├── ComingSoon.jsx
│   │   ├── CheckoutSuccess.jsx
│   │   ├── CheckoutCanceled.jsx
│   │   ├── NotFound.jsx
│   │   └── LegalPages.jsx
│   │
│   ├── services/            # External services
│   │   └── shopify/         # Shopify integration
│   │       ├── client.js    # GraphQL client
│   │       ├── products.js  # Product queries
│   │       ├── cart.js      # Cart mutations
│   │       ├── mapper.js    # Data mappers
│   │       └── index.js     # Service aggregator
│   │
│   ├── store/               # Zustand stores
│   │   ├── cartStore.js     # Cart state management
│   │   └── authStore.js     # Auth state management
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useScrollAnimation.js
│   │   ├── useHeroAnimation.js
│   │   ├── useToggleSet.js
│   │   ├── useBackdropClick.js
│   │   ├── useScrollToTop.js
│   │   └── useVideoLoop.js
│   │
│   ├── constants/           # App constants
│   │   ├── navigation.js    # Navigation links
│   │   ├── layout.js        # Layout constants
│   │   ├── colors.js        # Color constants
│   │   └── timings.js       # Animation timings
│   │
│   ├── utils/               # Utility functions
│   │   └── logger.js        # Logging utility
│   │
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles
│
├── .env                     # Environment variables (local)
├── .env.development         # Development config
├── .env.production          # Production config
├── .eslintrc.cjs            # ESLint configuration
├── .prettierrc              # Prettier configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies & scripts
├── README.md                # Project documentation
├── DESIGN_SYSTEM.md         # Design guidelines
└── CLAUDE.md                # This file
```

---

## 🔧 DEVELOPMENT WORKFLOW

### Setup & Installation

```bash
# Clone repository
git clone <repo-url>
cd strzykawa-site

# Install dependencies
npm install

# Configure environment variables
# .env.development and .env.production are in repo
# For local overrides, create .env.local (gitignored)

# Start development server
npm run dev
# → http://localhost:5173
```

### NPM Scripts

```bash
npm run dev          # Start dev server (Vite HMR)
npm run build        # Production build → dist/
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format with Prettier
npm run format:check # Check formatting
```

### Git Workflow

**Branch Strategy:**
- `main` - Production branch (auto-deploy to Netlify)
- `claude/*` - Feature branches for AI assistant work
- Feature branches follow format: `claude/feature-name-sessionid`

**Commit Message Convention:**
```
<type>: <description>

Examples:
- feat: Add variant selector to product cards
- fix: Fix cart badge color to use bg-success
- style: Update footer layout for mobile
- refactor: Extract CloseButton to reusable component
- docs: Update DESIGN_SYSTEM.md with badge guidelines
```

**Pushing Changes:**
```bash
# Always push to the designated claude/* branch
git push -u origin claude/your-branch-name

# NEVER push to main without explicit permission
```

### Coming Soon Mode

The app has a "Coming Soon" mode controlled by environment variables:

```javascript
// .env.development
VITE_COMING_SOON=false  // Show full site in development

// .env.production
VITE_COMING_SOON=true   // Show Coming Soon page in production

// App.jsx
const COMING_SOON_MODE = import.meta.env.VITE_COMING_SOON === 'true';

if (COMING_SOON_MODE) {
    return <ComingSoon />; // Shows landing page
}
```

---

## 🎨 DESIGN SYSTEM & CODING CONVENTIONS

> **CRITICAL:** Always reference `DESIGN_SYSTEM.md` for design decisions

### Core Design Principles

1. **Sharp Corners Only** - NEVER use `rounded-lg`, `rounded-xl`, etc.
2. **Pills for Buttons & Badges** - Use `rounded-full` ONLY for buttons and badges
3. **Green Count Badges** - Count badges ALWAYS use `bg-success` (not accent!)
4. **Minimalist Aesthetic** - Clean, geometric, coffee-focused
5. **Mobile-First** - Design for mobile, enhance for desktop

### Color System

```javascript
// tailwind.config.js
colors: {
  primary: {
    DEFAULT: '#1E2A25',  // Dark green (main background)
    light: '#2C3A35',     // Lighter shade (hover states)
    dark: '#141C18'       // Darkest (footer, header)
  },
  accent: '#6B7F73',      // Medium green (links, secondary buttons)
  muted: '#9CA8A1',       // Light green (secondary text)
  success: {
    DEFAULT: '#0E8C6F',   // SUCCESS BADGES (count badges!)
    dark: '#0B6F55'
  },
  danger: {
    DEFAULT: '#C9423A',   // Error states
    dark: '#A7322D'
  },
  cta: {
    DEFAULT: '#3A5F55',   // Checkout buttons
    hover: '#2F4F46'
  }
}
```

### Typography

```javascript
// Font: Dosis (400, 500, 600, 700)
font-sans → 'Dosis', 'Arial', 'sans-serif'

// Weights:
400 - Body text
500 - Buttons, links
600 - H3-H6, labels
700 - H1-H2, CTAs, badges
```

### Component Patterns

#### Buttons (Pills)

```jsx
// Primary Button
<button className="
  rounded-full
  px-8 py-3
  bg-accent
  text-white
  font-medium
  hover:bg-accent/90
  hover:scale-105
  transition-all duration-200
">
  Click Me
</button>

// Success State (added to cart)
<button className="
  rounded-full
  px-8 py-3
  bg-success
  text-white
">
  ✓ Dodano!
</button>
```

#### Cards (Sharp Corners)

```jsx
// Product Card - NO ROUNDED CORNERS
<div className="
  bg-primary-light
  overflow-hidden
  hover:scale-[1.02]
  transition-all duration-300
">
  {/* Content */}
</div>
```

#### Badges

```jsx
// Count Badge (ALWAYS bg-success!)
<span className="
  px-3 py-1
  bg-success          // ALWAYS green!
  text-white
  text-sm
  font-bold
  rounded-full
">
  3
</span>

// Small Badge (mobile, inline)
<span className="
  px-2 py-0.5
  bg-success
  text-white
  text-xs
  font-bold
  rounded-full
">
  3
</span>
```

### Responsive Breakpoints

```javascript
screens: {
  'sm': '640px',   // Tablet
  'md': '768px',   // Tablet landscape
  'lg': '1024px',  // Desktop
  'xl': '1280px',  // Large desktop
  '2xl': '1536px', // Extra large
  '3xl': '1600px'  // Custom breakpoint
}
```

### Code Style (ESLint + Prettier)

```javascript
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 4,
  "useTabs": false
}

// ESLint rules
{
  "react/prop-types": "warn",
  "no-console": ["warn", { "allow": ["warn", "error"] }],
  "prefer-const": "warn",
  "no-var": "error"
}
```

### Important Design Rules

✅ **DO:**
- Use sharp corners for cards, modals, inputs
- Use `rounded-full` for buttons and badges
- Use `bg-success` for count badges
- Follow mobile-first approach
- Keep designs minimalist and clean

❌ **DON'T:**
- Don't use `rounded-lg`, `rounded-xl` anywhere except buttons/badges
- Don't use `bg-accent` for count badges (use `bg-success`)
- Don't mix different border-radius values
- Don't add features beyond requirements (avoid over-engineering)
- Don't ignore availability states in products

---

## 🛒 SHOPIFY INTEGRATION

### Architecture

```
React Components
       ↓
  Zustand Store (cartStore.js)
       ↓
  Shopify Service (services/shopify/)
       ↓
  GraphQL Client (client.js)
       ↓
  Shopify Storefront API
```

### Shopify Service Structure

**`services/shopify/client.js`** - GraphQL client
```javascript
class ShopifyClient {
  constructor() {
    this.domain = import.meta.env.VITE_SHOPIFY_DOMAIN;
    this.storefrontToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
    this.apiUrl = `https://${this.domain}/api/2023-10/graphql.json`;
  }

  async graphqlFetch(query, variables = {}) {
    // Executes GraphQL queries
  }
}
```

**`services/shopify/products.js`** - Product queries
- `fetchProducts()` - Get all products
- `fetchProduct(handle)` - Get single product by handle
- `searchProducts(query)` - Search products

**`services/shopify/cart.js`** - Cart mutations
- `createCart()` - Create new cart
- `addToCart(cartId, lines)` - Add items to cart
- `removeFromCart(cartId, lineIds)` - Remove items
- `updateCartLines(cartId, lines)` - Update quantities

**`services/shopify/mapper.js`** - Data transformation
- Maps Shopify GraphQL responses to frontend data structures

### Product Data Structure

```javascript
{
  id: "gid://shopify/Product/...",
  name: "Ethiopia Guji Natural",
  handle: "ethiopia-guji-natural",
  description: "Fruity and floral...",
  price: 45.00,
  currency: "PLN",
  roastLevel: "Light",
  country: "Ethiopia",
  region: "Guji",
  process: "Natural",
  tastingNotes: ["Blueberry", "Jasmine", "Honey"],
  availability: true,
  images: ["url1", "url2"],
  variants: [
    {
      id: "gid://shopify/ProductVariant/...",
      title: "250g - Whole Beans",
      price: 45.00,
      availableForSale: true,
      selectedOptions: [
        { name: "Gramatura", value: "250g" },
        { name: "Typ", value: "Ziarna" }
      ]
    }
  ]
}
```

### Cart Data Flow

1. **Initialize Cart** - On app load, check localStorage for cart ID
2. **Add to Cart** - Create cart if needed, add items via mutation
3. **Update Cart** - Update quantities, remove items
4. **Checkout** - Redirect to Shopify checkout URL
5. **Post-Checkout** - Handle success/canceled callbacks

### GraphQL Query Examples

**Fetch Products:**
```graphql
query GetProducts($first: Int!) {
  products(first: $first) {
    edges {
      node {
        id
        title
        handle
        description
        priceRange { ... }
        variants { ... }
        images { ... }
        metafields { ... }
      }
    }
  }
}
```

**Create Cart:**
```graphql
mutation CreateCart($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id
      checkoutUrl
      lines { ... }
      cost { ... }
    }
  }
}
```

---

## 🗃️ STATE MANAGEMENT

### Zustand Stores

#### Cart Store (`store/cartStore.js`)

```javascript
// State
{
  cart: null,              // Shopify cart object
  items: [],               // Mapped cart items
  isLoading: false,        // Loading state
  error: null,             // Error message
  status: 'idle'           // 'idle' | 'pending' | 'completed'
}

// Actions
initializeCart()           // Create or restore cart
addItem(product, variantId, quantity)
removeItem(lineId)
updateQuantity(lineId, newQuantity)
clearCart()
goToCheckout()
markCheckoutCompleted()    // Call on /checkout/success
markCheckoutCanceled()     // Call on /checkout/canceled

// Getters
getTotalItems()
getTotalPrice()
getCurrencyCode()
isInCart(productId)
getItemQuantity(productId)
```

**Persistence:**
- Uses `zustand/middleware/persist`
- Stored in `localStorage` as `strzykawa-cart`
- Persists: `cart`, `items`, `status`

#### Auth Store (`store/authStore.js`)

```javascript
// State
{
  user: null,
  isAuthenticated: false,
  isLoading: false
}

// Actions
login(email, password)
register(email, password)
logout()
```

### Using Stores in Components

```jsx
import { useCartStore } from '@store/cartStore';

function MyComponent() {
  // Select only what you need
  const { items, addItem, isLoading } = useCartStore();

  // Access getters
  const totalItems = useCartStore(state => state.getTotalItems());

  return (
    <button onClick={() => addItem(product, variantId, 1)}>
      Add to Cart ({totalItems})
    </button>
  );
}
```

---

## 📝 KEY FILES & COMPONENTS

### Critical Files to Know

#### `src/App.jsx`
- Main application component
- Handles routing with React Router
- Controls Coming Soon mode
- Includes `ScrollToTop` hook for route changes

#### `src/components/layout/Header.jsx`
- Desktop & mobile navigation
- Cart icon with badge
- Sticky header on scroll
- Integrates `DesktopNavigation`, `MobileNavigation`, `HeaderActions`

#### `src/components/layout/Footer.jsx`
- Company info, social links
- Legal links (privacy, terms)
- Newsletter signup (placeholder)
- Mobile & desktop layouts

#### `src/components/cart/CartModal.jsx`
- Full cart modal overlay
- Displays cart items, total, checkout button
- Handles empty cart state
- Integrates with `cartStore`

#### `src/pages/Coffees.jsx`
- Product catalog page
- Filtering by roast, country, process
- Search functionality
- Grid layout with `CoffeeCard` components

#### `src/pages/CoffeeDetail.jsx`
- Individual product page
- Variant selection (weight, grind type)
- Add to cart functionality
- Image gallery
- Product details (origin, roast, tasting notes)

### Component Hierarchy

```
App
├── Header
│   ├── Logo
│   ├── DesktopNavigation
│   ├── MobileNavigation
│   │   └── MobileMenuToggle
│   └── HeaderActions
│       └── CartIcon (with badge)
│
├── Pages (Routes)│   ├── Home
│   │   ├── HeroSection
│   │   ├── FeaturedCoffees
│   │   └── CallToAction
│   │
│   ├── Coffees
│   │   ├── FilterDrawer
│   │   ├── SearchBar
│   │   └── CoffeeGrid
│   │       └── CoffeeCard[]
│   │
│   └── CoffeeDetail
│       ├── CoffeeCardMedia
│       ├── CoffeeCardContent
│       ├── ParametrSelector
│       └── CoffeeCardActions
│
├── CartModal
│   ├── CartHeader (with CloseButton)
│   ├── CartContent
│   │   └── CartItem[]
│   └── CartFooter
│
└── Footer
    ├── CompanyInfo
    ├── SocialLinks
    └── LegalLinks
```

---

## ✅ COMMON TASKS

### Task 1: Add a New Product Component

```bash
# 1. Create component file
touch src/components/coffee/NewComponent.jsx

# 2. Follow atomic design pattern
# atoms → molecules → organisms

# 3. Export from index.js
echo "export { NewComponent } from './NewComponent';" >> src/components/coffee/index.js

# 4. Use in parent component
import { NewComponent } from '@components/coffee';
```

### Task 2: Update Design System Colors

```javascript
// 1. Update tailwind.config.js
colors: {
  newColor: '#HEXCODE'
}

// 2. Update DESIGN_SYSTEM.md documentation

// 3. Use in components
className="bg-newColor text-white"
```

### Task 3: Add New Route/Page

```jsx
// 1. Create page component
// src/pages/NewPage.jsx
export function NewPage() {
  return <div>New Page</div>;
}

// 2. Add route in App.jsx
import { NewPage } from './pages/NewPage';

<Routes>
  <Route path="/new-page" element={<NewPage />} />
</Routes>

// 3. Add navigation link (optional)
// Update src/constants/navigation.js
```

### Task 4: Modify Shopify Query

```javascript
// 1. Update query in services/shopify/products.js
const QUERY = `
  query GetProducts {
    products {
      // Add new fields
      newField
    }
  }
`;

// 2. Update mapper in services/shopify/mapper.js
export function mapProduct(shopifyProduct) {
  return {
    // Map new field
    newField: shopifyProduct.newField
  };
}

// 3. Update component to use new data
```

### Task 5: Fix a Bug

```bash
# 1. Identify the issue location
npm run lint  # Check for linting errors

# 2. Reproduce the bug locally
npm run dev

# 3. Fix the code
# - Follow design system rules
# - Maintain code style consistency
# - Add comments for complex logic

# 4. Test the fix
# - Manual testing in browser
# - Check mobile & desktop views

# 5. Commit with descriptive message
git add .
git commit -m "fix: Description of bug fix"
```

---

## 🧪 TESTING & QUALITY ASSURANCE

### Manual Testing Checklist

**Before Committing:**
- [ ] Run `npm run lint` - No errors
- [ ] Run `npm run format:check` - Code formatted
- [ ] Test in Chrome DevTools mobile view
- [ ] Test on actual mobile device (if possible)
- [ ] Test cart functionality (add/remove/update)
- [ ] Check console for errors/warnings
- [ ] Verify design system compliance (sharp corners, badge colors)

**Design System Checks:**
- [ ] No `rounded-lg` or `rounded-xl` (except buttons/badges)
- [ ] Count badges use `bg-success` (not `bg-accent`)
- [ ] Buttons use `rounded-full`
- [ ] Colors match `tailwind.config.js`
- [ ] Mobile-first responsive design

**Shopify Integration Checks:**
- [ ] Products load correctly
- [ ] Variants display properly
- [ ] Cart updates persist
- [ ] Unavailable variants are blocked
- [ ] Checkout redirect works

### Browser Compatibility

**Primary Targets:**
- Chrome/Edge (Chromium) - Latest 2 versions
- Firefox - Latest 2 versions
- Safari - Latest 2 versions
- Mobile Safari (iOS) - Latest 2 versions
- Chrome Mobile (Android) - Latest 2 versions

### Performance Checks

- Use Lighthouse for performance audits
- Check Core Web Vitals (LCP, FID, CLS)
- Optimize images (WebP format preferred)
- Lazy load images below the fold
- Code splitting for route-based chunks

---

## 🚀 DEPLOYMENT

### Netlify Auto-Deploy

**Trigger:** Push to `main` branch

**Build Settings:**
```bash
Build command: npm run build
Publish directory: dist
```

**Environment Variables (Netlify Dashboard):**
```
VITE_SHOPIFY_DOMAIN=bew92i-nu.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=***
VITE_COMING_SOON=true
```

### Manual Build

```bash
# Build for production
npm run build

# Preview build locally
npm run preview

# Deploy dist/ folder
# (Netlify auto-deploys from GitHub)
```

### Pre-Deploy Checklist

- [ ] All tests pass
- [ ] No console errors in production build
- [ ] Environment variables configured in Netlify
- [ ] Coming Soon mode set correctly
- [ ] Shopify credentials valid
- [ ] Mobile navigation works
- [ ] Cart checkout redirects to Shopify

---

## 🐛 TROUBLESHOOTING

### Common Issues

#### 1. Shopify API Not Working

**Symptom:** Products not loading, cart errors

**Solutions:**
```bash
# Check environment variables
echo $VITE_SHOPIFY_DOMAIN
echo $VITE_SHOPIFY_STOREFRONT_TOKEN

# Verify .env file exists
cat .env

# Check Shopify credentials in Shopify admin
# Settings → Apps → Storefront API
```

#### 2. Cart Not Persisting

**Symptom:** Cart empties on page refresh

**Solutions:**
```javascript
// Check localStorage
localStorage.getItem('strzykawa-cart');

// Check cartStore status
console.log(useCartStore.getState().status);

// Clear and reinitialize
localStorage.removeItem('strzykawa-cart');
window.location.reload();
```

#### 3. Design System Violations

**Symptom:** Rounded corners where they shouldn't be

**Solutions:**
```bash
# Search for incorrect usage
grep -r "rounded-lg" src/components/
grep -r "rounded-xl" src/components/

# Replace with correct styles
# Cards/Modals → Remove rounded classes
# Buttons/Badges → Use rounded-full
```

#### 4. Build Errors

**Symptom:** `npm run build` fails

**Solutions:**
```bash
# Clear cache
rm -rf node_modules dist
npm install

# Check for unused imports
npm run lint

# Fix import paths
# Use path aliases (@components, @services, etc.)
```

#### 5. Mobile Navigation Issues

**Symptom:** Menu doesn't open/close

**Solutions:**
```javascript
// Check MobileMenuToggle state
// Verify z-index hierarchy (z-[100] for modals)
// Check backdrop click handler

// Debug in mobile view
// Chrome DevTools → Toggle device toolbar
```

---

## 🤖 IMPORTANT NOTES FOR AI ASSISTANTS

### Critical Rules

1. **ALWAYS Read Design System First**
   - Before making ANY design changes, read `DESIGN_SYSTEM.md`
   - Follow sharp corners rule (no `rounded-lg`/`rounded-xl`)
   - Use `bg-success` for count badges (NEVER `bg-accent`)

2. **NEVER Over-Engineer**
   - Only implement what's requested
   - Don't add features beyond requirements
   - Don't refactor code unless explicitly asked
   - Keep solutions simple and focused

3. **Respect Existing Patterns**
   - Follow Atomic Design structure
   - Use existing components before creating new ones
   - Maintain consistent code style
   - Use path aliases (`@components`, etc.)

4. **Mobile-First Approach**
   - Design for mobile screens first
   - Test responsive breakpoints
   - Use Tailwind responsive classes (`md:`, `lg:`)

5. **Shopify Integration**
   - NEVER hardcode product data
   - Always fetch from Shopify API
   - Handle loading/error states
   - Respect variant availability

### Code Review Checklist

Before submitting changes:

- [ ] Read `DESIGN_SYSTEM.md` for design rules
- [ ] No `rounded-lg`/`rounded-xl` (except buttons/badges)
- [ ] Count badges use `bg-success`
- [ ] Mobile-first responsive design
- [ ] No console.log() statements (use logger utility)
- [ ] PropTypes defined for components
- [ ] ESLint warnings addressed
- [ ] Code formatted with Prettier
- [ ] No hardcoded data (use Shopify API)
- [ ] Error handling for async operations
- [ ] Loading states for data fetching
- [ ] Accessibility considerations (ARIA labels)

### Communication Guidelines

When working on tasks:

1. **Clarify Requirements**
   - Ask questions if requirements are unclear
   - Confirm design decisions with user
   - Reference `DESIGN_SYSTEM.md` for styling

2. **Explain Changes**
   - Describe what you changed and why
   - Reference file paths with line numbers
   - Highlight design system compliance

3. **Document Decisions**
   - Add comments for complex logic
   - Update relevant docs (README, DESIGN_SYSTEM)
   - Explain trade-offs made

### Common Pitfalls to Avoid

❌ **Don't:**
- Use `rounded-lg` or `rounded-xl` on cards/modals
- Use `bg-accent` for count badges (use `bg-success`)
- Create new components when existing ones can be reused
- Add features not requested
- Ignore mobile view
- Hardcode product data
- Skip error handling
- Leave console.log() statements

✅ **Do:**
- Use `rounded-full` for buttons and badges
- Use `bg-success` for count badges
- Follow Atomic Design pattern
- Keep code minimal and focused
- Test mobile & desktop views
- Fetch data from Shopify API
- Handle errors gracefully
- Use logger utility for debugging

### File Modification Priority

**High Impact** (modify with care):
- `src/App.jsx` - Main routing logic
- `src/store/cartStore.js` - Cart state management
- `services/shopify/*` - Shopify integration
- `tailwind.config.js` - Design system colors

**Medium Impact** (safe to modify):
- Component files in `src/components/*`
- Page files in `src/pages/*`
- Hooks in `src/hooks/*`
- Constants in `src/constants/*`

**Low Impact** (safe to modify freely):
- Individual component styles
- Helper utilities
- Documentation files

### Testing Requirements

**Must Test:**
- Mobile view (375px width minimum)
- Cart add/remove/update operations
- Product variant selection
- Checkout redirect
- Navigation (desktop & mobile)
- Coming Soon mode toggle

**Nice to Test:**
- Safari compatibility
- Slow network conditions
- Error states
- Loading states
- Edge cases (empty cart, no products)

---

## 📚 REFERENCE DOCUMENTS

- **`README.md`** - Project overview and setup
- **`DESIGN_SYSTEM.md`** - Design guidelines and component patterns
- **`package.json`** - Dependencies and scripts
- **`tailwind.config.js`** - Tailwind CSS configuration
- **`.eslintrc.cjs`** - ESLint rules
- **`.prettierrc`** - Prettier configuration

---

## 🔄 CHANGELOG

### Version 1.0 (27 November 2025)
- Initial CLAUDE.md creation
- Comprehensive codebase documentation
- Design system integration
- Shopify architecture explanation
- Common tasks and troubleshooting guides

---

**Maintainer:** @enowuigrek
**Project:** Strzykawa Coffee Shop & Roastery
**Framework:** React + Vite + Shopify
**License:** © 2025 Strzykawa. All rights reserved.

---

**For questions or clarifications, refer to:**
- `README.md` - Project overview
- `DESIGN_SYSTEM.md` - Design rules
- Repository issues - Bug reports and feature requests
