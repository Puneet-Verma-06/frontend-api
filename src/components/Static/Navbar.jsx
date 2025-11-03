import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiUser, FiMenu } from "react-icons/fi";
import "../styles/Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const threshold = 50;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location]);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-out ${
        scrolled ? "scrolled" : "at-top"
      }`}
      style={{ height: 64 }}
    >
      <div className="max-w-8xl mx-auto h-full px-6 flex items-center justify-between">
        {/* 🔹 Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/atithya_logo.jpg"
            alt="Athithya logo"
            className="h-11 w-auto object-contain"
          />
        </Link>

        {/* 🔹 Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/host"
            className={`nav-link text-sm md:text-base font-medium ${
              scrolled ? "text-[#C59A2F]" : "text-white/90"
            }`}
          >
            For Host
          </Link>

          <Link
            to="/creators"
            className={`nav-link text-sm md:text-base font-medium ${
              scrolled ? "text-[#C59A2F]" : ""
            }`}
          >
            For Creators
          </Link>

          {/* 🔹 Gold CTA — with X-axis slide animation */}
          <Link
            to="/login"
            className={`gold-cta-x relative inline-flex items-center gap-2 px-5 py-2 rounded-sm font-medium transform transition-all duration-300 bg-[#C59A2F] text-white shadow-lg`}
          >
            <FiUser
              className={`transition-transform duration-300 text-white`}
            />
            <span className="cta-text">Login / Sign</span>
          </Link>

          {/* 🔹 Mobile Menu */}
          <button
            className={`ml-2 md:hidden transition-colors duration-200 ${
              scrolled ? "text-gray-900" : "text-white"
            }`}
            aria-label="Open menu"
          >
            <FiMenu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
