import { motion } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 16, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function Hero() {
  const location = useLocation();
  const data = location.state?.data;
  const dataDescription = location.state?.description;
  const navigate = useNavigate();

  return (
    <section className="px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8 lg:pb-24">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex w-full max-w-6xl"
      >
        {/* Hero */}
        <motion.div
          variants={item}
          className="flex min-h-[560px] w-full flex-col justify-center rounded-2xl border border-gray-200 bg-gray-50 px-7 py-12 sm:px-10 lg:min-h-[620px] lg:px-12"
        >
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.p
              variants={item}
              className="text-xs font-medium uppercase tracking-[0.08em] text-gray-500"
            >
              {data?.category || "Master Computer Science"}
            </motion.p>

            {/* Heading */}
            <motion.h1
              variants={item}
              className="mt-5 max-w-3xl text-4xl font-medium leading-[1.08] tracking-tight text-gray-900 sm:text-5xl lg:text-[56px]"
            >
              {data || "Learn to code, build projects, and land your dream job."}

              {!data?.title && (
                <span className="block text-gray-500">
                  land your dream job.
                </span>
              )}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={item}
              className="mt-6 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base"
            >
              {dataDescription ||
                "Go beyond tutorials. Master computer science through structured learning, real-world projects, and the skills that turn knowledge into software."}
            </motion.p>

            {/* Level */}
            {data?.level && (
              <motion.div variants={item} className="mt-6">
                <span className="inline-flex rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-600">
                  {data.level}
                </span>
              </motion.div>
            )}

            {/* Actions */}
            <motion.div
              variants={item}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <button
                type="button"
                onClick={() => {
                  navigate("/apply", {
                    state: {
                      data: data,
                      description: dataDescription,
                    },
                  });
                }}
                className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-800"
              >
                Apply Now
                <span className="ml-2">→</span>
              </button>

              <button
                type="button"
                className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-900 transition-colors duration-200 hover:bg-gray-50"
              >
                Download Syllabus
              </button>
            </motion.div>

            {/* Supporting information */}
            <motion.div
              variants={item}
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
      </motion.div>
    </section>
  );
}