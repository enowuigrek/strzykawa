import React, { useState, useEffect, useRef, useCallback } from 'react';
import { QR_ACCESS_KEY, QR_STORAGE_KEY, SITE_URL } from '@constants/qr';
import { shopify } from '@services/shopify';

const DOT_STYLES = [
    { value: 'rounded', label: 'Zaokrąglone', cornersSquare: 'extra-rounded', cornersDot: 'dot' },
    { value: 'square', label: 'Klasyczne', cornersSquare: 'square', cornersDot: 'square' },
    { value: 'dots', label: 'Kropki', cornersSquare: 'extra-rounded', cornersDot: 'dot' },
    { value: 'extra-rounded', label: 'Miękkie', cornersSquare: 'extra-rounded', cornersDot: 'dot' },
    { value: 'classy-rounded', label: 'Eleganckie', cornersSquare: 'extra-rounded', cornersDot: 'dot' },
];

const DESTINATION_OPTIONS = [
    { value: '/', label: 'Strona główna' },
    { value: '/kawy', label: 'Katalog kaw' },
    { value: '/o-nas', label: 'O nas' },
    { value: '/kontakt', label: 'Kontakt' },
    { value: 'custom', label: 'Własny URL...' },
];

const DEFAULT_MEDIUMS = ['Paczka z kawą', 'Ulotka', 'Plakat', 'Naklejka', 'Wizytówka'];

async function buildWhiteLogoUrl(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const d = imageData.data;
            for (let i = 0; i < d.length; i += 4) {
                const brightness = (d[i] + d[i + 1] + d[i + 2]) / 3;
                if (d[i + 3] > 128 && brightness < 180) {
                    d[i] = 255; d[i + 1] = 255; d[i + 2] = 255;
                } else {
                    d[i + 3] = 0;
                }
            }
            ctx.putImageData(imageData, 0, 0);
            resolve(canvas.toDataURL());
        };
        img.onerror = () => resolve(src);
        img.src = src;
    });
}

function slugify(str) {
    return str.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

function getQRConfig(dotStyle = 'rounded', inverted = false, showLogo = true, logoUrl = '/logo/icon-logo.png') {
    const style = DOT_STYLES.find((s) => s.value === dotStyle) || DOT_STYLES[0];
    const dotColor = inverted ? '#ffffff' : '#1E2A25';
    const bgColor = inverted ? '#1E2A25' : '#ffffff';
    return {
        image: showLogo ? logoUrl : '',
        qrOptions: { errorCorrectionLevel: 'H' },
        dotsOptions: { color: dotColor, type: dotStyle },
        backgroundOptions: { color: bgColor },
        cornersSquareOptions: { type: style.cornersSquare, color: dotColor },
        cornersDotOptions: { type: style.cornersDot, color: dotColor },
        imageOptions: { crossOrigin: 'anonymous', margin: 2, imageSize: 0.38 },
    };
}

function loadFromStorage(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
}

export function QRGenerator() {
    const [hasAccess, setHasAccess] = useState(false);
    const [keyInput, setKeyInput] = useState('');
    const [keyError, setKeyError] = useState(false);

    const [mode, setMode] = useState('product');
    const [products, setProducts] = useState([]);
    const [selectedHandle, setSelectedHandle] = useState('');
    const [campaign, setCampaign] = useState('');
    const [destination, setDestination] = useState('/');
    const [customUrl, setCustomUrl] = useState('');

    const [mediums, setMediums] = useState(() => loadFromStorage('strzykawa-qr-mediums', DEFAULT_MEDIUMS));
    const [medium, setMedium] = useState(DEFAULT_MEDIUMS[0]);
    const [newMediumInput, setNewMediumInput] = useState('');

    const [savedCampaigns, setSavedCampaigns] = useState(() => loadFromStorage('strzykawa-qr-campaigns', []));

    const [dotStyle, setDotStyle] = useState('rounded');
    const [inverted, setInverted] = useState(false);
    const [showLogo, setShowLogo] = useState(true);
    const [whiteLogoUrl, setWhiteLogoUrl] = useState(null);
    const [copied, setCopied] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    const qrRef = useRef(null);
    const qrInstance = useRef(null);

    useEffect(() => {
        if (!inverted || whiteLogoUrl) return;
        buildWhiteLogoUrl('/logo/icon-logo.png').then(setWhiteLogoUrl);
    }, [inverted, whiteLogoUrl]);

    useEffect(() => {
        localStorage.setItem('strzykawa-qr-mediums', JSON.stringify(mediums));
    }, [mediums]);

    useEffect(() => {
        localStorage.setItem('strzykawa-qr-campaigns', JSON.stringify(savedCampaigns));
    }, [savedCampaigns]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const key = params.get('key');
        if (key === QR_ACCESS_KEY) {
            localStorage.setItem(QR_STORAGE_KEY, 'true');
            setHasAccess(true);
            window.history.replaceState({}, '', window.location.pathname);
        } else if (localStorage.getItem(QR_STORAGE_KEY) === 'true') {
            setHasAccess(true);
        }
    }, []);

    useEffect(() => {
        if (!hasAccess) return;
        shopify.fetchProducts(50).then((prods) => {
            const list = prods || [];
            setProducts(list);
            if (list.length) setSelectedHandle(list[0].handle);
        }).catch(() => {});
    }, [hasAccess]);

    const buildUrl = useCallback(() => {
        const mediumSlug = slugify(medium) || 'qr';
        const params = new URLSearchParams({ utm_source: 'qr', utm_medium: mediumSlug });

        if (mode === 'product') {
            if (!selectedHandle) return SITE_URL;
            params.set('utm_campaign', selectedHandle);
            return `${SITE_URL}/kawy/${selectedHandle}?${params}`;
        }

        const camp = campaign.trim().replace(/\s+/g, '-').toLowerCase() || 'general';
        params.set('utm_campaign', camp);

        if (destination === 'custom') {
            const base = customUrl.trim() || SITE_URL;
            const sep = base.includes('?') ? '&' : '?';
            return `${base}${sep}${params}`;
        }

        return `${SITE_URL}${destination}?${params}`;
    }, [mode, medium, selectedHandle, campaign, destination, customUrl]);

    const qrUrl = buildUrl();

    useEffect(() => {
        if (!hasAccess || !qrRef.current) return;
        let mounted = true;
        import('qr-code-styling').then(({ default: QRCodeStyling }) => {
            if (!mounted || !qrRef.current) return;
            const instance = new QRCodeStyling({ width: 280, height: 280, data: qrUrl, ...getQRConfig(dotStyle, inverted, showLogo, inverted && whiteLogoUrl ? whiteLogoUrl : '/logo/icon-logo.png') });
            qrRef.current.innerHTML = '';
            instance.append(qrRef.current);
            qrInstance.current = instance;
        });
        return () => { mounted = false; };
    }, [hasAccess]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        qrInstance.current?.update({ data: qrUrl, ...getQRConfig(dotStyle, inverted, showLogo, inverted && whiteLogoUrl ? whiteLogoUrl : '/logo/icon-logo.png') });
    }, [qrUrl, dotStyle, inverted, showLogo]);

    const addMedium = () => {
        const val = newMediumInput.trim();
        if (!val || mediums.includes(val)) return;
        setMediums((prev) => [...prev, val]);
        setMedium(val);
        setNewMediumInput('');
    };

    const removeMedium = (m) => {
        setMediums((prev) => {
            const next = prev.filter((x) => x !== m);
            if (medium === m) setMedium(next[0] || '');
            return next;
        });
    };

    const saveCampaign = () => {
        const val = campaign.trim();
        if (!val || savedCampaigns.includes(val)) return;
        setSavedCampaigns((prev) => [...prev, val]);
    };

    const removeCampaign = (c) => {
        setSavedCampaigns((prev) => prev.filter((x) => x !== c));
    };

    const handleDownload = async (ext) => {
        setIsDownloading(true);
        try {
            const { default: QRCodeStyling } = await import('qr-code-styling');
            const instance = new QRCodeStyling({ width: 1000, height: 1000, data: qrUrl, ...getQRConfig(dotStyle, inverted, showLogo, inverted && whiteLogoUrl ? whiteLogoUrl : '/logo/icon-logo.png') });
            const slug = mode === 'product'
                ? selectedHandle || 'produkt'
                : campaign.trim().replace(/\s+/g, '-').toLowerCase() || 'ogolny';
            await instance.download({ name: `qr-strzykawa-${slug}`, extension: ext });
        } finally {
            setIsDownloading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(qrUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleKeySubmit = (e) => {
        e.preventDefault();
        if (keyInput === QR_ACCESS_KEY) {
            localStorage.setItem(QR_STORAGE_KEY, 'true');
            setHasAccess(true);
        } else {
            setKeyError(true);
        }
    };

    if (!hasAccess) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center p-4">
                <div className="w-full max-w-sm">
                    <img src="/logo/vertical-logo.png" alt="Strzykawa" className="h-20 mx-auto mb-8 opacity-80" />
                    <form onSubmit={handleKeySubmit} className="space-y-4">
                        <input
                            type="password"
                            value={keyInput}
                            onChange={(e) => { setKeyInput(e.target.value); setKeyError(false); }}
                            placeholder="Hasło dostępu"
                            autoFocus
                            className={`w-full px-4 py-3 bg-primary-light text-white placeholder-muted outline-none border transition-colors ${keyError ? 'border-danger' : 'border-transparent focus:border-accent'}`}
                        />
                        {keyError && <p className="text-danger text-sm">Nieprawidłowe hasło</p>}
                        <button type="submit" className="w-full rounded-full px-6 py-3 bg-accent text-white font-medium hover:bg-accent/90 transition-colors">
                            Wejdź
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary text-white p-6 font-sans">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <img src="/logo/horizontal-logo.png" alt="Strzykawa" className="h-8 mb-4 opacity-70" />
                    <h1 className="text-2xl font-bold">Generator QR</h1>
                    <p className="text-muted text-sm mt-1">Narzędzie wewnętrzne — nie udostępniaj linku do tej strony</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* ── Lewa kolumna: opcje ── */}
                    <div className="space-y-6">

                        {/* Typ kodu */}
                        <div>
                            <label className="block text-xs font-semibold text-muted mb-2 uppercase tracking-wider">Typ kodu</label>
                            <div className="flex gap-2">
                                {[['product', 'Produkt'], ['general', 'Ogólny']].map(([val, label]) => (
                                    <button
                                        key={val}
                                        onClick={() => setMode(val)}
                                        className={`flex-1 rounded-full py-2 px-4 text-sm font-medium transition-colors ${mode === val ? 'bg-accent text-white' : 'bg-primary-light text-muted hover:text-white'}`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Kawa */}
                        {mode === 'product' && (
                            <div>
                                <label className="block text-xs font-semibold text-muted mb-2 uppercase tracking-wider">Kawa</label>
                                <select
                                    value={selectedHandle}
                                    onChange={(e) => setSelectedHandle(e.target.value)}
                                    className="w-full px-4 py-3 bg-primary-light text-white outline-none border border-transparent focus:border-accent transition-colors"
                                >
                                    {products.length === 0 && <option value="">Ładowanie...</option>}
                                    {products.map((p) => (
                                        <option key={p.handle} value={p.handle}>{p.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Ogólny */}
                        {mode === 'general' && (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-muted mb-2 uppercase tracking-wider">Cel (strona docelowa)</label>
                                    <select
                                        value={destination}
                                        onChange={(e) => setDestination(e.target.value)}
                                        className="w-full px-4 py-3 bg-primary-light text-white outline-none border border-transparent focus:border-accent transition-colors"
                                    >
                                        {DESTINATION_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                                {destination === 'custom' && (
                                    <div>
                                        <label className="block text-xs font-semibold text-muted mb-2 uppercase tracking-wider">URL docelowy</label>
                                        <input
                                            type="url"
                                            value={customUrl}
                                            onChange={(e) => setCustomUrl(e.target.value)}
                                            placeholder="https://..."
                                            className="w-full px-4 py-3 bg-primary-light text-white placeholder-muted outline-none border border-transparent focus:border-accent transition-colors"
                                        />
                                    </div>
                                )}
                                <div>
                                    <label className="block text-xs font-semibold text-muted mb-2 uppercase tracking-wider">Nazwa kampanii</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={campaign}
                                            onChange={(e) => setCampaign(e.target.value)}
                                            placeholder="np. ulotka-marzec"
                                            className="flex-1 px-4 py-2.5 bg-primary-light text-white placeholder-muted outline-none border border-transparent focus:border-accent transition-colors min-w-0"
                                        />
                                        <button
                                            onClick={saveCampaign}
                                            disabled={!campaign.trim() || savedCampaigns.includes(campaign.trim())}
                                            className="rounded-full px-4 py-2 bg-primary-light text-muted hover:text-white text-sm disabled:opacity-40 transition-colors whitespace-nowrap"
                                        >
                                            Zapisz
                                        </button>
                                    </div>
                                    {savedCampaigns.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {savedCampaigns.map((c) => (
                                                <div key={c} className="flex items-center gap-0.5">
                                                    <button
                                                        onClick={() => setCampaign(c)}
                                                        className={`rounded-full py-1 px-2.5 text-xs font-medium transition-colors ${campaign === c ? 'bg-accent text-white' : 'bg-primary-light text-muted hover:text-white'}`}
                                                    >
                                                        {c}
                                                    </button>
                                                    <button onClick={() => removeCampaign(c)} className="text-muted hover:text-danger text-sm leading-none px-0.5 transition-colors">×</button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {/* Nośnik */}
                        <div>
                            <label className="block text-xs font-semibold text-muted mb-2 uppercase tracking-wider">Nośnik</label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {mediums.map((m) => (
                                    <div key={m} className="flex items-center gap-0.5">
                                        <button
                                            onClick={() => setMedium(m)}
                                            className={`rounded-full py-1.5 px-3 text-sm font-medium transition-colors ${medium === m ? 'bg-accent text-white' : 'bg-primary-light text-muted hover:text-white'}`}
                                        >
                                            {m}
                                        </button>
                                        <button onClick={() => removeMedium(m)} className="text-muted hover:text-danger text-sm leading-none px-0.5 transition-colors">×</button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newMediumInput}
                                    onChange={(e) => setNewMediumInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addMedium()}
                                    placeholder="Dodaj własny nośnik..."
                                    className="flex-1 px-3 py-2 bg-primary-light text-white text-sm placeholder-muted outline-none border border-transparent focus:border-accent transition-colors min-w-0"
                                />
                                <button
                                    onClick={addMedium}
                                    disabled={!newMediumInput.trim()}
                                    className="rounded-full px-4 py-2 bg-primary-light text-muted hover:text-white text-sm disabled:opacity-40 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Styl kodu */}
                        <div>
                            <label className="block text-xs font-semibold text-muted mb-2 uppercase tracking-wider">Styl kodu</label>
                            <div className="flex flex-wrap gap-2">
                                {DOT_STYLES.map((s) => (
                                    <button
                                        key={s.value}
                                        onClick={() => setDotStyle(s.value)}
                                        className={`rounded-full py-1.5 px-3 text-xs font-medium transition-colors ${dotStyle === s.value ? 'bg-accent text-white' : 'bg-primary-light text-muted hover:text-white'}`}
                                    >
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Kolory */}
                        <div>
                            <label className="block text-xs font-semibold text-muted mb-2 uppercase tracking-wider">Kolory</label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setInverted(false)}
                                    className={`flex-1 rounded-full py-2 px-3 text-sm font-medium transition-colors ${!inverted ? 'bg-accent text-white' : 'bg-primary-light text-muted hover:text-white'}`}
                                >
                                    <span className="inline-block w-3 h-3 rounded-full bg-[#1E2A25] border border-white/30 mr-1.5 align-middle" />
                                    Ciemne na białym
                                </button>
                                <button
                                    onClick={() => setInverted(true)}
                                    className={`flex-1 rounded-full py-2 px-3 text-sm font-medium transition-colors ${inverted ? 'bg-accent text-white' : 'bg-primary-light text-muted hover:text-white'}`}
                                >
                                    <span className="inline-block w-3 h-3 rounded-full bg-white border border-white/30 mr-1.5 align-middle" />
                                    Białe na ciemnym
                                </button>
                            </div>
                        </div>

                        {/* Logo */}
                        <div>
                            <label className="block text-xs font-semibold text-muted mb-2 uppercase tracking-wider">Logo</label>
                            <div className="flex gap-2">
                                {[true, false].map((val) => (
                                    <button
                                        key={String(val)}
                                        onClick={() => setShowLogo(val)}
                                        className={`flex-1 rounded-full py-2 px-3 text-sm font-medium transition-colors ${showLogo === val ? 'bg-accent text-white' : 'bg-primary-light text-muted hover:text-white'}`}
                                    >
                                        {val ? 'Z logo' : 'Bez logo'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* URL */}
                        <div>
                            <label className="block text-xs font-semibold text-muted mb-2 uppercase tracking-wider">URL kodu</label>
                            <div className="flex gap-2">
                                <input
                                    readOnly
                                    value={qrUrl}
                                    className="flex-1 px-4 py-2 bg-primary-light text-muted text-xs outline-none border border-transparent min-w-0"
                                />
                                <button
                                    onClick={handleCopy}
                                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${copied ? 'bg-success text-white' : 'bg-primary-light text-muted hover:text-white'}`}
                                >
                                    {copied ? '✓ Skopiowano' : 'Kopiuj'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── Prawa kolumna: podgląd ── */}
                    <div className="flex flex-col items-center gap-6">
                        <div>
                            <label className="block text-xs font-semibold text-muted mb-4 uppercase tracking-wider text-center">Podgląd</label>
                            <div className={`p-4 inline-block ${inverted ? 'bg-[#1E2A25] border border-white/10' : 'bg-white'}`}>
                                <div ref={qrRef} />
                            </div>
                        </div>

                        <div className="w-full space-y-3">
                            <p className="text-xs font-semibold text-muted uppercase tracking-wider text-center">Pobierz</p>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => handleDownload('png')}
                                    disabled={isDownloading}
                                    className="rounded-full py-3 px-4 bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
                                >
                                    PNG 1000×1000
                                </button>
                                <button
                                    onClick={() => handleDownload('svg')}
                                    disabled={isDownloading}
                                    className="rounded-full py-3 px-4 bg-primary-light text-white text-sm font-medium hover:bg-accent/20 transition-colors disabled:opacity-50"
                                >
                                    SVG (wektorowy)
                                </button>
                            </div>
                            <p className="text-muted text-xs text-center">PNG do druku · SVG do edycji w programach graficznych</p>
                        </div>
                    </div>
                </div>

                {/* Info GA4 */}
                <div className="mt-10 p-4 bg-primary-light rounded-lg border border-accent/20">
                    <p className="text-sm font-semibold text-accent mb-2">Gdzie zobaczyć dane w GA4?</p>
                    <ul className="text-muted text-sm space-y-1">
                        <li>• <span className="text-white">Realtime</span> — zeskanuj i obserwuj event <code className="text-accent text-xs">qr_scan</code> na żywo (działa w ciągu 30 sekund)</li>
                        <li>• <span className="text-white">Reports → Engagement → Events</span> — wszystkie skany z podziałem na kampanie</li>
                        <li>• <span className="text-white">Reports → Acquisition → Traffic acquisition</span> — filtruj po <code className="text-accent text-xs">Session source = qr</code></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
