"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const item = {
  hidden: { y: -14, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Navbar() {
  
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="grid grid-cols-2 items-center lg:grid-cols-3">

        {/* Logo */}
        <motion.div
          variants={item}
          className="flex items-center gap-2.5 justify-self-start"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 20C4 11.1634 11.1634 4 20 4"
              stroke="#4D6B2F"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="20" cy="4" r="2.5" fill="#D4E157" />
          </svg>

          <span className="text-lg font-semibold text-gray-900">
            Algo Academy
          </span>
        </motion.div>

        {/* Middle navigation */}
        <motion.div
          variants={item}
          className="hidden justify-center gap-7 text-sm text-black lg:flex"
        >
          <a href="" className="transition hover:text-gray-500" onClick={() => navigate("/")}>
            Home
          </a>
          <a href="#courses" className="transition hover:text-gray-500" onClick={() => navigate("/")}>
            Courses
          </a>
          <a href="#faq" className="transition hover:text-gray-500">
            Explore
          </a>
          <a href="#testimonials" className="transition hover:text-gray-500">
            Testimonials
          </a>
          <a href="#pricing" className="transition hover:text-gray-500">
            Pricing
          </a>
        </motion.div>

        {/* Desktop CTA */}
        <motion.button
          variants={item}
          className="group hidden justify-self-end border-b border-gray-900 pb-0.5 text-sm font-medium text-gray-900 lg:block"
        onClick={() => navigate("/login")}>
          Log in
          <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </motion.button>

        {/* Mobile menu button */}
        <motion.button
          variants={item}
          onClick={() => setMenuOpen(!menuOpen)}
          className="justify-self-end text-sm font-medium text-gray-900 lg:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
        </motion.button>

      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex flex-col gap-5 border-t border-gray-200 pt-6 text-sm text-black lg:hidden"
        >
          <a href="#" className="transition hover:text-gray-500">
            Home
          </a>

          <a href="#" className="transition hover:text-gray-500">
            Courses
          </a>

          <a href="#" className="transition hover:text-gray-500">
            Explore
          </a>

          <a href="#" className="transition hover:text-gray-500">
            Testimonials
          </a>

          <a href="#" className="transition hover:text-gray-500">
            Pricing
          </a>

          <button className="mt-2 self-start border-b border-gray-900 pb-0.5 font-medium">
            Get Started →
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}