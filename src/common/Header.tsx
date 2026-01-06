import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import drivingWizardLogo from "../assets/driving-wizard-logo.png";
import { useTheme } from "../context/ThemeContext";
import ThemeButton from "../components/Header/ThemeButton";
import { useState } from "react"; // added useState import
import { useEffect, useRef } from "react"; // added useEffect and useRef imports


const Header: React.FC = () => {
  const { cart } = useBooking();
  const { themeColors } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false); // state for mobile menu
  const menuRef = useRef<HTMLDivElement | null>(null); // ref for menu div
  
  // Close menu when clicking outside 
  useEffect(() => {
  const handleOutsideClick = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setMenuOpen(false);
    }
  };

  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") setMenuOpen(false);
  };

  if (menuOpen) {
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEsc);
  }

  return () => {
    document.removeEventListener("mousedown", handleOutsideClick);
    document.removeEventListener("keydown", handleEsc);
  };
}, [menuOpen]);




  const navPages = [
    { name: "Home", link: "/" },
    { name: "Schedules", link: "/schedules" },
    { name: "Cart", link: "/cart" },
    { name: "Login", link: "/login" },
  ];

  return (
    <header className={`sticky top-0 z-50 relative border-b ${themeColors.border} ${themeColors.surface}`}>
      {/* <div
        className={` flex justify-center items-center text-center py-2 text-sm ${themeColors.text}`}
      >
        <p className="pr-3">New student?</p>
        <Link
          to="/signin"
          className="font-semibold text-blue-700 hover:underline"
        >
          {" "}
          Sign up here{" "}
        </Link>

        <ThemeButton />
      </div> */}

      {/* New header top bar with sign in and sign up links */}
      <div
        className={`flex flex-col md:flex-row justify-center items-center text-center py-2 text-sm gap-1 md:gap-3 ${themeColors.text}`}
      >
        <div className="flex items-center gap-2">
          <p>New student?</p>
          <Link
            to="/signin"
            className="font-semibold text-blue-700 hover:underline"
          >
            Sign up here
          </Link>
        </div>

        <p className="text-xs md:text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-700 hover:underline"
          >
            Sign in here
          </Link>
        </p>

        <ThemeButton />
      </div>


      <div
        className={`max-w-5xl mx-auto px-4 py-3 flex items-center justify-between ${themeColors.text}`}
      >
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-blue-700 tracking-tight"
        >
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
            <img
              src={drivingWizardLogo}
              alt="Driving Wizard Logo"
              className="h-20 w-20 object-contain"
            />
          </div>
          Private Driving Practice
        </Link>

        <nav className="hidden md:flex gap-4 text-sm">

        {/*desktop menu */}
          {navPages.map((page) => (
            <NavLink
              key={page.link}
              to={page.link}
              className={({ isActive }) =>
                `hover:text-blue-700 ${
                  isActive ? themeColors.accent : themeColors.textMuted

                }`
              }
            >
              {" "}
              {/* {page.name} */}

              {/* // Special handling for Cart to show item count */}
              {page.name === "Cart" ? (
                  <span className="flex items-center gap-1">
                    Cart
                    <span
                      data-testid="cart-count"
                      className={`
                        px-1.5 py-0.5 rounded-full text-xs font-semibold
                        bg-green-600 text-white
                      `}
                    >
                      {cart.length}
                    </span>
                  </span>
                ) : (
                  page.name
                )}
            </NavLink>
          ))}
        </nav>

        <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl font-bold"
        >
            ☰
        </button>

        {/* Mobile menu */}
        {/* OVERLAY */}
          {menuOpen && (
            <div className="fixed inset-0 bg-black/40 z-40 md:hidden" />
          )}

          {/* MOBILE MENU */}
          <div
            ref={menuRef}
            className={`
              md:hidden
              fixed top-0 left-0 w-full
              ${themeColors.bgWidget}
              border-b ${themeColors.border}
              shadow-xl
              z-50
              transform transition-transform duration-300
              ${menuOpen ? "translate-y-0" : "-translate-y-full"}
            `}
          >
            <nav className="flex flex-col p-6 gap-4 text-sm">
              {navPages.map((page) => (
                <NavLink
                  key={page.link}
                  to={page.link}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `hover:text-blue-700 ${
                      isActive ? themeColors.accent : themeColors.textMuted
                    }`
                  }
                >
                  {page.name === "Cart" ? (
                    <span className="flex items-center gap-1">
                      Cart
                      <span className="px-1.5 py-0.5 rounded-full text-xs font-semibold bg-green-600 text-white">
                        {cart.length}
                      </span>
                    </span>
                  ) : (
                    page.name
                  )}
                </NavLink>
              ))}
            </nav>
          </div>


      </div>
    </header>
  );
};

export default Header;
