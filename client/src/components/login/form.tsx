import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleSubmit = async () => {
    const enteredNumber = email.trim();

    if (!enteredNumber) {
      setError("Please enter your number.");
      return;
    }

    // ---- Admin shortcut ----
    const ADMIN_NUMBERS = ["0000000000", "ADMIN", "admin123"];
    const ADMIN_PASSWORD = "admin";

    if (ADMIN_NUMBERS.includes(enteredNumber)) {
      if (password !== ADMIN_PASSWORD) {
        setError("Incorrect admin password.");
        return;
      }
      navigate("/admin");
      return;
    }

    // ---- Student flow ----
    setChecking(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/applications/students");
      const students = await res.json();

      const found = students.find(
        (s: any) => String(s.id_number) === enteredNumber
      );

      if (!found) {
        setError("Incorrect Password / No student found with that number.");
        return;
      }

      navigate(`/student/${enteredNumber}`);
    } catch (err) {
      console.error(err);
      setError("Could not connect. Please try again.");
    } finally {
      setChecking(false);
    }
  };

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
            {/* Student number / admin number */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-xs font-medium uppercase tracking-widest text-gray-400"
              >
                Student / Admin number
              </label>

              <input
                id="email"
                type="text"
                placeholder="e.g. 200101234"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
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

            {/* Error */}
            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}
          </div>

          {/* Login */}
          <div className="mt-12 flex items-center justify-end border-t border-gray-100 pt-8">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={checking}
              className="group rounded-full bg-gray-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {checking ? "Checking…" : "Sign in"}

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

          {/* Demo hint */}
          <p className="mt-6 text-center text-xs text-gray-400">
            Admin demo login:{" "}
            <span className="font-mono">0000000000</span> /{" "}
            <span className="font-mono">admin</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}