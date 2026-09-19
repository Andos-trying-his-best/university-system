import { motion } from "motion/react";

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

export default function Tracker({ stepcount }: { stepcount: number }) {
  const stages = [
    "Programme",
    "About you",
    "Background",
    "Review",
  ];

  return (
    <section className="px-6 sm:px-8">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-6xl"
      >
        <div className="flex items-center">
          {stages.map((stage, index) => {
            const isSelected = index === stepcount - 1;

            return (
              <motion.div
                key={stage}
                variants={item}
                className="flex flex-1 items-center"
              >
                <div className="flex items-center gap-3 whitespace-nowrap">
                  <span
                    className={`text-xs font-medium tracking-widest ${
                      isSelected ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    0{index + 1}
                  </span>

                  <span
                    className={`text-sm font-medium tracking-wide ${
                      isSelected ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {stage}
                  </span>
                </div>

                {index < stages.length - 1 && (
                  <div
                    className={`mx-6 h-px flex-1 ${
                      isSelected ? "bg-gray-400" : "bg-gray-200"
                    }`}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}