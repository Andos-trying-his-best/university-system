"use client";

import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    image: "/course1.jpg",
    category: "WEB DEVELOPMENT",
    title: "Full-Stack Web Development",
    description:
      "Learn to build modern web applications from frontend to backend.",
    level: "Beginner",
  },
  {
    image: "/course2.jpg",
    category: "DATA SCIENCE",
    title: "Data Science",
    description:
      "Explore data, build models, and turn information into useful insights.",
    level: "Intermediate",
  },
  {
    image: "/course3.jpg",
    category: "ARTIFICIAL INTELLIGENCE",
    title: "Artificial Intelligence",
    description:
      "Understand intelligent systems and learn how modern AI applications are built.",
    level: "Advanced",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export default function Courses() {
  const navigate = useNavigate();

  const openCourse = (course: (typeof courses)[number]) => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    navigate("/courses", {
      state: {
        data: course.title,
        description: course.description,
      },
    });
  };

  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="courses"
      className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.08em] text-gray-400">
                Explore our courses
              </p>

              <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-gray-900 md:text-4xl">
                Learn something worth building.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-gray-500 md:text-base">
              Structured courses designed to take you from the fundamentals
              to building real-world projects.
            </p>
          </div>
        </motion.div>

        {/* Courses */}
        <div className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <article
              key={course.title}
              className="group"
            >
              {/* Image */}
              <button
                type="button"
                onClick={() => openCourse(course)}
                className="relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 text-left"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />

                {/* Level */}
                <div className="absolute left-4 top-4 rounded-lg border border-white/50 bg-white/90 px-3 py-1.5">
                  <p className="text-xs font-medium text-gray-700">
                    {course.level}
                  </p>
                </div>
              </button>

              {/* Information */}
              <div className="mt-5">
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-gray-400">
                  {course.category}
                </p>

                <div className="mt-2 flex items-start justify-between gap-5">
                  <button
                    type="button"
                    onClick={() => openCourse(course)}
                    className="text-left"
                  >
                    <h3 className="text-lg font-medium leading-tight tracking-tight text-gray-900 transition-colors duration-200 group-hover:text-gray-600 sm:text-xl">
                      {course.title}
                    </h3>

                    <p className="mt-2 max-w-[320px] text-sm leading-6 text-gray-500">
                      {course.description}
                    </p>
                  </button>

                  {/* Arrow */}
                  <button
                    type="button"
                    onClick={() => openCourse(course)}
                    aria-label={`View ${course.title}`}
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 text-sm text-gray-700 transition-colors duration-200 group-hover:border-gray-300 group-hover:text-gray-900"
                  >
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.15 }}
          className="mt-12 flex justify-center sm:mt-14"
        >
          <button
            type="button"
            onClick={scrollToPricing}
            className="group rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-800"
          >
            Explore Pricing
            <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}