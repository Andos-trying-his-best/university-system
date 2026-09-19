import { motion } from "motion/react";

export default function Testimonials() {
  return (
    <section id="testimonials" className="flex flex-col items-center px-4 pt-12 pb-20 text-center sm:px-6 sm:pt-16 sm:pb-24 lg:px-8">

      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl text-3xl font-medium tracking-tight text-gray-900 md:text-4xl"
      >
        What our learners have to say.
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
        Hear from learners who are building their skills, completing projects,
        and growing their careers with Algo Academy.
      </motion.p>

      {/* Grid */}
      <div className="mt-10 grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-3">

        {/* 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-gray-50 p-6 pb-8 text-left">
            <p className="text-sm leading-6 text-gray-600">
              "I've learned so much and the instructors are amazing! The
              hands-on projects really helped solidify my understanding."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <img
                src="/testimony1.jpg"
                alt="Olivia Wattson"
                className="h-9 w-9 shrink-0 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-black">Olivia Wattson</p>
                <p className="text-xs text-gray-500">
                  Web Development Student
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 pb-14 text-left">
            <p className="text-sm leading-6 text-gray-600">
              "The projects helped me understand concepts that I struggled
              with before. Everything feels much more practical now, and I
              can already see the difference in how I approach problems."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <img
                src="/testimony2.jpg"
                alt="James Miller"
                className="h-9 w-9 shrink-0 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-black">James Miller</p>
                <p className="text-xs text-gray-500">
                  Data Science Student
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-gray-50 p-6 pb-10 text-left">
            <p className="text-sm leading-6 text-gray-600">
              "I love how straightforward the lessons are. I can see myself
              improving with every project I complete."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <img
                src="/testimony3.jpg"
                alt="Sarah Williams"
                className="h-9 w-9 shrink-0 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-black">Sarah Williams</p>
                <p className="text-xs text-gray-500">AI Student</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 pb-12 text-left">
            <p className="text-sm leading-6 text-gray-600">
              "Algo Academy made learning to code feel much less intimidating.
              The structure kept me motivated from start to finish."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <img
                src="/testimony4.jpg"
                alt="Daniel Smith"
                className="h-9 w-9 shrink-0 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-black">Daniel Smith</p>
                <p className="text-xs text-gray-500">
                  Software Development Student
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 5 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
        >
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-gray-50 p-6 pb-8 text-left">
            <p className="text-sm leading-6 text-gray-600">
              "I'm not just learning theory — I'm building things I can put
              in a portfolio and talk about in interviews."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <img
                src="/testimony5.jpg"
                alt="Michael Brown"
                className="h-9 w-9 shrink-0 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-black">Michael Brown</p>
                <p className="text-xs text-gray-500">
                  Full-Stack Development Student
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 6 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 pb-14 text-left">
            <p className="text-sm leading-6 text-gray-600">
              "The learning experience is simple, practical, and genuinely
              enjoyable. I finally feel confident writing my own programs."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <img
                src="/testimony6.jpg"
                alt="Emma Johnson"
                className="h-9 w-9 shrink-0 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-black">Emma Johnson</p>
                <p className="text-xs text-gray-500">
                  Programming Student
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

    </section>
  );
}