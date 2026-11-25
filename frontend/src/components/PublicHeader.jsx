import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import brandLogo from '../assets/logo.png';

export default function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Adaptive minimalist navigation link classes (hairline underline on active, zero bounding boxes)
  const homeActiveClass = "text-white font-medium border-b border-white pb-1 transition-all duration-300";
  const homeInactiveClass = "text-white/70 hover:text-white border-b border-transparent pb-1 transition-all duration-300";

  const standardActiveClass = "text-black font-medium border-b border-black pb-1 transition-all duration-300";
  const standardInactiveClass = "text-secondary hover:text-black border-b border-transparent pb-1 transition-all duration-300";

  const activeClass = isHome ? homeActiveClass : standardActiveClass;
  const inactiveClass = isHome ? homeInactiveClass : standardInactiveClass;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isHome
            ? scrolled
              ? 'bg-[#0c0b0a]/90 backdrop-blur-md py-4 border-b border-white/[0.06]'
              : 'bg-gradient-to-b from-[#0c0b0a]/80 via-[#0c0b0a]/40 to-transparent py-5 border-none'
            : 'bg-surface/90 backdrop-blur-md py-4 border-b border-primary/[0.06]'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Kiri: Logo PNG transparan asli (Tanpa Kotak/Border) */}
          <Link
            to="/"
            className="flex items-center transition-opacity duration-300 hover:opacity-80 focus:outline-none select-none py-1"
            aria-label="Beranda Vincand Deu Parfum"
          >
            <img
              src={brandLogo}
              alt="VINCAND DEU PARFUM"
              className={`h-11 md:h-12 w-auto object-contain transition-all duration-300 ${
                isHome ? 'brightness-0 invert' : ''
              }`}
            />
          </Link>

          {/* Kanan: Menu link teks (sans-serif kecil, kapital, tracking renggang, border-b tipis) */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-10 font-sans text-[11px] lg:text-[12px] tracking-[0.26em] uppercase">
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              BERANDA
            </NavLink>
            <NavLink
              to="/collection"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              KOLEKSI
            </NavLink>
            <NavLink
              to="/our-story"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              KISAH KAMI
            </NavLink>
            <NavLink
              to="/collaboration"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              KOLABORASI
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              KONTAK
            </NavLink>
          </nav>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              id="mobile-menu-open"
              aria-label="Buka Menu Navigasi"
              className={`p-1.5 focus:outline-none ${isHome ? 'text-white' : 'text-primary'}`}
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        id="mobile-drawer"
        className={`fixed inset-0 z-[60] bg-surface flex flex-col justify-between p-6 transition-all duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-2'
        }`}
      >
        <div className="flex items-center justify-between h-16 border-b border-primary/[0.06]">
          <div className="flex items-center gap-2.5">
            <img
              src={brandLogo}
              alt="Vincand Deu"
              className="h-8 w-auto object-contain"
            />
            <span className="font-['Bodoni_Moda',serif] text-[15px] font-normal tracking-wide text-black uppercase">
              Vincand Deu
            </span>
          </div>
          <button
            type="button"
            id="mobile-menu-close"
            aria-label="Tutup Menu Navigasi"
            className="p-1.5 text-primary focus:outline-none"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <nav className="flex flex-col items-center justify-center gap-7 py-8 my-auto font-sans text-[13px] tracking-[0.25em] uppercase">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-on-surface hover:text-primary transition-colors"
          >
            BERANDA
          </Link>
          <Link
            to="/collection"
            onClick={() => setMobileMenuOpen(false)}
            className="text-on-surface hover:text-primary transition-colors"
          >
            KOLEKSI
          </Link>
          <Link
            to="/our-story"
            onClick={() => setMobileMenuOpen(false)}
            className="text-on-surface hover:text-primary transition-colors"
          >
            KISAH KAMI
          </Link>
          <Link
            to="/collaboration"
            onClick={() => setMobileMenuOpen(false)}
            className="text-on-surface hover:text-primary transition-colors"
          >
            KOLABORASI
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-primary font-medium transition-colors"
          >
            KONTAK
          </Link>
        </nav>

        <div className="text-center pt-4 border-t border-primary/[0.06]">
          <p className="font-sans text-[10px] text-secondary uppercase tracking-[0.25em]">
            VINCAND DEU PARFUM
          </p>
        </div>
      </div>
    </>
  );
}
