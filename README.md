# Strzykawa – landing page

Ten repozytorium zawiera prostą stronę typu _landing page_ dla kawiarni i
palarnia **Strzykawa**. Projekt został przygotowany w oparciu o
**React** i **Vite** z myślą o łatwej rozbudowie o kolejne sekcje, np.
blog czy sklep, oraz integracji z headless CMS.

## Co znajdziesz w projekcie?

* **Hero** z dużym zdjęciem (dostarczonym przez klienta) i
  przyciskiem kierującym do listy kaw.
* **Pojawiający się nagłówek** – na początku strona jest pełnoekranowa,
  a górna nawigacja pojawia się dopiero po przewinięciu, aby nie
  zasłaniać hero.
* **Zakładka „Nasze kawy”** z responsywną siatką kart. Każda karta
  zawiera nazwę kawy, kraj pochodzenia, sposób obróbki, region oraz
  opis profilu smakowego. Aktualnie dane są statyczne i znajdują się w
  pliku `src/data/coffees.js`, ale przygotowana struktura ułatwia
  zastąpienie ich treścią z CMS.
* **Sekcja „Kontakt & Lokalizacja”** z adresem, numerem telefonu,
  adresem e‑mail, godzinami otwarcia oraz mapą Google (iframe). W razie
  potrzeby można podmienić współrzędne w atrybucie `src` mapy.
* **Stopka** z ikonami mediów społecznościowych opartymi o
  bibliotekę `react-icons`.

## Uruchomienie lokalne

1. Zainstaluj zależności:

   ```bash
   npm install
   ```

2. Uruchom środowisko developerskie Vite:

   ```bash
   npm run dev
   ```

   Aplikacja będzie dostępna pod adresem wyświetlonym w konsoli,
   zazwyczaj `http://localhost:5173`.

3. Zbuduj pliki produkcyjne:

   ```bash
   npm run build
   ```

   Wygenerowany katalog `dist` możesz opublikować na Netlify lub
   dowolnym innym serwerze statycznym.

## Deployment na Netlify

Netlify potrafi automatycznie budować projekty Vite z GitHub. Po
dodaniu repozytorium do konta Netlify wybierz polecenie `npm run
build` w sekcji „Build command” oraz `dist` w sekcji „Publish
directory”. Dzięki temu przy każdym _pushu_ na wybrane branch Netlify
samodzielnie przebuduje i opublikuje stronę.

## Integracja z CMS

Projekt jest przygotowany do integracji z headless CMS, np.
[Strapi](https://strapi.io/), [Sanity](https://www.sanity.io/) czy
[Contentful](https://www.contentful.com/). Przykładowy scenariusz dla
**Strapi**:

1. Zainstaluj Strapi lokalnie (`npx create-strapi-app@latest` lub
   `npm create strapi-app@latest`) i uruchom panel administracyjny.
2. Utwórz kolekcję `coffees` z polami:
   * `name` (tekst),
   * `country` (tekst),
   * `process` (tekst),
   * `region` (tekst, opcjonalny),
   * `profile` (tekst),
   * `image` (pole typu _media_ do przesyłania zdjęć kawy).
3. Wypełnij kolekcję kilkoma wpisami.
4. W aplikacji React podmień import danych z pliku
   `src/data/coffees.js` na zapytanie HTTP do API Strapi. Możesz
   skorzystać z `fetch` albo biblioteki `axios`:

   ```jsx
   import { useEffect, useState } from 'react';

   function Coffees() {
     const [coffees, setCoffees] = useState([]);
     useEffect(() => {
       fetch('https://twoj-domena-strapi.pl/api/coffees?populate=*')
         .then((res) => res.json())
         .then((data) => setCoffees(data.data));
     }, []);
     // …
   }
   ```

5. Zamiast pola `image` jako ciąg znaków użyj adresu
   `coffee.attributes.image.data.attributes.url` zwracany przez Strapi.

Podobnie możesz dodać kolejne kolekcje (np. wpisy na blogu) i
odpowiednie sekcje w kodzie React.

## Wskazówki dotyczące stylu i dostępności

* Kolory i fonty użyte w projekcie nawiązują do oryginalnego logo
  Strzykawa, tworząc spójny wizerunek marki. W pliku `src/index.css`
  zdefiniowane są zmienne CSS, które ułatwiają dalszą personalizację.
* Struktura komponentów jest modułowa – można dodać nowe sekcje
  poprzez utworzenie kolejnych komponentów w folderze `src/components`
  i umieszczenie ich na odpowiedniej stronie.
* Nagłówek pojawia się po przewinięciu, aby hero był czysty i
  minimalistyczny. Jeśli wolisz statyczny nagłówek, usuń logikę z
  komponentu `Header`.

Miłego kodowania!