import Home from "./pages/home";
import Courses from "./pages/courses";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Apply from "./pages/apply";
import Login from "./pages/login";
import Admin from "./pages/admin";
import Student from "./pages/student";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/student/:studentNumber" element={<Student />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;