import { Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout.jsx';

// Polityka Prywatności
export function PrivacyPolicy() {
    return (
        <PageLayout title="Polityka prywatności">
            <div className="container mx-auto max-w-4xl px-4 py-8">
                <div className="bg-primary-light border border-white/10 p-6 sm:p-8">
                    <div className="prose prose-invert max-w-none">
                        <p className="text-white/60 mb-6">
                            <strong>Data ostatniej aktualizacji:</strong> 12 grudnia 2025
                        </p>

                        <p className="text-white/80 mb-6">
                            Niniejsza Polityka prywatności określa zasady przetwarzania danych osobowych
                            oraz korzystania z serwisu internetowego dostępnego pod adresem{' '}
                            <strong className="text-white">https://strzykawa.com</strong>, prowadzonego przez:
                        </p>

                        <ul className="text-white/80 mb-6 space-y-1">
                            <li><strong className="text-white">STRZYKAWA DAMIAN DZIK</strong></li>
                            <li>adres siedziby: ul. Warszawska 241, 42-209 Częstochowa</li>
                            <li>adres kawiarni: ul. Dąbrowskiego 4, 42-200 Częstochowa</li>
                            <li>NIP: 7441726899</li>
                            <li>e-mail: <a href="mailto:kontakt@strzykawa.com" className="text-accent hover:text-white">kontakt@strzykawa.com</a></li>
                            <li>telefon: +48 668 011 806</li>
                        </ul>

                        <p className="text-white/80 mb-8">
                            W Polityce prywatności wyjaśniamy, jakie dane zbieramy, w jakim celu, na jakiej podstawie
                            prawnej oraz jakie prawa przysługują osobom, których dane dotyczą. Zasady dotyczące
                            plików cookies opisane są osobno w dokumencie{' '}
                            <Link to="/polityka-cookies" className="text-accent hover:text-white">Polityka plików cookies</Link>.
                        </p>

                        <h2 className="text-xl font-medium text-white mt-8 mb-4">1. Administrator danych osobowych</h2>
                        <p className="text-white/80 mb-6">
                            Administratorem danych osobowych jest <strong className="text-white">STRZYKAWA DAMIAN DZIK</strong>, prowadzący
                            działalność gospodarczą pod wskazanymi wyżej danymi kontaktowymi (dalej: „Administrator").
                        </p>

                        <h2 className="text-xl font-medium text-white mt-8 mb-4">2. Zakres przetwarzanych danych</h2>
                        <p className="text-white/80 mb-4">
                            W zależności od tego, w jaki sposób korzystasz z serwisu, możemy przetwarzać w szczególności:
                        </p>
                        <ul className="text-white/80 mb-6 space-y-1 list-disc list-inside">
                            <li>imię i nazwisko,</li>
                            <li>adres e-mail,</li>
                            <li>numer telefonu,</li>
                            <li>adres dostawy (ulica, numer, kod pocztowy, miejscowość, kraj),</li>
                            <li>adres rozliczeniowy, dane do faktury (w tym NIP – jeśli go podasz),</li>
                            <li>dane dotyczące zamówień (kupione produkty, kwoty, forma płatności, status zamówienia),</li>
                            <li>dane przekazane w treści wiadomości (formularz kontaktowy, e-mail),</li>
                            <li>podstawowe dane techniczne związane z korzystaniem z serwisu (np. adres IP, typ przeglądarki, system operacyjny – w logach serwera).</li>
                        </ul>
                        <p className="text-white/80 mb-6">
                            Na moment uruchomienia serwisu nie wykorzystujemy narzędzi analitycznych takich jak
                            Google Analytics ani pikseli reklamowych. Jeśli w przyszłości zaczną być używane,
                            Polityka prywatności oraz Polityka plików cookies zostaną odpowiednio zaktualizowane.
                        </p>

                        <h2 className="text-xl font-medium text-white mt-8 mb-4">3. Cele i podstawy prawne przetwarzania danych</h2>
                        <p className="text-white/80 mb-4">Dane osobowe mogą być przetwarzane w następujących celach:</p>
                        <ul className="text-white/80 mb-6 space-y-3 list-disc list-inside">
                            <li>
                                <strong className="text-white">Realizacja zamówień i umowy sprzedaży</strong> – przetwarzanie danych
                                jest niezbędne do realizacji umowy (art. 6 ust. 1 lit. b RODO), m.in. przyjęcia i realizacji zamówienia,
                                obsługi płatności, wysyłki towaru, kontaktu w sprawie zamówienia.
                            </li>
                            <li>
                                <strong className="text-white">Obsługa konta użytkownika</strong> – jeśli założysz konto, przetwarzamy dane
                                w celu jego utrzymania, umożliwienia logowania, podglądu historii zamówień,
                                korzystania z zapisanych danych adresowych (art. 6 ust. 1 lit. b RODO).
                            </li>
                            <li>
                                <strong className="text-white">Kontakt e-mail / formularz kontaktowy</strong> – w celu udzielenia odpowiedzi
                                na Twoje pytania, zapytania ofertowe lub zgłoszenia (art. 6 ust. 1 lit. b lub lit. f RODO –
                                prawnie uzasadniony interes polegający na komunikacji z użytkownikami).
                            </li>
                            <li>
                                <strong className="text-white">Wypełnianie obowiązków prawnych</strong> – wynikających m.in. z przepisów podatkowych
                                i rachunkowych (art. 6 ust. 1 lit. c RODO).
                            </li>
                            <li>
                                <strong className="text-white">Dochodzenie roszczeń lub obrona przed roszczeniami</strong> – na podstawie prawnie
                                uzasadnionego interesu Administratora (art. 6 ust. 1 lit. f RODO).
                            </li>
                            <li>
                                <strong className="text-white">Marketing bezpośredni własnych produktów</strong> – np. wysyłka informacji
                                o nowościach i ofertach (jeśli zapiszesz się na newsletter lub wyrazisz zgodę na kontakt marketingowy),
                                na podstawie zgody (art. 6 ust. 1 lit. a RODO) lub prawnie uzasadnionego interesu
                                Administratora (art. 6 ust. 1 lit. f RODO), w zależności od formy komunikacji.
                            </li>
                        </ul>

                        <h2 className="text-xl font-medium text-white mt-8 mb-4">4. Odbiorcy danych</h2>
                        <p className="text-white/80 mb-4">Dane osobowe mogą być przekazywane:</p>
                        <ul className="text-white/80 mb-6 space-y-1 list-disc list-inside">
                            <li>podmiotom obsługującym płatności online (jeśli korzystasz z takiej formy płatności),</li>
                            <li>firmom kurierskim i operatorom logistycznym realizującym dostawę,</li>
                            <li>podmiotom świadczącym usługi IT i hostingowe dla serwisu,</li>
                            <li>biuru rachunkowemu współpracującemu z Administratorem,</li>
                            <li>innym podmiotom upoważnionym na podstawie przepisów prawa.</li>
                        </ul>
                        <p className="text-white/80 mb-6">
                            Dane nie są co do zasady przekazywane poza Europejski Obszar Gospodarczy.
                            Jeśli w przyszłości korzystanie z określonych narzędzi (np. niektórych usług chmurowych)
                            będzie wiązać się z takim przekazaniem, Administrator zapewni odpowiednią podstawę prawną
                            (np. standardowe klauzule umowne).
                        </p>

                        <h2 className="text-xl font-medium text-white mt-8 mb-4">5. Okres przechowywania danych</h2>
                        <p className="text-white/80 mb-4">Dane osobowe będą przechowywane przez okres:</p>
                        <ul className="text-white/80 mb-6 space-y-1 list-disc list-inside">
                            <li>niezbędny do realizacji umowy i zamówienia – a po jego zakończeniu, przez czas wymagany przepisami prawa (np. podatkowymi i rachunkowymi),</li>
                            <li>niezbędny do dochodzenia roszczeń lub obrony przed roszczeniami – zgodnie z terminami przedawnienia określonymi w przepisach prawa,</li>
                            <li>w przypadku przetwarzania na podstawie zgody – do czasu jej wycofania,</li>
                            <li>w przypadku przetwarzania na podstawie prawnie uzasadnionego interesu Administratora – do czasu wniesienia skutecznego sprzeciwu.</li>
                        </ul>

                        <h2 className="text-xl font-medium text-white mt-8 mb-4">6. Prawa osoby, której dane dotyczą</h2>
                        <p className="text-white/80 mb-4">Osobie, której dane dotyczą, przysługuje prawo do:</p>
                        <ul className="text-white/80 mb-6 space-y-1 list-disc list-inside">
                            <li>dostępu do swoich danych oraz uzyskania ich kopii,</li>
                            <li>sprostowania (poprawienia) danych,</li>
                            <li>usunięcia danych – w przypadkach przewidzianych w przepisach,</li>
                            <li>ograniczenia przetwarzania,</li>
                            <li>przenoszenia danych – w zakresie określonym w art. 20 RODO,</li>
                            <li>wniesienia sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie Administratora – z przyczyn związanych z Twoją szczególną sytuacją,</li>
                            <li>wycofania zgody w dowolnym momencie – jeśli przetwarzanie odbywa się na podstawie zgody; wycofanie zgody nie wpływa na zgodność z prawem przetwarzania przed jej wycofaniem,</li>
                            <li>wniesienia skargi do organu nadzorczego – <strong className="text-white">Prezesa Urzędu Ochrony Danych Osobowych</strong>, jeśli uznasz, że przetwarzanie danych narusza przepisy RODO.</li>
                        </ul>
                        <p className="text-white/80 mb-6">
                            W celu realizacji swoich praw możesz skontaktować się z Administratorem
                            poprzez e-mail: <a href="mailto:kontakt@strzykawa.com" className="text-accent hover:text-white">kontakt@strzykawa.com</a>.
                        </p>

                        <h2 className="text-xl font-medium text-white mt-8 mb-4">7. Pliki cookies i podobne technologie</h2>
                        <p className="text-white/80 mb-4">
                            Serwis korzysta z plików cookies niezbędnych do jego prawidłowego funkcjonowania oraz
                            w celu zapewnienia podstawowej wygody korzystania (np. zapamiętanie zawartości koszyka).
                        </p>
                        <p className="text-white/80 mb-6">
                            Szczegółowe informacje na temat rodzajów stosowanych cookies, ich celu oraz sposobów
                            zarządzania nimi znajdują się w osobnym dokumencie{' '}
                            <Link to="/polityka-cookies" className="text-accent hover:text-white">Polityka plików cookies</Link>.
                        </p>

                        <h2 className="text-xl font-medium text-white mt-8 mb-4">8. Zmiany Polityki prywatności</h2>
                        <p className="text-white/80 mb-4">
                            Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej Polityce prywatności,
                            w szczególności w przypadku zmian przepisów prawa, wprowadzenia nowych funkcjonalności
                            serwisu lub modyfikacji stosowanych technologii.
                        </p>
                        <p className="text-white/80">
                            Zmieniona Polityka prywatności będzie publikowana na stronie{' '}
                            <strong className="text-white">https://strzykawa.com/polityka-prywatnosci</strong> wraz z datą aktualizacji.
                        </p>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

// Polityka Cookies
export function CookiePolicy() {
    return (
        <PageLayout title="Polityka cookies">
            <div className="container mx-auto max-w-4xl px-4 py-8">
                <div className="bg-primary-light border border-white/10 p-6 sm:p-8">
                    <div className="prose prose-invert max-w-none">
                        <p className="text-white/60 mb-6">
                            <strong>Data ostatniej aktualizacji:</strong> 12 grudnia 2025
                        </p>

                        <p className="text-white/80 mb-8">
                            Niniejsza Polityka plików cookies wyjaśnia, w jaki sposób serwis internetowy{' '}
                            <strong className="text-white">https://strzykawa.com</strong> korzysta z plików cookies oraz podobnych technologii.
                        </p>

                        <h2 className="text-xl font-medium text-white mt-8 mb-4">1. Administrator serwisu</h2>
                        <p className="text-white/80 mb-4">
                            Administratorem serwisu i podmiotem, który umieszcza pliki cookies na Twoim urządzeniu, jest:
                        </p>
                        <ul className="text-white/80 mb-6 space-y-1">
                            <li><strong className="text-white">STRZYKAWA DAMIAN DZIK</strong></li>
                            <li>adres siedziby: ul. Warszawska 241, 42-209 Częstochowa</li>
                            <li>adres kawiarni: ul. Dąbrowskiego 4, 42-200 Częstochowa</li>
                            <li>NIP: 7441726899</li>
                            <li>e-mail: <a href="mailto:kontakt@strzykawa.com" className="text-accent hover:text-white">kontakt@strzykawa.com</a></li>
                            <li>telefon: +48 668 011 806</li>
                        </ul>

                        <h2 className="text-xl font-medium text-white mt-8 mb-4">2. Czym są pliki cookies?</h2>
                        <p className="text-white/80 mb-6">
                            Pliki cookies (tzw. „ciasteczka") to niewielkie pliki tekstowe zapisywane na urządzeniu
                            użytkownika (komputerze, smartfonie, tablecie) podczas odwiedzania stron internetowych.
                            Cookies mogą być odczytywane przez serwis przy kolejnych odwiedzinach.
                        </p>

                        <h2 className="text-xl font-medium text-white mt-8 mb-4">3. Jakie cookies wykorzystujemy?</h2>
                        <p className="text-white/80 mb-4">W naszym serwisie wykorzystujemy przede wszystkim:</p>

                        <h3 className="text-lg font-medium text-white mt-6 mb-3">3.1. Cookies niezbędne</h3>
                        <p className="text-white/80 mb-4">
                            Są to pliki cookies konieczne do prawidłowego działania serwisu. Umożliwiają one m.in.:
                        </p>
                        <ul className="text-white/80 mb-4 space-y-1 list-disc list-inside">
                            <li>prawidłowe wyświetlanie strony na Twoim urządzeniu,</li>
                            <li>działanie podstawowych funkcji nawigacyjnych,</li>
                            <li>zapamiętanie wybranych ustawień,</li>
                            <li>działanie koszyka oraz procesu składania zamówienia (np. przekazanie koszyka do systemu Shopify).</li>
                        </ul>
                        <p className="text-white/80 mb-6">
                            Te cookies są wykorzystywane w oparciu o prawnie uzasadniony interes Administratora –
                            polegający na zapewnieniu prawidłowego działania serwisu i umożliwieniu korzystania z jego
                            funkcjonalności. Ich stosowanie jest niezbędne, dlatego nie możesz ich wyłączyć z poziomu
                            naszego serwisu (możesz natomiast zablokować cookies w przeglądarce – patrz punkt 5).
                        </p>

                        <h3 className="text-lg font-medium text-white mt-6 mb-3">3.2. Cookies funkcjonalne, analityczne i marketingowe</h3>
                        <p className="text-white/80 mb-4">
                            Na moment uruchomienia serwisu nie wykorzystujemy dodatkowych cookies analitycznych
                            (np. Google Analytics) ani marketingowych (np. piksel Meta).
                        </p>
                        <p className="text-white/80 mb-6">
                            Jeśli w przyszłości zaczniemy korzystać z takich narzędzi, Polityka plików cookies zostanie
                            zaktualizowana, a na stronie pojawi się odpowiedni mechanizm zgody (baner), który pozwoli
                            Ci wybrać, jakie kategorie cookies chcesz zaakceptować.
                        </p>

                        <h2 className="text-xl font-medium text-white mt-8 mb-4">4. Cookies podmiotów trzecich</h2>
                        <p className="text-white/80 mb-4">
                            W trakcie składania zamówienia możesz zostać przekierowany do systemu{' '}
                            <strong className="text-white">Shopify</strong> (checkout). W takim przypadku Shopify może wykorzystywać
                            własne pliki cookies niezbędne do obsługi koszyka, płatności i procesu zamówienia.
                        </p>
                        <p className="text-white/80 mb-6">
                            Zasady dotyczące cookies w systemie Shopify są opisane w politykach prywatności i cookies
                            tego dostawcy. Zachęcamy do zapoznania się z dokumentacją Shopify w tym zakresie.
                        </p>

                        <h2 className="text-xl font-medium text-white mt-8 mb-4">5. Jak zarządzać plikami cookies?</h2>
                        <p className="text-white/80 mb-4">
                            Większość przeglądarek internetowych pozwala na zarządzanie plikami cookies, w tym:
                        </p>
                        <ul className="text-white/80 mb-4 space-y-1 list-disc list-inside">
                            <li>akceptowanie lub blokowanie cookies z danej strony,</li>
                            <li>blokowanie wszystkich cookies,</li>
                            <li>usuwanie już zapisanych plików cookies.</li>
                        </ul>
                        <p className="text-white/80 mb-4">
                            Sposób zmiany ustawień przeglądarki różni się w zależności od używanego programu.
                            Zazwyczaj odpowiednie opcje znajdziesz w menu „Ustawienia", „Opcje" lub „Prywatność".
                        </p>
                        <p className="text-white/80 mb-6">
                            Pamiętaj, że wyłączenie lub ograniczenie plików cookies może wpłynąć na działanie
                            niektórych funkcji serwisu – np. koszyka, logowania czy zapamiętywania ustawień.
                        </p>

                        <h2 className="text-xl font-medium text-white mt-8 mb-4">6. Okres przechowywania cookies</h2>
                        <p className="text-white/80 mb-6">
                            Czas przechowywania plików cookies na Twoim urządzeniu może być różny – część z nich
                            to cookies sesyjne (działają do czasu zamknięcia przeglądarki), a część to cookies stałe,
                            które pozostają przez określony czas lub do momentu ręcznego usunięcia.
                        </p>

                        <h2 className="text-xl font-medium text-white mt-8 mb-4">7. Logi serwera</h2>
                        <p className="text-white/80 mb-4">
                            Korzystanie z serwisu wiąże się z przesyłaniem zapytań do serwera, na którym
                            przechowywana jest strona. Każde takie zapytanie jest zapisywane w logach serwera
                            i może obejmować m.in. adres IP, datę i czas serwera, informacje o przeglądarce.
                        </p>
                        <p className="text-white/80 mb-6">
                            Dane zapisane w logach serwera nie są kojarzone z konkretnymi osobami i nie są
                            wykorzystywane przez Administratora do identyfikacji użytkowników. Mogą być
                            wykorzystywane wyłącznie w celach technicznych, statystycznych oraz związanych
                            z bezpieczeństwem serwisu.
                        </p>

                        <h2 className="text-xl font-medium text-white mt-8 mb-4">8. Zmiany Polityki plików cookies</h2>
                        <p className="text-white/80 mb-4">
                            Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej Polityce plików cookies,
                            w szczególności w przypadku:
                        </p>
                        <ul className="text-white/80 mb-4 space-y-1 list-disc list-inside">
                            <li>zmian w funkcjonowaniu serwisu,</li>
                            <li>wprowadzenia nowych narzędzi (np. analitycznych, marketingowych),</li>
                            <li>zmian w obowiązujących przepisach prawa.</li>
                        </ul>
                        <p className="text-white/80">
                            Aktualna wersja Polityki plików cookies jest zawsze dostępna pod adresem:{' '}
                            <strong className="text-white">https://strzykawa.com/polityka-cookies</strong>.
                        </p>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

// Dostawa i zwroty
export function ShippingAndReturns() {
    return (
        <PageLayout title="Dostawa i zwroty">
            <div className="container mx-auto max-w-4xl px-4 py-8">
                <div className="bg-primary-light border border-white/10 p-6 sm:p-8">
                    <div className="prose prose-invert max-w-none text-white/70">
                        <p>Treść w przygotowaniu...</p>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

// Regulamin sklepu
export function TermsAndConditions() {
    return (
        <PageLayout title="Regulamin sklepu">
            <div className="container mx-auto max-w-4xl px-4 py-8">
                <div className="bg-primary-light border border-white/10 p-6 sm:p-8">
                    <div className="prose prose-invert max-w-none">
                        <p className="text-white/60 mb-6">
                            <strong>Data ostatniej aktualizacji:</strong> 12 grudnia 2025
                        </p>

                        {/* §1 Postanowienia ogólne */}
                        <h2 className="text-xl font-medium text-white mt-8 mb-4">§1. Postanowienia ogólne</h2>
                        <ol className="text-white/80 mb-6 space-y-4 list-decimal list-inside">
                            <li>
                                Sklep internetowy <strong className="text-white">Strzykawa</strong> działający pod adresem{' '}
                                <strong className="text-white">https://strzykawa.com</strong> (dalej: <em>Sklep</em>) jest prowadzony przez:
                                <ul className="mt-2 ml-4 space-y-1 list-none">
                                    <li><strong className="text-white">STRZYKAWA DAMIAN DZIK</strong></li>
                                    <li>adres siedziby: ul. Warszawska 241, 42-209 Częstochowa</li>
                                    <li>adres miejsca prowadzenia działalności / kawiarni: ul. Dąbrowskiego 4, 42-200 Częstochowa</li>
                                    <li>NIP: 7441726899</li>
                                    <li>adres e-mail: <a href="mailto:kontakt@strzykawa.com" className="text-accent hover:text-white">kontakt@strzykawa.com</a></li>
                                    <li>telefon: +48 668 011 806</li>
                                    <li>(dalej: <em>Sprzedawca</em>)</li>
                                </ul>
                            </li>
                            <li>
                                Regulamin określa zasady korzystania ze Sklepu, w szczególności:
                                <ol className="mt-2 ml-4 space-y-1 list-[lower-alpha] list-inside">
                                    <li>zasady składania zamówień,</li>
                                    <li>zawierania umów sprzedaży na odległość,</li>
                                    <li>sposoby płatności i dostawy,</li>
                                    <li>zasady odstąpienia od umowy,</li>
                                    <li>zasady składania reklamacji.</li>
                                </ol>
                            </li>
                            <li>Klient jest zobowiązany do korzystania ze Sklepu w sposób zgodny z przepisami prawa, niniejszym Regulaminem oraz dobrymi obyczajami.</li>
                        </ol>

                        {/* §2 Definicje */}
                        <h2 className="text-xl font-medium text-white mt-8 mb-4">§2. Definicje</h2>
                        <p className="text-white/80 mb-3">Na potrzeby Regulaminu:</p>
                        <ol className="text-white/80 mb-6 space-y-3 list-decimal list-inside">
                            <li><strong className="text-white">Klient</strong> – osoba fizyczna (w tym konsument lub przedsiębiorca na prawach konsumenta), osoba prawna lub jednostka organizacyjna, która składa zamówienie w Sklepie.</li>
                            <li><strong className="text-white">Konsument</strong> – osoba fizyczna dokonująca czynności prawnej ze Sprzedawcą niezwiązanej bezpośrednio z jej działalnością gospodarczą lub zawodową.</li>
                            <li><strong className="text-white">Sklep</strong> – sklep internetowy Strzykawa dostępny pod adresem <strong className="text-white">https://strzykawa.com</strong>.</li>
                            <li><strong className="text-white">Towar</strong> – produkt dostępny w Sklepie, w szczególności kawa, akcesoria kawowe i inne produkty opisane na stronach Sklepu.</li>
                            <li><strong className="text-white">Umowa sprzedaży</strong> – umowa zawarta na odległość pomiędzy Klientem a Sprzedawcą za pośrednictwem Sklepu.</li>
                            <li><strong className="text-white">Konto</strong> – konto użytkownika utworzone w Sklepie, umożliwiające m.in. podgląd historii zamówień oraz szybsze składanie kolejnych zamówień.</li>
                        </ol>

                        {/* §3 Warunki techniczne */}
                        <h2 className="text-xl font-medium text-white mt-8 mb-4">§3. Warunki techniczne</h2>
                        <ol className="text-white/80 mb-6 space-y-3 list-decimal list-inside">
                            <li>
                                Do korzystania ze Sklepu niezbędne są:
                                <ol className="mt-2 ml-4 space-y-1 list-[lower-alpha] list-inside">
                                    <li>urządzenie z dostępem do Internetu,</li>
                                    <li>aktualna przeglądarka internetowa,</li>
                                    <li>aktywne konto poczty elektronicznej (e-mail),</li>
                                    <li>włączona obsługa plików cookies (szczegóły w Polityce prywatności).</li>
                                </ol>
                            </li>
                            <li>Sprzedawca dokłada starań, aby korzystanie ze Sklepu było możliwe w sposób ciągły. Może jednak czasowo zawiesić dostęp w razie prac serwisowych lub aktualizacji.</li>
                        </ol>

                        {/* §4 Konto klienta */}
                        <h2 className="text-xl font-medium text-white mt-8 mb-4">§4. Konto klienta</h2>
                        <ol className="text-white/80 mb-6 space-y-3 list-decimal list-inside">
                            <li>Klient może założyć Konto w Sklepie poprzez wypełnienie formularza rejestracyjnego.</li>
                            <li>Dane podane przy rejestracji muszą być prawdziwe i aktualne.</li>
                            <li>
                                Klient zobowiązuje się do:
                                <ol className="mt-2 ml-4 space-y-1 list-[lower-alpha] list-inside">
                                    <li>zabezpieczenia danych do logowania,</li>
                                    <li>nieudostępniania Konta osobom trzecim.</li>
                                </ol>
                            </li>
                            <li>Konto może zostać usunięte na życzenie Klienta (kontakt mailowy) lub w przypadku rażącego naruszenia Regulaminu.</li>
                        </ol>

                        {/* §5 Składanie zamówień */}
                        <h2 className="text-xl font-medium text-white mt-8 mb-4">§5. Składanie zamówień</h2>
                        <ol className="text-white/80 mb-6 space-y-3 list-decimal list-inside">
                            <li>Informacje o Towarach zamieszczone na stronie Sklepu stanowią zaproszenie do zawarcia umowy w rozumieniu Kodeksu cywilnego.</li>
                            <li>
                                Zamówienie można złożyć:
                                <ol className="mt-2 ml-4 space-y-1 list-[lower-alpha] list-inside">
                                    <li>poprzez formularz zamówienia dostępny w Sklepie,</li>
                                    <li>po zalogowaniu na Konto lub jako „gość".</li>
                                </ol>
                            </li>
                            <li>
                                W celu złożenia zamówienia Klient:
                                <ol className="mt-2 ml-4 space-y-1 list-[lower-alpha] list-inside">
                                    <li>wybiera Towar oraz jego parametry (np. rodzaj mielenia, gramatura),</li>
                                    <li>dodaje Towar do koszyka,</li>
                                    <li>wypełnia formularz danych do dostawy i płatności,</li>
                                    <li>akceptuje Regulamin oraz Politykę prywatności,</li>
                                    <li>zatwierdza zamówienie.</li>
                                </ol>
                            </li>
                            <li>
                                Przed złożeniem zamówienia Klient otrzymuje informacje o:
                                <ol className="mt-2 ml-4 space-y-1 list-[lower-alpha] list-inside">
                                    <li>głównych cechach Towaru,</li>
                                    <li>łącznej cenie wraz z podatkami,</li>
                                    <li>kosztach dostawy,</li>
                                    <li>sposobach płatności.</li>
                                </ol>
                            </li>
                            <li>Złożenie zamówienia stanowi ofertę Klienta zawarcia Umowy sprzedaży ze Sprzedawcą.</li>
                        </ol>

                        {/* §6 Zawarcie umowy */}
                        <h2 className="text-xl font-medium text-white mt-8 mb-4">§6. Zawarcie umowy</h2>
                        <ol className="text-white/80 mb-6 space-y-3 list-decimal list-inside">
                            <li>Po złożeniu zamówienia Klient otrzymuje automatyczne potwierdzenie jego przyjęcia na adres e-mail podany w formularzu.</li>
                            <li>Z chwilą przesłania potwierdzenia, o którym mowa w ust. 1, dochodzi do zawarcia Umowy sprzedaży pomiędzy Klientem a Sprzedawcą.</li>
                            <li>
                                Sprzedawca zastrzega sobie prawo do odmowy realizacji zamówienia m.in. w przypadku:
                                <ol className="mt-2 ml-4 space-y-1 list-[lower-alpha] list-inside">
                                    <li>podania nieprawidłowych danych,</li>
                                    <li>braku płatności w wymaganym czasie (przy wybranych metodach),</li>
                                    <li>braku Towaru na stanie – o czym Klient zostanie niezwłocznie poinformowany, a dokonane wpłaty zostaną zwrócone.</li>
                                </ol>
                            </li>
                        </ol>

                        {/* §7 Ceny i płatności */}
                        <h2 className="text-xl font-medium text-white mt-8 mb-4">§7. Ceny i płatności</h2>
                        <ol className="text-white/80 mb-6 space-y-3 list-decimal list-inside">
                            <li>
                                Wszystkie ceny Towarów podane w Sklepie:
                                <ol className="mt-2 ml-4 space-y-1 list-[lower-alpha] list-inside">
                                    <li>są wyrażone w złotych polskich (PLN),</li>
                                    <li>zawierają podatek VAT,</li>
                                    <li>nie zawierają kosztów dostawy, które są podawane osobno przed złożeniem zamówienia.</li>
                                </ol>
                            </li>
                            <li>Dostępne formy płatności są wskazane w Sklepie oraz podczas składania zamówienia (np. szybkie płatności online, BLIK, karta płatnicza, przelew tradycyjny).</li>
                            <li>W przypadku płatności online brak zaksięgowania płatności w określonym czasie może skutkować anulowaniem zamówienia.</li>
                        </ol>

                        {/* §8 Dostawa */}
                        <h2 className="text-xl font-medium text-white mt-8 mb-4">§8. Dostawa</h2>
                        <ol className="text-white/80 mb-6 space-y-3 list-decimal list-inside">
                            <li>Dostawa Towarów odbywa się na terytorium <strong className="text-white">Rzeczypospolitej Polskiej</strong>.</li>
                            <li>Dostępne formy dostawy (np. kurier, paczkomat) oraz ich koszt są prezentowane w Sklepie przed złożeniem zamówienia.</li>
                            <li>Termin realizacji zamówienia wynosi co do zasady od <strong className="text-white">2 do 7 dni roboczych</strong> od zaksięgowania płatności, chyba że opis produktu lub komunikat w Sklepie wskazuje inaczej.</li>
                            <li>Klient powinien sprawdzić stan przesyłki przy odbiorze. W razie widocznych uszkodzeń zaleca się spisanie protokołu szkody z kurierem lub zgłoszenie problemu jak najszybciej Sprzedawcy.</li>
                        </ol>

                        {/* §9 Prawo odstąpienia */}
                        <h2 className="text-xl font-medium text-white mt-8 mb-4">§9. Prawo odstąpienia od umowy (konsument)</h2>
                        <ol className="text-white/80 mb-6 space-y-3 list-decimal list-inside">
                            <li>Konsument (oraz przedsiębiorca na prawach konsumenta) ma prawo odstąpić od Umowy sprzedaży zawartej na odległość w terminie <strong className="text-white">14 dni</strong> bez podania przyczyny.</li>
                            <li>
                                Termin 14 dni liczy się od dnia:
                                <ol className="mt-2 ml-4 space-y-1 list-[lower-alpha] list-inside">
                                    <li>otrzymania Towaru przez Konsumenta lub osobę przez niego wskazaną,</li>
                                    <li>w przypadku wielu Towarów – od otrzymania ostatniego z nich.</li>
                                </ol>
                            </li>
                            <li>Aby skorzystać z prawa odstąpienia, Konsument powinien przesłać Sprzedawcy jednoznaczne oświadczenie (np. e-mailem na adres <a href="mailto:kontakt@strzykawa.com" className="text-accent hover:text-white">kontakt@strzykawa.com</a>). Może użyć wzoru formularza dostępnego w Sklepie, jednak nie jest to obowiązkowe.</li>
                            <li>Konsument jest zobowiązany odesłać Towar na adres Sprzedawcy niezwłocznie, nie później niż w ciągu 14 dni od dnia, w którym poinformował o odstąpieniu od umowy.</li>
                            <li>Konsument ponosi bezpośrednie koszty zwrotu Towaru.</li>
                            <li>Sprzedawca zwróci Konsumentowi wszystkie otrzymane od niego płatności, w tym koszty dostawy (do wysokości najtańszej oferowanej opcji), nie później niż w ciągu 14 dni od dnia otrzymania oświadczenia o odstąpieniu od umowy. Sprzedawca może wstrzymać się ze zwrotem do chwili otrzymania Towaru lub dostarczenia dowodu jego odesłania.</li>
                            <li>
                                Prawo odstąpienia może nie przysługiwać w odniesieniu do części Towarów, w szczególności:
                                <ol className="mt-2 ml-4 space-y-1 list-[lower-alpha] list-inside">
                                    <li>Towarów szybko psujących się lub o krótkim terminie przydatności,</li>
                                    <li>Towarów dostarczanych w zapieczętowanym opakowaniu, których po otwarciu nie można zwrócić ze względu na ochronę zdrowia lub ze względów higienicznych,</li>
                                </ol>
                                <p className="mt-2">jeśli zostało to wskazane w opisie produktu oraz wynika z obowiązujących przepisów.</p>
                            </li>
                        </ol>

                        {/* §10 Reklamacje */}
                        <h2 className="text-xl font-medium text-white mt-8 mb-4">§10. Reklamacje (rękojmia)</h2>
                        <ol className="text-white/80 mb-6 space-y-3 list-decimal list-inside">
                            <li>Sprzedawca jest zobowiązany dostarczyć Klientowi Towar wolny od wad.</li>
                            <li>
                                W przypadku stwierdzenia wady Towaru Klient może złożyć reklamację:
                                <ul className="mt-2 ml-4 space-y-1 list-disc list-inside">
                                    <li>mailowo na adres: <a href="mailto:kontakt@strzykawa.com" className="text-accent hover:text-white">kontakt@strzykawa.com</a>,</li>
                                    <li>lub pisemnie na adres siedziby lub kawiarni Sprzedawcy.</li>
                                </ul>
                            </li>
                            <li>
                                W zgłoszeniu reklamacyjnym zaleca się:
                                <ol className="mt-2 ml-4 space-y-1 list-[lower-alpha] list-inside">
                                    <li>podanie danych kontaktowych Klienta,</li>
                                    <li>numeru zamówienia,</li>
                                    <li>opisu wady i daty jej stwierdzenia,</li>
                                    <li>określenie żądanego sposobu rozpatrzenia reklamacji (naprawa, wymiana, obniżenie ceny, odstąpienie od umowy).</li>
                                </ol>
                            </li>
                            <li>Sprzedawca ustosunkuje się do reklamacji w terminie <strong className="text-white">14 dni</strong> od jej otrzymania.</li>
                            <li>Towar wadliwy powinien zostać odesłany na adres wskazany przez Sprzedawcę po wcześniejszym kontakcie, chyba że Sprzedawca wskaże inaczej.</li>
                        </ol>

                        {/* §11 Dane osobowe */}
                        <h2 className="text-xl font-medium text-white mt-8 mb-4">§11. Dane osobowe</h2>
                        <ol className="text-white/80 mb-6 space-y-3 list-decimal list-inside">
                            <li>Administratorem danych osobowych Klientów jest Sprzedawca.</li>
                            <li>Szczegółowe zasady przetwarzania danych osobowych oraz wykorzystywania plików cookies zostały opisane w{' '}
                                <Link to="/polityka-prywatnosci" className="text-accent hover:text-white">Polityce prywatności</Link>,
                                dostępnej na stronie Sklepu.</li>
                        </ol>

                        {/* §12 Postanowienia końcowe */}
                        <h2 className="text-xl font-medium text-white mt-8 mb-4">§12. Postanowienia końcowe</h2>
                        <ol className="text-white/80 mb-6 space-y-3 list-decimal list-inside">
                            <li>
                                Sprzedawca zastrzega sobie prawo do zmiany Regulaminu z ważnych przyczyn, w szczególności:
                                <ol className="mt-2 ml-4 space-y-1 list-[lower-alpha] list-inside">
                                    <li>zmiany przepisów prawa,</li>
                                    <li>zmian sposobów płatności lub dostawy,</li>
                                    <li>zmian funkcjonalności Sklepu.</li>
                                </ol>
                            </li>
                            <li>Do umów zawartych przed wejściem w życie nowego Regulaminu stosuje się Regulamin obowiązujący w dniu złożenia zamówienia.</li>
                            <li>W sprawach nieuregulowanych Regulaminem zastosowanie mają przepisy prawa polskiego, w szczególności Kodeksu cywilnego oraz ustawa o prawach konsumenta.</li>
                            <li>Regulamin obowiązuje od dnia <strong className="text-white">12 grudnia 2025</strong>.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
