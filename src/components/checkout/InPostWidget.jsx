import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { logger } from '../../utils/logger.js';

/**
 * InPostWidget - Widget wyboru paczkomatu InPost
 * @param {Object} selectedPaczkomat - Wybrany paczkomat
 * @param {Function} onSelect - Callback po wyborze paczkomatu
 * @param {String} error - Błąd walidacji
 */
export function InPostWidget({ selectedPaczkomat, onSelect, error }) {
    const widgetRef = useRef(null);

    eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzQlpXVzFNZzVlQnpDYU1XU3JvTlBjRWFveFpXcW9Ua2FuZVB3X291LWxvIn0.eyJleHAiOjIwODcyMjk0MjQsImlhdCI6MTc3MTg2OTQyNCwianRpIjoiMjI0MjMzODUtYmVhZi00MTc0LWJkMGEtNzgyZjdmODkxMDI3IiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5pbnBvc3QucGwvYXV0aC9yZWFsbXMvZXh0ZXJuYWwiLCJzdWIiOiJmOjEyNDc1MDUxLTFjMDMtNGU1OS1iYTBjLTJiNDU2OTVlZjUzNTpzV2Q5S3BKUm5VYVFPRm1CeU5kb1V2eXd6M2dLOURBb0xBOS1SX0t4dXVVIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2hpcHgiLCJzZXNzaW9uX3N0YXRlIjoiNzlmOWMyM2ItY2M5Yi00MjExLTkwNzEtNDU1OTMxNDBmY2U1Iiwic2NvcGUiOiJvcGVuaWQgYXBpOmFwaXBvaW50cyIsInNpZCI6Ijc5ZjljMjNiLWNjOWItNDIxMS05MDcxLTQ1NTkzMTQwZmNlNSIsImFsbG93ZWRfcmVmZXJyZXJzIjoic3RyenlrYXdhLmNvbSIsInV1aWQiOiJhMzcyYWNjZi0yMDBjLTQ4OTItOTg2ZC0xOGE4NzQzYzI2YzMifQ.eqdxMBrQN94mwKHmQHLKwknaq3sDf9k95oSXjKXpQOPUxaTrzLIvWDnAOGTrGIHJzlrGNVA-vqqbnXUZUL6tdg2lEXMgYYFJykSVzylEVKqfIatkNOjVlIB-YDblhLiQ5E0KRNqtvlUKBaWIJhp_zF-c3BV8gk7vZYhQncwmhFRN1LD6zjBlkXPJBfT2iqXu1MGOBbqw3HBHE4PJsJDVB88ns6W9VoTOM8VtSsXLx88i8BXKufmFREVxS-U72UP98NBLzRfteKlDO9oZmMUwZOac1hcQil3MMsws7DUpLYUwPFzRg_iv2JZUMtR5TRc7h2xULFOil1CKGtvp1IfbCA

    // ===== OPEN INPOST GEOWIDGET =====
    const openWidget = () => {
        // Sprawdź czy InPost Geowidget został załadowany
        if (typeof window.easyPack === 'undefined') {
            logger.error('InPost Geowidget SDK not loaded');
            alert('Nie udało się załadować widgetu paczkomatów. Spróbuj odświeżyć stronę.');
            return;
        }

        // Otwórz widget
        window.easyPack.modalMap(
            (point, modal) => {
                // Callback po wyborze paczkomatu
                logger.log('InPost paczkomat selected:', point.name);
                onSelect(point);
                modal.closeModal();
            },
            {
                width: 900,
                height: 600,
                locale: 'pl',
                points: {
                    types: ['parcel_locker'], // Tylko paczkomaty
                },
            }
        );
    };

    // ===== RENDER =====
    return (
        <div ref={widgetRef} className="space-y-4">
            {/* SELECTED PACZKOMAT (jeśli wybrano) */}
            {selectedPaczkomat && (
                <div className="p-4 bg-success/10 border border-success">
                    <div className="flex items-start gap-3">
                        <FaMapMarkerAlt className="text-success text-xl mt-1" />
                        <div className="flex-1">
                            <h3 className="text-white mb-1">
                                {selectedPaczkomat.name}
                            </h3>
                            <p className="text-sm text-muted">
                                {selectedPaczkomat.address_details?.city},{' '}
                                {selectedPaczkomat.address_details?.street}{' '}
                                {selectedPaczkomat.address_details?.building_number}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={openWidget}
                            className="
                                px-4 py-2
                                rounded-full
                                bg-accent
                                text-white text-sm font-medium
                                hover:bg-accent/90
                                transition-all duration-200
                            "
                        >
                            Zmień
                        </button>
                    </div>
                </div>
            )}

            {/* WYBIERZ PACZKOMAT BUTTON (jeśli nie wybrano) */}
            {!selectedPaczkomat && (
                <button
                    type="button"
                    onClick={openWidget}
                    className={`
                        w-full p-6
                        border-2 border-dashed
                        transition-all duration-200
                        hover:scale-[1.02]
                        ${error ? 'border-danger bg-danger/5' : 'border-accent/30 hover:border-accent/50'}
                    `}
                >
                    <div className="flex flex-col items-center gap-3">
                        <FaMapMarkerAlt className={`text-3xl ${error ? 'text-danger' : 'text-accent'}`} />
                        <span className="text-white font-medium">Wybierz paczkomat InPost</span>
                        <span className="text-sm text-muted">
                            Kliknij, aby otworzyć mapę paczkomatów
                        </span>
                    </div>
                </button>
            )}

            {/* ERROR MESSAGE */}
            {error && <p className="text-danger text-sm mt-2">{error}</p>}

            {/* INFO */}
            <div className="mt-4 p-4 bg-accent/10 border border-accent/30">
                <p className="text-sm text-muted">
                    💡 Wybierz paczkomat InPost najbliżej Ciebie. Otrzymasz SMS i email z kodem
                    odbioru, gdy paczka będzie gotowa.
                </p>
            </div>
        </div>
    );
}

InPostWidget.propTypes = {
    selectedPaczkomat: PropTypes.object,
    onSelect: PropTypes.func.isRequired,
    error: PropTypes.string,
};

InPostWidget.defaultProps = {
    selectedPaczkomat: null,
    error: null,
};
