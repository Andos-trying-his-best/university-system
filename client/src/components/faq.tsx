
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const faqs = [
  {
    question: "What is Algo Academy?",
    answer:
      "Algo Academy is an online platform for learning computer science through structured courses, practical projects, and real-world skills.",
  },
  {
    question: "Are the courses beginner friendly?",
    answer:
      "Yes. Our courses are designed for different skill levels, from complete beginners to more experienced developers.",
  },
  {
    question: "Do I need programming experience?",
    answer:
      "Not necessarily. Some courses start from the fundamentals, while others are designed for learners with existing programming experience.",
  },
  {
    question: "What can I learn at Algo Academy?",
    answer:
      "You can explore areas such as web development, programming, data science, artificial intelligence, and other computer science fields.",
  },
  {
    question: "Are the courses project-based?",
    answer:
      "Yes. We focus on practical learning, allowing you to apply concepts by building projects rather than relying only on theory.",
  },
];

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

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="px-8 py-24">

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl"
      >

        {/* Section Header */}
        <motion.div variants={item} className="mb-12">

          <div className="mb-5 flex items-center gap-2 text-sm font-medium tracking-wide text-gray-400">
            QUESTIONS & ANSWERS
          </div>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <h2 className="max-w-2xl text-4xl font-medium leading-tight tracking-tight text-gray-900 md:text-5xl">
              Everything you need to know.
            </h2>

            <p className="max-w-sm text-sm leading-6 text-gray-500 md:text-base">
              Find answers to the most common questions about learning with
              Algo Academy.
            </p>

          </div>

        </motion.div>

        {/* FAQ Content */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-stretch">

          {/* Questions */}
          <motion.div
            variants={item}
            className="flex flex-col justify-center"
          >
            <div className="border-t border-gray-200">

              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={faq.question}
                    className="border-b border-gray-200"
                  >

                    <button
                      onClick={() =>
                        setOpenIndex(isOpen ? null : index)
                      }
                      className="group flex w-full items-center justify-between py-5 text-left"
                    >

                      <span className="text-sm font-medium text-gray-900 transition group-hover:text-gray-600">
                        {faq.question}
                      </span>

                      <span
                        className={`ml-6 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-200 text-sm font-light text-gray-500 transition-all duration-300 ${
                          isOpen
                            ? "rotate-45 border-gray-900 text-gray-900"
                            : "group-hover:border-gray-400"
                        }`}
                      >
                        +
                      </span>

                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1] as const,
                          }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-xl pb-5 pr-12 text-sm leading-6 text-gray-500">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })}

            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={item}
            className="relative min-h-[560px] overflow-hidden rounded-2xl"
          >
            <img
              src="/faq.jpg"
              alt="Learning computer science"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
            />

            <div className="absolute inset-0 bg-black/5" />

            {/* Image Caption */}
            <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/20 bg-black/20 p-5 text-white backdrop-blur-[2px]">
              <p className="text-sm font-medium">
                Learn by doing.
              </p>

              <p className="mt-1 text-xs leading-5 text-white/60">
                Practical projects. Real skills. A path built around you.
              </p>
            </div>
          </motion.div>

        </div>

      </motion.div>

    </section>
  );
}


