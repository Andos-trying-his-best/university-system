import Navbar from "../components/navbar";
import Footer from "../components/footer";
import TrackerBar from "../components/apply/trackerBar";
import Programme from "../components/apply/programme";
import HowItWorks from "../components/why";

export default function Apply() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <TrackerBar />
      <Programme />
      <HowItWorks />
      <Footer/>
    </div>
  );
}