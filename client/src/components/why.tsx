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

export default function WhyAlgoAcademy() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl"
      >
        {/* Header */}
        <motion.div variants={item} className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-gray-400">
            Why Algo Academy
          </p>

          <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight text-gray-900 md:text-4xl">
            A better way to learn computer science.
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-6 text-gray-500 md:text-base">
            Learn with more direction, more practice, and a clearer idea of
            where your skills can take you.
          </p>
        </motion.div>

        {/* Main visual */}
        <motion.div
          variants={item}
          className="mt-12 grid overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 lg:grid-cols-[0.8fr_1.2fr]"
        >
          {/* Left */}
          <div className="flex flex-col justify-between border-b border-gray-200 p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.08em] text-gray-400">
                Learning on your own
              </p>

              <h3 className="mt-5 max-w-sm text-2xl font-medium leading-tight tracking-tight text-gray-900">
                Learn a little.
                <br />
                Forget a little.
                <br />
                Start over.
              </h3>
            </div>

            <div className="mt-12">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                  Random tutorials
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                  Disconnected topics
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                  No clear next step
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="bg-white p-7 sm:p-9 lg:p-10">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-[0.08em] text-gray-400">
                Learning with Algo Academy
              </p>

              <span className="text-sm text-gray-400">01 — 03</span>
            </div>

            <div className="mt-10">
              <div className="flex items-start gap-5 border-b border-gray-200 pb-7">
                <span className="text-xs font-medium text-gray-400">01</span>

                <div>
                  <h3 className="text-lg font-medium tracking-tight text-gray-900">
                    Understand the fundamentals
                  </h3>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-gray-500">
                    Build the knowledge that everything else depends on.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 border-b border-gray-200 py-7">
                <span className="text-xs font-medium text-gray-400">02</span>

                <div>
                  <h3 className="text-lg font-medium tracking-tight text-gray-900">
                    Put the knowledge into practice
                  </h3>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-gray-500">
                    Reinforce what you learn by applying it to practical
                    problems and projects.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 pt-7">
                <span className="text-xs font-medium text-gray-400">03</span>

                <div>
                  <h3 className="text-lg font-medium tracking-tight text-gray-900">
                    Keep building from there
                  </h3>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-gray-500">
                    Each skill becomes a foundation for the next one, giving
                    you a path instead of another tutorial to watch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom statement */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-xl text-sm leading-6 text-gray-500 md:text-base">
            A structured approach to learning computer science — without
            taking the curiosity out of it.
          </p>

          <a
            href="#courses"
            className="w-fit text-sm font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-gray-900"
          >
            Explore the courses →
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}