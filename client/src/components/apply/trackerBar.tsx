import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { y: 16, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function TrackerBar() {
  return (
    <section className="px-6 pt-24 sm:px-8">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-6xl"
      >
        {/* Breadcrumb */}
        <motion.div
          variants={item}
          className="mb-8 flex items-center gap-2 text-sm font-medium tracking-wide"
        >
          <a
            href="#"
            className="text-gray-400 transition-colors hover:text-gray-600"
          >
            Home
          </a>

          <ChevronRight className="h-4 w-4 text-gray-300" />

          <span className="text-gray-600">
            Apply
          </span>
        </motion.div>

        {/* Heading */}
        <div className="space-y-4">
          <motion.h1
            variants={item}
            className="max-w-3xl text-4xl font-medium leading-[1.1] tracking-tight text-gray-900 md:text-5xl"
          >
            Apply to Algo Academy.
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-xl text-base leading-7 text-gray-500 md:text-lg"
          >
            Takes about 4 minutes. You can save and come back later.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}