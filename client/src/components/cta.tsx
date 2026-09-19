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

export default function FinalCta() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-6xl"
      >
        <motion.div
          variants={item}
          className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-16 text-center sm:px-10 sm:py-20"
        >
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-gray-400">
            Start learning
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-gray-900 md:text-4xl">
            Your next skill starts here.
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-gray-500 md:text-base">
            Choose a course, start learning, and build something you can be
            proud of.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#courses"
              className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              Explore Courses
            </a>

            <a
              href="#pricing"
              className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:text-gray-900"
            >
              View Pricing
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}