import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';
import './navigation.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // Initial animation for the navigation bar
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Animate logo
    gsap.fromTo(logoRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, delay: 0.3, ease: "back.out" }
    );

    // Animate nav buttons
    gsap.fromTo(".nav-btn",
      { y: -20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.5, 
        stagger: 0.1,
        delay: 0.5,
        ease: "power2.out"
      }
    );
  }, []);

  useEffect(() => {
    // Mobile menu animation
    if (menuRef.current) {
      if (isMenuOpen) {
        gsap.to(menuRef.current, {
          x: "0%",
          duration: 0.5,
          ease: "power2.out"
        });
      } else {
        gsap.to(menuRef.current, {
          x: "100%",
          duration: 0.5,
          ease: "power2.in"
        });
      }
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="c1" ref={navRef}>
        <div className="analyti" ref={logoRef}>Analytixs</div>
        
        {/* Desktop Navigation */}
        <div className="nav-buttons desktop-nav">
          <Link to="/" className="nav-btn">About Us</Link>
          <Link to="/dashboard" className="nav-btn">Dashboard</Link>
          <Link to="/detailed-analysis" className="nav-btn">Detailed Analysis</Link>
          <Link to="/chatbot" className="nav-btn">Chatbot</Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}></div>
      
      {/* Mobile Menu Slider */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
        <div className="mobile-menu-header">
          <div className="mobile-logo">Analytixs</div>
          <button className="close-menu" onClick={toggleMenu}>
            <X size={24} />
          </button>
        </div>
        <div className="mobile-nav-buttons">
          <Link to="/" className="mobile-nav-btn" onClick={toggleMenu}>About Us</Link>
          <Link to="/dashboard" className="mobile-nav-btn" onClick={toggleMenu}>Dashboard</Link>
          <Link to="/detailed-analysis" className="mobile-nav-btn" onClick={toggleMenu}>Detailed Analysis</Link>
          <Link to="/chatbot" className="mobile-nav-btn" onClick={toggleMenu}>Chatbot</Link>
        </div>
      </div>
    </>
  );
};

export default Navigation;