import { motion } from "motion/react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const steps = [
  {
    number: "01",
    title: "Choose what to learn",
    description:
      "Explore structured learning paths and find a course that matches where you want to go.",
  },
  {
    number: "02",
    title: "Learn through practice",
    description:
      "Build your understanding through practical lessons that turn concepts into something you can actually use.",
  },
  {
    number: "03",
    title: "Build something real",
    description:
      "Apply what you've learned through projects that help you develop confidence and useful skills.",
  },
];

export default function Enrol() {
  return (
    <section id="enrol" className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto max-w-6xl"
      >

        {/* Header */}
        <motion.div
          variants={item}
          className="flex flex-col justify-between gap-5 md:flex-row md:items-end"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-gray-400">
              How it works
            </p>

            <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-gray-900 md:text-4xl">
              Start learning with a clear path forward.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-gray-500 md:text-base">
            No perfect plan required. Choose what interests you, learn through
            practice, and build as you go.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mt-10 grid overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={item}
              className={`p-6 sm:p-8 ${
                index !== steps.length - 1
                  ? "border-b border-gray-200 md:border-b-0 md:border-r"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium tracking-[0.08em] text-gray-400">
                  {step.number}
                </span>

                <span className="text-gray-300">
                  →
                </span>
              </div>

              <h3 className="mt-12 text-lg font-medium tracking-tight text-gray-900">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
