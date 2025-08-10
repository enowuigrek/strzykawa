import React from 'react';
import { FaFacebookF, FaInstagram, } from 'react-icons/fa';

/**
 * Footer renders social media links and a copyright notice.  Icons
 * from react-icons provide scalable vector artwork without
 * additional dependencies.  Replace the URLs with your own social
 * profiles when you deploy the site.
 */
function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="social-icons">
        <a
          href="https://www.facebook.com/strzykawa"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://www.instagram.com/strzykawa"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://twitter.com/strzykawa"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </div>
      <p>&copy; {currentYear} Strzykawa. Wszystkie prawa zastrzeżone.</p>
    </footer>
  );
}

export default Footer;