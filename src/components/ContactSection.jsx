import React from 'react';

/**
 * ContactSection displays the café's address, telephone, email and
 * opening hours alongside an embedded Google Map.  The iframe URL
 * below contains a placeholder location; update it to the correct
 * coordinates for Strzykawa's location.  The container uses a grid
 * layout that adapts to mobile screens gracefully.
 */
function ContactSection() {
  return (
    <section className="contact-section" id="kontakt">
      <div className="container">
        <h2>Kontakt &amp; Lokalizacja</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <p>
              <strong>Adres:</strong> ul. Dąbrowskiego 4, &nbsp; Częstochowa
            </p>
            <p>
              <strong>Telefon:</strong> +48&nbsp;668&nbsp;011&nbsp;806
            </p>
            <p>
              <strong>Email:</strong> fitanddrink@gmail.com
            </p>
            <p>
              <strong>Godziny otwarcia:</strong>
              <br />Pon–Pt: 9:00–17:00
              <br />Sob–Niedz: 10:00–15:00
            </p>
          </div>
          <div className="map-wrapper">
            <iframe
              title="Mapa Strzykawa"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.714594299478!2d19.12885711568111!3d50.8123459775864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4710a9b40cfbdb0f%3A0x123456789abcdef!2sCz%C4%99stochowa!5e0!3m2!1spl!2spl!4v1593186123456!5m2!1spl!2spl"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;