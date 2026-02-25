import { Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout.jsx';

export function TermsAndConditions() {
    return (
        <PageLayout title="Regulamin sklepu">
            <div className="container mx-auto max-w-4xl px-4 py-8">
                <div className="bg-primary-light border border-white/10 p-6 sm:p-8">
                    <div className="prose prose-invert max-w-none">
                        <p className="text-white/60 mb-6">
                            <strong>Data ostatniej aktualizacji:</strong> 19 stycznia 2026
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
                            <li>Termin realizacji zamówienia wynosi co do zasady <strong className="text-white">do 7 dni roboczych</strong> od zaksięgowania płatności, chyba że opis produktu lub komunikat w Sklepie wskazuje inaczej.</li>
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
                            <li>Regulamin obowiązuje od dnia <strong className="text-white">19 stycznia 2026</strong>.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
