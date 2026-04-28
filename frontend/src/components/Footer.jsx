import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-social">
          <a href="#" className="footer-social-link">
            <Facebook size={24} />
          </a>
          <a href="#" className="footer-social-link">
            <Instagram size={24} />
          </a>
          <a href="#" className="footer-social-link">
            <Twitter size={24} />
          </a>
          <a href="#" className="footer-social-link">
            <Youtube size={24} />
          </a>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <a href="#">Audio Description</a>
            <a href="#">Investor Relations</a>
            <a href="#">Legal Notices</a>
          </div>
          
          <div className="footer-column">
            <a href="#">Help Center</a>
            <a href="#">Jobs</a>
            <a href="#">Cookie Preferences</a>
          </div>
          
          <div className="footer-column">
            <a href="#">Gift Cards</a>
            <a href="#">Terms of Use</a>
            <a href="#">Corporate Information</a>
          </div>
          
          <div className="footer-column">
            <a href="#">Media Center</a>
            <a href="#">Privacy</a>
            <a href="#">Contact Us</a>
          </div>
        </div>

        <button className="footer-service-code">Service Code</button>

        <p className="footer-copyright">
          © 2025 FlixWave. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
