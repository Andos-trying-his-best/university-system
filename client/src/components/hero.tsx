"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const images = [
  "/hero.jpg",
  "/hero2.jpg",
  "/hero3.jpg",
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8 lg:pb-24">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 lg:grid-cols-[1fr_0.9fr] lg:gap-5">

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex min-h-[560px] flex-col justify-center rounded-2xl border border-gray-200 bg-gray-50 px-7 py-12 sm:px-10 lg:px-12"
        >
          <div className="max-w-xl">

            {/* Small label */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.05,
                ease: "easeOut",
              }}
              className="text-xs font-medium uppercase tracking-[0.08em] text-gray-500"
            >
              Learn. Build. Grow.
            </motion.p>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: "easeOut",
              }}
              className="mt-5 text-4xl font-medium leading-[1.08] tracking-tight text-gray-900 sm:text-5xl lg:text-[54px]"
            >
              Learn the skills.
              <span className="block text-gray-500">
                Build the future.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: "easeOut",
              }}
              className="mt-6 max-w-lg text-sm leading-6 text-gray-500 sm:text-base"
            >
              Build a strong foundation in computer science through practical
              lessons, real-world projects, and skills you can actually use.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: "easeOut",
              }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <button
                type="button"
                onClick={() => scrollTo("application")}
                className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-800"
              >
                Start Learning
                <span className="ml-2">→</span>
              </button>

              <button
                type="button"
                onClick={() => scrollTo("courses")}
                className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-900 transition-colors duration-200 hover:bg-gray-50"
              >
                Explore Courses
              </button>
            </motion.div>

            {/* Supporting information */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.45,
              }}
              className="mt-10 flex items-center gap-6 border-t border-gray-200 pt-6"
            >
              <div>
                <p className="text-lg font-medium tracking-tight text-gray-900">
                  1,000+
                </p>
                <p className="mt-0.5 text-xs text-gray-500">
                  Learners
                </p>
              </div>

              <div className="h-8 w-px bg-gray-200" />

              <div>
                <p className="text-lg font-medium tracking-tight text-gray-900">
                  200+
                </p>
                <p className="mt-0.5 text-xs text-gray-500">
                  Opportunities
                </p>
              </div>
            </motion.div>

          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: "easeOut",
          }}
          className="relative min-h-[420px] overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 lg:min-h-[560px]"
        >
          {/* Images */}
          {images.map((image, index) => (
            <motion.img
              key={image}
              src={image}
              alt=""
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{
                opacity: currentImage === index ? 1 : 0,
                scale: currentImage === index ? 1 : 1.02,
              }}
              transition={{
                duration: 0.9,
                ease: "easeOut",
              }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ))}

          {/* Bottom information */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <div className="rounded-xl border border-white/20 bg-black/55 p-4 backdrop-blur-sm sm:p-5">

              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.08em] text-white/60">
                    Algo Academy
                  </p>

                  <p className="mt-1 text-sm font-medium text-white">
                    Learn by building.
                  </p>
                </div>

                {/* Indicators */}
                <div className="flex items-center gap-1.5 pb-1">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Show image ${index + 1}`}
                      onClick={() => setCurrentImage(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentImage === index
                          ? "w-5 bg-white"
                          : "w-1.5 bg-white/40 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
