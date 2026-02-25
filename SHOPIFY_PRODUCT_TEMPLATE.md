# 📦 Szablon Produktowy - Kawa Strzykawa

> **Dla pracowników:** Instrukcja jak dodawać nowe kawy do sklepu Shopify

---

## 🎯 Przegląd

Ten dokument opisuje **krok po kroku**, jak dodać nową kawę do sklepu Strzykawa w Shopify Admin. Każdy produkt musi zawierać określone pola, warianty i metafieldy, aby poprawnie wyświetlać się na stronie.

---

## 📝 Wymagane Informacje o Kawie

Przed dodaniem produktu przygotuj następujące informacje:

### Podstawowe dane:
- **Nazwa kawy** (np. "Ethiopia Guji Natural")
- **Opis kawy** (krótki opis smaku, aromatu, pochodzenia)
- **Cena bazowa** (za 250g, np. 45.00 PLN)
- **Zdjęcia produktu** (minimum 1, zalecane 2-3)

### Dane szczegółowe (metafieldy):
- **Kraj pochodzenia** (np. "Etiopia")
- **Region** (np. "Guji")
- **Wysokość uprawy** (np. "1800-2200 m n.p.m.")
- **Odmiana** (np. "Heirloom")
- **Metoda obróbki** (np. "Natural", "Washed", "Honey")
- **Stopień palenia** (np. "Jasne", "Średnie", "Ciemne")
- **Nuty smakowe** (lista, np. "Jagody, Jaśmin, Miód")
- **Ocena SCA** (opcjonalne, np. "87 pkt")
- **Producent** (opcjonalne, nazwa farmy)

---

## 🔧 Krok 1: Tworzenie Produktu

### 1.1 Wejdź do Shopify Admin

1. Zaloguj się na [admin.shopify.com](https://admin.shopify.com)
2. Z menu bocznego wybierz **Products** (Produkty)
3. Kliknij **Add product** (Dodaj produkt)

### 1.2 Wypełnij Podstawowe Pola

#### **Title (Tytuł):**
```
Ethiopia Guji Natural
```
- Format: `[Kraj] [Region/Nazwa] [Obróbka]`
- Używaj polskich znaków (ą, ć, ę, etc.)

#### **Description (Opis):**
```html
Wyjątkowa kawa z regionu Guji w Etiopii. Metoda obróbki natural nadaje
jej intensywne nuty jagodowe i kwiatowe. Idealnie sprawdza się jako espresso
i w przygotowaniach alternatywnych.

<strong>Profil smakowy:</strong> Jagody, Jaśmin, Miód
<strong>Intensywność:</strong> ⚫⚫⚫⚪⚪ (3/5)
```

- **Format:** Markdown lub HTML (prosty)
- **Długość:** 2-4 zdania + profil smakowy
- Unikaj nadmiernego formatowania

---

## 🏷️ Krok 2: Cena i Dostępność

### 2.1 Cena (Price)

**Cena bazowa** to zawsze cena za **250g ziarna**:

```
45.00 PLN
```

- **Cena zawiera VAT 23%** (brutto)
- Ceny innych wariantów (1kg, mielona) są obliczane automatycznie przez warianty

### 2.2 Porównaj Przy Cenę (Compare at price)

- **Zostaw puste** (nie używamy tej funkcji)

### 2.3 Cost per item (Koszt jednostkowy)

- Opcjonalne, do wewnętrznej księgowości
- Wpisz koszt zakupu surowca (brutto)

### 2.4 SKU (Stock Keeping Unit)

Format: `COFFEE-[KOD]-250G`

Przykład:
```
COFFEE-ETH-GUJI-250G
```

- `ETH` = kod kraju (3 litery)
- `GUJI` = region/nazwa (bez spacji)
- `250G` = bazowa gramatura

---

## 📦 Krok 3: Warianty (Variants)

### ⚠️ WAŻNE: Struktura Wariantów

Każda kawa ma **4 warianty**:

| Gramatura | Typ          | SKU                    | Cena       |
|-----------|--------------|------------------------|------------|
| 250g      | Ziarna       | `COFFEE-ETH-GUJI-250G` | 45.00 PLN  |
| 250g      | Mielona      | `COFFEE-ETH-GUJI-250M` | 45.00 PLN  |
| 1kg       | Ziarna       | `COFFEE-ETH-GUJI-1KG`  | 160.00 PLN |
| 1kg       | Mielona      | `COFFEE-ETH-GUJI-1KM`  | 160.00 PLN |

### 3.1 Dodaj Opcje Wariantów

W sekcji **Variants** kliknij **Add options**:

#### **Opcja 1: Gramatura**
- Nazwa opcji: `Gramatura`
- Wartości: `250g`, `1kg`

#### **Opcja 2: Typ**
- Nazwa opcji: `Typ`
- Wartości: `Ziarna`, `Mielona`

Shopify automatycznie stworzy 4 kombinacje (2 × 2 = 4 warianty).

### 3.2 Wypełnij Ceny Wariantów

Dla każdego wariantu ustaw:

1. **250g / Ziarna:**
   - Cena: `45.00 PLN`
   - SKU: `COFFEE-ETH-GUJI-250G`
   - Inventory: Ilość dostępna (np. 50)

2. **250g / Mielona:**
   - Cena: `45.00 PLN`
   - SKU: `COFFEE-ETH-GUJI-250M`
   - Inventory: Ilość dostępna (np. 50)

3. **1kg / Ziarna:**
   - Cena: `160.00 PLN` (ok. 3.5x cena 250g)
   - SKU: `COFFEE-ETH-GUJI-1KG`
   - Inventory: Ilość dostępna (np. 20)

4. **1kg / Mielona:**
   - Cena: `160.00 PLN`
   - SKU: `COFFEE-ETH-GUJI-1KM`
   - Inventory: Ilość dostępna (np. 20)

### 3.3 Przelicznik Cen (Gramatura)

| Gramatura | Mnożnik | Przykład (45 PLN za 250g) |
|-----------|---------|---------------------------|
| 250g      | 1.0x    | 45.00 PLN                 |
| 500g      | 2.0x    | 90.00 PLN                 |
| 1kg       | 3.5x    | 157.50 PLN → 160.00 PLN   |

**Zaokrąglaj do .00 lub .50 PLN** dla czytelności.

---

## 🖼️ Krok 4: Zdjęcia Produktu

### 4.1 Dodaj Zdjęcia

Minimalne wymagania:
- **1 zdjęcie główne** (opakowanie kawy)
- Zalecane: 2-3 zdjęcia (opakowanie, kawa w ziarnach, kubek)

### 4.2 Wymiary i Format

- **Format:** JPG lub PNG
- **Rozmiar:** Min. 1200×1200px, zalecane 2000×2000px
- **Proporcje:** Kwadrat (1:1) preferowane
- **Waga pliku:** Max 5 MB

### 4.3 Kolejność Zdjęć

1. **Główne:** Opakowanie na białym/neutralnym tle
2. **Drugie:** Kawa w ziarnach (zbliżenie)
3. **Trzecie:** Lifestyle (kubek, przygotowanie)

### 4.4 Nazwy Plików

Przykład:
```
ethiopia-guji-package.jpg
ethiopia-guji-beans.jpg
ethiopia-guji-cup.jpg
```

---

## 📊 Krok 5: Metafieldy (Metafields)

Metafieldy to **niestandardowe pola**, które wyświetlają dodatkowe informacje na stronie produktu. Są **kluczowe** dla prawidłowego wyświetlania kawy.

### 5.1 Gdzie Znaleźć Metafieldy?

W edycji produktu:
1. Scrolluj na sam dół strony
2. Sekcja **Metafields** (może być schowana pod "Show all")
3. Kliknij **Add metafield** dla każdego pola

### 5.2 Lista Metafieldy - Obowiązkowe

#### 1. **Kraj pochodzenia (Origin Country)**
- **Namespace.Key:** `custom.origin_country`
- **Type:** Single line text
- **Value:** `Etiopia`

#### 2. **Region**
- **Namespace.Key:** `custom.region`
- **Type:** Single line text
- **Value:** `Guji`

#### 3. **Wysokość uprawy (Altitude)**
- **Namespace.Key:** `custom.altitude`
- **Type:** Single line text
- **Value:** `1800-2200 m n.p.m.`

#### 4. **Odmiana (Variety)**
- **Namespace.Key:** `custom.variety`
- **Type:** Single line text
- **Value:** `Heirloom`

#### 5. **Metoda obróbki (Process)**
- **Namespace.Key:** `custom.process`
- **Type:** Single line text
- **Value:** `Natural` (lub `Washed`, `Honey`, `Anaerobic`)

#### 6. **Stopień palenia (Roast Level)**
- **Namespace.Key:** `custom.roast_level`
- **Type:** Single line text
- **Value:** `Jasne` (lub `Średnie`, `Ciemne`)

#### 7. **Nuty smakowe (Tasting Notes)**
- **Namespace.Key:** `custom.tasting_notes`
- **Type:** List of single line text values
- **Value:** (dodaj każdą nutę osobno)
  - `Jagody`
  - `Jaśmin`
  - `Miód`

### 5.3 Lista Metafieldy - Opcjonalne

#### 8. **Ocena SCA (SCA Score)**
- **Namespace.Key:** `custom.sca_score`
- **Type:** Integer
- **Value:** `87`

#### 9. **Producent (Producer)**
- **Namespace.Key:** `custom.producer`
- **Type:** Single line text
- **Value:** `Guji Highland Estate`

#### 10. **Data palenia (Roast Date)**
- **Namespace.Key:** `custom.roast_date`
- **Type:** Date
- **Value:** `2024-12-01` (format YYYY-MM-DD)

### 5.4 Jak Dodać Listę (Tasting Notes)?

1. Wybierz typ: **List of single line text values**
2. Kliknij **Add value**
3. Wpisz pierwszą nutę (np. "Jagody")
4. Kliknij **Add value** ponownie dla kolejnych nut
5. Zapisz po dodaniu wszystkich wartości

---

## 📁 Krok 6: Organizacja i Tagi

### 6.1 Product Category (Kategoria)

Wybierz z dropdown:
```
Food & Beverage > Beverages > Coffee
```

### 6.2 Tags (Tagi)

Dodaj tagi oddzielone przecinkami:

```
kawa, specialty coffee, ethiopia, natural, jasne palenie
```

**Przykładowe tagi:**
- Kraj: `ethiopia`, `brazylia`, `kolumbia`, `kenya`
- Obróbka: `natural`, `washed`, `honey`, `anaerobic`
- Palenie: `jasne palenie`, `średnie palenie`, `ciemne palenie`
- Typ: `specialty coffee`, `single origin`, `blend`

### 6.3 Collections (Kolekcje)

Dodaj produkt do kolekcji (jeśli istnieją):

- **Wszystkie kawy** (automatyczna)
- **Jasne palenie** (jeśli roast_level = "Jasne")
- **Natural** (jeśli process = "Natural")
- **Nowości** (jeśli nowa kawa)

Kolekcje można automatycznie konfigurować w **Products > Collections**.

---

## ✅ Krok 7: Inventory & Shipping

### 7.1 Track Quantity (Śledź stan magazynowy)

- ✅ **Zaznacz:** Track quantity
- To pozwala śledzić dostępność każdego wariantu

### 7.2 Continue selling when out of stock

- ❌ **NIE zaznaczaj** tego
- Gdy produkt się skończy, automatycznie przestanie być dostępny

### 7.3 Weight (Waga)

Ustaw wagę dla każdego wariantu (potrzebne do wysyłki):

| Wariant       | Waga    |
|---------------|---------|
| 250g / Ziarna | 0.25 kg |
| 250g / Mielona| 0.25 kg |
| 1kg / Ziarna  | 1.0 kg  |
| 1kg / Mielona | 1.0 kg  |

### 7.4 Shipping (Wysyłka)

- ✅ **Zaznacz:** This is a physical product
- Shopify automatycznie obliczy koszty wysyłki na podstawie wagi

---

## 🚀 Krok 8: Publikacja Produktu

### 8.1 Product Status (Status produktu)

Wybierz:
- **Active** - produkt widoczny w sklepie
- **Draft** - szkic, niewidoczny dla klientów (używaj do testów)

### 8.2 Sales Channels (Kanały sprzedaży)

Zaznacz:
- ✅ **Online Store** (sklep internetowy)
- ✅ **Point of Sale** (jeśli sprzedajesz stacjonarnie)

### 8.3 Zapisz Produkt

Kliknij **Save** (Zapisz) w prawym górnym rogu.

---

## 🔍 Krok 9: Weryfikacja

Po zapisaniu produktu sprawdź:

### 9.1 Podgląd na Stronie

1. Kliknij **View** (Wyświetl) przy nazwie produktu
2. Sprawdź czy:
   - Zdjęcia się wyświetlają
   - Opis jest poprawny
   - Warianty działają (zmiana ceny po wyborze 1kg)
   - Metafieldy są widoczne (kraj, region, nuty smakowe)
   - Dodawanie do koszyka działa

### 9.2 Checklist Weryfikacji

- [ ] Nazwa produktu jest opisowa
- [ ] Opis zawiera profil smakowy
- [ ] Ceny są poprawne dla wszystkich wariantów
- [ ] SKU są unikalne dla każdego wariantu
- [ ] Zdjęcia wysokiej jakości (min. 1200×1200px)
- [ ] Wszystkie obowiązkowe metafieldy wypełnione
- [ ] Nuty smakowe dodane jako lista
- [ ] Stopień palenia wybrany (Jasne/Średnie/Ciemne)
- [ ] Stan magazynowy ustawiony
- [ ] Waga produktu skonfigurowana
- [ ] Produkt opublikowany (Active)

---

## 📋 Przykład Kompletnego Produktu

### Informacje Produktu

**Nazwa:** `Colombia Huila Washed`

**Opis:**
```
Wyjątkowo zrównoważona kawa z regionu Huila w Kolumbii. Metoda obróbki washed
podkreśla jej czystość i słodycz. Idealna na każdą porę dnia.

Profil smakowy: Czekolada, Karmel, Orzechy
Intensywność: ⚫⚫⚫⚫⚪ (4/5)
```

**Cena bazowa:** `42.00 PLN` (250g)

**SKU:** `COFFEE-COL-HUILA-250G`

### Warianty

| Gramatura | Typ     | SKU                     | Cena       | Inventory |
|-----------|---------|-------------------------|------------|-----------|
| 250g      | Ziarna  | `COFFEE-COL-HUILA-250G` | 42.00 PLN  | 60        |
| 250g      | Mielona | `COFFEE-COL-HUILA-250M` | 42.00 PLN  | 60        |
| 1kg       | Ziarna  | `COFFEE-COL-HUILA-1KG`  | 150.00 PLN | 30        |
| 1kg       | Mielona | `COFFEE-COL-HUILA-1KM`  | 150.00 PLN | 30        |

### Metafieldy

| Pole            | Wartość                      |
|-----------------|------------------------------|
| origin_country  | Kolumbia                     |
| region          | Huila                        |
| altitude        | 1600-1900 m n.p.m.           |
| variety         | Caturra, Colombia            |
| process         | Washed                       |
| roast_level     | Średnie                      |
| tasting_notes   | Czekolada, Karmel, Orzechy   |
| sca_score       | 85                           |
| producer        | Finca El Paraiso             |

### Tagi

```
kawa, specialty coffee, kolumbia, washed, średnie palenie, czekolada, karmel
```

---

## 🛠️ Troubleshooting (Rozwiązywanie Problemów)

### Problem 1: Metafieldy się nie wyświetlają

**Rozwiązanie:**
1. Sprawdź czy namespace.key są dokładnie takie jak w instrukcji
2. Upewnij się że typ pola jest poprawny (np. `List` dla tasting_notes)
3. Wymuś odświeżenie cache: `CTRL + F5` w przeglądarce

### Problem 2: Warianty mają niepoprawne ceny

**Rozwiązanie:**
1. Edytuj produkt
2. Przejdź do sekcji Variants
3. Kliknij na każdy wariant osobno i ustaw cenę ręcznie
4. Zapisz

### Problem 3: Produkt nie pojawia się w sklepie

**Rozwiązanie:**
1. Sprawdź Product Status - powinien być **Active**
2. Sprawdź Sales Channels - **Online Store** musi być zaznaczony
3. Sprawdź Availability - co najmniej jeden wariant musi mieć inventory > 0

### Problem 4: Zdjęcia są rozmazane

**Rozwiązanie:**
1. Usuń obecne zdjęcia
2. Prześlij nowe zdjęcia min. **1200×1200px**
3. Upewnij się że plik waży maks. 5 MB (skompresuj jeśli potrzeba)

---

## 📞 Kontakt do Pomocy

**W razie pytań:**
- Slack: `#shopify-pomoc`
- Email: `kontakt@strzykawa.com`
- Dokumentacja Shopify: [help.shopify.com](https://help.shopify.com)

---

## 📌 Skróty Klawiszowe (Shopify Admin)

| Skrót          | Akcja                    |
|----------------|--------------------------|
| `G` + `P`      | Przejdź do Products      |
| `G` + `O`      | Przejdź do Orders        |
| `N` + `P`      | Nowy produkt             |
| `S` lub `CMD+S`| Zapisz                   |
| `ESC`          | Anuluj / Zamknij modal   |

---

**Wersja:** 1.0
**Ostatnia aktualizacja:** 10 grudnia 2024
**Autor:** Zespół Strzykawa Coffee Roastery
