import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

export default function LoginNav() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";
  const threshold = 50;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- STYLE MODES ---------------- */

  const navBase =
    "fixed inset-x-0 top-0 z-50 transition-all duration-300";

  const heroNav =
    scrolled
      ? "bg-black/60 backdrop-blur-md shadow-lg"
      : "bg-transparent";

  const contentNav =
    "bg-white border-b border-gray-200";

  const iconColor = isHome
    ? scrolled
      ? "text-[#C59A2F]"
      : "text-white/90"
    : "text-[#C59A2F] border rounded-full p-2";

  return (
    <nav
      className={`${navBase} ${isHome ? heroNav : contentNav}`}
      style={{ height: 64 }}
    >
      <div className="mx-auto h-full px-6 sm:px-12 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img
            src="/athithya-logo.png"
            alt="Athithya Logo"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-5">
          {/* NOTIFICATIONS */}
          <Link
            to="/notifications"
            className={`relative transition-colors ${iconColor}`}
          >
            <FaBell size={20} />
            <span className="absolute -top-2 -right-1 text-[10px] bg-[#C59A2F] text-white rounded-full px-1">
              {notifications}
            </span>
          </Link>

          {/* CREATE POST */}
          <Link
            to="/post"
            className={`inline-flex items-center justify-center w-9 h-9 rounded-full transition ${
              isHome
                ? scrolled
                  ? "bg-[#C59A2F] text-white"
                  : "border border-white/80 text-white"
                : "bg-[#C59A2F] text-white"
            } hover:scale-105`}
          >
            <MdAdd size={20} />
          </Link>

          {/* PROFILE */}
          <div className="relative profile-dropdown">
            <button
              onClick={() => setDropdownOpen((p) => !p)}
              className={`cursor-pointer w-9 h-9 rounded-full flex items-center justify-center transition ${
                isHome
                  ? scrolled
                    ? "bg-[#C59A2F] text-white"
                    : "border border-white/80 text-white"
                  : "text-[#C59A2F] border border-[#C59A2F]"
              }`}
            >
              <RxHamburgerMenu size={19} />
            </button>

            {/* DROPDOWN */}
            <div
              className={`absolute right-0 mt-2 w-44 rounded-xl border overflow-hidden transition-all ${
                dropdownOpen
                  ? "opacity-100 translate-y-0 visible"
                  : "opacity-0 -translate-y-2 invisible"
              } ${
                isHome
                  ? "bg-black/80 backdrop-blur border-[#C59A2F]/40"
                  : "bg-white border-gray-200 shadow-lg"
              }`}
            >
              {[
                ["Explore", "/explore"],
                ["Connect", "/connect"],
                ["Messages", "/chat"],
                ["Profile", "/profile"],
              ].map(([label, path]) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setDropdownOpen(false)}
                  className={`block px-4 py-2 text-sm transition ${
                    isHome
                      ? "text-white hover:bg-[#C59A2F]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {label}
                </Link>
              ))}

              <button
                onClick={() => {
                  localStorage.removeItem("auth_token");
                  navigate("/");
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
