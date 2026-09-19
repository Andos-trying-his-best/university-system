"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      className="px-4 py-5 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex items-center justify-between">

          {/* Brand */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="group flex items-center gap-2.5"
          >
            <div className="flex h-7 w-7 items-center justify-center">
              <svg
                width="26"
                height="26"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M4 20C4 11.1634 11.1634 4 20 4"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle
                  cx="20"
                  cy="4"
                  r="2.5"
                  fill="currentColor"
                />
              </svg>
            </div>

            <span className="text-[17px] font-medium tracking-tight text-gray-900 transition-opacity duration-200 group-hover:opacity-70">
              Algo Academy
            </span>
          </button>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-7 lg:flex">
            <a
              href="#"
              className="text-sm font-medium text-gray-900 transition-colors duration-200 hover:text-gray-500"
            >
              Home
            </a>

            <a
              href="#courses"
              className="text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-gray-900"
            >
              Courses
            </a>

            <a
              href="#faq"
              className="text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-gray-900"
            >
              Explore
            </a>

            <a
              href="#testimonials"
              className="text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-gray-900"
            >
              Testimonials
            </a>

            <a
              href="#pricing"
              className="text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-gray-900"
            >
              Pricing
            </a>
          </div>

          {/* Desktop login */}
          <button
            type="button"
            onClick={() => navigate("/Login")}
            className="group hidden text-sm font-medium text-gray-900 lg:flex lg:items-center"
          >
            <span className="border-b border-gray-900 pb-0.5 transition-opacity duration-200 group-hover:opacity-60">
              Log in
            </span>

            <span className="ml-1.5 inline-block transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="text-sm font-medium text-gray-900 transition-colors duration-200 hover:text-gray-500 lg:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile navigation */}
        <motion.div
          initial={false}
          animate={{
            height: menuOpen ? "auto" : 0,
            opacity: menuOpen ? 1 : 0,
          }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          className="overflow-hidden lg:hidden"
        >
          <div className="mt-5 border-t border-gray-200 pt-4 pb-2">
            <div className="flex flex-col">

              <a
                href="#"
                onClick={closeMenu}
                className="py-2.5 text-sm font-medium text-gray-900"
              >
                Home
              </a>

              <a
                href="#courses"
                onClick={closeMenu}
                className="py-2.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
              >
                Courses
              </a>

              <a
                href="#faq"
                onClick={closeMenu}
                className="py-2.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
              >
                Explore
              </a>

              <a
                href="#testimonials"
                onClick={closeMenu}
                className="py-2.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
              >
                Testimonials
              </a>

              <a
                href="#pricing"
                onClick={closeMenu}
                className="py-2.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
              >
                Pricing
              </a>

              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  navigate("/Login");
                }}
                className="group mt-3 flex self-start items-center text-sm font-medium text-gray-900"
              >
                <span className="border-b border-gray-900 pb-0.5">
                  Log in
                </span>

                <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </button>

            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
