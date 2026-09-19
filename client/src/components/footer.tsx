"use client";

import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 px-8 pt-16 pb-8">

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-w-6xl"
      >

        {/* Main Footer */}
        <div className="flex flex-col justify-between gap-12 md:flex-row">

          {/* Brand */}
          <div className="max-w-sm">
            <p className="text-lg font-semibold tracking-tight text-gray-900">
              Algo Academy
            </p>

            <p className="mt-3 max-w-xs text-sm leading-6 text-gray-500">
              Learn the skills. Build the future. Practical computer science
              education for the next generation of builders.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-8 sm:grid-cols-3">

            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-wide text-gray-400">
                Explore
              </p>

              <div className="flex flex-col gap-3 text-sm text-gray-500">
                <a href="#" className="transition hover:text-gray-900">
                  Home
                </a>
                <a href="#courses" className="transition hover:text-gray-900">
                  Courses
                </a>
                <a href="#enrol" className="transition hover:text-gray-900">
                  About
                </a>
                <a href="#pricing" className="transition hover:text-gray-900">
                  Pricing
                </a>
              </div>
            </div>

            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-wide text-gray-400">
                Resources
              </p>

              <div className="flex flex-col gap-3 text-sm text-gray-500">
                <a href="#" className="transition hover:text-gray-900">
                  FAQ
                </a>
                <a href="#" className="transition hover:text-gray-900">
                  Blog
                </a>
                <a href="#" className="transition hover:text-gray-900">
                  Projects
                </a>
                <a href="#" className="transition hover:text-gray-900">
                  Contact
                </a>
              </div>
            </div>

            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-wide text-gray-400">
                Social
              </p>

              <div className="flex items-center gap-4 text-gray-500">

                <a
                  href="#"
                  aria-label="GitHub"
                  className="transition hover:text-gray-900"
                >
                  <FaGithub className="h-4 w-4" />
                </a>

                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="transition hover:text-gray-900"
                >
                  <FaLinkedinIn className="h-4 w-4" />
                </a>

                <a
                  href="#"
                  aria-label="Instagram"
                  className="transition hover:text-gray-900"
                >
                  <FaInstagram className="h-4 w-4" />
                </a>

                <a
                  href="#"
                  aria-label="X"
                  className="transition hover:text-gray-900"
                >
                  <FaXTwitter className="h-4 w-4" />
                </a>

              </div>
            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 text-xs text-gray-400 sm:flex-row">

          <p>
            © 2026 Algo Academy. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="#" className="transition hover:text-gray-700">
              Privacy Policy
            </a>

            <a href="#" className="transition hover:text-gray-700">
              Terms of Service
            </a>
          </div>

        </div>

      </motion.div>
    </footer>
  );
}
