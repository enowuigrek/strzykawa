import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackQRScan } from '@/utils/analytics';

/**
 * Wykrywa wejście przez QR kod (utm_source=qr w URL) i odpala event GA4.
 * Działa raz per sesja — kolejne nawigacje w obrębie tej samej sesji nie powielają eventu.
 */
export function useQRTracking() {
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('utm_source') !== 'qr') return;
        if (sessionStorage.getItem('strzykawa-qr-tracked')) return;

        sessionStorage.setItem('strzykawa-qr-tracked', 'true');

        trackQRScan({
            campaign: params.get('utm_campaign') || '',
            medium: params.get('utm_medium') || '',
            content: params.get('utm_content') || '',
        });
    }, [location.search]);
}
