# 🗺️ ROADMAP — Strzykawa Features

> **Branch roboczy:** `claude/features-2026-q1`
> **Ostatnia aktualizacja:** 2026-03-06
> **Zasada:** Każdy feature = osobny commit → można cherry-pick na `main` niezależnie

---

## ✅ DO ZROBIENIA (kolejność wdrożenia)

---

### 1. 🏷️ Kody rabatowe w koszyku
**Priorytet:** Wysoki — potrzebne do newslettera
**Branch commit:** `feat(checkout): add discount code field`

**Co:** Pole na kod rabatowy w `CheckoutPage.jsx`, obok pola "Uwagi do zamówienia" — oba rozwijane (collapse/expand), ten sam styl.

**Jak technicznie:**
- Nowa mutacja w `services/shopify/cart.js`:
  ```graphql
  mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]!) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      cart { discountCodes { code applicable } cost { ... } }
    }
  }
  ```
- Akcja `applyDiscountCode(code)` w `cartStore.js`
- UI: pole tekstowe + przycisk "Zastosuj", potwierdzenie z kwotą zniżki lub error "Kod nieważny"
- Zniżka widoczna w podsumowaniu zamówienia

**Pliki do edycji:**
- `src/services/shopify/cart.js` — nowa mutacja
- `src/store/cartStore.js` — akcja `applyDiscountCode`
- `src/pages/CheckoutPage.jsx` — sekcja UI obok "Uwagi"

**⚠️ Potrzebne od Damiana:** Żaden kod — testujemy z kodem stworzonym w Shopify Admin → Discounts

---

### 2. 📧 Powiadomienia "Wróć na stan" (Back in Stock)
**Priorytet:** Wysoki — gdy Damian ustali stany magazynowe
**Branch commit:** `feat(product): add back-in-stock notification form`

**Co:** Gdy wariant jest niedostępny — zamiast samego zablokowanego przycisku, pojawia się pole e-mail z tekstem "Powiadom mnie gdy dostępne".

**Jak technicznie:**
- Netlify Function (`netlify/functions/back-in-stock.js`) przyjmuje `{ email, variantId, productName }`
- Zapisuje do zewnętrznego serwisu (najprostsze: Mailchimp tag lub bezpośrednio Klaviyo) LUB tymczasowo do Netlify Blob / pliku JSON
- Shopify Webhook `inventory_item/update` → Netlify Function → wyślij e-mail do zapisanych

**Alternatywa (szybsza):** Shopify app "Back in Stock — Restock Rocket" lub "Notify Me!" — wtedy tylko wklejamy JS snippet, zero backendu. Rekomendowane na start.

**UX/UI na stronie produktu:**
```
[przycisk "Dodaj do koszyka" — zablokowany, szary]
─────────────────────────────────────────────
📬 Ten wariant jest chwilowo niedostępny
Zostaw e-mail — powiadomimy Cię gdy wróci:
[___________________] [Powiadom mnie →]
✓ Bez spamu. Tylko jedna wiadomość.
```

**Pliki do edycji:**
- `src/pages/CoffeeDetail.jsx` — sekcja pod zablokowanym przyciskiem
- `src/components/molecules/BackInStockForm.jsx` — nowy komponent
- `netlify/functions/back-in-stock.js` — nowa funkcja (jeśli custom)

**⚠️ Decyzja do podjęcia:** App Shopify vs. custom Netlify Function?

---

### 3. 🏢 LocalBusiness JSON-LD Schema
**Priorytet:** Wysoki — SEO lokalne, Google Maps
**Branch commit:** `feat(seo): add LocalBusiness JSON-LD schema`

**Co:** Dane strukturalne dla Google — pojawi się w Google Knowledge Panel i może wpłynąć na wyniki dla fraz "kawiarnia Częstochowa", "palarnia kawy Częstochowa".

**Jak technicznie:**
- Nowy komponent `src/components/LocalBusinessSchema.jsx`
- Wstrzyknięty raz w `App.jsx` (globalnie, nie per strona)

**Szablon do uzupełnienia:**
```json
{
  "@context": "https://schema.org",
  "@type": "CoffeeShop",
  "name": "Strzykawa Palarnia Kawy",
  "url": "https://strzykawa.com",
  "telephone": "+48668011806",
  "email": "kontakt@strzykawa.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ul. Dąbrowskiego 4",
    "addressLocality": "Częstochowa",
    "postalCode": "42-200",
    "addressCountry": "PL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "??",
    "longitude": "??"
  },
  "openingHoursSpecification": [ "?? — do uzupełnienia" ],
  "priceRange": "$$",
  "servesCuisine": "Coffee",
  "image": "https://strzykawa.com/og-image.png",
  "sameAs": [
    "https://www.facebook.com/strzykawa",
    "https://www.instagram.com/strzykawa"
  ]
}
```

**⚠️ Potrzebne od Damiana:**
- Dokładne godziny otwarcia kawiarni
- Kod pocztowy (42-200 czy inne?)
- Współrzędne GPS (lub wyszukamy z Google Maps)
- Linki do FB i Instagram (pełne URL)

---

### 4. 🍞 Breadcrumbs na stronie produktu
**Priorytet:** Średni — SEO + UX
**Branch commit:** `feat(seo): add breadcrumbs to product page`

**Co:** Na `/kawy/ethiopia-guji`:
- Wizualne: `Strona główna > Kawy > Ethiopia Guji` (nad tytułem produktu)
- JSON-LD `BreadcrumbList` dla Google (niewidoczny, w `<head>`)

**Jak technicznie:**
- Nowy atom `src/components/atoms/Breadcrumb.jsx`
- Użyty w `CoffeeDetail.jsx`
- BreadcrumbList JSON-LD przekazany przez prop `productSchema` do `SEO.jsx`

**UX:** Mały, muted tekst. Linki aktywne (`/` i `/kawy`), ostatni element nieaktywny.

---

### 5. 📤 Social Sharing na stronie produktu
**Priorytet:** Średni
**Branch commit:** `feat(product): add social share button`

**Co:** Przycisk "Udostępnij" na `CoffeeDetail.jsx`.

**Jak technicznie:**
- Web Share API (`navigator.share`) — natywne okno udostępniania na mobile
- Fallback na desktop: kopiuje link do schowka + toast "Link skopiowany!"
- Ikona: `FaShareAlt` z react-icons

**UX:** Mały przycisk obok tytułu produktu lub w sekcji akcji.

---

## 🔜 WKRÓTCE (nie teraz, ale zaplanowane)

### Newsletter
- **Status:** W planowaniu, wdrożenie przyszły tydzień
- **Integracja:** Shopify Email / Klaviyo / Mailchimp
- **Powiązanie:** Kody rabatowe (#1) powinny być gotowe przed startem newslettera

### Ostatnie sztuki w stanie ("Zostały tylko 3!")
- **Status:** Wstrzymane — Damian musi najpierw ustawić poprawne stany na Shopify
- **API:** `quantityAvailable` z Shopify Storefront API (już dostępne w query)
- **Trigger:** Pokazywać gdy `quantityAvailable <= 5`
- **Powiązanie:** Przed wdrożeniem sprawdzić z Damianem czy stany są wiarygodne

### Wyszukiwarka (rozbudowana)
- **Status:** Podstawowa wersja działa na `/kawy`, GA4 tracking `view_search_results` działa
- **Plan:** Osobna sesja z projektem UX
- **Cele:** Śledzenie czego szukają klienci, może dedykowana strona `/szukaj`

### Shopify Inbox (live chat)
- **Status:** Do rozważenia
- **Wdrożenie:** 1 script tag + aplikacja mobilna Shopify Inbox na telefon
- **Obsługa:** Przez apkę jak WhatsApp Business, można wysyłać kody, linki do produktów
- **Decyzja:** Czy Damian chce obsługiwać czat?

---

## ❌ CELOWO POMINIĘTE

| Feature | Powód |
|---------|-------|
| **Powiązane produkty** | Celowo — Damian nie chce chaosu przy kilkunastu kawach |
| **Recenzje/Oceny produktów** | Celowo na razie — Damian nie chciał. Rozważyć gdy sklep dojrzeje (wpływ na SEO!) |
| **Wishlist** | Mała wartość dla małego katalogu |
| **Multi-currency** | Zbędne dla polskiego sklepu lokalnego |
| **Zoom na zdjęciu** | Drobnostka, nie priorytet |
| **Porównanie produktów** | Zbędne dla kawy specialty |

---

## 📋 OTWARTE PYTANIA

1. **Back in Stock:** Shopify app (szybciej, nic do kodowania) vs. custom Netlify Function (więcej kontroli)?
2. **LocalBusiness schema:** Godziny otwarcia kawiarni? Dokładny kod pocztowy?
3. **Shopify Inbox:** Czy Damian chce obsługiwać live chat?
4. **Recenzje:** Warto wrócić do tematu — Judge.me ma darmowy plan i wpływa na SEO (gwiazdki w wynikach Google)

---

## 🔧 SETUP TECHICZNY TEGO BRANCHA

```bash
# Przełącz na branch roboczy
git checkout claude/features-2026-q1

# Wróć na main (produkcja)
git checkout main

# Cherry-pick pojedynczego commita na main
git checkout main
git cherry-pick <hash>

# Wypchnij branch
git push -u origin claude/features-2026-q1
```
