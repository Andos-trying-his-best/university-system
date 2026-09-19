import Navbar from "../components/navbar";
import Hero from "../components/herocourses";
import Footer from "../components/footer";

export default function Courses() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />
      <Footer/>
    </div>
  );
}