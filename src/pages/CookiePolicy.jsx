import { PageLayout } from '../components/layout/PageLayout.jsx';

export function CookiePolicy() {
    return (
        <PageLayout title="Polityka cookies">
            <div className="container mx-auto max-w-4xl px-4 py-8">
                <div className="bg-primary-light border border-white/10 p-6 sm:p-8">
                    <div className="prose prose-invert max-w-none">
                        <p className="text-white/60 mb-6">
                            <strong>Data ostatniej aktualizacji:</strong> 25 lutego 2026
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
                        <p className="text-white/80 mb-6">
                            Na moment uruchomienia serwisu nie wykorzystujemy cookies analitycznych (np. Google Analytics)
                            ani marketingowych (np. piksel Meta). Serwis wyposażony jest w mechanizm zarządzania zgodami
                            (baner cookies), który w przypadku wprowadzenia takich narzędzi pozwoli Ci wybrać, jakie
                            kategorie cookies chcesz zaakceptować. Swoje preferencje dotyczące cookies możesz zmienić
                            w dowolnym momencie, klikając „Ustawienia cookies" w stopce strony.
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
