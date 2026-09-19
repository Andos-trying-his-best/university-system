import { motion } from "motion/react";
import { Check } from "lucide-react";

const courses = [
  {
    category: "WEB DEVELOPMENT",
    title: "Full-Stack Web Development",
    description:
      "A practical path for learners who want to build complete, modern web applications from frontend to backend.",
    level: "Beginner → Intermediate",
    features: [
      "HTML, CSS & JavaScript",
      "React & modern frontend development",
      "Node.js & Express",
      "Databases & APIs",
      "Build real-world projects",
    ],
    cta: "Enrol Now",
  },
  {
    category: "DATA SCIENCE",
    title: "Data Science & Analytics",
    description:
      "Learn how to work with data, uncover insights, and build a strong foundation in modern data science.",
    level: "Beginner → Intermediate",
    features: [
      "Python for data science",
      "Data cleaning & analysis",
      "Pandas & NumPy",
      "Data visualisation",
      "Practical data projects",
    ],
    cta: "Enrol Now",
  },
  {
    category: "ARTIFICIAL INTELLIGENCE",
    title: "Artificial Intelligence",
    description:
      "Explore the foundations of AI and learn how intelligent systems are built, trained, and applied.",
    level: "Intermediate",
    features: [
      "Machine learning fundamentals",
      "Supervised & unsupervised learning",
      "Model training & evaluation",
      "Neural networks",
      "Build AI projects",
    ],
    cta: "Enrol Now",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="flex flex-col items-center px-8 pt-16 pb-24 text-center">

      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl text-3xl font-medium tracking-tight text-gray-900 md:text-4xl"
      >
        Choose your path.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.8,
          delay: 0.1,
          ease: "easeOut",
        }}
        className="mt-3 max-w-xl text-sm leading-6 text-gray-500 md:text-base"
      >
        Focused courses designed to help you learn practical skills and build
        your future in technology.
      </motion.p>

      {/* Course Cards */}
      <div className="mt-14 grid w-full max-w-6xl gap-5 lg:grid-cols-3">
        {courses.map((course, index) => (
          <motion.div
            key={course.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            className="flex"
          >
            <div
              className={`flex w-full flex-col rounded-2xl border border-gray-200 p-7 text-left ${
                index === 1 ? "bg-gray-50" : "bg-white"
              }`}
            >

              {/* Top */}
              <div>
                <p className="text-xs font-medium tracking-wide text-gray-400">
                  {course.category}
                </p>

                <h3 className="mt-3 text-xl font-medium tracking-tight text-gray-900">
                  {course.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {course.description}
                </p>

                <p className="mt-4 text-xs font-medium text-gray-400">
                  {course.level}
                </p>
              </div>

              {/* What you'll learn */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <p className="mb-4 text-xs font-medium uppercase tracking-wide text-gray-400">
                  What you'll learn
                </p>

                <div className="space-y-3">
                  {course.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-100">
                        <Check className="h-3 w-3 text-gray-700" />
                      </div>

                      <p className="text-sm text-gray-600">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-auto pt-8">
                <button onClick={(e) => {
    e.preventDefault();

    document.getElementById("application")?.scrollIntoView({
      behavior: "smooth",
    });
  }} className="group flex w-full items-center justify-center rounded-full border border-gray-900 bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800">
                  {course.cta}
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>

            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}

