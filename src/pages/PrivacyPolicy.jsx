import { Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout.jsx';

export function PrivacyPolicy() {
    return (
        <PageLayout title="Polityka prywatności">
            <div className="container mx-auto max-w-4xl px-4 py-8">
                <div className="bg-primary-light border border-white/10 p-6 sm:p-8">
                    <div className="prose prose-invert max-w-none">
                        <p className="text-white/60 mb-6">
                            <strong>Data ostatniej aktualizacji:</strong> 25 lutego 2026
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
                        <p className="text-white/80 mb-4">
                            Szczegółowe informacje na temat rodzajów stosowanych cookies, ich celu oraz sposobów
                            zarządzania nimi znajdują się w osobnym dokumencie{' '}
                            <Link to="/polityka-cookies" className="text-accent hover:text-white">Polityka plików cookies</Link>.
                        </p>
                        <p className="text-white/80 mb-6">
                            Przy pierwszej wizycie na stronie wyświetlany jest baner umożliwiający wyrażenie zgody
                            na poszczególne kategorie plików cookies. Swoje preferencje możesz zmienić w dowolnym
                            momencie, klikając „Ustawienia cookies" w stopce strony.
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
