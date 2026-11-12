import React from 'react';
import { Link } from 'react-router-dom';
import brandLogo from '../assets/logo.png';

export default function PublicFooter() {
  return (
    <footer className="w-full bg-surface border-t border-primary/[0.06] pt-14 pb-10 md:pt-16 md:pb-12">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 md:pb-14 border-b border-primary/[0.06]">
          {/* Brand Identity Column */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link to="/" className="flex items-center gap-3.5 transition-opacity duration-300 hover:opacity-80 mb-4 focus:outline-none select-none">
              <img
                src={brandLogo}
                alt="Vincand Deu Logo"
                className="h-12 md:h-14 w-auto object-contain"
              />
              <span className="w-px h-6 bg-primary/20"></span>
              <span className="font-['Bodoni_Moda',serif] text-[18px] md:text-[20px] tracking-tight text-primary font-normal block leading-none">
                VINCAND DEU <span className="italic font-normal text-secondary">PARFUM</span>
              </span>
            </Link>
            <p className="font-body-regular text-[14px] text-secondary max-w-sm font-light leading-relaxed">
              Independent Indonesian Fragrance Brand. Crafted with dedication, creative independence, and authentic scent explorations.
            </p>
          </div>

          {/* 3 Column Navigation */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-8">
            {/* EXPLORE */}
            <div className="flex flex-col">
              <span className="font-label-caps-spaced text-label-caps-spaced uppercase text-on-surface tracking-[0.24em] font-medium mb-4">
                EXPLORE
              </span>
              <nav className="flex flex-col gap-2.5">
                <Link to="/" className="font-body-small text-body-small text-secondary hover:text-primary transition-colors duration-300">Home</Link>
                <Link to="/collection" className="font-body-small text-body-small text-secondary hover:text-primary transition-colors duration-300">Fragrances</Link>
                <Link to="/our-story" className="font-body-small text-body-small text-secondary hover:text-primary transition-colors duration-300">Our Story</Link>
                <Link to="/collaboration" className="font-body-small text-body-small text-secondary hover:text-primary transition-colors duration-300">Collaboration</Link>
              </nav>
            </div>

            {/* CONNECT */}
            <div className="flex flex-col">
              <span className="font-label-caps-spaced text-label-caps-spaced uppercase text-on-surface tracking-[0.24em] font-medium mb-4">
                CONNECT
              </span>
              <nav className="flex flex-col gap-2.5">
                <a href="https://wa.me/6285852802459" target="_blank" rel="noopener noreferrer" className="font-body-small text-body-small text-secondary hover:text-primary transition-colors duration-300">WhatsApp</a>
                <a href="https://shopee.co.id/vincanddeuparfume" target="_blank" rel="noopener noreferrer" className="font-body-small text-body-small text-secondary hover:text-primary transition-colors duration-300">Shopee</a>
                <a href="https://www.instagram.com/vincand.deu.parfume?igsi=YWtnd2lwNmloanl6&utm_source=qr" target="_blank" rel="noopener noreferrer" className="font-body-small text-body-small text-secondary hover:text-primary transition-colors duration-300">Instagram</a>
                <a href="https://www.tiktok.com/@vincanddeuparfume" target="_blank" rel="noopener noreferrer" className="font-body-small text-body-small text-secondary hover:text-primary transition-colors duration-300">TikTok</a>
              </nav>
            </div>

            {/* INFORMATION */}
            <div className="flex flex-col col-span-2 sm:col-span-1">
              <span className="font-label-caps-spaced text-label-caps-spaced uppercase text-on-surface tracking-[0.24em] font-medium mb-4">
                INFORMATION
              </span>
              <nav className="flex flex-col gap-2.5">
                <span className="font-body-small text-body-small text-secondary">BPOM Verified</span>
                <span className="font-body-small text-body-small text-secondary">Authenticity Guarantee</span>
                <Link to="/contact" className="font-body-small text-body-small text-secondary hover:text-primary transition-colors duration-300">Contact</Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Copyright Baseline */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-2">
          <div className="font-label-caps-subtle text-label-caps-subtle text-secondary/80 tracking-[0.22em] uppercase">
            © 2025 VINCAND DEU PARFUM. All rights reserved. Indonesian Independent Olfactive House.
          </div>
          <Link
            to="/admin/login"
            className="font-label-caps-subtle text-[10px] text-secondary/50 hover:text-primary tracking-[0.18em] uppercase transition-colors"
          >
            Admin Panel ↗
          </Link>
        </div>
      </div>
    </footer>
  );
}
