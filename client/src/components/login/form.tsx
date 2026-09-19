import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "instant" });
}, []);

  return (
    <section className="px-6 py-20 sm:px-8">
      <div className="mx-auto w-full max-w-2xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          {/* Intro */}
          <div className="space-y-2">
            <h1 className="text-2xl font-medium tracking-tight text-gray-900">
              Welcome back
            </h1>

            <p className="text-sm leading-6 text-gray-500">
              Sign in to access your account as a student or administrator.
            </p>
          </div>


          {/* Form */}
          <div className="mt-10 space-y-6">

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-xs font-medium uppercase tracking-widest text-gray-400"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="lerato@mokoena.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-900 outline-none transition focus:border-gray-400"
              />
            </div>


            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-medium uppercase tracking-widest text-gray-400"
                >
                  Password
                </label>

              </div>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-900 outline-none transition focus:border-gray-400"
              />
            </div>

          </div>


          {/* Login */}
          <div className="mt-12 flex items-center justify-end border-t border-gray-100 pt-8">

            <button
              type="button"
              onClick={() => {                  navigate("/admin");
              }}
              className="group rounded-full bg-gray-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Sign in

              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

          </div>


          {/* Register */}
          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <button
              type="button"
              className="font-medium text-gray-700 transition-colors hover:text-gray-900"
            >
              Apply now
            </button>
          </p>

        </motion.div>

      </div>
    </section>
  );
}