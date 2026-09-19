import { motion } from "motion/react";
import { useEffect } from "react";
import { useState } from "react";

export default function Admin() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Application statistics
  const totalApplications = 247;
  const awaitingReview = 64;
  const acceptedApplications = 118;
  const waitlistedApplications = 21;
  const rejectedApplications = 44;

const applications = [
  {
    applicant: "Lerato Mokoena",
    program: "B.Sc Computer Science",
    submitted: "3 Sept 2026",
    applicationType: "Online",
    intake: "Jan 2027",
    status: "Under review",
    dob: "14 March 2005",
    email: "lerato.mokoena@email.com",
    idnumber: "0503140123456",
    phonenumber: "071 234 5678",
    previousHighschool: "Kimberley Girls' High School",
    qualification: "National Senior Certificate",
    yearCompleted: "2023",
    average: "78%",
  },

  {
    applicant: "Sipho Dlamini",
    program: "B.Com Accounting",
    submitted: "4 Sept 2026",
    applicationType: "Onsite",
    intake: "Jan 2027",
    status: "Pending",
    dob: "22 July 2004",
    email: "sipho.dlamini@email.com",
    idnumber: "0407220123456",
    phonenumber: "072 345 6789",
    previousHighschool: "Sol Plaatje Secondary School",
    qualification: "National Senior Certificate",
    yearCompleted: "2023",
    average: "71%",
  },

  {
    applicant: "Aisha Patel",
    program: "B.Sc Computer Science",
    submitted: "4 Sept 2026",
    applicationType: "Online",
    intake: "Jan 2027",
    status: "Pending",
    dob: "9 November 2005",
    email: "aisha.patel@email.com",
    idnumber: "0511090123456",
    phonenumber: "073 456 7890",
    previousHighschool: "Northern Cape High School",
    qualification: "National Senior Certificate",
    yearCompleted: "2023",
    average: "84%",
  },

  {
    applicant: "Thabo Nkosi",
    program: "LLB Law",
    submitted: "1 Sept 2026",
    applicationType: "Onsite",
    intake: "Jan 2027",
    status: "Accepted",
    dob: "18 January 2004",
    email: "thabo.nkosi@email.com",
    idnumber: "0401180123456",
    phonenumber: "074 567 8901",
    previousHighschool: "Diamantveld High School",
    qualification: "National Senior Certificate",
    yearCompleted: "2022",
    average: "76%",
  },

  {
    applicant: "Naledi Khumalo",
    program: "B.Sc Computer Science",
    submitted: "31 Aug 2026",
    applicationType: "Online",
    intake: "Jan 2027",
    status: "Waitlisted",
    dob: "3 May 2005",
    email: "naledi.khumalo@email.com",
    idnumber: "0505030123456",
    phonenumber: "076 678 9012",
    previousHighschool: "Frances Baard High School",
    qualification: "National Senior Certificate",
    yearCompleted: "2023",
    average: "81%",
  },

  {
    applicant: "Johan van Wyk",
    program: "B.Eng Civil Engineering",
    submitted: "30 Aug 2026",
    applicationType: "Onsite",
    intake: "Jan 2027",
    status: "Rejected",
    dob: "27 September 2003",
    email: "johan.vanwyk@email.com",
    idnumber: "0309270123456",
    phonenumber: "078 789 0123",
    previousHighschool: "St. Boniface College",
    qualification: "National Senior Certificate",
    yearCompleted: "2022",
    average: "65%",
  },
];

  return (
    <section className="min-h-screen px-6 py-8 sm:px-8">

      <div className="flex min-h-[calc(100vh-4rem)]">

        {/* Sidebar */}
        <aside className="fixed left-0 top-0 h-screen w-64 border-r border-gray-100 px-6 py-8">

          {/* Logo */}
          <div className="mb-12">
            <p className="text-sm font-medium tracking-tight text-gray-900">
              Sol Plaatje Registrar
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-8">

            {/* Admissions */}
            <div className="space-y-2">

              <p className="px-3 text-xs font-medium uppercase tracking-widest text-gray-400">
                Admissions
              </p>

              <button className="w-full rounded-xl bg-gray-50 px-3 py-2.5 text-left text-sm font-medium text-gray-900">
                Dashboard
              </button>

              <button className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-gray-500">
                Applications
              </button>

            </div>

            {/* Catalog */}
            <div className="space-y-2">

              <p className="px-3 text-xs font-medium uppercase tracking-widest text-gray-400">
                Catalog
              </p>

              <button className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-gray-500">
                Programs
              </button>

              <button className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-gray-500">
                Lecturers
              </button>

              <button className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-gray-500">
                Reports
              </button>

            </div>

          </nav>

        </aside>


        {/* Main content */}
        <main className="ml-64">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            {/* Header */}
            <div className="flex items-end justify-between gap-6">

              {/* Heading */}
              <div className="space-y-2">

                <h1 className="text-2xl font-medium tracking-tight text-gray-900">
                  Dashboard
                </h1>

                <p className="text-sm leading-6 text-gray-500">
                  Overview of admissions and academic activity.
                </p>

              </div>


              {/* Search */}
              <div className="w-full max-w-sm">

                <div className="relative">

                  <svg
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4-4" />
                  </svg>

                  <input
                    type="text"
                    placeholder="Search applications..."
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400"
                  />

                </div>

                <p className="mt-2 px-1 text-xs text-gray-400">
                  Search by name, ID number, email or application ID
                </p>

              </div>

            </div>


            {/* Statistics */}
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

              {/* Total applications */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">

                <p className="text-sm font-medium text-gray-900">
                  Total applications
                </p>

                <p className="mt-3 text-2xl font-medium tracking-tight text-gray-900">
                  {totalApplications}
                </p>

                <p className="mt-2 text-xs leading-5 text-gray-400">
                  Applications received
                </p>

              </div>


              {/* Awaiting review */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">

                <p className="text-sm font-medium text-gray-900">
                  Awaiting review
                </p>

                <p className="mt-3 text-2xl font-medium tracking-tight text-gray-900">
                  {awaitingReview}
                </p>

                <p className="mt-2 text-xs leading-5 text-gray-400">
                  Applications needing review
                </p>

              </div>


              {/* Accepted */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">

                <p className="text-sm font-medium text-gray-900">
                  Accepted
                </p>

                <p className="mt-3 text-2xl font-medium tracking-tight text-gray-900">
                  {acceptedApplications}
                </p>

                <p className="mt-2 text-xs leading-5 text-gray-400">
                  Offers made to applicants
                </p>

              </div>


              {/* Waitlisted */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">

                <p className="text-sm font-medium text-gray-900">
                  Waitlisted
                </p>

                <p className="mt-3 text-2xl font-medium tracking-tight text-gray-900">
                  {waitlistedApplications}
                </p>

                <p className="mt-2 text-xs leading-5 text-gray-400">
                  Applicants awaiting a place
                </p>

              </div>


              {/* Rejected */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">

                <p className="text-sm font-medium text-gray-900">
                  Rejected
                </p>

                <p className="mt-3 text-2xl font-medium tracking-tight text-gray-900">
                  {rejectedApplications}
                </p>

                <p className="mt-2 text-xs leading-5 text-gray-400">
                  Applications not approved
                </p>

              </div>

            </div>


            {/* Applications */}
            <div className="mt-10 rounded-2xl border border-gray-200 p-2">

              <div className="overflow-hidden rounded-xl">

                {/* Navigation buttons */}
                <div className="flex gap-2 border-b border-gray-100 px-3 py-3">

                  <button className="flex flex-1 items-center gap-2 rounded-xl bg-gray-50 px-3 py-2.5 text-left text-sm font-medium text-gray-900">
                    <span className="h-2 w-2 rounded-full bg-gray-900"></span>
                    All
                  </button>

                  <button className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900">
                    <span className="h-2 w-2 rounded-full bg-gray-300"></span>
                    Pending
                  </button>

                  <button className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900">
                    <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                    Under review
                  </button>

                  <button className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900">
                    <span className="h-2 w-2 rounded-full bg-gray-500"></span>
                    Accepted
                  </button>

                  <button className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900">
                    <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                    Waitlisted
                  </button>

                  <button className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900">
                    <span className="h-2 w-2 rounded-full bg-gray-300"></span>
                    Rejected
                  </button>

                </div>


                {/* Column titles */}
                <div className="grid grid-cols-[1.5fr_1.5fr_1fr_1.2fr_1fr_1fr] gap-6 border-b border-gray-100 px-4 py-4">

                  <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
                    Applicant
                  </p>

                  <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
                    Program
                  </p>

                  <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
                    Submitted
                  </p>

                  <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
                    Application Type
                  </p>

                  <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
                    Intake
                  </p>

                  <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
                    Status
                  </p>

                </div>


                {/* Dashboard data */}
                <div>

                  {applications.map((application, index) => {
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setSelectedApplication(index);
                          setSidebarOpen(true);
                        }}
                        className="grid w-full grid-cols-[1.5fr_1.5fr_1fr_1.2fr_1fr_1fr] items-center gap-6 border-b border-gray-100 px-4 py-5 text-left transition-colors hover:bg-gray-50/60 last:border-b-0"
                      >

                        <p className="text-sm font-medium text-gray-900">
                          {application.applicant}
                        </p>

                        <p className="text-sm text-gray-600">
                          {application.program}
                        </p>

                        <p className="text-sm text-gray-500">
                          {application.submitted}
                        </p>

                        <p className="text-sm text-gray-600">
                          {application.applicationType}
                        </p>

                        <p className="text-sm text-gray-600">
                          {application.intake}
                        </p>

                        <p className="text-sm text-gray-600">
                          {application.status}
                        </p>

                      </button>
                    );
                  })}

                </div>

              </div>

            </div>


            {sidebarOpen && (
              <aside className="fixed right-0 top-0 h-screen w-130 border-l border-gray-200 bg-white p-8">

                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="text-sm text-gray-500 hover:text-gray-900"
                >
                  Close
                </button>

                <div className="mt-8">

                  {/* Applicant header */}
                  <div className="border-b border-gray-200 pb-6">

                    <p className="text-xl font-medium tracking-tight text-gray-900">
                      {selectedApplication !== null &&
                        applications[selectedApplication].applicant}
                    </p>

                    <div className="mt-2 flex items-center gap-3 text-sm text-gray-500">

                      <span>
                        {selectedApplication !== null &&
                          applications[selectedApplication].program}
                      </span>

                      <span className="text-gray-300">·</span>

                      <span>
                        {selectedApplication !== null &&
                          applications[selectedApplication].applicationType}
                      </span>

                      <span className="text-gray-300">·</span>

                      <span>
                        {selectedApplication !== null &&
                          applications[selectedApplication].intake}
                      </span>

                    </div>

                  </div>


                  {/* Applicant details */}
                  <div className="mt-6">

                    <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
                      Applicant details
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4">

                      <div>
                        <p className="text-xs text-gray-400">
                          Email
                        </p>

                        <p className="mt-1 text-sm text-gray-900">
                          {selectedApplication !== null &&
                            applications[selectedApplication].email}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Phone
                        </p>

                        <p className="mt-1 text-sm text-gray-900">
                          {selectedApplication !== null &&
                            applications[selectedApplication].phonenumber}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          ID number
                        </p>

                        <p className="mt-1 text-sm text-gray-900">
                          {selectedApplication !== null &&
                            applications[selectedApplication].idnumber}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Date of birth
                        </p>

                        <p className="mt-1 text-sm text-gray-900">
                          {selectedApplication !== null &&
                            applications[selectedApplication].dob}
                        </p>
                      </div>

                    </div>

                  </div>


                  {/* Previous education */}
                  <div className="mt-7">

                    <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
                      Previous education
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4">

                      <div>
                        <p className="text-xs text-gray-400">
                          Institution
                        </p>

                        <p className="mt-1 text-sm text-gray-900">
                          {selectedApplication !== null &&
                            applications[selectedApplication].previousHighschool}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Qualification
                        </p>

                        <p className="mt-1 text-sm text-gray-900">
                          {selectedApplication !== null &&
                            applications[selectedApplication].qualification}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Year completed
                        </p>

                        <p className="mt-1 text-sm text-gray-900">
                          {selectedApplication !== null &&
                            applications[selectedApplication].yearCompleted}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Average
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {selectedApplication !== null &&
                            applications[selectedApplication].average}
                        </p>
                      </div>

                    </div>

                  </div>


                  {/* Decision */}
                  <div className="mt-7 border-t border-gray-200 pt-5">

                    <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
                      Decision
                    </p>

                    <div className="mt-3 flex gap-2">

                      <button
                        type="button"
                        className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                      >
                        Reject
                      </button>

                      <button
                        type="button"
                        className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                      >
                        Waitlist
                      </button>

                      <button
                        type="button"
                        className="flex-1 rounded-xl bg-gray-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                      >
                        Accept
                      </button>

                    </div>

                  </div>

                </div>

              </aside>
            )}

          </motion.div>

        </main>

      </div>

    </section>
  );
}