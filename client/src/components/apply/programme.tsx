import { motion, AnimatePresence } from "motion/react";
import { useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Tracker from "./tracker";
import { useState, useEffect } from "react";

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

export default function Programme() {

  const navigate = useNavigate();
  const location = useLocation();

  const data = location.state?.data;
  const dataDescription = location.state?.description;

  // Step 1 state
  const [programmeType, setProgrammeType] = useState("online");
  const [cohortDate, setCohortDate] = useState("january");

  // Step 2 state (personal details) — this is what was resetting on "Back"
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // Step 3 state (background details)
  const [education, setEducation] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [institutionEmployer, setInstitutionEmployer] = useState("");
  const [resultsFileName, setResultsFileName] = useState("");
  const [experience, setExperience] = useState("");
  const [applicationReason, setApplicationReason] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  //loader stuff
    const [submitStatus, setSubmitStatus] = useState("idle");

  // Current step
  const [step, setStep] = useState(1);

useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [step , submitStatus]);


useEffect(() => {
  if (submitStatus === "success") {
    const timer = setTimeout(() => {
      navigate("/login");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 5000);

    return () => clearTimeout(timer);
  }
}, [submitStatus, navigate]);

const handleSubmit = () => {
  setSubmitStatus("submitting");

  setTimeout(() => {
    setSubmitStatus("success");
  }, 3500);
};





  return (
    <section className="px-6 pb-24 pt-10 sm:px-8">

      {/* Tracker with consistent spacing */}
      <div className="mx-auto max-w-6xl mb-8">
        <Tracker stepcount={step} />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl"
      >
        {/* Form Container */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 lg:p-10">

          <AnimatePresence mode="wait">

            {/* STEP 1 */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >

                {/* Intro */}
                <div className="space-y-2">
                  <motion.h2
                    variants={item}
                    initial="hidden"
                    animate="show"
                    className="text-lg font-medium tracking-tight text-gray-900"
                  >
                    Pick your programme
                  </motion.h2>

                  <motion.p
                    variants={item}
                    initial="hidden"
                    animate="show"
                    className="text-sm leading-6 text-gray-500"
                  >
                    Start your journey in one of our programmes.
                  </motion.p>
                </div>

                {/* Programme Type */}
                <div className="mt-10 space-y-4">
                  <motion.h3
                    variants={item}
                    initial="hidden"
                    animate="show"
                    className="text-xs font-medium uppercase tracking-widest text-gray-400"
                  >
                    Programme type
                  </motion.h3>

                  <div className="grid gap-3 sm:grid-cols-2">

                    {/* Online */}
                    <motion.button
                      variants={item}
                      initial="hidden"
                      animate="show"
                      type="button"
                      onClick={() => setProgrammeType("online")}
                      className={`group flex items-center justify-between rounded-2xl border px-6 py-7 text-left transition-all duration-200 ${
                        programmeType === "online"
                          ? "border-gray-300 bg-gray-100"
                          : "border-transparent bg-gray-50 hover:border-gray-200 hover:bg-white"
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-lg font-medium tracking-tight text-gray-900">
                          Online
                        </span>

                        <span className="text-sm text-gray-400">
                          12 months · SAQA · NQF
                        </span>
                      </div>

                      {/* Radio */}
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          programmeType === "online"
                            ? "border-gray-700"
                            : "border-gray-300"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full bg-gray-700 ${
                            programmeType === "online"
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        />
                      </span>
                    </motion.button>

                    {/* Onsite */}
                    <motion.button
                      variants={item}
                      initial="hidden"
                      animate="show"
                      type="button"
                      onClick={() => setProgrammeType("onsite")}
                      className={`group flex items-center justify-between rounded-2xl border px-6 py-7 text-left transition-all duration-200 ${
                        programmeType === "onsite"
                          ? "border-gray-300 bg-gray-100"
                          : "border-transparent bg-gray-50 hover:border-gray-200 hover:bg-white"
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-lg font-medium tracking-tight text-gray-900">
                          Onsite
                        </span>

                        <span className="text-sm text-gray-400">
                          6–12 months · SAQA · NQF
                        </span>
                      </div>

                      {/* Radio */}
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          programmeType === "onsite"
                            ? "border-gray-700"
                            : "border-gray-300"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full bg-gray-700 ${
                            programmeType === "onsite"
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        />
                      </span>
                    </motion.button>

                  </div>
                </div>

                {/* Selected Programme */}
                <div className="mt-10 space-y-4">
                  <motion.h3
                    variants={item}
                    initial="hidden"
                    animate="show"
                    className="text-xs font-medium uppercase tracking-widest text-gray-400"
                  >
                    Selected programme
                  </motion.h3>

                  <motion.button
                    variants={item}
                    initial="hidden"
                    animate="show"
                    type="button"
                    className="group flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-6 py-7 text-left"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-lg font-medium tracking-tight text-gray-900">
                        {data || "Selected programme"}
                      </span>

                      <span className="text-sm text-gray-400">
                        {dataDescription ||
                          "12 months · NQF Level 5 · SAQA Accredited"}
                      </span>
                    </div>

                    <span className="text-gray-400 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </motion.button>
                </div>

                {/* Cohort Start Date */}
                <div className="mt-10 space-y-4">
                  <motion.h3
                    variants={item}
                    initial="hidden"
                    animate="show"
                    className="text-xs font-medium uppercase tracking-widest text-gray-400"
                  >
                    Cohort start date
                  </motion.h3>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

                    {/* January */}
                    <motion.button
                      variants={item}
                      initial="hidden"
                      animate="show"
                      type="button"
                      onClick={() => setCohortDate("january")}
                      className={`group flex items-center justify-between rounded-2xl border px-6 py-7 text-left transition-all duration-200 ${
                        cohortDate === "january"
                          ? "border-gray-300 bg-gray-100"
                          : "border-transparent bg-gray-50 hover:border-gray-200 hover:bg-white"
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-xs uppercase tracking-wide text-gray-400">
                          January intake
                        </span>

                        <span className="text-lg font-medium tracking-tight text-gray-900">
                          25 January 2027
                        </span>
                      </div>

                      {/* Radio */}
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          cohortDate === "january"
                            ? "border-gray-700"
                            : "border-gray-300"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full bg-gray-700 ${
                            cohortDate === "january"
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        />
                      </span>
                    </motion.button>

                    {/* May */}
                    <motion.button
                      variants={item}
                      initial="hidden"
                      animate="show"
                      type="button"
                      onClick={() => setCohortDate("may")}
                      className={`group flex items-center justify-between rounded-2xl border px-6 py-7 text-left transition-all duration-200 ${
                        cohortDate === "may"
                          ? "border-gray-300 bg-gray-100"
                          : "border-transparent bg-gray-50 hover:border-gray-200 hover:bg-white"
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-xs uppercase tracking-wide text-gray-400">
                          May intake
                        </span>

                        <span className="text-lg font-medium tracking-tight text-gray-900">
                          24 May 2027
                        </span>
                      </div>

                      {/* Radio */}
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          cohortDate === "may"
                            ? "border-gray-700"
                            : "border-gray-300"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full bg-gray-700 ${
                            cohortDate === "may"
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        />
                      </span>
                    </motion.button>

                    {/* September */}
                    <motion.button
                      variants={item}
                      initial="hidden"
                      animate="show"
                      type="button"
                      onClick={() => setCohortDate("september")}
                      className={`group flex items-center justify-between rounded-2xl border px-6 py-7 text-left transition-all duration-200 ${
                        cohortDate === "september"
                          ? "border-gray-300 bg-gray-100"
                          : "border-transparent bg-gray-50 hover:border-gray-200 hover:bg-white"
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-xs uppercase tracking-wide text-gray-400">
                          September intake
                        </span>

                        <span className="text-lg font-medium tracking-tight text-gray-900">
                          20 September 2027
                        </span>
                      </div>

                      {/* Radio */}
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          cohortDate === "september"
                            ? "border-gray-700"
                            : "border-gray-300"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full bg-gray-700 ${
                            cohortDate === "september"
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        />
                      </span>
                    </motion.button>

                  </div>
                </div>

                {/* Bottom Navigation */}
                <div className="mt-12 flex items-center justify-between border-t border-gray-100 pt-8">

                  {/* Back */}
                  <button
                    type="button"
                    onClick={() => setStep((current) => Math.max(1, current - 1))}
                    className="flex items-center gap-1 text-sm font-medium text-gray-400 transition-colors hover:text-gray-700"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </button>

                  {/* Continue */}
                  <button
                    type="button"
                    onClick={() => setStep((current) => current + 1)}
                    className="group rounded-full bg-gray-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                  >
                    Continue

                    <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </button>

                </div>

              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >

                {/* Intro */}
                <div className="space-y-2">
                  <h2 className="text-lg font-medium tracking-tight text-gray-900">
                    Personal details
                  </h2>

                  <p className="text-sm leading-6 text-gray-500">
                    Provide your personal information to get started.
                  </p>
                </div>


                {/* Form */}
                <div className="mt-10 space-y-6">

                  {/* First Name and Last Name */}
                  <div className="flex flex-col gap-6 sm:flex-row">

                    {/* First Name */}
                    <div className="flex-1 space-y-2">
                      <label
                        htmlFor="firstName"
                        className="text-xs font-medium uppercase tracking-widest text-gray-400"
                      >
                        First name
                      </label>

                      <input
                        id="firstName"
                        type="text"
                        placeholder="Lerato"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-900 outline-none transition focus:border-gray-400"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="flex-1 space-y-2">
                      <label
                        htmlFor="lastName"
                        className="text-xs font-medium uppercase tracking-widest text-gray-400"
                      >
                        Last name
                      </label>

                      <input
                        id="lastName"
                        type="text"
                        placeholder="Mokoena"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-900 outline-none transition focus:border-gray-400"
                      />
                    </div>

                  </div>


                  {/* ID Number */}
                  <div className="space-y-2">

                    <label
                      htmlFor="idNumber"
                      className="text-xs font-medium uppercase tracking-widest text-gray-400"
                    >
                      ID number
                    </label>

                    <input
                      id="idNumber"
                      type="text"
                      inputMode="numeric"
                      placeholder="0000000000000"
                      maxLength={13}
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-900 outline-none transition focus:border-gray-400"
                    />

                  </div>


                  {/* Date of Birth and Gender */}
                  <div className="flex flex-col gap-6 sm:flex-row">

                    {/* Date of Birth */}
                    <div className="flex-1 space-y-2">
                      <label
                        htmlFor="dateOfBirth"
                        className="text-xs font-medium uppercase tracking-widest text-gray-400"
                      >
                        Date of birth
                      </label>

                      <input
                        id="dateOfBirth"
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-900 outline-none transition focus:border-gray-400"
                      />
                    </div>


                    {/* Gender */}
                    <div className="flex-1 space-y-2">
                      <label
                        htmlFor="gender"
                        className="text-xs font-medium uppercase tracking-widest text-gray-400"
                      >
                        Gender
                      </label>

                      <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-900 outline-none transition focus:border-gray-400"
                      >
                        <option value="" disabled>
                          Select gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>

                  </div>


                  {/* Phone Number and Email */}
                  <div className="flex flex-col gap-6 sm:flex-row">

                    {/* Phone Number */}
                    <div className="flex-1 space-y-2">
                      <label
                        htmlFor="phone"
                        className="text-xs font-medium uppercase tracking-widest text-gray-400"
                      >
                        Phone number
                      </label>

                      <input
                        id="phone"
                        type="tel"
                        placeholder="+27 82 555 1234"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-900 outline-none transition focus:border-gray-400"
                      />
                    </div>


                    {/* Email */}
                    <div className="flex-1 space-y-2">
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

                  </div>


                  {/* Address */}
                  <div className="space-y-2">

                    <label
                      htmlFor="address"
                      className="text-xs font-medium uppercase tracking-widest text-gray-400"
                    >
                      Address
                    </label>

                    <textarea
                      id="address"
                      rows={3}
                      placeholder="Enter your residential address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-900 outline-none transition focus:border-gray-400"
                    />

                  </div>

                </div>


                {/* Step 2 Navigation */}
                <div className="mt-12 flex items-center justify-between border-t border-gray-100 pt-8">

                  {/* Back */}
                  <button
                    type="button"
                    onClick={() => setStep((current) => current - 1)}
                    className="flex items-center gap-1 text-sm font-medium text-gray-400 transition-colors hover:text-gray-700"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </button>

                  {/* Continue */}
                  <button
                    type="button"
                    onClick={() => setStep((current) => current + 1)}
                    className="group rounded-full bg-gray-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                  >
                    Continue

                    <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </button>

                </div>

              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >

                {/* Intro */}
                <div className="space-y-2">
                  <h2 className="text-lg font-medium tracking-tight text-gray-900">
                    Background details
                  </h2>

                  <p className="text-sm leading-6 text-gray-500">
                    Provide any relevant background information.
                  </p>
                </div>


                {/* Form */}
                <div className="mt-10 space-y-6">

                  {/* Highest Education and Employment Status */}
                  <div className="flex flex-col gap-6 sm:flex-row">

                    {/* Highest Education */}
                    <div className="flex-1 space-y-2">
                      <label
                        htmlFor="education"
                        className="text-xs font-medium uppercase tracking-widest text-gray-400"
                      >
                        Highest education
                      </label>

                      <select
                        id="education"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-900 outline-none transition focus:border-gray-400"
                      >
                        <option value="" disabled>
                          Select education level
                        </option>
                        <option value="high-school">High School</option>
                        <option value="matric">Matric</option>
                        <option value="certificate">Certificate</option>
                        <option value="diploma">Diploma</option>
                        <option value="degree">Degree</option>
                        <option value="postgraduate">Postgraduate</option>
                        <option value="other">Other</option>
                      </select>
                    </div>


                    {/* Employment Status */}
                    <div className="flex-1 space-y-2">
                      <label
                        htmlFor="employmentStatus"
                        className="text-xs font-medium uppercase tracking-widest text-gray-400"
                      >
                        Employment status
                      </label>

                      <select
                        id="employmentStatus"
                        value={employmentStatus}
                        onChange={(e) => setEmploymentStatus(e.target.value)}
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-900 outline-none transition focus:border-gray-400"
                      >
                        <option value="" disabled>
                          Select employment status
                        </option>
                        <option value="student">Student</option>
                        <option value="employed">Employed</option>
                        <option value="unemployed">Unemployed</option>
                        <option value="self-employed">Self-employed</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                  </div>


                  {/* Current Institution / Employer */}
                  <div className="space-y-2">

                    <label
                      htmlFor="institutionEmployer"
                      className="text-xs font-medium uppercase tracking-widest text-gray-400"
                    >
                      Current institution / employer
                    </label>

                    <input
                      id="institutionEmployer"
                      type="text"
                      placeholder="e.g. Sol Plaatje University"
                      value={institutionEmployer}
                      onChange={(e) => setInstitutionEmployer(e.target.value)}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-900 outline-none transition focus:border-gray-400"
                    />

                  </div>


                  {/* Latest Academic Results */}
                  <div className="space-y-2">

                    <label
                      htmlFor="results"
                      className="text-xs font-medium uppercase tracking-widest text-gray-400"
                    >
                      Latest academic results
                    </label>

                    <input
                      id="results"
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => setResultsFileName(e.target.files?.[0]?.name ?? "")}
                      className="w-full cursor-pointer rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-500 outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-gray-200 file:px-4 file:py-2 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-300 focus:border-gray-400"
                    />

                    <p className="text-xs text-gray-400">
                      {resultsFileName
                        ? `Selected: ${resultsFileName}`
                        : "Upload your latest academic results. PDF, Word documents, or images accepted."}
                    </p>

                  </div>


                  {/* Relevant Experience */}
                  <div className="space-y-2">

                    <label
                      htmlFor="experience"
                      className="text-xs font-medium uppercase tracking-widest text-gray-400"
                    >
                      Relevant experience
                    </label>

                    <textarea
                      id="experience"
                      rows={4}
                      placeholder="Tell us about any relevant work, projects, skills, or experience."
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm leading-6 text-gray-900 outline-none transition focus:border-gray-400"
                    />

                  </div>


                  {/* Why Are You Applying */}
                  <div className="space-y-2">

                    <label
                      htmlFor="applicationReason"
                      className="text-xs font-medium uppercase tracking-widest text-gray-400"
                    >
                      Why are you applying?
                    </label>

                    <textarea
                      id="applicationReason"
                      rows={4}
                      placeholder="Tell us why you would like to join this programme."
                      value={applicationReason}
                      onChange={(e) => setApplicationReason(e.target.value)}
                      className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm leading-6 text-gray-900 outline-none transition focus:border-gray-400"
                    />

                  </div>


                  {/* Emergency Contact */}
                  <div className="pt-2">

                    <h3 className="text-xs font-medium uppercase tracking-widest text-gray-400">
                      Emergency contact
                    </h3>

                    <div className="mt-4 flex flex-col gap-6 sm:flex-row">

                      {/* Emergency Contact Name */}
                      <div className="flex-1 space-y-2">
                        <label
                          htmlFor="emergencyName"
                          className="text-xs font-medium uppercase tracking-widest text-gray-400"
                        >
                          Full name
                        </label>

                        <input
                          id="emergencyName"
                          type="text"
                          placeholder="Thabo Mokoena"
                          value={emergencyName}
                          onChange={(e) => setEmergencyName(e.target.value)}
                          className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-900 outline-none transition focus:border-gray-400"
                        />
                      </div>


                      {/* Emergency Contact Phone */}
                      <div className="flex-1 space-y-2">
                        <label
                          htmlFor="emergencyPhone"
                          className="text-xs font-medium uppercase tracking-widest text-gray-400"
                        >
                          Phone number
                        </label>

                        <input
                          id="emergencyPhone"
                          type="tel"
                          placeholder="+27 82 555 1234"
                          value={emergencyPhone}
                          onChange={(e) => setEmergencyPhone(e.target.value)}
                          className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-900 outline-none transition focus:border-gray-400"
                        />
                      </div>

                    </div>

                  </div>

                </div>


                {/* Step 3 Navigation */}
                <div className="mt-12 flex items-center justify-between border-t border-gray-100 pt-8">

<button
                    type="button"
                    onClick={() => setStep((current) => current - 1)}
                    className="flex items-center gap-1 text-sm font-medium text-gray-400 transition-colors hover:text-gray-700"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </button>


                  {/* Continue */}
                  <button
                    type="button"
                    onClick={() => setStep((current) => current + 1)}
                    className="group rounded-full bg-gray-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                  >
                    Continue

                    <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </button>

                </div>

              </motion.div>
            )}


{/* STEP 4 */}
{step === 4 && (
  <motion.div
    key="step-4"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    {/* Intro */}
    <div className="space-y-2" id="statustohide">
      <h2 className="text-lg font-medium tracking-tight text-gray-900">
        Review & submit
      </h2>

      <p className="text-sm leading-6 text-gray-500">
        {submitStatus === "submitting"
          ? "Submitting your application..."
          : "Review your application details before submitting."}
      </p>
    </div>




{submitStatus === "submitting" ? (
  /* =========================
     SKELETON LOADER
     ========================= */
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="mt-10 space-y-10"
  >
    {/* Programme skeleton */}
    <div>
      <div className="h-3 w-24 animate-pulse rounded-full bg-gray-200" />

      <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="h-3 w-20 animate-pulse rounded-full bg-gray-200" />
            <div className="h-4 w-40 animate-pulse rounded-full bg-gray-200" />
          </div>

          <div className="space-y-2">
            <div className="h-3 w-24 animate-pulse rounded-full bg-gray-200" />
            <div className="h-4 w-24 animate-pulse rounded-full bg-gray-200" />
          </div>

          <div className="space-y-2">
            <div className="h-3 w-28 animate-pulse rounded-full bg-gray-200" />
            <div className="h-4 w-36 animate-pulse rounded-full bg-gray-200" />
          </div>
        </div>
      </div>
    </div>

    {/* Personal details skeleton */}
    <div>
      <div className="h-3 w-32 animate-pulse rounded-full bg-gray-200" />

      <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <div className="grid gap-6 sm:grid-cols-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className={
                index === 6
                  ? "space-y-2 sm:col-span-2"
                  : "space-y-2"
              }
            >
              <div className="h-3 w-20 animate-pulse rounded-full bg-gray-200" />
              <div className="h-4 w-40 animate-pulse rounded-full bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Background skeleton */}
    <div>
      <div className="h-3 w-24 animate-pulse rounded-full bg-gray-200" />

      <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="h-3 w-28 animate-pulse rounded-full bg-gray-200" />
              <div className="h-4 w-32 animate-pulse rounded-full bg-gray-200" />
            </div>

            <div className="space-y-2">
              <div className="h-3 w-32 animate-pulse rounded-full bg-gray-200" />
              <div className="h-4 w-28 animate-pulse rounded-full bg-gray-200" />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <div className="h-3 w-40 animate-pulse rounded-full bg-gray-200" />
              <div className="h-4 w-48 animate-pulse rounded-full bg-gray-200" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="h-3 w-36 animate-pulse rounded-full bg-gray-200" />
            <div className="h-4 w-52 animate-pulse rounded-full bg-gray-200" />
          </div>

          <div className="space-y-2">
            <div className="h-3 w-36 animate-pulse rounded-full bg-gray-200" />
            <div className="h-4 w-full animate-pulse rounded-full bg-gray-100" />
            <div className="h-4 w-4/5 animate-pulse rounded-full bg-gray-100" />
          </div>

          <div className="space-y-2">
            <div className="h-3 w-40 animate-pulse rounded-full bg-gray-200" />
            <div className="h-4 w-full animate-pulse rounded-full bg-gray-100" />
            <div className="h-4 w-3/4 animate-pulse rounded-full bg-gray-100" />
          </div>

          <div className="border-t border-gray-200 pt-5">
            <div className="h-3 w-32 animate-pulse rounded-full bg-gray-200" />

            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="h-3 w-20 animate-pulse rounded-full bg-gray-200" />
                <div className="h-4 w-40 animate-pulse rounded-full bg-gray-200" />
              </div>

              <div className="space-y-2">
                <div className="h-3 w-24 animate-pulse rounded-full bg-gray-200" />
                <div className="h-4 w-32 animate-pulse rounded-full bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Processing message */}
    <div className="flex items-center gap-3 border-t border-gray-100 pt-8">
      <div className="h-2 w-2 animate-pulse rounded-full bg-gray-900" />

      <p className="text-sm text-gray-500">
        Processing your application...
      </p>
    </div>
  </motion.div>

) : submitStatus === "success" ? (

  /* =========================
     SUCCESS
     ========================= */

     
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mt-10 py-20 text-center"
  >
<div className="mx-auto max-w-md">
  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
    <span className="text-lg text-gray-900">✓</span>
  </div>

  <h2 className="mt-6 text-2xl font-medium tracking-tight text-gray-900">
    Application submitted
  </h2>

  <p className="mt-3 text-sm leading-6 text-gray-500">
    Your application has been successfully submitted. Your login
    details will be sent to the email address you provided.
  </p>

  <p className="mt-4 text-sm leading-6 text-gray-500">
    Please check your inbox, as well as your spam or junk folder,
    if you don't see the email.
  </p>

  <p className="mt-4 text-sm leading-6 text-gray-400">
    You will be automatically redirected to the login page shortly.
  </p>
</div>


  </motion.div>

) : (

  /* =========================
     NORMAL REVIEW
     ========================= */
  <div className="mt-10 space-y-10">

    {/* Programme */}
    <div>
      <h3 className="text-xs font-medium uppercase tracking-widest text-gray-400">
        Programme
      </h3>

      <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs text-gray-400">Programme</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {data || "Not selected"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Programme type</p>
            <p className="mt-1 text-sm font-medium capitalize text-gray-900">
              {programmeType}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Cohort start date</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {cohortDate === "january"
                ? "January 25, 2027"
                : cohortDate === "may"
                  ? "May 24, 2027"
                  : "September 20, 2027"}
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Personal Details */}
    <div>
      <h3 className="text-xs font-medium uppercase tracking-widest text-gray-400">
        Personal details
      </h3>

      <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs text-gray-400">Full name</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {firstName || lastName
                ? `${firstName} ${lastName}`.trim()
                : "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">ID number</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {idNumber || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Date of birth</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {dateOfBirth || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Gender</p>
            <p className="mt-1 text-sm font-medium capitalize text-gray-900">
              {gender
                ? gender.replaceAll("-", " ")
                : "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Phone number</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {phone || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Email</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {email || "Not provided"}
            </p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-xs text-gray-400">Address</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {address || "Not provided"}
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Background */}
    <div>
      <h3 className="text-xs font-medium uppercase tracking-widest text-gray-400">
        Background
      </h3>

      <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-xs text-gray-400">
                Highest education
              </p>
              <p className="mt-1 text-sm font-medium capitalize text-gray-900">
                {education
                  ? education.replaceAll("-", " ")
                  : "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Employment status
              </p>
              <p className="mt-1 text-sm font-medium capitalize text-gray-900">
                {employmentStatus
                  ? employmentStatus.replaceAll("-", " ")
                  : "Not provided"}
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-xs text-gray-400">
                Current institution / employer
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {institutionEmployer || "Not provided"}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-400">
              Latest academic results
            </p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {resultsFileName || "No file selected"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">
              Relevant experience
            </p>
            <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-gray-900">
              {experience || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">
              Why are you applying?
            </p>
            <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-gray-900">
              {applicationReason || "Not provided"}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-5">
            <p className="text-xs text-gray-400">
              Emergency contact
            </p>

            <div className="mt-3 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs text-gray-400">Full name</p>
                <p className="mt-1 text-sm font-medium text-gray-900">
                  {emergencyName || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Phone number
                </p>
                <p className="mt-1 text-sm font-medium text-gray-900">
                  {emergencyPhone || "Not provided"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Terms */}
    <div className="border-t border-gray-100 pt-8">
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-400"
        />

        <span className="text-sm leading-6 text-gray-500">
          I confirm that the information provided is accurate and
          complete, and I agree to the terms and conditions of the
          programme.
        </span>
      </label>
    </div>
  </div>
)}















    {/* Navigation */}
    <div className="mt-12 flex items-center justify-between border-t border-gray-100 pt-8">

      {/* Back */}
      <button
        type="button"
        onClick={() => setStep((current) => current - 1)}
        disabled={submitStatus === "submitting" || submitStatus === "success"}
        className="flex items-center gap-1 text-sm font-medium text-gray-400 transition-colors hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </button>

      {/* Submit */}
<button
  type="button"
  onClick={() => {
    if (submitStatus === "success") {
      navigate("/login");
      return;
    }

    document.getElementById("statustohide")?.style.setProperty("display", "none");
    handleSubmit();
  }}
  disabled={submitStatus === "submitting"}
  className="group rounded-full bg-gray-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
>
  {submitStatus === "submitting"
    ? "Submitting..."
    : submitStatus === "success"
      ? "Proceed to manual login"
      : "Submit application"}

  {submitStatus !== "submitting" && (
    <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  )}
</button>
    </div>


  </motion.div>
)}


          </AnimatePresence>

        </div>
      </motion.div>
    </section>
  );
}