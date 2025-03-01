import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/Footer.scss";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <h2 className="footer-logo">PhoneStore</h2>

        <div className="footer-links">
          <Link to="/about">Về chúng tôi</Link>
          <Link to="/contact">Liên hệ</Link>
          <Link to="/policy">Chính sách bảo hành</Link>
        </div>

        <div className="footer-social">
          <a
            href="https://www.facebook.com/share/15UEcEao3q/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a href="https://www.tiktok.com/@lovanthanhgmail.com?_t=ZS-8u9DBwnGH0p&_r=1">
            <FaTiktok />
          </a>
        </div>

        <p className="footer-copy">
          &copy; 2025 PhoneStore. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
