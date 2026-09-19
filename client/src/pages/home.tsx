import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Courses from "../components/courses";
import Testimonials from "../components/testimonials";
import Pricing from "../components/pricing";
import Faq from "../components/faq";
import Enrol from "../components/enrol";
import Footer from "../components/footer";
import Why from "../components/why";
import CTA from "../components/cta";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />
      <Enrol />
      <Courses />
      <Why />
      <Testimonials />
      <Pricing />
      <Faq />
      <CTA />
      <Footer />
    </div>
  );
}