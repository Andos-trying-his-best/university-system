import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Student() {
  const { studentNumber } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState<any>(null);
  const [studentModules, setStudentModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!studentNumber) {
      setError("No student number in the URL.");
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);
      try {
        const studentsRes = await fetch(
          "http://localhost:5000/api/applications/students"
        );
        const studentsData = await studentsRes.json();
        console.log("Students from API:", studentsData);
        console.log("Looking for:", studentNumber);

        const me = studentsData.find(
          (s: any) => String(s.id_number) === String(studentNumber)
        );

        if (!me) {
          const ids = studentsData.map((s: any) => s.id_number).join(", ");
          setError(`No student with id_number "${studentNumber}". Available: ${ids}`);
          setLoading(false);
          return;
        }

        setStudent(me);

        const modulesRes = await fetch(
          "http://localhost:5000/api/applications/modules"
        );
        const modulesData = await modulesRes.json();

        setStudentModules(
          modulesData.filter(
            (m: any) => String(m.programme_id) === String(me.programme_id)
          )
        );
      } catch (err: any) {
        console.error("Dashboard load error:", err);
        setError(err?.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [studentNumber]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f1f5f9]">
        <p className="text-sm text-[#64748b]">Loading your dashboard…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f1f5f9] px-6">
        <p className="max-w-2xl text-center text-sm font-medium text-red-600">
          {error}
        </p>
        <button
          onClick={() => navigate("/login")}
          className="rounded-full bg-[#0f172a] px-6 py-2 text-sm font-medium text-white hover:bg-[#1e293b]"
        >
          Back to login
        </button>
      </div>
    );
  }

  if (!student) return null;

  const name = student.first_name || "Student";

  return (
    <section className="min-h-screen bg-[#f1f5f9] px-6 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Top bar with sign out */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold text-[#0f172a]">
              Student Portal{" "}
              <span className="font-normal text-[#64748b]">· Sol Plaatje</span>
            </p>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="rounded-full border border-[#e2e8f0] bg-white px-4 py-1.5 text-xs font-medium text-[#1e293b] hover:bg-[#f8fafc]"
          >
            Sign out
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Welcome banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] px-8 py-7 text-white shadow-[0_10px_30px_-10px_rgba(15,23,42,0.3)]">
            <div>
              <p className="text-xl font-medium tracking-tight">
                Welcome back, {name}
              </p>
              <p className="mt-1.5 text-sm text-[#cbd5e1]">
                Here's a snapshot of your details and academic activity.
              </p>
            </div>
            <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium backdrop-blur-sm">
              2026 Academic Year
            </div>
          </div>

          {/* Stat cards */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-[#e6edf5] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
                Student Status
              </p>
              <p className="mt-3 text-2xl font-bold tracking-tight text-[#0f172a]">
                {student.status
                  ? student.status.charAt(0).toUpperCase() +
                    student.status.slice(1)
                  : "—"}
              </p>
              <p className="mt-2 text-xs leading-5 text-[#64748b]">
                {student.programme_name || "—"}
              </p>
            </div>

            <div className="rounded-2xl border border-[#e6edf5] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
                Student Number
              </p>
              <p className="mt-3 text-2xl font-bold tracking-tight text-[#0f172a]">
                {student.id_number || "—"}
              </p>
              <p className="mt-2 text-xs leading-5 text-[#64748b]">
                {student.status === "active"
                  ? "Active enrolment"
                  : "Inactive enrolment"}
              </p>
            </div>

            <div className="rounded-2xl border border-[#e6edf5] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
                Enrolled Modules
              </p>
              <p className="mt-3 text-2xl font-bold tracking-tight text-[#0f172a]">
                {studentModules.length}
              </p>
              <p className="mt-2 text-xs leading-5 text-[#64748b]">
                Semester 1 · 2026
              </p>
            </div>

            <div className="rounded-2xl border border-[#e6edf5] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
                Intake
              </p>
              <p className="mt-3 text-2xl font-bold tracking-tight text-[#0f172a]">
                {student.intake_name || "—"}
              </p>
              <p className="mt-2 text-xs leading-5 text-[#64748b]">Full-time</p>
            </div>
          </div>

          {/* Split view */}
          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-[1.5fr_1fr]">
            {/* Registered modules */}
            <div className="rounded-2xl border border-[#e6edf5] bg-white p-6 shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-base font-semibold tracking-tight text-[#0f172a]">
                  Registered Modules
                </p>
              </div>

              <div className="flex flex-col">
                {studentModules.length === 0 && (
                  <p className="py-8 text-center text-sm text-[#64748b]">
                    No modules registered yet.
                  </p>
                )}

                {studentModules.map((module: any) => (
                  <div
                    key={module.module_id}
                    className="grid grid-cols-[90px_1fr_auto] items-center gap-4 border-b border-[#f1f5f9] py-3.5 last:border-b-0"
                  >
                    <span className="rounded-md bg-[#f1f5f9] px-2.5 py-1 text-center font-mono text-xs font-semibold text-[#0f172a]">
                      {module.module_code}
                    </span>
                    <span className="truncate text-sm text-[#1e293b]">
                      {module.module_name}
                    </span>
                    <span className="whitespace-nowrap text-xs text-[#94a3b8]">
                      {module.lecturer_first_name
                        ? `${module.lecturer_first_name} ${module.lecturer_last_name}`
                        : "Unassigned"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile */}
            <div className="rounded-2xl border border-[#e6edf5] bg-white p-6 shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
              <p className="mb-5 text-base font-semibold tracking-tight text-[#0f172a]">
                My Profile
              </p>

              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#94a3b8]">
                      First name
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-[#0f172a]">
                      {student.first_name || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#94a3b8]">
                      Last name
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-[#0f172a]">
                      {student.last_name || "—"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#94a3b8]">
                      Programme
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-[#0f172a]">
                      {student.programme_name || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#94a3b8]">
                      Intake
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-[#0f172a]">
                      {student.intake_name || "—"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#94a3b8]">
                      Email address
                    </p>
                    <p className="mt-1.5 truncate text-sm font-medium text-[#0f172a]">
                      {student.email || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#94a3b8]">
                      Status
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-[#0f172a]">
                      {student.status || "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}