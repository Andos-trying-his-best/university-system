import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


// Convert an array of objects into CSV text and trigger a download
function exportToCSV(rows: any[], columns: { label: string; value: (row: any) => any }[], filename: string) {
  if (!rows.length) return;

  const escape = (value: any) => {
    const str = value === null || value === undefined ? "" : String(value);
    if (/[",\n]/.test(str)) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const header = columns.map((c) => escape(c.label)).join(",");
  const body = rows
    .map((row) => columns.map((c) => escape(c.value(row))).join(","))
    .join("\n");

  const csv = `${header}\n${body}`;

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}


// Open a print-friendly window with a simple table
function printTable(title: string, rows: any[], columns: { label: string; value: (row: any) => any }[]) {
  if (!rows.length) return;

  const escapeHTML = (value: any) =>
    String(value === null || value === undefined ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const headerHTML = columns
    .map((c) => `<th>${escapeHTML(c.label)}</th>`)
    .join("");

  const bodyHTML = rows
    .map(
      (row) =>
        `<tr>${columns
          .map((c) => `<td>${escapeHTML(c.value(row))}</td>`)
          .join("")}</tr>`
    )
    .join("");

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${escapeHTML(title)}</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; padding: 32px; color: #111; }
          h1 { font-size: 20px; font-weight: 600; margin-bottom: 4px; }
          p.sub { font-size: 13px; color: #666; margin-bottom: 24px; }
          table { width: 100%; border-collapse: collapse; font-size: 13px; }
          th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid #e5e7eb; }
          th { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; }
        </style>
      </head>
      <body>
        <h1>${escapeHTML(title)}</h1>
        <p class="sub">Generated ${new Date().toLocaleString("en-GB")}</p>
        <table>
          <thead><tr>${headerHTML}</tr></thead>
          <tbody>${bodyHTML}</tbody>
        </table>
        <script>window.onload = () => { window.print(); };</script>
      </body>
    </html>
  `;

  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
}


// Open a print-friendly window and let the user "Save as PDF"
function exportToPDF(title: string, rows: any[], columns: { label: string; value: (row: any) => any }[]) {
  printTable(title, rows, columns);
}


export default function Admin() {

  const [showAddDepartment, setShowAddDepartment] = useState(false);
  const [newDepartmentName, setNewDepartmentName] = useState("");

  const [applications, setApplications] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [programmes, setProgramme] = useState<any[]>([]);
  const [modules, setModules] = useState<any[]>([]);
  const [intakes, setIntakes] = useState<any[]>([]);
  const [lecturers, setLecturers] = useState<any[]>([]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<number | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [selectedProgramme, setSelectedProgramme] = useState<number | null>(null);

  const [step, setStep] = useState(0);
  const [studentstep, setStudentStep] = useState(0);
  const [navstep, setNavStep] = useState(0);
  const [programmestep, setProgrammeStep] = useState(0);
  const [programmenavstep, setProgrammeNavStep] = useState(0);

  const [departments, setDepartments] = useState<any[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);
  const [departmentnavstep, setDepartmentNavStep] = useState(0);

  const [showAddModule, setShowAddModule] = useState(false);
  const [newModuleCode, setNewModuleCode] = useState("");
  const [newModuleName, setNewModuleName] = useState("");
  const [newModuleLecturerId, setNewModuleLecturerId] = useState("");

  const [showAddIntake, setShowAddIntake] = useState(false);
  const [newIntakeName, setNewIntakeName] = useState("");
  const [newIntakeStartDate, setNewIntakeStartDate] = useState("");

  const [showAddLecturer, setShowAddLecturer] = useState(false);
  const [newLecturerFirstName, setNewLecturerFirstName] = useState("");
  const [newLecturerLastName, setNewLecturerLastName] = useState("");
  const [newLecturerStaffNumber, setNewLecturerStaffNumber] = useState("");
  const [newLecturerEmail, setNewLecturerEmail] = useState("");
  const [newLecturerPhone, setNewLecturerPhone] = useState("");
  const [newLecturerDepartmentId, setNewLecturerDepartmentId] = useState("");

  const [editingProgramme, setEditingProgramme] = useState(false);
  const [editProgrammeName, setEditProgrammeName] = useState("");
  const [editProgrammeCode, setEditProgrammeCode] = useState("");
  const [editProgrammeDuration, setEditProgrammeDuration] = useState("");
  const [editProgrammeDepartmentId, setEditProgrammeDepartmentId] = useState("");

  const [editingDepartment, setEditingDepartment] = useState(false);
  const [editDepartmentName, setEditDepartmentName] = useState("");

  const [editingLecturer, setEditingLecturer] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState<number | null>(null);
  const [editLecturerFirstName, setEditLecturerFirstName] = useState("");
  const [editLecturerLastName, setEditLecturerLastName] = useState("");
  const [editLecturerStaffNumber, setEditLecturerStaffNumber] = useState("");
  const [editLecturerEmail, setEditLecturerEmail] = useState("");
  const [editLecturerPhone, setEditLecturerPhone] = useState("");

  const [showAddProgramme, setShowAddProgramme] = useState(false);
  const [newProgrammeName, setNewProgrammeName] = useState("");
  const [newProgrammeCode, setNewProgrammeCode] = useState("");
  const [newProgrammeDuration, setNewProgrammeDuration] = useState("");

  // ---- NEW: feedback / validation state ----
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  // ---- NEW: report sort state ----
  const [reportSort, setReportSort] = useState<Record<string, string>>({
    applications: "default",
    students: "default",
    programmes: "default",
    modules: "default",
    lecturers: "default",
  });

  const setSort = (key: string, value: string) =>
    setReportSort((prev) => ({ ...prev, [key]: value }));

  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === "active").length;
  const suspendedStudents = students.filter((s) => s.status === "suspended").length;
  const deregisteredStudents = students.filter((s) => s.status === "deregistered").length;

  const totalModules = modules.length;

  const assignedModules = modules.filter((m) => m.lecturer_id).length;

  const unassignedModules = modules.filter((m) => !m.lecturer_id).length;

  const totalProgrammesWithModules = new Set(
    modules.map((m) => m.programme_id)
  ).size;

  const totalProgrammes = programmes.length;

  const totalDepartments = new Set(
    programmes.map((p) => p.department_name)
  ).size;

  const shortCourses = programmes.filter(
    (p) => Number(p.duration_years) < 1
  ).length;

  const longProgrammes = programmes.filter(
    (p) => Number(p.duration_years) >= 1
  ).length;

  const totalLecturers = lecturers.length;

  const totalDepartmentsWithLecturers = new Set(
    lecturers.map((l) => l.department_id)
  ).size;

  const assignedLecturerIds = new Set(
    modules.map((m) => m.lecturer_id).filter(Boolean)
  );

  const assignedLecturers = lecturers.filter((l) =>
    assignedLecturerIds.has(l.lecturer_id)
  ).length;

  const unassignedLecturers = totalLecturers - assignedLecturers;


  // ---- NEW: report sorting helpers ----

  const countBy = (rows: any[], keyFn: (row: any) => any) => {
    const map: Record<string, number> = {};
    rows.forEach((row) => {
      const key = keyFn(row);
      if (key === null || key === undefined || key === "") return;
      map[String(key)] = (map[String(key)] || 0) + 1;
    });
    return map;
  };

  const applicationsByProgramme = countBy(applications, (a) => a.programme);
  const studentsByProgramme = countBy(students, (s) => s.programme_name);

  const sortedApplications = [...applications].sort((a, b) => {
    switch (reportSort.applications) {
      case "name":
        return `${a.first_name} ${a.last_name}`.localeCompare(
          `${b.first_name} ${b.last_name}`
        );
      case "programme":
        return String(a.programme || "").localeCompare(String(b.programme || ""));
      case "status":
        return String(a.status || "").localeCompare(String(b.status || ""));
      case "popular":
        return (
          (applicationsByProgramme[b.programme] || 0) -
            (applicationsByProgramme[a.programme] || 0) ||
          String(a.programme || "").localeCompare(String(b.programme || ""))
        );
      default:
        return 0;
    }
  });

  const sortedStudents = [...students].sort((a, b) => {
    switch (reportSort.students) {
      case "name":
        return `${a.first_name} ${a.last_name}`.localeCompare(
          `${b.first_name} ${b.last_name}`
        );
      case "programme":
        return String(a.programme_name || "").localeCompare(
          String(b.programme_name || "")
        );
      case "intake":
        return String(a.intake_name || "").localeCompare(
          String(b.intake_name || "")
        );
      case "status":
        return String(a.status || "").localeCompare(String(b.status || ""));
      case "popular":
        return (
          (studentsByProgramme[b.programme_name] || 0) -
            (studentsByProgramme[a.programme_name] || 0) ||
          String(a.programme_name || "").localeCompare(
            String(b.programme_name || "")
          )
        );
      default:
        return 0;
    }
  });

  const sortedProgrammes = [...programmes].sort((a, b) => {
    switch (reportSort.programmes) {
      case "name":
        return String(a.programme_name || "").localeCompare(
          String(b.programme_name || "")
        );
      case "code":
        return String(a.programme_code || "").localeCompare(
          String(b.programme_code || "")
        );
      case "department":
        return String(a.department_name || "").localeCompare(
          String(b.department_name || "")
        );
      case "duration":
        return Number(a.duration_years || 0) - Number(b.duration_years || 0);
      case "popular":
        return (
          (studentsByProgramme[b.programme_name] || 0) -
            (studentsByProgramme[a.programme_name] || 0) ||
          String(a.programme_name || "").localeCompare(
            String(b.programme_name || "")
          )
        );
      default:
        return 0;
    }
  });

  const sortedModules = [...modules].sort((a, b) => {
    switch (reportSort.modules) {
      case "name":
        return String(a.module_name || "").localeCompare(
          String(b.module_name || "")
        );
      case "code":
        return String(a.module_code || "").localeCompare(
          String(b.module_code || "")
        );
      case "programme":
        return String(a.programme_name || "").localeCompare(
          String(b.programme_name || "")
        );
      case "lecturer":
        return String(
          a.lecturer_id
            ? `${a.lecturer_first_name} ${a.lecturer_last_name}`
            : "zzz"
        ).localeCompare(
          String(
            b.lecturer_id
              ? `${b.lecturer_first_name} ${b.lecturer_last_name}`
              : "zzz"
          )
        );
      default:
        return 0;
    }
  });

  const sortedLecturers = [...lecturers].sort((a, b) => {
    switch (reportSort.lecturers) {
      case "name":
        return `${a.lecturer_first_name} ${a.lecturer_last_name}`.localeCompare(
          `${b.lecturer_first_name} ${b.lecturer_last_name}`
        );
      case "staff":
        return String(a.staff_number || "").localeCompare(
          String(b.staff_number || "")
        );
      case "department":
        return String(a.department_name || "").localeCompare(
          String(b.department_name || "")
        );
      case "assigned": {
        const aAssigned =
          a.lecturer_id && assignedLecturerIds.has(a.lecturer_id) ? 0 : 1;
        const bAssigned =
          b.lecturer_id && assignedLecturerIds.has(b.lecturer_id) ? 0 : 1;
        return aAssigned - bAssigned;
      }
      default:
        return 0;
    }
  });


  // Column definitions for report exports
  const applicationColumns = [
    { label: "Applicant", value: (a: any) => `${a.first_name} ${a.last_name}` },
    { label: "Programme", value: (a: any) => a.programme },
    { label: "Status",    value: (a: any) => a.status },
    {
      label: "Type",
      value: (a: any) =>
        a.programme_type
          ? a.programme_type.charAt(0).toUpperCase() + a.programme_type.slice(1)
          : "",
    },
    {
      label: "Cohort",
      value: (a: any) =>
        a.cohort_date ? new Date(a.cohort_date).toLocaleDateString("en-GB") : "",
    },
    {
      label: "Education",
      value: (a: any) =>
        a.education
          ? a.education.charAt(0).toUpperCase() + a.education.slice(1)
          : "",
    },
  ];

  const studentColumns = [
    { label: "Student",   value: (s: any) => `${s.first_name} ${s.last_name}` },
    { label: "Programme", value: (s: any) => s.programme_name },
    { label: "Code",      value: (s: any) => s.programme_code },
    { label: "Intake",    value: (s: any) => s.intake_name },
    {
      label: "Status",
      value: (s: any) =>
        s.status ? s.status.charAt(0).toUpperCase() + s.status.slice(1) : "",
    },
  ];

  const programmeColumns = [
    { label: "Programme",  value: (p: any) => p.programme_name },
    { label: "Code",       value: (p: any) => p.programme_code },
    { label: "Department", value: (p: any) => p.department_name },
    {
      label: "Duration",
      value: (p: any) =>
        p.duration_years
          ? `${p.duration_years} ${Number(p.duration_years) === 1 ? "year" : "years"}`
          : "",
    },
  ];

  const moduleColumns = [
    { label: "Module",    value: (m: any) => m.module_name },
    { label: "Code",      value: (m: any) => m.module_code },
    { label: "Programme", value: (m: any) => m.programme_name },
    {
      label: "Lecturer",
      value: (m: any) =>
        m.lecturer_id
          ? `${m.lecturer_first_name} ${m.lecturer_last_name}`
          : "Unassigned",
    },
  ];

  const lecturerColumns = [
    { label: "Lecturer",     value: (l: any) => `${l.lecturer_first_name} ${l.lecturer_last_name}` },
    { label: "Staff Number", value: (l: any) => l.staff_number },
    { label: "Department",   value: (l: any) => l.department_name },
    { label: "Email",        value: (l: any) => l.email },
  ];


  // ---- helpers ----
  const clearError = (key: string) => {
    setFormErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const showSuccess = (text: string) => {
    setActionMessage({ type: "success", text });
    setTimeout(() => setActionMessage(null), 2500);
  };

  const showError = (text: string) => {
    setActionMessage({ type: "error", text });
    setTimeout(() => setActionMessage(null), 4000);
  };

  // ---- validation ----
  const validateAddDepartment = () => {
    const errs: Record<string, string> = {};
    if (!newDepartmentName.trim()) errs.newDepartmentName = "Department name is required";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateAddProgramme = () => {
    const errs: Record<string, string> = {};
    if (!newProgrammeName.trim()) errs.newProgrammeName = "Programme name is required";
    if (!newProgrammeCode.trim()) errs.newProgrammeCode = "Programme code is required";
    if (!newProgrammeDuration.trim()) errs.newProgrammeDuration = "Duration is required";
    else if (Number(newProgrammeDuration) <= 0) errs.newProgrammeDuration = "Duration must be greater than 0";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateAddModule = () => {
    const errs: Record<string, string> = {};
    if (!newModuleCode.trim()) errs.newModuleCode = "Module code is required";
    if (!newModuleName.trim()) errs.newModuleName = "Module name is required";
    if (!newModuleLecturerId) errs.newModuleLecturerId = "Please select a lecturer";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateAddIntake = () => {
    const errs: Record<string, string> = {};
    if (!newIntakeName.trim()) errs.newIntakeName = "Intake name is required";
    if (!newIntakeStartDate) errs.newIntakeStartDate = "Start date is required";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateAddLecturer = () => {
    const errs: Record<string, string> = {};
    if (!newLecturerFirstName.trim()) errs.newLecturerFirstName = "First name is required";
    if (!newLecturerLastName.trim()) errs.newLecturerLastName = "Last name is required";
    if (!newLecturerStaffNumber.trim()) errs.newLecturerStaffNumber = "Staff number is required";
    if (!newLecturerDepartmentId) errs.newLecturerDepartmentId = "Department is required";
    if (newLecturerEmail && !/^\S+@\S+\.\S+$/.test(newLecturerEmail)) errs.newLecturerEmail = "Enter a valid email address";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateEditProgramme = () => {
    const errs: Record<string, string> = {};
    if (!editProgrammeName.trim()) errs.editProgrammeName = "Programme name is required";
    if (!editProgrammeCode.trim()) errs.editProgrammeCode = "Programme code is required";
    if (!editProgrammeDuration.trim()) errs.editProgrammeDuration = "Duration is required";
    else if (Number(editProgrammeDuration) <= 0) errs.editProgrammeDuration = "Duration must be greater than 0";
    if (!editProgrammeDepartmentId) errs.editProgrammeDepartmentId = "Department is required";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateEditDepartment = () => {
    const errs: Record<string, string> = {};
    if (!editDepartmentName.trim()) errs.editDepartmentName = "Department name is required";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateEditLecturer = () => {
    const errs: Record<string, string> = {};
    if (!editLecturerFirstName.trim()) errs.editLecturerFirstName = "First name is required";
    if (!editLecturerLastName.trim()) errs.editLecturerLastName = "Last name is required";
    if (!editLecturerStaffNumber.trim()) errs.editLecturerStaffNumber = "Staff number is required";
    if (editLecturerEmail && !/^\S+@\S+\.\S+$/.test(editLecturerEmail)) errs.editLecturerEmail = "Enter a valid email address";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ---- input class helper ----
  const inputClass = (key: string) =>
    `w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${
      formErrors[key]
        ? "border-[#fca5a5] bg-[#fef2f2] focus:border-[#ef4444]"
        : "border-[#d1d9e6] focus:border-[#94a3b8]"
    }`;


  const resetForms = () => {
    setShowAddModule(false);
    setNewModuleCode("");
    setNewModuleName("");
    setNewModuleLecturerId("");

    setShowAddIntake(false);
    setNewIntakeName("");
    setNewIntakeStartDate("");

    setShowAddLecturer(false);
    setNewLecturerFirstName("");
    setNewLecturerLastName("");
    setNewLecturerStaffNumber("");
    setNewLecturerEmail("");
    setNewLecturerPhone("");
    setNewLecturerDepartmentId("");

    setShowAddProgramme(false);
    setNewProgrammeName("");
    setNewProgrammeCode("");
    setNewProgrammeDuration("");

    setEditingProgramme(false);
    setEditingDepartment(false);
    setEditingLecturer(false);
    setSelectedLecturer(null);

    setShowAddDepartment(false);
    setNewDepartmentName("");

    setFormErrors({});
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    resetForms();
  };

  const statusFilters: Record<number, string | null> = {
    0: null,
    1: "awaiting",
    2: "accepted",
    3: "waitlisted",
    4: "rejected",
  };

  const studentFilters: Record<number, string | null> = {
    0: null,
    1: "active",
    2: "deregistered",
  };

  const filteredApplications =
    statusFilters[step] === null
      ? applications
      : applications.filter(
          (application) =>
            application.status === statusFilters[step]
        );

  const filteredStudents =
    studentFilters[studentstep] === null
      ? students
      : students.filter(
          (student) =>
            student.status?.toLowerCase() === studentFilters[studentstep]
        );

  const filteredProgrammes = programmes;

  const totalApplications = applications.length;
  const acceptedApplications = applications.filter(
    (application) => application.status === "accepted"
  ).length;
  const rejectedApplications = applications.filter(
    (application) => application.status === "rejected"
  ).length;
  const awaitingReview = applications.filter(
    (application) => application.status === "awaiting"
  ).length;
  const waitlistedApplications = applications.filter(
    (application) => application.status === "waitlisted"
  ).length;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/lecturers")
      .then((res) => res.json())
      .then((data) => setLecturers(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/programmes")
      .then((res) => res.json())
      .then((data) => setProgrammes(data));
  }, []);

  useEffect(() => {
    const getApplications = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/applications"
        );

        const data = await response.json();

        setApplications(data);
      } catch (error) {
        console.error("Error retrieving applications:", error);
      }
    };

    getApplications();
  }, []);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/applications/students"
        );

        if (!response.ok) {
          throw new Error("Failed to retrieve students");
        }

        const data = await response.json();

        console.log("STUDENTS FROM DATABASE:", data);

        setStudents(data);
      } catch (error) {
        console.error("Error retrieving students:", error);
      }
    };

    getStudents();
  }, []);

  useEffect(() => {
    const getProgrammes = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/applications/programmes"
        );

        if (!response.ok) {
          throw new Error("Failed to retrieve programmes");
        }

        const data = await response.json();

        console.log("PROGRAMMES FROM DATABASE:", data);

        setProgramme(data);
      } catch (error) {
        console.error("Error retrieving programmes:", error);
      }
    };

    getProgrammes();
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/modules")
      .then((res) => res.json())
      .then((data) => setModules(data));
  }, []);


  useEffect(() => {
    fetch("http://localhost:5000/api/applications/modules")
      .then((res) => res.json())
      .then((data) => {
        setModules(data);
      })
      .catch((error) => {
        console.error("Error fetching modules:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/applications/intakes")
      .then((res) => res.json())
      .then((data) => {
        setIntakes(data);
      })
      .catch((error) => {
        console.error("Error fetching intakes:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/applications/lecturers")
      .then((res) => res.json())
      .then((data) => {
        console.log("Lecturers:", data);
        setLecturers(data);
      })
      .catch((error) => {
        console.error("Error fetching lecturers:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/applications/departments")
      .then((res) => res.json())
      .then((data) => {
        setDepartments(data);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, []);

  const addDepartment = async () => {
    if (!validateAddDepartment()) {
      showError("Please fix the highlighted fields.");
      return;
    }
    try {
      setBusy(true);
      const response = await fetch(
        "http://localhost:5000/api/applications/departments",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ departmentName: newDepartmentName }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create department");
      }

      setDepartments((currentDepartments) => [...currentDepartments, data]);

      setNewDepartmentName("");
      setShowAddDepartment(false);
      setFormErrors({});
      showSuccess("Department added successfully.");
    } catch (error) {
      console.error("Error creating department:", error);
      showError(error instanceof Error ? error.message : "Failed to create department");
    } finally {
      setBusy(false);
    }
  };

  const deleteDepartment = async (departmentId: number) => {
    if (!window.confirm("Delete this department? This cannot be undone.")) return;

    try {
      setBusy(true);
      const response = await fetch(
        `http://localhost:5000/api/applications/departments/${departmentId}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete department");
      }

      setDepartments((currentDepartments) =>
        currentDepartments.filter((department) => department.department_id !== departmentId)
      );

      closeSidebar();
      showSuccess("Department deleted.");
    } catch (error) {
      console.error("Error deleting department:", error);
      showError(
        error instanceof Error && error.message === "Department still has programmes or lecturers"
          ? "This department still has programmes or lecturers. Delete or move the programmes and delete the lecturers first."
          : error instanceof Error ? error.message : "Failed to delete department"
      );
    } finally {
      setBusy(false);
    }
  };

  const updateProgramme = async () => {
    if (!validateEditProgramme()) {
      showError("Please fix the highlighted fields.");
      return;
    }
    try {
      setBusy(true);
      const programmeId = programmes[selectedProgramme].programme_id;

      const response = await fetch(
        `http://localhost:5000/api/applications/programmes/${programmeId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            programmeName: editProgrammeName,
            programmeCode: editProgrammeCode,
            durationYears: editProgrammeDuration,
            departmentId: editProgrammeDepartmentId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update programme");
      }

      const programmesResponse = await fetch("http://localhost:5000/api/applications/programmes");
      const programmesData = await programmesResponse.json();
      setProgramme(programmesData);

      closeSidebar();
      showSuccess("Programme updated.");
    } catch (error) {
      console.error("Error updating programme:", error);
      showError(error instanceof Error ? error.message : "Failed to update programme");
    } finally {
      setBusy(false);
    }
  };

  const deleteProgramme = async (programmeId: number) => {
    if (!window.confirm("Delete this programme? This cannot be undone.")) return;

    try {
      setBusy(true);
      const response = await fetch(
        `http://localhost:5000/api/applications/programmes/${programmeId}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete programme");
      }

      setProgramme((currentProgrammes) =>
        currentProgrammes.filter((programme) => programme.programme_id !== programmeId)
      );

      closeSidebar();
      showSuccess("Programme deleted.");
    } catch (error) {
      console.error("Error deleting programme:", error);
      showError(error instanceof Error ? error.message : "Failed to delete programme");
    } finally {
      setBusy(false);
    }
  };

  const updateDepartment = async () => {
    if (!validateEditDepartment()) {
      showError("Please fix the highlighted fields.");
      return;
    }
    try {
      setBusy(true);
      const departmentId = departments[selectedDepartment].department_id;

      const response = await fetch(
        `http://localhost:5000/api/applications/departments/${departmentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ departmentName: editDepartmentName }),
        }
      );

      const text = await response.text();
      let data: any = {};
      try { data = text ? JSON.parse(text) : {}; } catch { data = { error: text }; }

      if (!response.ok) {
        throw new Error(data.error || "Failed to update department");
      }

      const departmentsResponse = await fetch("http://localhost:5000/api/applications/departments");
      const departmentsData = await departmentsResponse.json();
      setDepartments(departmentsData);

      const programmesResponse = await fetch("http://localhost:5000/api/applications/programmes");
      const programmesData = await programmesResponse.json();
      setProgramme(programmesData);

      setEditingDepartment(false);
      setFormErrors({});
      showSuccess("Department updated.");
    } catch (error) {
      console.error("Error updating department:", error);
      showError(error instanceof Error ? error.message : "Failed to update department");
    } finally {
      setBusy(false);
    }
  };

  const updateLecturer = async () => {
    if (selectedLecturer === null) return;
    if (!validateEditLecturer()) {
      showError("Please fix the highlighted fields.");
      return;
    }

    try {
      setBusy(true);
      const lecturerId = lecturers[selectedLecturer].lecturer_id;

      const response = await fetch(
        `http://localhost:5000/api/applications/lecturers/${lecturerId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: editLecturerFirstName,
            lastName: editLecturerLastName,
            staffNumber: editLecturerStaffNumber,
            email: editLecturerEmail,
            phone: editLecturerPhone,
          }),
        }
      );

      const text = await response.text();
      let data: any = {};
      try { data = text ? JSON.parse(text) : {}; } catch { data = { error: text }; }

      if (!response.ok) {
        throw new Error(data.error || "Failed to update lecturer");
      }

      const lecturersResponse = await fetch("http://localhost:5000/api/applications/lecturers");
      const lecturersData = await lecturersResponse.json();
      setLecturers(lecturersData);

      const modulesResponse = await fetch("http://localhost:5000/api/applications/modules");
      const modulesData = await modulesResponse.json();
      setModules(modulesData);

      setEditingLecturer(false);
      setSelectedLecturer(null);
      setFormErrors({});
      showSuccess("Lecturer updated.");
    } catch (error) {
      console.error("Error updating lecturer:", error);
      showError(error instanceof Error ? error.message : "Failed to update lecturer");
    } finally {
      setBusy(false);
    }
  };

  const updateApplicationStatus = async (
    idNumber: string,
    status: string
  ) => {
    try {
      setBusy(true);
      const response = await fetch(
        `http://localhost:5000/api/applications/${idNumber}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update application");
      }

      setApplications((currentApplications) =>
        currentApplications.map((application) =>
          application.id_number === idNumber
            ? data
            : application
        )
      );

      showSuccess(`Application marked as ${status}.`);
    } catch (error) {
      console.error("Error updating application:", error);
      showError(error instanceof Error ? error.message : "Failed to update application");
    } finally {
      setBusy(false);
    }
  };

  const acceptApplication = async (idNumber: string) => {
    try {
      setBusy(true);
      const response = await fetch(
        `http://localhost:5000/api/applications/${idNumber}/accept`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Failed to accept application"
        );
      }

      setApplications((currentApplications) =>
        currentApplications.map((application) =>
          application.id_number === idNumber
            ? {
                ...application,
                status: "accepted",
              }
            : application
        )
      );

      const studentsResponse = await fetch(
        "http://localhost:5000/api/applications/students"
      );

      const studentsData = await studentsResponse.json();

      setStudents(studentsData);
      showSuccess("Application accepted. Student created.");
    } catch (error) {
      console.error("ERROR ACCEPTING APPLICATION:", error);
      showError(error instanceof Error ? error.message : "Failed to accept application");
    } finally {
      setBusy(false);
    }
  };

  const deleteModule = async (moduleId: number) => {
    if (!window.confirm("Delete this module? This cannot be undone.")) return;
    try {
      setBusy(true);
      const response = await fetch(
        `http://localhost:5000/api/applications/modules/${moduleId}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete module");
      }

      setModules((currentModules) =>
        currentModules.filter((module) => module.module_id !== moduleId)
      );

      showSuccess("Module deleted.");
    } catch (error) {
      console.error("Error deleting module:", error);
      showError(error instanceof Error ? error.message : "Failed to delete module");
    } finally {
      setBusy(false);
    }
  };

  const deleteIntake = async (intakeId: number) => {
    if (!window.confirm("Delete this intake? This cannot be undone.")) return;
    try {
      setBusy(true);
      const response = await fetch(
        `http://localhost:5000/api/applications/intakes/${intakeId}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete intake");
      }

      setIntakes((currentIntakes) =>
        currentIntakes.filter((intake) => intake.intake_id !== intakeId)
      );

      showSuccess("Intake deleted.");
    } catch (error) {
      console.error("Error deleting intake:", error);
      showError(error instanceof Error ? error.message : "Failed to delete intake");
    } finally {
      setBusy(false);
    }
  };

  const addProgramme = async () => {
    if (!validateAddProgramme()) {
      showError("Please fix the highlighted fields.");
      return;
    }
    try {
      setBusy(true);
      const response = await fetch(
        "http://localhost:5000/api/applications/programmes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            programmeName: newProgrammeName,
            programmeCode: newProgrammeCode,
            durationYears: newProgrammeDuration,
            departmentId: departments[selectedDepartment].department_id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create programme");
      }

      const programmesResponse = await fetch("http://localhost:5000/api/applications/programmes");
      const programmesData = await programmesResponse.json();
      setProgramme(programmesData);

      setNewProgrammeName("");
      setNewProgrammeCode("");
      setNewProgrammeDuration("");
      setShowAddProgramme(false);
      setFormErrors({});
      showSuccess("Programme added.");
    } catch (error) {
      console.error("Error creating programme:", error);
      showError(error instanceof Error ? error.message : "Failed to create programme");
    } finally {
      setBusy(false);
    }
  };

  const addModule = async () => {
    if (!validateAddModule()) {
      showError("Please fix the highlighted fields.");
      return;
    }
    try {
      setBusy(true);
      const response = await fetch(
        "http://localhost:5000/api/applications/modules",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            moduleCode: newModuleCode,
            moduleName: newModuleName,
            programmeId: programmes[selectedProgramme].programme_id,
            lecturerId: newModuleLecturerId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create module");
      }

      setModules((currentModules) => [...currentModules, data]);

      setNewModuleCode("");
      setNewModuleName("");
      setNewModuleLecturerId("");
      setShowAddModule(false);
      setFormErrors({});
      showSuccess("Module added.");
    } catch (error) {
      console.error("Error creating module:", error);
      showError(error instanceof Error ? error.message : "Failed to create module");
    } finally {
      setBusy(false);
    }
  };

  const addIntake = async () => {
    if (!validateAddIntake()) {
      showError("Please fix the highlighted fields.");
      return;
    }
    try {
      setBusy(true);
      const response = await fetch(
        "http://localhost:5000/api/applications/intakes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            intakeName: newIntakeName,
            startDate: newIntakeStartDate,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create intake");
      }

      setIntakes((currentIntakes) => [...currentIntakes, data]);

      setNewIntakeName("");
      setNewIntakeStartDate("");
      setShowAddIntake(false);
      setFormErrors({});
      showSuccess("Intake added.");
    } catch (error) {
      console.error("Error creating intake:", error);
      showError(error instanceof Error ? error.message : "Failed to create intake");
    } finally {
      setBusy(false);
    }
  };


  const deleteLecturer = async (lecturerId: number) => {
    if (!window.confirm("Delete this lecturer? This cannot be undone.")) return;
    try {
      setBusy(true);
      const response = await fetch(
        `http://localhost:5000/api/applications/lecturers/${lecturerId}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete lecturer");
      }

      setLecturers((currentLecturers) =>
        currentLecturers.filter((lecturer) => lecturer.lecturer_id !== lecturerId)
      );

      showSuccess("Lecturer deleted.");
    } catch (error) {
      console.error("Error deleting lecturer:", error);
      showError(error instanceof Error ? error.message : "Failed to delete lecturer");
    } finally {
      setBusy(false);
    }
  };

    const navigate = useNavigate();
  
  const addLecturer = async () => {
    if (!validateAddLecturer()) {
      showError("Please fix the highlighted fields.");
      return;
    }
    try {
      setBusy(true);
      const response = await fetch(
        "http://localhost:5000/api/applications/lecturers",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: newLecturerFirstName,
            lastName: newLecturerLastName,
            staffNumber: newLecturerStaffNumber,
            email: newLecturerEmail,
            phone: newLecturerPhone,
            departmentId: newLecturerDepartmentId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create lecturer");
      }

      const lecturersResponse = await fetch("http://localhost:5000/api/applications/lecturers");
      const lecturersData = await lecturersResponse.json();
      setLecturers(lecturersData);

      setNewLecturerFirstName("");
      setNewLecturerLastName("");
      setNewLecturerStaffNumber("");
      setNewLecturerEmail("");
      setNewLecturerPhone("");
      setNewLecturerDepartmentId("");
      setShowAddLecturer(false);
      setFormErrors({});
      showSuccess("Lecturer added.");
    } catch (error) {
      console.error("Error creating lecturer:", error);
      showError(error instanceof Error ? error.message : "Failed to create lecturer");
    } finally {
      setBusy(false);
    }
  };

  const assignLecturerToModule = async (moduleId: number, lecturerId: string) => {
    try {
      setBusy(true);
      const response = await fetch(
        `http://localhost:5000/api/applications/modules/${moduleId}/assign-lecturer`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lecturerId }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to assign lecturer");
      }

      const modulesResponse = await fetch("http://localhost:5000/api/applications/modules");
      const modulesData = await modulesResponse.json();
      setModules(modulesData);
      showSuccess("Lecturer assigned to module.");
    } catch (error) {
      console.error("Error assigning lecturer:", error);
      showError(error instanceof Error ? error.message : "Failed to assign lecturer");
    } finally {
      setBusy(false);
    }
  };

  const deregisterStudent = async (idNumber: string) => {
    try {
      setBusy(true);
      const response = await fetch(
        `http://localhost:5000/api/applications/students/${idNumber}/deregister`,
        { method: "PUT" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to deregister student");
      }

      setStudents((currentStudents) =>
        currentStudents.map((student) =>
          student.id_number === idNumber
            ? { ...student, status: "deregistered" }
            : student
        )
      );

      showSuccess("Student deregistered.");
    } catch (error) {
      console.error("Error deregistering student:", error);
      showError(error instanceof Error ? error.message : "Failed to deregister student");
    } finally {
      setBusy(false);
    }
  };


  useEffect(() => {
    console.log("Step changed:", step);
  }, [step]);


  return (
    <section className="min-h-screen bg-[#f1f5f9] px-6 py-8 sm:px-8">

      <div className="flex min-h-[calc(100vh-4rem)]">

        {/* Sidebar */}
        <aside className="fixed left-0 top-0 z-30 flex h-screen w-64 flex-col border-r border-[#e9eef3] bg-white">

          {/* Logo */}
          <div className="px-6 pb-6 pt-8">
            <p className="px-3 text-sm font-semibold tracking-tight text-[#0f172a]">
              Algo Academy Registrar
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-7 overflow-y-auto px-6 pb-6">

            {/* Admissions */}
            <div className="space-y-1">

              <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">
                Admissions
              </p>

              <button
                onClick={() => { setNavStep(0); closeSidebar(); }}
                className={
                  navstep === 0
                    ? "flex w-full items-center rounded-lg bg-[#eef2ff] px-3 py-2 text-left text-sm font-medium text-[#1e3a8a] transition-colors"
                    : "flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-[#64748b] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a]"
                }
              >
                Applications
              </button>
            </div>

            {/* Catalog */}
            <div className="space-y-1">

              <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">
                Academic
              </p>

              <button
                onClick={() => { setNavStep(1); closeSidebar(); }}
                className={
                  navstep === 1
                    ? "flex w-full items-center rounded-lg bg-[#eef2ff] px-3 py-2 text-left text-sm font-medium text-[#1e3a8a] transition-colors"
                    : "flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-[#64748b] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a]"
                }
              >
                Students
              </button>

              <button
                onClick={() => { setNavStep(2); closeSidebar(); }}
                className={
                  navstep === 2
                    ? "flex w-full items-center rounded-lg bg-[#eef2ff] px-3 py-2 text-left text-sm font-medium text-[#1e3a8a] transition-colors"
                    : "flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-[#64748b] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a]"
                }
              >
                Programmes
              </button>

              <button
                onClick={() => { setNavStep(3); closeSidebar(); }}
                className={
                  navstep === 3
                    ? "flex w-full items-center rounded-lg bg-[#eef2ff] px-3 py-2 text-left text-sm font-medium text-[#1e3a8a] transition-colors"
                    : "flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-[#64748b] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a]"
                }
              >
                Departments
              </button>

            </div>

            {/* Reports */}
            <div className="space-y-1">

              <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">
                Reports
              </p>

              <button
                onClick={() => { setNavStep(4); closeSidebar(); }}
                className={
                  navstep === 4
                    ? "w-full rounded-lg bg-[#eef2ff] px-3 py-2 text-left text-sm font-medium text-[#1e3a8a] transition-colors"
                    : "w-full rounded-lg px-3 py-2 text-left text-sm text-[#64748b] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a]"
                }
              >
                Applications Report
              </button>

              <button
                onClick={() => { setNavStep(5); closeSidebar(); }}
                className={
                  navstep === 5
                    ? "w-full rounded-lg bg-[#eef2ff] px-3 py-2 text-left text-sm font-medium text-[#1e3a8a] transition-colors"
                    : "w-full rounded-lg px-3 py-2 text-left text-sm text-[#64748b] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a]"
                }
              >
                Students Report
              </button>

              <button
                onClick={() => { setNavStep(6); closeSidebar(); }}
                className={
                  navstep === 6
                    ? "w-full rounded-lg bg-[#eef2ff] px-3 py-2 text-left text-sm font-medium text-[#1e3a8a] transition-colors"
                    : "w-full rounded-lg px-3 py-2 text-left text-sm text-[#64748b] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a]"
                }
              >
                Programme Report
              </button>

              <button
                onClick={() => { setNavStep(7); closeSidebar(); }}
                className={
                  navstep === 7
                    ? "w-full rounded-lg bg-[#eef2ff] px-3 py-2 text-left text-sm font-medium text-[#1e3a8a] transition-colors"
                    : "w-full rounded-lg px-3 py-2 text-left text-sm text-[#64748b] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a]"
                }
              >
                Admissions Report
              </button>

              <button
                onClick={() => { setNavStep(8); closeSidebar(); }}
                className={
                  navstep === 8
                    ? "w-full rounded-lg bg-[#eef2ff] px-3 py-2 text-left text-sm font-medium text-[#1e3a8a] transition-colors"
                    : "w-full rounded-lg px-3 py-2 text-left text-sm text-[#64748b] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a]"
                }
              >
                Lecturer Report
              </button>

            </div>



          </nav>

{/* User */}
<div className="border-t border-[#e9eef3] px-6 py-5 space-y-1">

  <button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-[#f1f5f9]">

    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0f172a] text-xs font-medium text-white">
      A0
    </span>

    <span className="min-w-0 flex-1">
      <p className="truncate text-sm font-medium text-[#0f172a]">
        Admin00000
      </p>
      <p className="truncate text-xs text-[#94a3b8]">
        Admin
      </p>
    </span>

  </button>

  <button
    onClick={() => navigate("/login")}
    className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm text-[#64748b] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a]"
  >
    <span className="flex h-9 w-9 shrink-0 items-center justify-center text-[#94a3b8]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    </span>

    <span className="min-w-0 flex-1">
      <p className="truncate text-sm font-medium">
        Sign out
      </p>
    </span>

  </button>

</div>

        </aside>


        {/* Action feedback toast */}
        <AnimatePresence>
          {actionMessage && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={`fixed left-1/2 top-6 z-[100] -translate-x-1/2 rounded-xl border px-5 py-3 text-sm font-medium shadow-lg ${
                actionMessage.type === "success"
                  ? "border-[#a7f3d0] bg-[#ecfdf5] text-[#065f46]"
                  : "border-[#fecaca] bg-[#fef2f2] text-[#991b1b]"
              }`}
            >
              {actionMessage.text}
            </motion.div>
          )}
        </AnimatePresence>


        {/* Main content */}
        <main className="ml-64 w-[calc(100vw-16rem)] min-w-[1000px]">

          {navstep === 0 && (
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

                  <h1 className="text-2xl font-medium tracking-tight text-[#0f172a]">
                    Applications
                  </h1>

                  <p className="text-sm leading-6 text-[#64748b]">
                    Overview of admissions and academic activity.
                  </p>

                </div>

              </div>


              {/* Statistics */}
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

                {/* Total applications */}
                <div className="rounded-2xl border border-[#e6edf5] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">

                  <p className="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
                    Total applications
                  </p>

                  <p className="mt-3 text-2xl font-bold tracking-tight text-[#0f172a]">
                    {totalApplications}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-[#64748b]">
                    Applications received
                  </p>

                </div>


                {/* Awaiting review */}
                <div className="rounded-2xl border border-[#e6edf5] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">

                  <p className="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
                    Awaiting review
                  </p>

                  <p className="mt-3 text-2xl font-bold tracking-tight text-[#0f172a]">
                    {awaitingReview}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-[#64748b]">
                    Applications needing review
                  </p>

                </div>


                {/* Accepted */}
                <div className="rounded-2xl border border-[#e6edf5] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">

                  <p className="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
                    Accepted
                  </p>

                  <p className="mt-3 text-2xl font-bold tracking-tight text-[#0f172a]">
                    {acceptedApplications}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-[#64748b]">
                    Offers made to applicants
                  </p>

                </div>


                {/* Waitlisted */}
                <div className="rounded-2xl border border-[#e6edf5] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">

                  <p className="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
                    Waitlisted
                  </p>

                  <p className="mt-3 text-2xl font-bold tracking-tight text-[#0f172a]">
                    {waitlistedApplications}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-[#64748b]">
                    Applicants awaiting a place
                  </p>

                </div>


                {/* Rejected */}
                <div className="rounded-2xl border border-[#e6edf5] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">

                  <p className="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
                    Rejected
                  </p>

                  <p className="mt-3 text-2xl font-bold tracking-tight text-[#0f172a]">
                    {rejectedApplications}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-[#64748b]">
                    Applications not approved
                  </p>

                </div>

              </div>


              {/* Applications */}
              <div className="mt-10 rounded-2xl border border-[#e6edf5] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.02)]">

                <div className="overflow-hidden rounded-2xl">

                  {/* Navigation buttons */}
                  <div className="flex gap-2 border-b border-[#edf2f7] px-3 py-3">

                    <button
                      onClick={() => setStep(0)}
                      className={
                        step === 0
                          ? "flex flex-1 items-center gap-2 rounded-xl bg-[#f8fafc] px-3 py-2.5 text-left text-sm font-medium text-[#0f172a]"
                          : "flex flex-1 items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#475569] hover:bg-[#f8fafc]"
                      }
                    >
                      <span className="h-2 w-2 rounded-full bg-[#0f172a]"></span>
                      All
                    </button>

                    <button
                      onClick={() => setStep(1)}
                      className={
                        step === 1
                          ? "flex flex-1 items-center gap-2 rounded-xl bg-[#f8fafc] px-3 py-2.5 text-left text-sm font-medium text-[#0f172a]"
                          : "flex flex-1 items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#475569] hover:bg-[#f8fafc]"
                      }
                    >
                      <span className="h-2 w-2 rounded-full bg-[#cbd5e1]"></span>
                      Awaiting
                    </button>

                    <button
                      onClick={() => setStep(2)}
                      className={
                        step === 2
                          ? "flex flex-1 items-center gap-2 rounded-xl bg-[#f8fafc] px-3 py-2.5 text-left text-sm font-medium text-[#0f172a]"
                          : "flex flex-1 items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#475569] hover:bg-[#f8fafc]"
                      }
                    >
                      <span className="h-2 w-2 rounded-full bg-[#94a3b8]"></span>
                      Accepted
                    </button>

                    <button
                      onClick={() => setStep(3)}
                      className={
                        step === 3
                          ? "flex flex-1 items-center gap-2 rounded-xl bg-[#f8fafc] px-3 py-2.5 text-left text-sm font-medium text-[#0f172a]"
                          : "flex flex-1 items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#475569] hover:bg-[#f8fafc]"
                      }
                    >
                      <span className="h-2 w-2 rounded-full bg-[#94a3b8]"></span>
                      Waitlisted
                    </button>

                    <button
                      onClick={() => setStep(4)}
                      className={
                        step === 4
                          ? "flex flex-1 items-center gap-2 rounded-xl bg-[#f8fafc] px-3 py-2.5 text-left text-sm font-medium text-[#0f172a]"
                          : "flex flex-1 items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#475569] hover:bg-[#f8fafc]"
                      }
                    >
                      <span className="h-2 w-2 rounded-full bg-[#cbd5e1]"></span>
                      Rejected
                    </button>

                  </div>

                  <div className="overflow-hidden rounded-2xl bg-white">

                    <div className="grid grid-cols-[1.6fr_1.7fr_1.3fr_1.1fr_1.2fr_1.1fr] gap-8 border-b border-[#e2e8f0] bg-[#f8fafc] px-6 py-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">
                        Applicant
                      </p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">
                        Programme
                      </p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">
                        Status
                      </p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">
                        Type
                      </p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">
                        Cohort
                      </p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">
                        Education
                      </p>
                    </div>


                    {filteredApplications.map((application) => {

                      const applicationIndex = applications.indexOf(application);

                      return (
                        <button
                          key={application.id_number}
                          type="button"
                          onClick={() => {
                            setSelectedApplication(applicationIndex);
                            setSidebarOpen(true);
                          }}
                          className="grid w-full grid-cols-[1.6fr_1.7fr_1.3fr_1.1fr_1.2fr_1.1fr] items-center gap-8 border-b border-[#edf2f7] px-6 py-6 text-left transition-colors hover:bg-[#fafcff] last:border-b-0"
                        >

                          <p className="text-sm font-medium text-[#0f172a]">
                            {application.first_name} {application.last_name}
                          </p>

                          <p className="text-sm text-[#1e293b]">
                            {application.programme}
                          </p>

                          <p className="text-sm text-[#1e293b]">
                            {application.status}
                          </p>

                          <p className="text-sm text-[#1e293b]">
                            {application.programme_type
                              ? application.programme_type.charAt(0).toUpperCase() +
                                application.programme_type.slice(1)
                              : ""}
                          </p>

                          <p className="text-sm text-[#1e293b]">
                            {application.cohort_date
                              ? new Date(
                                    application.cohort_date
                                ).toLocaleDateString("en-GB")
                              : ""}
                          </p>

                          <p className="text-sm text-[#1e293b]">
                            {application.education
                              ? application.education.charAt(0).toUpperCase() +
                                application.education.slice(1)
                              : ""}
                          </p>

                        </button>
                      );
                    })}


                    {filteredApplications.length === 0 && (
                      <div className="px-6 py-12 text-center">
                        <p className="text-sm text-[#64748b]">
                          No applications found.
                        </p>
                      </div>
                    )}

                  </div>

                </div>

              </div>


              {/* Sidebar drawer for Application */}
              {sidebarOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40 bg-black/20"
                    onClick={closeSidebar}
                  />
                  <aside className="fixed right-0 top-0 z-50 h-screen w-[520px] border-l border-[#e9eef3] bg-white p-8">

                    <button
                      type="button"
                      onClick={closeSidebar}
                      className="text-sm text-[#64748b] hover:text-[#0f172a]"
                    >
                      Close
                    </button>

                    <div className="mt-8">

                      {/* Header */}
                      <div className="border-b border-[#e9eef3] pb-6">

                        <p className="text-xl font-medium text-[#0f172a]">
                          {selectedApplication !== null &&
                            `${applications[selectedApplication].first_name} ${applications[selectedApplication].last_name}`}
                        </p>

                        <p className="mt-2 text-sm text-[#64748b]">
                          {selectedApplication !== null &&
                            applications[selectedApplication].programme}
                          {" · "}
                          {selectedApplication !== null &&
                            applications[selectedApplication].programme_type}
                          {" · "}
                          {selectedApplication !== null &&
                            new Date(
                              applications[selectedApplication].cohort_date
                            ).toLocaleDateString("en-GB")}
                        </p>

                      </div>


                      {/* Details */}
                      <div className="mt-6">

                        <p className="text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">
                          Applicant details
                        </p>

                        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5">

                          <div>
                            <p className="text-xs text-[#94a3b8]">Email Address</p>
                            <p className="mt-1 text-sm text-[#0f172a]">
                              {selectedApplication !== null &&
                                applications[selectedApplication].email}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-[#94a3b8]">Phone Number</p>
                            <p className="mt-1 text-sm text-[#0f172a]">
                              {selectedApplication !== null &&
                                applications[selectedApplication].phone_number}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-[#94a3b8]">ID Number</p>
                            <p className="mt-1 text-sm text-[#0f172a]">
                              {selectedApplication !== null &&
                                applications[selectedApplication].id_number}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-[#94a3b8]">Highest Qualification</p>
                            <p className="mt-1 text-sm text-[#0f172a]">
                              {selectedApplication !== null &&
                                applications[selectedApplication].education}
                            </p>
                          </div>

                          <div className="">
                            <p className="text-xs text-[#94a3b8]">Institution / Employer</p>
                            <p className="mt-1 text-sm text-[#0f172a]">
                              {selectedApplication !== null &&
                                applications[selectedApplication].institution_employer}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-[#94a3b8]">Application Status</p>
                            <p className="mt-1 text-sm text-[#0f172a]">
                              {selectedApplication !== null &&
                                applications[selectedApplication].status}
                            </p>
                          </div>

                        </div>

                      </div>


                      {/* Decision */}
                      <div className="absolute bottom-8 left-8 right-8 border-t border-[#e9eef3] pt-5">

                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">
                          Decision
                        </p>

                        {selectedApplication !== null &&
                        applications[selectedApplication].status === "accepted" ? (

                          <div className="rounded-xl border border-[#e9eef3] bg-[#f8fafc] px-4 py-3">
                            <p className="text-sm font-medium text-[#0f172a]">
                              This applicant is now a student
                            </p>
                            <p className="mt-1 text-sm text-[#64748b]">
                              Deregister them from the Students dashboard instead.
                            </p>
                          </div>

                        ) : (

                          <div className="flex gap-2">

                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => {
                                if (selectedApplication !== null) {
                                  updateApplicationStatus(
                                    applications[selectedApplication].id_number,
                                    "rejected"
                                  );
                                }
                              }}
                              className="flex-1 rounded-xl border border-[#d1d9e6] px-3 py-2.5 text-sm font-medium text-[#1e293b] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Reject
                            </button>

                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => {
                                if (selectedApplication !== null) {
                                  updateApplicationStatus(
                                    applications[selectedApplication].id_number,
                                    "waitlisted"
                                  );
                                }
                              }}
                              className="flex-1 rounded-xl border border-[#d1d9e6] px-3 py-2.5 text-sm font-medium text-[#1e293b] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Waitlist
                            </button>

                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => {
                                if (selectedApplication !== null) {
                                  acceptApplication(
                                    applications[selectedApplication].id_number
                                  );
                                }
                              }}
                              className="flex-1 rounded-xl bg-[#0f172a] px-3 py-2.5 text-sm font-medium text-white transition hover:bg-[#1e293b] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {busy ? "Working…" : "Accept"}
                            </button>
                          </div>

                        )}

                      </div>

                    </div>

                  </aside>
                </>
              )}
            </motion.div>
          )}

          {navstep === 1 && (
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

                <div className="space-y-2">

                  <h1 className="text-2xl font-medium tracking-tight text-[#0f172a]">
                    Students
                  </h1>

                  <p className="text-sm leading-6 text-[#64748b]">
                    Records for admitted and enrolled students.
                  </p>

                </div>

              </div>


              {/* Filter buttons */}
              <div className="mt-10 flex gap-3">

                <button
                  onClick={() => setStudentStep(0)}
                  className={
                    studentstep === 0
                      ? "rounded-lg border border-[#0f172a] bg-[#0f172a] px-4 py-2 text-sm font-medium text-white"
                      : "rounded-lg border border-[#d1d9e6] px-4 py-2 text-sm font-medium text-[#1e293b] hover:border-[#b9c4d4] hover:text-[#0f172a]"
                  }
                >
                  All
                </button>

                <button
                  onClick={() => setStudentStep(1)}
                  className={
                    studentstep === 1
                      ? "rounded-lg border border-[#0f172a] bg-[#0f172a] px-4 py-2 text-sm font-medium text-white"
                      : "rounded-lg border border-[#d1d9e6] px-4 py-2 text-sm font-medium text-[#1e293b] hover:border-[#b9c4d4] hover:text-[#0f172a]"
                  }
                >
                  Active
                </button>

                <button
                  onClick={() => setStudentStep(2)}
                  className={
                    studentstep === 2
                      ? "rounded-lg border border-[#0f172a] bg-[#0f172a] px-4 py-2 text-sm font-medium text-white"
                      : "rounded-lg border border-[#d1d9e6] px-4 py-2 text-sm font-medium text-[#1e293b] hover:border-[#b9c4d4] hover:text-[#0f172a]"
                  }
                >
                  Deregistered
                </button>

              </div>


              {/* Table */}
              <div className="mt-10 rounded-2xl border border-[#e6edf5] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.02)]">

                <div className="overflow-hidden rounded-2xl">

                  <div className="overflow-hidden rounded-2xl bg-white">

                    <div className="grid grid-cols-[1.4fr_1.4fr_1.5fr_1.3fr_1.3fr] gap-8 border-b border-[#e2e8f0] bg-[#f8fafc] px-6 py-4">

                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">
                        Student
                      </p>

                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">
                        Student Number
                      </p>

                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">
                        Programme
                      </p>

                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">
                        Intake
                      </p>

                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">
                        Status
                      </p>

                    </div>


                    {filteredStudents.map((student) => {

                      const studentIndex = students.indexOf(student);

                      return (
                        <button
                          key={student.id_number}
                          type="button"
                          onClick={() => {
                            setSelectedStudent(studentIndex);
                            setSidebarOpen(true);
                          }}
                          className="grid w-full grid-cols-[1.4fr_1.4fr_1.5fr_1.3fr_1.3fr] items-center gap-8 border-b border-[#edf2f7] px-6 py-6 text-left transition-colors hover:bg-[#fafcff] last:border-b-0"
                        >
                          <p className="text-sm font-medium text-[#0f172a]">
                            {student.first_name} {student.last_name}
                          </p>

                          <p className="text-sm text-[#1e293b]">
                            {student.id_number}
                          </p>

                          <p className="text-sm text-[#1e293b]">
                            {student.programme_code} — {student.programme_name}
                          </p>

                          <p className="text-sm text-[#1e293b]">
                            {student.intake_name}
                          </p>

                          <p className="text-sm text-[#1e293b]">
                            {student.status}
                          </p>
                        </button>
                      );
                    })}

                    {students.length === 0 && (
                      <div className="px-6 py-12 text-center">
                        <p className="text-sm text-[#64748b]">
                          No students found.
                        </p>
                      </div>
                    )}

                  </div>

                  {sidebarOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40 bg-black/20"
                        onClick={closeSidebar}
                      />
                      <aside className="fixed right-0 top-0 z-50 h-screen w-[520px] border-l border-[#e9eef3] bg-white p-8">

                        <button
                          type="button"
                          onClick={closeSidebar}
                          className="text-sm text-[#64748b] hover:text-[#0f172a]"
                        >
                          Close
                        </button>

                        <div className="mt-8">

                          {/* Header */}
                          <div className="border-b border-[#e9eef3] pb-6">

                            <p className="text-xl font-medium text-[#0f172a]">
                              {selectedStudent !== null &&
                                `${students[selectedStudent].first_name} ${students[selectedStudent].last_name}`}
                            </p>

                            <p className="mt-2 text-sm text-[#64748b]">
                              {selectedStudent !== null &&
                                `${students[selectedStudent].programme_code} — ${students[selectedStudent].programme_name}`}
                              {" · "}
                              {selectedStudent !== null &&
                                students[selectedStudent].intake_name}
                            </p>

                          </div>


                          {/* Details */}
                          <div className="mt-6">

                            <p className="text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">
                              Student details
                            </p>

                            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5">

                              <div>
                                <p className="text-xs text-[#94a3b8]">ID Number</p>
                                <p className="mt-1 text-sm text-[#0f172a]">
                                  {selectedStudent !== null &&
                                    students[selectedStudent].id_number}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-[#94a3b8]">Status</p>
                                <p className="mt-1 text-sm text-[#0f172a]">
                                  {selectedStudent !== null &&
                                    students[selectedStudent].status}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-[#94a3b8]">Programme</p>
                                <p className="mt-1 text-sm text-[#0f172a]">
                                  {selectedStudent !== null &&
                                    students[selectedStudent].programme_name}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-[#94a3b8]">Intake</p>
                                <p className="mt-1 text-sm text-[#0f172a]">
                                  {selectedStudent !== null &&
                                    students[selectedStudent].intake_name}
                                </p>
                              </div>

                            </div>

                          </div>


                          {/* Actions */}
                          <div className="absolute bottom-8 left-8 right-8 border-t border-[#e9eef3] pt-5">

                            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">
                              Actions
                            </p>

                            {selectedStudent !== null &&
                            students[selectedStudent].status === "deregistered" ? (

                              <div className="rounded-xl border border-[#e9eef3] bg-[#f8fafc] px-4 py-3">
                                <p className="text-sm font-medium text-[#0f172a]">
                                  This student has been deregistered
                                </p>
                              </div>

                            ) : (

                              <button
                                type="button"
                                disabled={busy}
                                onClick={() => {
                                  if (selectedStudent !== null) {
                                    deregisterStudent(
                                      students[selectedStudent].id_number
                                    );
                                  }
                                }}
                                className="w-full rounded-xl border border-[#d1d9e6] px-3 py-2.5 text-sm font-medium text-[#1e293b] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {busy ? "Working…" : "Deregister student"}
                              </button>

                            )}

                          </div>

                        </div>

                      </aside>
                    </>
                  )}

                </div>

              </div>

            </motion.div>
          )}

          {navstep === 2 && (
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

                <div className="space-y-2">
                  <h1 className="text-2xl font-medium tracking-tight text-[#0f172a]">
                    Programmes
                  </h1>
                  <p className="text-sm leading-6 text-[#64748b]">
                    Academic programmes offered by the institution.
                  </p>
                </div>

              </div>


              {/* Table */}
              <div className="mt-10 rounded-2xl border border-[#e6edf5] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.02)]">

                <div className="overflow-hidden rounded-2xl">

                  <div className="overflow-hidden rounded-2xl bg-white">

                    <div className="grid grid-cols-[1.8fr_1.4fr_1.2fr_1.6fr] gap-8 border-b border-[#e2e8f0] bg-[#f8fafc] px-6 py-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Programme name</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Programme code</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Duration</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Department</p>
                    </div>

                    {filteredProgrammes.map((programme) => {

                      const programmeIndex = programmes.indexOf(programme);

                      return (
                        <button
                          key={programme.programme_id}
                          type="button"
                          onClick={() => {
                            setSelectedProgramme(programmeIndex);
                            setSidebarOpen(true);
                          }}
                          className="grid w-full grid-cols-[1.8fr_1.4fr_1.2fr_1.6fr] items-center gap-8 border-b border-[#edf2f7] px-6 py-6 text-left transition-colors hover:bg-[#fafcff] last:border-b-0"
                        >
                          <p className="text-sm font-medium text-[#0f172a]">
                            {programme.programme_name}
                          </p>

                          <p className="text-sm text-[#1e293b]">
                            {programme.programme_code}
                          </p>

                          <p className="text-sm text-[#1e293b]">
                            {programme.duration_years} years
                          </p>

                          <p className="text-sm text-[#1e293b]">
                            {programme.department_name}
                          </p>
                        </button>
                      );
                    })}

                    {filteredProgrammes.length === 0 && (
                      <div className="px-6 py-12 text-center">
                        <p className="text-sm text-[#64748b]">No programmes found.</p>
                      </div>
                    )}

                  </div>


                  {/* Sidebar */}
                  {sidebarOpen && selectedProgramme !== null && (
                    <>
                      <div
                        className="fixed inset-0 z-40 bg-black/20"
                        onClick={closeSidebar}
                      />
                      <aside className="fixed right-0 top-0 z-50 h-screen w-[520px] border-l border-[#e9eef3] bg-white p-8">

                        <button
                          type="button"
                          onClick={closeSidebar}
                          className="text-sm text-[#64748b] hover:text-[#0f172a]"
                        >
                          Close
                        </button>

                        <div className="mt-8">

                          {/* Header */}
                          <div className="border-b border-[#e9eef3] pb-6">
                            <p className="text-xl font-medium text-[#0f172a]">
                              {programmes[selectedProgramme].programme_name}
                            </p>

                            <p className="mt-2 text-sm text-[#64748b]">
                              {programmes[selectedProgramme].programme_code}
                              {" · "}
                              {programmes[selectedProgramme].department_name}
                            </p>
                          </div>

                          {/* Tabs */}
                          <div className="mt-6 flex gap-1 border-b border-[#e9eef3]">

                            <button
                              type="button"
                              onClick={() => setProgrammeNavStep(0)}
                              className={
                                programmenavstep === 0
                                  ? "border-b-2 border-[#0f172a] px-3 pb-3 text-sm font-medium text-[#0f172a]"
                                  : "border-b-2 border-transparent px-3 pb-3 text-sm font-medium text-[#64748b] hover:text-[#0f172a]"
                              }
                            >
                              Details
                            </button>

                            <button
                              type="button"
                              onClick={() => setProgrammeNavStep(1)}
                              className={
                                programmenavstep === 1
                                  ? "border-b-2 border-[#0f172a] px-3 pb-3 text-sm font-medium text-[#0f172a]"
                                  : "border-b-2 border-transparent px-3 pb-3 text-sm font-medium text-[#64748b] hover:text-[#0f172a]"
                              }
                            >
                              Modules
                            </button>

                            <button
                              type="button"
                              onClick={() => setProgrammeNavStep(2)}
                              className={
                                programmenavstep === 2
                                  ? "border-b-2 border-[#0f172a] px-3 pb-3 text-sm font-medium text-[#0f172a]"
                                  : "border-b-2 border-transparent px-3 pb-3 text-sm font-medium text-[#64748b] hover:text-[#0f172a]"
                              }
                            >
                              Intake
                            </button>

                            <button
                              type="button"
                              onClick={() => setProgrammeNavStep(3)}
                              className={
                                programmenavstep === 3
                                  ? "border-b-2 border-[#0f172a] px-3 pb-3 text-sm font-medium text-[#0f172a]"
                                  : "border-b-2 border-transparent px-3 pb-3 text-sm font-medium text-[#64748b] hover:text-[#0f172a]"
                              }
                            >
                              Lecturers
                            </button>

                          </div>


                          {programmenavstep === 0 && (

                            <div>

                              {/* Details */}
                              <div className="mt-6">

                                <p className="text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">
                                  Programme details
                                </p>

                                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5">

                                  <div>
                                    <p className="text-xs text-[#94a3b8]">Programme Code</p>
                                    <p className="mt-1 text-sm text-[#0f172a]">
                                      {programmes[selectedProgramme].programme_code}
                                    </p>
                                  </div>

                                  <div>
                                    <p className="text-xs text-[#94a3b8]">Duration</p>
                                    <p className="mt-1 text-sm text-[#0f172a]">
                                      {programmes[selectedProgramme].duration_years} years
                                    </p>
                                  </div>

                                  <div>
                                    <p className="text-xs text-[#94a3b8]">Department</p>
                                    <p className="mt-1 text-sm text-[#0f172a]">
                                      {programmes[selectedProgramme].department_name}
                                    </p>
                                  </div>

                                  <div>
                                    <p className="text-xs text-[#94a3b8]">Entry requirements</p>
                                    <p className="mt-1 text-sm text-[#0f172a]">
                                      NQF Level 4 (Matric) or equivalent
                                    </p>
                                  </div>

                                </div>

                              </div>

                              {editingProgramme && (
                                <div className="mt-6 space-y-3 rounded-xl border border-[#e9eef3] p-4">

                                  <div>
                                    <input
                                      type="text"
                                      placeholder="Programme name"
                                      value={editProgrammeName}
                                      onChange={(e) => { setEditProgrammeName(e.target.value); clearError("editProgrammeName"); }}
                                      className={inputClass("editProgrammeName")}
                                    />
                                    {formErrors.editProgrammeName && (
                                      <p className="mt-1 text-xs text-[#ef4444]">{formErrors.editProgrammeName}</p>
                                    )}
                                  </div>

                                  <div>
                                    <input
                                      type="text"
                                      placeholder="Programme code"
                                      value={editProgrammeCode}
                                      onChange={(e) => { setEditProgrammeCode(e.target.value); clearError("editProgrammeCode"); }}
                                      className={inputClass("editProgrammeCode")}
                                    />
                                    {formErrors.editProgrammeCode && (
                                      <p className="mt-1 text-xs text-[#ef4444]">{formErrors.editProgrammeCode}</p>
                                    )}
                                  </div>

                                  <div>
                                    <input
                                      type="number"
                                      placeholder="Duration (years)"
                                      value={editProgrammeDuration}
                                      onChange={(e) => { setEditProgrammeDuration(e.target.value); clearError("editProgrammeDuration"); }}
                                      className={inputClass("editProgrammeDuration")}
                                    />
                                    {formErrors.editProgrammeDuration && (
                                      <p className="mt-1 text-xs text-[#ef4444]">{formErrors.editProgrammeDuration}</p>
                                    )}
                                  </div>

                                  <div>
                                    <select
                                      value={editProgrammeDepartmentId}
                                      onChange={(e) => { setEditProgrammeDepartmentId(e.target.value); clearError("editProgrammeDepartmentId"); }}
                                      className={inputClass("editProgrammeDepartmentId")}
                                    >
                                      <option value="">Select a department</option>
                                      {departments.map((department) => (
                                        <option key={department.department_id} value={department.department_id}>
                                          {department.department_name}
                                        </option>
                                      ))}
                                    </select>
                                    {formErrors.editProgrammeDepartmentId && (
                                      <p className="mt-1 text-xs text-[#ef4444]">{formErrors.editProgrammeDepartmentId}</p>
                                    )}
                                  </div>

                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      disabled={busy}
                                      onClick={updateProgramme}
                                      className="flex-1 rounded-lg bg-[#0f172a] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#1e293b] disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                      {busy ? "Saving…" : "Save changes"}
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => { setEditingProgramme(false); setFormErrors({}); }}
                                      className="flex-1 rounded-lg border border-[#d1d9e6] px-3 py-2 text-sm font-medium text-[#1e293b] hover:bg-[#f8fafc]"
                                    >
                                      Cancel
                                    </button>
                                  </div>

                                </div>
                              )}

                              {!editingProgramme && (
                                <div className="absolute bottom-8 left-8 right-8 border-t border-[#e9eef3] pt-5">
                                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">
                                    Actions
                                  </p>

                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEditProgrammeName(programmes[selectedProgramme].programme_name);
                                        setEditProgrammeCode(programmes[selectedProgramme].programme_code);
                                        setEditProgrammeDuration(String(programmes[selectedProgramme].duration_years));
                                        setEditProgrammeDepartmentId(String(programmes[selectedProgramme].department_id));
                                        setEditingProgramme(true);
                                      }}
                                      className="flex-1 rounded-xl border border-[#d1d9e6] px-3 py-2.5 text-sm font-medium text-[#1e293b] hover:bg-[#f8fafc]"
                                    >
                                      Edit programme
                                    </button>

                                    <button
                                      type="button"
                                      disabled={busy}
                                      onClick={() => deleteProgramme(programmes[selectedProgramme].programme_id)}
                                      className="flex-1 rounded-xl border border-[#fecaca] px-3 py-2.5 text-sm font-medium text-[#991b1b] transition hover:bg-[#fef2f2] disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                      Delete programme
                                    </button>
                                  </div>
                                </div>
                              )}

                            </div>

                          )}

                          {programmenavstep === 1 && (

                            <div>

                              <div className="mt-6">
                                {modules
                                  .filter(
                                    (module) =>
                                      module.programme_id ===
                                      programmes[selectedProgramme].programme_id
                                  )
                                  .map((module) => (
                                    <div
                                      key={module.module_id}
                                      className="grid grid-cols-[80px_1fr_auto_auto] items-center gap-3 border-b border-[#edf2f7] py-3"
                                    >
                                      <p className="text-sm font-medium text-[#0f172a]">
                                        {module.module_code}
                                      </p>

                                      <p className="text-sm text-[#1e293b]">
                                        {module.module_name}
                                      </p>

                                      {module.lecturer_id ? (
                                        <p className="text-xs text-[#64748b]">
                                          {module.lecturer_first_name} {module.lecturer_last_name}
                                        </p>
                                      ) : (
                                        <select
                                          defaultValue=""
                                          disabled={busy}
                                          onChange={(e) => {
                                            if (e.target.value) {
                                              assignLecturerToModule(module.module_id, e.target.value);
                                            }
                                          }}
                                          className="rounded-md border border-[#d1d9e6] px-2 py-1 text-xs outline-none focus:border-[#94a3b8] disabled:opacity-50"
                                        >
                                          <option value="">Unassigned — assign</option>
                                          {lecturers.map((lecturer) => (
                                            <option key={lecturer.lecturer_id} value={lecturer.lecturer_id}>
                                              {lecturer.lecturer_first_name} {lecturer.lecturer_last_name}
                                            </option>
                                          ))}
                                        </select>
                                      )}

                                      <button
                                        type="button"
                                        disabled={busy}
                                        onClick={() => deleteModule(module.module_id)}
                                        className="text-xs font-medium text-[#991b1b] transition hover:text-[#7f1d1d] disabled:opacity-50"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  ))}
                              </div>

                              {showAddModule && (
                                <div className="mt-4 space-y-3 rounded-xl border border-[#e9eef3] p-4">

                                  <div>
                                    <input
                                      type="text"
                                      placeholder="Module code (e.g. CSC101)"
                                      value={newModuleCode}
                                      onChange={(e) => { setNewModuleCode(e.target.value); clearError("newModuleCode"); }}
                                      className={inputClass("newModuleCode")}
                                    />
                                    {formErrors.newModuleCode && (
                                      <p className="mt-1 text-xs text-[#ef4444]">{formErrors.newModuleCode}</p>
                                    )}
                                  </div>

                                  <div>
                                    <input
                                      type="text"
                                      placeholder="Module name"
                                      value={newModuleName}
                                      onChange={(e) => { setNewModuleName(e.target.value); clearError("newModuleName"); }}
                                      className={inputClass("newModuleName")}
                                    />
                                    {formErrors.newModuleName && (
                                      <p className="mt-1 text-xs text-[#ef4444]">{formErrors.newModuleName}</p>
                                    )}
                                  </div>

                                  <div>
                                    <select
                                      value={newModuleLecturerId}
                                      onChange={(e) => { setNewModuleLecturerId(e.target.value); clearError("newModuleLecturerId"); }}
                                      className={inputClass("newModuleLecturerId")}
                                    >
                                      <option value="">Select a lecturer</option>
                                      {lecturers.map((lecturer) => (
                                        <option key={lecturer.lecturer_id} value={lecturer.lecturer_id}>
                                          {lecturer.lecturer_first_name} {lecturer.lecturer_last_name}
                                        </option>
                                      ))}
                                    </select>
                                    {formErrors.newModuleLecturerId && (
                                      <p className="mt-1 text-xs text-[#ef4444]">{formErrors.newModuleLecturerId}</p>
                                    )}
                                  </div>

                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      disabled={busy}
                                      onClick={addModule}
                                      className="flex-1 rounded-lg bg-[#0f172a] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#1e293b] disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                      {busy ? "Saving…" : "Save module"}
                                    </button>

                                    <button
                                      type="button"
                                      onClick={resetForms}
                                      className="flex-1 rounded-lg border border-[#d1d9e6] px-3 py-2 text-sm font-medium text-[#1e293b] hover:bg-[#f8fafc]"
                                    >
                                      Cancel
                                    </button>
                                  </div>

                                </div>
                              )}


                              {!showAddModule && (
                                <div className="absolute bottom-8 left-8 right-8 border-t border-[#e9eef3] pt-5">
                                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">
                                    Actions
                                  </p>
                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() => setShowAddModule(true)}
                                      className="flex-1 rounded-xl border border-[#d1d9e6] px-3 py-2.5 text-sm font-medium text-[#1e293b] hover:bg-[#f8fafc]"
                                    >
                                      Add Module
                                    </button>
                                  </div>
                                </div>
                              )}

                            </div>

                          )}

                          {programmenavstep === 2 && (
                            <div>

                              <div className="mt-6">

                                {intakes.map((intake) => (
                                  <div
                                    key={intake.intake_id}
                                    className="grid grid-cols-[1fr_1fr_auto] items-center border-b border-[#edf2f7] py-3"
                                  >
                                    <p className="text-sm font-medium text-[#0f172a]">
                                      {intake.intake_name}
                                    </p>

                                    <p className="text-sm text-[#1e293b]">
                                      {intake.start_date}
                                    </p>

                                    <button
                                      type="button"
                                      disabled={busy}
                                      onClick={() => deleteIntake(intake.intake_id)}
                                      className="text-xs font-medium text-[#991b1b] transition hover:text-[#7f1d1d] disabled:opacity-50"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                ))}

                                {showAddIntake && (
                                  <div className="mt-4 space-y-3 rounded-xl border border-[#e9eef3] p-4">

                                    <div>
                                      <input
                                        type="text"
                                        placeholder="Intake name (e.g. Jan 2027)"
                                        value={newIntakeName}
                                        onChange={(e) => { setNewIntakeName(e.target.value); clearError("newIntakeName"); }}
                                        className={inputClass("newIntakeName")}
                                      />
                                      {formErrors.newIntakeName && (
                                        <p className="mt-1 text-xs text-[#ef4444]">{formErrors.newIntakeName}</p>
                                      )}
                                    </div>

                                    <div>
                                      <input
                                        type="date"
                                        value={newIntakeStartDate}
                                        onChange={(e) => { setNewIntakeStartDate(e.target.value); clearError("newIntakeStartDate"); }}
                                        className={inputClass("newIntakeStartDate")}
                                      />
                                      {formErrors.newIntakeStartDate && (
                                        <p className="mt-1 text-xs text-[#ef4444]">{formErrors.newIntakeStartDate}</p>
                                      )}
                                    </div>

                                    <div className="flex gap-2">
                                      <button
                                        type="button"
                                        disabled={busy}
                                        onClick={addIntake}
                                        className="flex-1 rounded-lg bg-[#0f172a] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#1e293b] disabled:cursor-not-allowed disabled:opacity-50"
                                      >
                                        {busy ? "Saving…" : "Save intake"}
                                      </button>

                                      <button
                                        type="button"
                                        onClick={resetForms}
                                        className="flex-1 rounded-lg border border-[#d1d9e6] px-3 py-2 text-sm font-medium text-[#1e293b] hover:bg-[#f8fafc]"
                                      >
                                        Cancel
                                      </button>
                                    </div>

                                  </div>
                                )}

                              </div>

                              {!showAddIntake && (
                                <div className="absolute bottom-8 left-8 right-8 border-t border-[#e9eef3] pt-5">

                                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">
                                    Actions
                                  </p>

                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() => setShowAddIntake(true)}
                                      className="flex-1 rounded-xl border border-[#d1d9e6] px-3 py-2.5 text-sm font-medium text-[#1e293b] hover:bg-[#f8fafc]"
                                    >
                                      Add Intake
                                    </button>
                                  </div>

                                </div>
                              )}

                            </div>
                          )}

                          {programmenavstep === 3 && (
                            <div className="mt-6">
                              {lecturers
                                .filter((lecturer) => lecturer.department_id === programmes[selectedProgramme].department_id)
                                .map((lecturer) => (
                                  <div
                                    key={lecturer.lecturer_id}
                                    className="grid grid-cols-[1fr_1fr] items-center border-b border-[#edf2f7] py-3"
                                  >
                                    <p className="text-sm font-medium text-[#0f172a]">
                                      {lecturer.lecturer_first_name} {lecturer.lecturer_last_name}
                                    </p>
                                    <p className="text-sm text-[#64748b]">{lecturer.staff_number}</p>
                                  </div>
                                ))}
                              <p className="mt-4 text-xs text-[#94a3b8]">
                                Lecturers are managed under Departments.
                              </p>
                            </div>
                          )}

                        </div>

                      </aside>
                    </>
                  )}

                </div>

              </div>

            </motion.div>
          )}

          {navstep === 3 && (
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

                <div className="space-y-2">
                  <h1 className="text-2xl font-medium tracking-tight text-[#0f172a]">
                    Departments
                  </h1>
                  <p className="text-sm leading-6 text-[#64748b]">
                    Academic departments and their staff.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddDepartment(true)}
                  className="rounded-lg border border-[#0f172a] bg-[#0f172a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1e293b]"
                >
                  Add a department
                </button>

              </div>


              {showAddDepartment && (
                <div className="mt-6 space-y-3 rounded-xl border border-[#e9eef3] p-4">

                  <div>
                    <input
                      type="text"
                      placeholder="Department name"
                      value={newDepartmentName}
                      onChange={(e) => { setNewDepartmentName(e.target.value); clearError("newDepartmentName"); }}
                      className={inputClass("newDepartmentName")}
                    />
                    {formErrors.newDepartmentName && (
                      <p className="mt-1 text-xs text-[#ef4444]">{formErrors.newDepartmentName}</p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={addDepartment}
                      className="flex-1 rounded-lg bg-[#0f172a] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#1e293b] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {busy ? "Saving…" : "Save department"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowAddDepartment(false);
                        setNewDepartmentName("");
                        setFormErrors({});
                      }}
                      className="flex-1 rounded-lg border border-[#d1d9e6] px-3 py-2 text-sm font-medium text-[#1e293b] hover:bg-[#f8fafc]"
                    >
                      Cancel
                    </button>
                  </div>

                </div>
              )}


              {/* Table */}
              <div className="mt-10 rounded-2xl border border-[#e6edf5] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.02)]">

                <div className="overflow-hidden rounded-2xl">

                  <div className="overflow-hidden rounded-2xl bg-white">

                    <div className="grid grid-cols-[1.8fr_1.2fr_1.2fr] gap-8 border-b border-[#e2e8f0] bg-[#f8fafc] px-6 py-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Department name</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Programmes</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Lecturers</p>
                    </div>

                    {departments.map((department) => {

                      const departmentIndex = departments.indexOf(department);

                      const programmeCount = programmes.filter(
                        (p) => p.department_id === department.department_id
                      ).length;

                      const lecturerCount = lecturers.filter(
                        (l) => l.department_id === department.department_id
                      ).length;

                      return (
                        <button
                          key={department.department_id}
                          type="button"
                          onClick={() => {
                            setSelectedDepartment(departmentIndex);
                            setDepartmentNavStep(0);
                            setSidebarOpen(true);
                          }}
                          className="grid w-full grid-cols-[1.8fr_1.2fr_1.2fr] items-center gap-8 border-b border-[#edf2f7] px-6 py-6 text-left transition-colors hover:bg-[#fafcff] last:border-b-0"
                        >
                          <p className="text-sm font-medium text-[#0f172a]">
                            {department.department_name}
                          </p>

                          <p className="text-sm text-[#1e293b]">
                            {programmeCount}
                          </p>

                          <p className="text-sm text-[#1e293b]">
                            {lecturerCount}
                          </p>
                        </button>
                      );
                    })}

                    {departments.length === 0 && (
                      <div className="px-6 py-12 text-center">
                        <p className="text-sm text-[#64748b]">No departments found.</p>
                      </div>
                    )}

                  </div>


                  {/* Sidebar */}
                  {sidebarOpen && selectedDepartment !== null && (
                    <>
                      <div
                        className="fixed inset-0 z-40 bg-black/20"
                        onClick={closeSidebar}
                      />
                      <aside className="fixed right-0 top-0 z-50 h-screen w-[520px] border-l border-[#e9eef3] bg-white p-8">

                        <button
                          type="button"
                          onClick={closeSidebar}
                          className="text-sm text-[#64748b] hover:text-[#0f172a]"
                        >
                          Close
                        </button>

                        <div className="mt-8">

                          {/* Header */}
                          <div className="border-b border-[#e9eef3] pb-6">
                            <p className="text-xl font-medium text-[#0f172a]">
                              {departments[selectedDepartment].department_name}
                            </p>
                          </div>

                          {/* Tabs */}
                          <div className="mt-6 flex gap-1 border-b border-[#e9eef3]">

                            <button
                              type="button"
                              onClick={() => setDepartmentNavStep(0)}
                              className={
                                departmentnavstep === 0
                                  ? "border-b-2 border-[#0f172a] px-3 pb-3 text-sm font-medium text-[#0f172a]"
                                  : "border-b-2 border-transparent px-3 pb-3 text-sm font-medium text-[#64748b] hover:text-[#0f172a]"
                              }
                            >
                              Programmes
                            </button>

                            <button
                              type="button"
                              onClick={() => setDepartmentNavStep(1)}
                              className={
                                departmentnavstep === 1
                                  ? "border-b-2 border-[#0f172a] px-3 pb-3 text-sm font-medium text-[#0f172a]"
                                  : "border-b-2 border-transparent px-3 pb-3 text-sm font-medium text-[#64748b] hover:text-[#0f172a]"
                              }
                            >
                              Lecturers
                            </button>

                          </div>

                          {departmentnavstep === 0 && (
                            <div>

                              <div className="mt-6">
                                {programmes
                                  .filter(
                                    (p) =>
                                      p.department_id ===
                                      departments[selectedDepartment].department_id
                                  )
                                  .map((programme) => (
                                    <div
                                      key={programme.programme_id}
                                      className="grid grid-cols-[1fr_1fr] items-center border-b border-[#edf2f7] py-3"
                                    >
                                      <p className="text-sm font-medium text-[#0f172a]">
                                        {programme.programme_name}
                                      </p>

                                      <p className="text-sm text-[#64748b]">
                                        {programme.programme_code}
                                      </p>
                                    </div>
                                  ))}

                                {showAddProgramme && (
                                  <div className="mt-4 space-y-3 rounded-xl border border-[#e9eef3] p-4">

                                    <div>
                                      <input
                                        type="text"
                                        placeholder="Programme name"
                                        value={newProgrammeName}
                                        onChange={(e) => { setNewProgrammeName(e.target.value); clearError("newProgrammeName"); }}
                                        className={inputClass("newProgrammeName")}
                                      />
                                      {formErrors.newProgrammeName && (
                                        <p className="mt-1 text-xs text-[#ef4444]">{formErrors.newProgrammeName}</p>
                                      )}
                                    </div>

                                    <div>
                                      <input
                                        type="text"
                                        placeholder="Programme code (e.g. BSCIT)"
                                        value={newProgrammeCode}
                                        onChange={(e) => { setNewProgrammeCode(e.target.value); clearError("newProgrammeCode"); }}
                                        className={inputClass("newProgrammeCode")}
                                      />
                                      {formErrors.newProgrammeCode && (
                                        <p className="mt-1 text-xs text-[#ef4444]">{formErrors.newProgrammeCode}</p>
                                      )}
                                    </div>

                                    <div>
                                      <input
                                        type="number"
                                        placeholder="Duration (years)"
                                        value={newProgrammeDuration}
                                        onChange={(e) => { setNewProgrammeDuration(e.target.value); clearError("newProgrammeDuration"); }}
                                        className={inputClass("newProgrammeDuration")}
                                      />
                                      {formErrors.newProgrammeDuration && (
                                        <p className="mt-1 text-xs text-[#ef4444]">{formErrors.newProgrammeDuration}</p>
                                      )}
                                    </div>

                                    <div className="flex gap-2">
                                      <button
                                        type="button"
                                        disabled={busy}
                                        onClick={addProgramme}
                                        className="flex-1 rounded-lg bg-[#0f172a] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#1e293b] disabled:cursor-not-allowed disabled:opacity-50"
                                      >
                                        {busy ? "Saving…" : "Save programme"}
                                      </button>

                                      <button
                                        type="button"
                                        onClick={resetForms}
                                        className="flex-1 rounded-lg border border-[#d1d9e6] px-3 py-2 text-sm font-medium text-[#1e293b] hover:bg-[#f8fafc]"
                                      >
                                        Cancel
                                      </button>
                                    </div>

                                  </div>
                                )}
                              </div>

                              <div className="absolute bottom-8 left-8 right-8 border-t border-[#e9eef3] pt-5">

                                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">
                                  {editingDepartment ? "Edit department" : "Actions"}
                                </p>

                                {editingDepartment ? (
                                  <div className="space-y-3">
                                    <div>
                                      <input
                                        type="text"
                                        placeholder="Department name"
                                        value={editDepartmentName}
                                        onChange={(e) => { setEditDepartmentName(e.target.value); clearError("editDepartmentName"); }}
                                        className={inputClass("editDepartmentName")}
                                      />
                                      {formErrors.editDepartmentName && (
                                        <p className="mt-1 text-xs text-[#ef4444]">{formErrors.editDepartmentName}</p>
                                      )}
                                    </div>
                                    <div className="flex gap-2">
                                      <button
                                        type="button"
                                        disabled={busy}
                                        onClick={updateDepartment}
                                        className="flex-1 rounded-lg bg-[#0f172a] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#1e293b] disabled:cursor-not-allowed disabled:opacity-50"
                                      >
                                        {busy ? "Saving…" : "Save changes"}
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => { setEditingDepartment(false); setFormErrors({}); }}
                                        className="flex-1 rounded-lg border border-[#d1d9e6] px-3 py-2 text-sm font-medium text-[#1e293b] hover:bg-[#f8fafc]"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : showAddProgramme ? null : (
                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() => setShowAddProgramme(true)}
                                      className="flex-1 rounded-xl border border-[#d1d9e6] px-3 py-2.5 text-sm font-medium text-[#1e293b] hover:bg-[#f8fafc]"
                                    >
                                      Add programme
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEditDepartmentName(departments[selectedDepartment].department_name);
                                        setEditingDepartment(true);
                                      }}
                                      className="flex-1 rounded-xl border border-[#d1d9e6] px-3 py-2.5 text-sm font-medium text-[#1e293b] hover:bg-[#f8fafc]"
                                    >
                                      Edit department
                                    </button>
                                    <button
                                      type="button"
                                      disabled={busy}
                                      onClick={() => deleteDepartment(departments[selectedDepartment].department_id)}
                                      className="flex-1 rounded-xl border border-[#fecaca] px-3 py-2.5 text-sm font-medium text-[#991b1b] transition hover:bg-[#fef2f2] disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                      Delete department
                                    </button>
                                  </div>
                                )}

                              </div>

                            </div>
                          )}

                          {departmentnavstep === 1 && (
                            <div>

                              <div className="mt-6">
                                {lecturers
                                  .filter(
                                    (l) =>
                                      l.department_id ===
                                      departments[selectedDepartment].department_id
                                  )
                                  .map((lecturer) => {

                                    const lecturerIndex = lecturers.indexOf(lecturer);

                                    return (
                                      <div
                                        key={lecturer.lecturer_id}
                                        className="grid grid-cols-[1fr_1fr_auto_auto] items-center gap-3 border-b border-[#edf2f7] py-3"
                                      >
                                        <p className="text-sm font-medium text-[#0f172a]">
                                          {lecturer.lecturer_first_name}{" "}
                                          {lecturer.lecturer_last_name}
                                        </p>

                                        <p className="text-sm text-[#64748b]">
                                          {lecturer.staff_number}
                                        </p>

                                        <button
                                          type="button"
                                          onClick={() => {
                                            setSelectedLecturer(lecturerIndex);
                                            setEditLecturerFirstName(lecturer.lecturer_first_name || "");
                                            setEditLecturerLastName(lecturer.lecturer_last_name || "");
                                            setEditLecturerStaffNumber(lecturer.staff_number || "");
                                            setEditLecturerEmail(lecturer.email || "");
                                            setEditLecturerPhone(lecturer.phone || "");
                                            setEditingLecturer(true);
                                            setFormErrors({});
                                          }}
                                          className="text-xs font-medium text-[#64748b] hover:text-[#0f172a]"
                                        >
                                          Edit
                                        </button>

                                        <button
                                          type="button"
                                          disabled={busy}
                                          onClick={() => deleteLecturer(lecturer.lecturer_id)}
                                          className="text-xs font-medium text-[#991b1b] transition hover:text-[#7f1d1d] disabled:opacity-50"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    );
                                  })}

                                {showAddLecturer && (
                                  <div className="mt-4 space-y-3 rounded-xl border border-[#e9eef3] p-4">

                                    <div>
                                      <input
                                        type="text"
                                        placeholder="First name"
                                        value={newLecturerFirstName}
                                        onChange={(e) => { setNewLecturerFirstName(e.target.value); clearError("newLecturerFirstName"); }}
                                        className={inputClass("newLecturerFirstName")}
                                      />
                                      {formErrors.newLecturerFirstName && (
                                        <p className="mt-1 text-xs text-[#ef4444]">{formErrors.newLecturerFirstName}</p>
                                      )}
                                    </div>

                                    <div>
                                      <input
                                        type="text"
                                        placeholder="Last name"
                                        value={newLecturerLastName}
                                        onChange={(e) => { setNewLecturerLastName(e.target.value); clearError("newLecturerLastName"); }}
                                        className={inputClass("newLecturerLastName")}
                                      />
                                      {formErrors.newLecturerLastName && (
                                        <p className="mt-1 text-xs text-[#ef4444]">{formErrors.newLecturerLastName}</p>
                                      )}
                                    </div>

                                    <div>
                                      <input
                                        type="text"
                                        placeholder="Staff number"
                                        value={newLecturerStaffNumber}
                                        onChange={(e) => { setNewLecturerStaffNumber(e.target.value); clearError("newLecturerStaffNumber"); }}
                                        className={inputClass("newLecturerStaffNumber")}
                                      />
                                      {formErrors.newLecturerStaffNumber && (
                                        <p className="mt-1 text-xs text-[#ef4444]">{formErrors.newLecturerStaffNumber}</p>
                                      )}
                                    </div>

                                    <div>
                                      <input
                                        type="email"
                                        placeholder="Email"
                                        value={newLecturerEmail}
                                        onChange={(e) => { setNewLecturerEmail(e.target.value); clearError("newLecturerEmail"); }}
                                        className={inputClass("newLecturerEmail")}
                                      />
                                      {formErrors.newLecturerEmail && (
                                        <p className="mt-1 text-xs text-[#ef4444]">{formErrors.newLecturerEmail}</p>
                                      )}
                                    </div>

                                    <div>
                                      <input
                                        type="text"
                                        placeholder="Phone"
                                        value={newLecturerPhone}
                                        onChange={(e) => setNewLecturerPhone(e.target.value)}
                                        className={inputClass("newLecturerPhone")}
                                      />
                                    </div>

                                    <div className="flex gap-2">
                                      <button
                                        type="button"
                                        disabled={busy}
                                        onClick={addLecturer}
                                        className="flex-1 rounded-lg bg-[#0f172a] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#1e293b] disabled:cursor-not-allowed disabled:opacity-50"
                                      >
                                        {busy ? "Saving…" : "Save lecturer"}
                                      </button>

                                      <button
                                        type="button"
                                        onClick={resetForms}
                                        className="flex-1 rounded-lg border border-[#d1d9e6] px-3 py-2 text-sm font-medium text-[#1e293b] hover:bg-[#f8fafc]"
                                      >
                                        Cancel
                                      </button>
                                    </div>

                                  </div>
                                )}

                                {editingLecturer && (
                                  <div className="mt-4 space-y-3 rounded-xl border border-[#e9eef3] p-4">

                                    <div>
                                      <input
                                        type="text"
                                        placeholder="First name"
                                        value={editLecturerFirstName}
                                        onChange={(e) => { setEditLecturerFirstName(e.target.value); clearError("editLecturerFirstName"); }}
                                        className={inputClass("editLecturerFirstName")}
                                      />
                                      {formErrors.editLecturerFirstName && (
                                        <p className="mt-1 text-xs text-[#ef4444]">{formErrors.editLecturerFirstName}</p>
                                      )}
                                    </div>

                                    <div>
                                      <input
                                        type="text"
                                        placeholder="Last name"
                                        value={editLecturerLastName}
                                        onChange={(e) => { setEditLecturerLastName(e.target.value); clearError("editLecturerLastName"); }}
                                        className={inputClass("editLecturerLastName")}
                                      />
                                      {formErrors.editLecturerLastName && (
                                        <p className="mt-1 text-xs text-[#ef4444]">{formErrors.editLecturerLastName}</p>
                                      )}
                                    </div>

                                    <div>
                                      <input
                                        type="text"
                                        placeholder="Staff number"
                                        value={editLecturerStaffNumber}
                                        onChange={(e) => { setEditLecturerStaffNumber(e.target.value); clearError("editLecturerStaffNumber"); }}
                                        className={inputClass("editLecturerStaffNumber")}
                                      />
                                      {formErrors.editLecturerStaffNumber && (
                                        <p className="mt-1 text-xs text-[#ef4444]">{formErrors.editLecturerStaffNumber}</p>
                                      )}
                                    </div>

                                    <div>
                                      <input
                                        type="email"
                                        placeholder="Email"
                                        value={editLecturerEmail}
                                        onChange={(e) => { setEditLecturerEmail(e.target.value); clearError("editLecturerEmail"); }}
                                        className={inputClass("editLecturerEmail")}
                                      />
                                      {formErrors.editLecturerEmail && (
                                        <p className="mt-1 text-xs text-[#ef4444]">{formErrors.editLecturerEmail}</p>
                                      )}
                                    </div>

                                    <div>
                                      <input
                                        type="text"
                                        placeholder="Phone"
                                        value={editLecturerPhone}
                                        onChange={(e) => setEditLecturerPhone(e.target.value)}
                                        className={inputClass("editLecturerPhone")}
                                      />
                                    </div>

                                    <div className="flex gap-2">
                                      <button
                                        type="button"
                                        disabled={busy}
                                        onClick={updateLecturer}
                                        className="flex-1 rounded-lg bg-[#0f172a] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#1e293b] disabled:cursor-not-allowed disabled:opacity-50"
                                      >
                                        {busy ? "Saving…" : "Save changes"}
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() => {
                                          setEditingLecturer(false);
                                          setSelectedLecturer(null);
                                          setFormErrors({});
                                        }}
                                        className="flex-1 rounded-lg border border-[#d1d9e6] px-3 py-2 text-sm font-medium text-[#1e293b] hover:bg-[#f8fafc]"
                                      >
                                        Cancel
                                      </button>
                                    </div>

                                  </div>
                                )}
                              </div>

                              {!showAddLecturer && !editingLecturer && (
                                <div className="absolute bottom-8 left-8 right-8 border-t border-[#e9eef3] pt-5">

                                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">
                                    Actions
                                  </p>

                                  <div className="flex gap-2">

                                    <button
                                      type="button"
                                      onClick={() => {
                                        setNewLecturerDepartmentId(String(departments[selectedDepartment].department_id));
                                        setShowAddLecturer(true);
                                      }}
                                      className="flex-1 rounded-xl border border-[#d1d9e6] px-3 py-2.5 text-sm font-medium text-[#1e293b] hover:bg-[#f8fafc]"
                                    >
                                      Add Lecturer
                                    </button>

                                  </div>

                                </div>
                              )}

                            </div>
                          )}

                        </div>

                      </aside>
                    </>
                  )}

                </div>

              </div>

            </motion.div>
          )}


          {/* ===================== REPORTS ===================== */}

          {navstep === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-end justify-between gap-6">
                <div className="space-y-2">
                  <h1 className="text-2xl font-medium tracking-tight text-[#0f172a]">
                    Applications Report
                  </h1>
                  <p className="text-sm leading-6 text-[#64748b]">
                    Overview of all 2026 application activity.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-[#64748b]">
                    Sort by
                  </label>
                  <select
                    value={reportSort.applications}
                    onChange={(e) => setSort("applications", e.target.value)}
                    className="rounded-lg border border-[#d1d9e6] bg-white px-3 py-2 text-sm text-[#1e293b] outline-none transition focus:border-[#94a3b8]"
                  >
                    <option value="default">Default</option>
                    <option value="name">Applicant (A–Z)</option>
                    <option value="programme">Programme (A–Z)</option>
                    <option value="popular">Most popular programme</option>
                    <option value="status">Status (A–Z)</option>
                  </select>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  { label: "Total applications", value: totalApplications, sub: "Applications received" },
                  { label: "Awaiting review", value: awaitingReview, sub: "Applications needing review" },
                  { label: "Accepted", value: acceptedApplications, sub: "Offers made to applicants" },
                  { label: "Waitlisted", value: waitlistedApplications, sub: "Applicants awaiting a place" },
                  { label: "Rejected", value: rejectedApplications, sub: "Applications not approved" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-[#e6edf5] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">{stat.label}</p>
                    <p className="mt-3 text-2xl font-bold tracking-tight text-[#0f172a]">{stat.value}</p>
                    <p className="mt-2 text-xs leading-5 text-[#64748b]">{stat.sub}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-2xl border border-[#e6edf5] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
                <div className="overflow-hidden rounded-2xl">
                  <div className="overflow-hidden rounded-2xl bg-white">
                    <div className="grid grid-cols-[1.6fr_1.7fr_1.3fr_1.1fr_1.2fr_1.1fr] gap-8 border-b border-[#e2e8f0] bg-[#f8fafc] px-6 py-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Applicant</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Programme</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Status</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Type</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Cohort</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Education</p>
                    </div>

                    {sortedApplications.slice(0, 6).map((application) => (
                      <div
                        key={application.id_number}
                        className="grid w-full grid-cols-[1.6fr_1.7fr_1.3fr_1.1fr_1.2fr_1.1fr] items-center gap-8 border-b border-[#edf2f7] px-6 py-6 text-left last:border-b-0"
                      >
                        <p className="text-sm font-medium text-[#0f172a]">{application.first_name} {application.last_name}</p>
                        <p className="text-sm text-[#1e293b]">{application.programme}</p>
                        <p className="text-sm text-[#1e293b]">{application.status}</p>
                        <p className="text-sm text-[#1e293b]">
                          {application.programme_type ? application.programme_type.charAt(0).toUpperCase() + application.programme_type.slice(1) : ""}
                        </p>
                        <p className="text-sm text-[#1e293b]">
                          {application.cohort_date ? new Date(application.cohort_date).toLocaleDateString("en-GB") : ""}
                        </p>
                        <p className="text-sm text-[#1e293b]">
                          {application.education ? application.education.charAt(0).toUpperCase() + application.education.slice(1) : ""}
                        </p>
                      </div>
                    ))}

                    {sortedApplications.length === 0 && (
                      <div className="px-6 py-12 text-center">
                        <p className="text-sm text-[#64748b]">No applications found.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3 px-4 pb-4">
                  <p className="mr-auto text-xs text-[#94a3b8]">
                    Showing {Math.min(6, sortedApplications.length)} out of {sortedApplications.length} applications
                  </p>
                  <button
                    onClick={() => { exportToCSV(sortedApplications, applicationColumns, "applications.csv"); showSuccess("CSV exported."); }}
                    className="rounded-lg border border-[#d1d9e6] px-4 py-2 text-sm font-medium text-[#1e293b] transition hover:border-[#b9c4d4] hover:text-[#0f172a]"
                  >
                    Export CSV
                  </button>
                  <button
                    onClick={() => { exportToPDF("Applications Report", sortedApplications, applicationColumns); }}
                    className="rounded-lg border border-[#d1d9e6] px-4 py-2 text-sm font-medium text-[#1e293b] transition hover:border-[#b9c4d4] hover:text-[#0f172a]"
                  >
                    Export PDF
                  </button>
                  <button
                    onClick={() => { printTable("Applications Report", sortedApplications, applicationColumns); }}
                    className="rounded-lg border border-[#d1d9e6] px-4 py-2 text-sm font-medium text-[#1e293b] transition hover:border-[#b9c4d4] hover:text-[#0f172a]"
                  >
                    Print
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {navstep === 5 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <div className="flex items-end justify-between gap-6">
                <div className="space-y-2">
                  <h1 className="text-2xl font-medium tracking-tight text-[#0f172a]">Students Report</h1>
                  <p className="text-sm leading-6 text-[#64748b]">Overview of all registered students.</p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-[#64748b]">Sort by</label>
                  <select
                    value={reportSort.students}
                    onChange={(e) => setSort("students", e.target.value)}
                    className="rounded-lg border border-[#d1d9e6] bg-white px-3 py-2 text-sm text-[#1e293b] outline-none transition focus:border-[#94a3b8]"
                  >
                    <option value="default">Default</option>
                    <option value="name">Student (A–Z)</option>
                    <option value="programme">Programme (A–Z)</option>
                    <option value="popular">Most popular programme</option>
                    <option value="intake">Intake (A–Z)</option>
                    <option value="status">Status (A–Z)</option>
                  </select>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Total students", value: totalStudents, sub: "Students on record" },
                  { label: "Active", value: activeStudents, sub: "Currently enrolled students" },
                  { label: "Suspended", value: suspendedStudents, sub: "Students on suspension" },
                  { label: "Deregistered", value: deregisteredStudents, sub: "Students no longer enrolled" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-[#e6edf5] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">{stat.label}</p>
                    <p className="mt-3 text-2xl font-bold tracking-tight text-[#0f172a]">{stat.value}</p>
                    <p className="mt-2 text-xs leading-5 text-[#64748b]">{stat.sub}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-2xl border border-[#e6edf5] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
                <div className="overflow-hidden rounded-2xl">
                  <div className="overflow-hidden rounded-2xl bg-white">
                    <div className="grid grid-cols-[1.6fr_1.7fr_1.3fr_1.2fr_1.2fr] gap-8 border-b border-[#e2e8f0] bg-[#f8fafc] px-6 py-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Student</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Programme</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Code</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Intake</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Status</p>
                    </div>

                    {sortedStudents.slice(0, 6).map((student) => (
                      <div
                        key={student.id_number}
                        className="grid w-full grid-cols-[1.6fr_1.7fr_1.3fr_1.2fr_1.2fr] items-center gap-8 border-b border-[#edf2f7] px-6 py-6 text-left last:border-b-0"
                      >
                        <p className="text-sm font-medium text-[#0f172a]">{student.first_name} {student.last_name}</p>
                        <p className="text-sm text-[#1e293b]">{student.programme_name}</p>
                        <p className="text-sm text-[#1e293b]">{student.programme_code}</p>
                        <p className="text-sm text-[#1e293b]">{student.intake_name}</p>
                        <p className="text-sm text-[#1e293b]">
                          {student.status ? student.status.charAt(0).toUpperCase() + student.status.slice(1) : ""}
                        </p>
                      </div>
                    ))}

                    {sortedStudents.length === 0 && (
                      <div className="px-6 py-12 text-center">
                        <p className="text-sm text-[#64748b]">No students found.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3 px-4 pb-4">
                  <p className="mr-auto text-xs text-[#94a3b8]">
                    Showing {Math.min(6, sortedStudents.length)} out of {sortedStudents.length} students
                  </p>
                  <button onClick={() => { exportToCSV(sortedStudents, studentColumns, "students.csv"); showSuccess("CSV exported."); }} className="rounded-lg border border-[#d1d9e6] px-4 py-2 text-sm font-medium text-[#1e293b] transition hover:border-[#b9c4d4] hover:text-[#0f172a]">Export CSV</button>
                  <button onClick={() => exportToPDF("Students Report", sortedStudents, studentColumns)} className="rounded-lg border border-[#d1d9e6] px-4 py-2 text-sm font-medium text-[#1e293b] transition hover:border-[#b9c4d4] hover:text-[#0f172a]">Export PDF</button>
                  <button onClick={() => printTable("Students Report", sortedStudents, studentColumns)} className="rounded-lg border border-[#d1d9e6] px-4 py-2 text-sm font-medium text-[#1e293b] transition hover:border-[#b9c4d4] hover:text-[#0f172a]">Print</button>
                </div>
              </div>
            </motion.div>
          )}

          {navstep === 6 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <div className="flex items-end justify-between gap-6">
                <div className="space-y-2">
                  <h1 className="text-2xl font-medium tracking-tight text-[#0f172a]">Programmes Report</h1>
                  <p className="text-sm leading-6 text-[#64748b]">Overview of all programmes offered.</p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-[#64748b]">Sort by</label>
                  <select
                    value={reportSort.programmes}
                    onChange={(e) => setSort("programmes", e.target.value)}
                    className="rounded-lg border border-[#d1d9e6] bg-white px-3 py-2 text-sm text-[#1e293b] outline-none transition focus:border-[#94a3b8]"
                  >
                    <option value="default">Default</option>
                    <option value="name">Programme (A–Z)</option>
                    <option value="code">Code (A–Z)</option>
                    <option value="department">Department (A–Z)</option>
                    <option value="popular">Most popular programme</option>
                    <option value="duration">Duration (short → long)</option>
                  </select>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Total programmes", value: totalProgrammes, sub: "Programmes on record" },
                  { label: "Departments", value: totalDepartments, sub: "Departments offering programmes" },
                  { label: "Short courses", value: shortCourses, sub: "Programmes under one year" },
                  { label: "Long programmes", value: longProgrammes, sub: "Programmes of one year or more" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-[#e6edf5] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">{stat.label}</p>
                    <p className="mt-3 text-2xl font-bold tracking-tight text-[#0f172a]">{stat.value}</p>
                    <p className="mt-2 text-xs leading-5 text-[#64748b]">{stat.sub}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-2xl border border-[#e6edf5] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
                <div className="overflow-hidden rounded-2xl">
                  <div className="overflow-hidden rounded-2xl bg-white">
                    <div className="grid grid-cols-[2fr_1.2fr_1.6fr_1.1fr] gap-8 border-b border-[#e2e8f0] bg-[#f8fafc] px-6 py-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Programme</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Code</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Department</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Duration</p>
                    </div>

                    {sortedProgrammes.slice(0, 6).map((programme) => (
                      <div key={programme.programme_id} className="grid w-full grid-cols-[2fr_1.2fr_1.6fr_1.1fr] items-center gap-8 border-b border-[#edf2f7] px-6 py-6 text-left last:border-b-0">
                        <p className="text-sm font-medium text-[#0f172a]">{programme.programme_name}</p>
                        <p className="text-sm text-[#1e293b]">{programme.programme_code}</p>
                        <p className="text-sm text-[#1e293b]">{programme.department_name}</p>
                        <p className="text-sm text-[#1e293b]">
                          {programme.duration_years ? `${programme.duration_years} ${Number(programme.duration_years) === 1 ? "year" : "years"}` : ""}
                        </p>
                      </div>
                    ))}

                    {sortedProgrammes.length === 0 && (
                      <div className="px-6 py-12 text-center">
                        <p className="text-sm text-[#64748b]">No programmes found.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3 px-4 pb-4">
                  <p className="mr-auto text-xs text-[#94a3b8]">
                    Showing {Math.min(6, sortedProgrammes.length)} out of {sortedProgrammes.length} programmes
                  </p>
                  <button onClick={() => { exportToCSV(sortedProgrammes, programmeColumns, "programmes.csv"); showSuccess("CSV exported."); }} className="rounded-lg border border-[#d1d9e6] px-4 py-2 text-sm font-medium text-[#1e293b] transition hover:border-[#b9c4d4] hover:text-[#0f172a]">Export CSV</button>
                  <button onClick={() => exportToPDF("Programmes Report", sortedProgrammes, programmeColumns)} className="rounded-lg border border-[#d1d9e6] px-4 py-2 text-sm font-medium text-[#1e293b] transition hover:border-[#b9c4d4] hover:text-[#0f172a]">Export PDF</button>
                  <button onClick={() => printTable("Programmes Report", sortedProgrammes, programmeColumns)} className="rounded-lg border border-[#d1d9e6] px-4 py-2 text-sm font-medium text-[#1e293b] transition hover:border-[#b9c4d4] hover:text-[#0f172a]">Print</button>
                </div>
              </div>
            </motion.div>
          )}

          {navstep === 7 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <div className="flex items-end justify-between gap-6">
                <div className="space-y-2">
                  <h1 className="text-2xl font-medium tracking-tight text-[#0f172a]">Modules Report</h1>
                  <p className="text-sm leading-6 text-[#64748b]">Overview of all modules offered.</p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-[#64748b]">Sort by</label>
                  <select
                    value={reportSort.modules}
                    onChange={(e) => setSort("modules", e.target.value)}
                    className="rounded-lg border border-[#d1d9e6] bg-white px-3 py-2 text-sm text-[#1e293b] outline-none transition focus:border-[#94a3b8]"
                  >
                    <option value="default">Default</option>
                    <option value="name">Module (A–Z)</option>
                    <option value="code">Code (A–Z)</option>
                    <option value="programme">Programme (A–Z)</option>
                    <option value="lecturer">Lecturer (A–Z)</option>
                  </select>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Total modules", value: totalModules, sub: "Modules on record" },
                  { label: "Assigned", value: assignedModules, sub: "Modules with a lecturer" },
                  { label: "Unassigned", value: unassignedModules, sub: "Modules without a lecturer" },
                  { label: "Programmes", value: totalProgrammesWithModules, sub: "Programmes offering modules" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-[#e6edf5] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">{stat.label}</p>
                    <p className="mt-3 text-2xl font-bold tracking-tight text-[#0f172a]">{stat.value}</p>
                    <p className="mt-2 text-xs leading-5 text-[#64748b]">{stat.sub}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-2xl border border-[#e6edf5] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
                <div className="overflow-hidden rounded-2xl">
                  <div className="overflow-hidden rounded-2xl bg-white">
                    <div className="grid grid-cols-[1.8fr_1.2fr_1.6fr_1.8fr] gap-8 border-b border-[#e2e8f0] bg-[#f8fafc] px-6 py-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Module</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Code</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Programme</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Lecturer</p>
                    </div>

                    {sortedModules.slice(0, 6).map((module) => (
                      <div key={module.module_id} className="grid w-full grid-cols-[1.8fr_1.2fr_1.6fr_1.8fr] items-center gap-8 border-b border-[#edf2f7] px-6 py-6 text-left last:border-b-0">
                        <p className="text-sm font-medium text-[#0f172a]">{module.module_name}</p>
                        <p className="text-sm text-[#1e293b]">{module.module_code}</p>
                        <p className="text-sm text-[#1e293b]">{module.programme_name}</p>
                        <p className="text-sm text-[#1e293b]">
                          {module.lecturer_id ? `${module.lecturer_first_name} ${module.lecturer_last_name}` : "Unassigned"}
                        </p>
                      </div>
                    ))}

                    {sortedModules.length === 0 && (
                      <div className="px-6 py-12 text-center">
                        <p className="text-sm text-[#64748b]">No modules found.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3 px-4 pb-4">
                  <p className="mr-auto text-xs text-[#94a3b8]">
                    Showing {Math.min(6, sortedModules.length)} out of {sortedModules.length} modules
                  </p>
                  <button onClick={() => { exportToCSV(sortedModules, moduleColumns, "modules.csv"); showSuccess("CSV exported."); }} className="rounded-lg border border-[#d1d9e6] px-4 py-2 text-sm font-medium text-[#1e293b] transition hover:border-[#b9c4d4] hover:text-[#0f172a]">Export CSV</button>
                  <button onClick={() => exportToPDF("Modules Report", sortedModules, moduleColumns)} className="rounded-lg border border-[#d1d9e6] px-4 py-2 text-sm font-medium text-[#1e293b] transition hover:border-[#b9c4d4] hover:text-[#0f172a]">Export PDF</button>
                  <button onClick={() => printTable("Modules Report", sortedModules, moduleColumns)} className="rounded-lg border border-[#d1d9e6] px-4 py-2 text-sm font-medium text-[#1e293b] transition hover:border-[#b9c4d4] hover:text-[#0f172a]">Print</button>
                </div>
              </div>
            </motion.div>
          )}

          {navstep === 8 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <div className="flex items-end justify-between gap-6">
                <div className="space-y-2">
                  <h1 className="text-2xl font-medium tracking-tight text-[#0f172a]">Lecturers Report</h1>
                  <p className="text-sm leading-6 text-[#64748b]">Overview of all lecturers on staff.</p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-[#64748b]">Sort by</label>
                  <select
                    value={reportSort.lecturers}
                    onChange={(e) => setSort("lecturers", e.target.value)}
                    className="rounded-lg border border-[#d1d9e6] bg-white px-3 py-2 text-sm text-[#1e293b] outline-none transition focus:border-[#94a3b8]"
                  >
                    <option value="default">Default</option>
                    <option value="name">Lecturer (A–Z)</option>
                    <option value="staff">Staff number (A–Z)</option>
                    <option value="department">Department (A–Z)</option>
                    <option value="assigned">Assigned first</option>
                  </select>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Total lecturers", value: totalLecturers, sub: "Lecturers on record" },
                  { label: "Departments", value: totalDepartmentsWithLecturers, sub: "Departments with lecturers" },
                  { label: "Assigned", value: assignedLecturers, sub: "Lecturers with a module" },
                  { label: "Unassigned", value: unassignedLecturers, sub: "Lecturers without a module" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-[#e6edf5] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">{stat.label}</p>
                    <p className="mt-3 text-2xl font-bold tracking-tight text-[#0f172a]">{stat.value}</p>
                    <p className="mt-2 text-xs leading-5 text-[#64748b]">{stat.sub}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-2xl border border-[#e6edf5] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
                <div className="overflow-hidden rounded-2xl">
                  <div className="overflow-hidden rounded-2xl bg-white">
                    <div className="grid grid-cols-[1.8fr_1.2fr_1.8fr_1.8fr] gap-8 border-b border-[#e2e8f0] bg-[#f8fafc] px-6 py-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Lecturer</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Staff Number</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Department</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Email</p>
                    </div>

                    {sortedLecturers.slice(0, 6).map((lecturer) => (
                      <div key={lecturer.lecturer_id} className="grid w-full grid-cols-[1.8fr_1.2fr_1.8fr_1.8fr] items-center gap-8 border-b border-[#edf2f7] px-6 py-6 text-left last:border-b-0">
                        <p className="text-sm font-medium text-[#0f172a]">{lecturer.lecturer_first_name} {lecturer.lecturer_last_name}</p>
                        <p className="text-sm text-[#1e293b]">{lecturer.staff_number}</p>
                        <p className="text-sm text-[#1e293b]">{lecturer.department_name}</p>
                        <p className="text-sm text-[#1e293b]">{lecturer.email}</p>
                      </div>
                    ))}

                    {sortedLecturers.length === 0 && (
                      <div className="px-6 py-12 text-center">
                        <p className="text-sm text-[#64748b]">No lecturers found.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3 px-4 pb-4">
                  <p className="mr-auto text-xs text-[#94a3b8]">
                    Showing {Math.min(6, sortedLecturers.length)} out of {sortedLecturers.length} lecturers
                  </p>
                  <button onClick={() => { exportToCSV(sortedLecturers, lecturerColumns, "lecturers.csv"); showSuccess("CSV exported."); }} className="rounded-lg border border-[#d1d9e6] px-4 py-2 text-sm font-medium text-[#1e293b] transition hover:border-[#b9c4d4] hover:text-[#0f172a]">Export CSV</button>
                  <button onClick={() => exportToPDF("Lecturers Report", sortedLecturers, lecturerColumns)} className="rounded-lg border border-[#d1d9e6] px-4 py-2 text-sm font-medium text-[#1e293b] transition hover:border-[#b9c4d4] hover:text-[#0f172a]">Export PDF</button>
                  <button onClick={() => printTable("Lecturers Report", sortedLecturers, lecturerColumns)} className="rounded-lg border border-[#d1d9e6] px-4 py-2 text-sm font-medium text-[#1e293b] transition hover:border-[#b9c4d4] hover:text-[#0f172a]">Print</button>
                </div>
              </div>
            </motion.div>
          )}

        </main>

      </div>

    </section>
  );
}