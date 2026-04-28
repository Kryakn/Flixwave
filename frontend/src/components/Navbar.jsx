import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-left">
        <div className="navbar-logo">
          <svg viewBox="0 0 200 60" className="logo-svg">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#e50914', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#b20710', stopOpacity: 1}} />
              </linearGradient>
            </defs>
            <text x="10" y="42" className="logo-text" fill="url(#logoGradient)">FlixWave</text>
          </svg>
        </div>
        
        <ul className="navbar-menu">
          <li className="navbar-menu-item active">Home</li>
          <li className="navbar-menu-item">TV Shows</li>
          <li className="navbar-menu-item">Movies</li>
          <li className="navbar-menu-item">New & Popular</li>
          <li className="navbar-menu-item">My List</li>
        </ul>
      </div>

      <div className="navbar-right">
        <button 
          className="navbar-icon-btn"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <Search size={20} />
        </button>
        
        {searchOpen && (
          <input 
            type="text" 
            placeholder="Search titles, people, genres"
            className="navbar-search-input"
            autoFocus
          />
        )}
        
        <button className="navbar-icon-btn">
          <Bell size={20} />
        </button>
        
        <div className="navbar-profile">
          <img 
            src="https://i.pravatar.cc/32?img=1" 
            alt="Profile" 
            className="navbar-avatar"
          />
          <ChevronDown size={16} className="navbar-dropdown-icon" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
