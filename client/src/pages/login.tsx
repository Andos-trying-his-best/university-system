import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Form from "../components/login/form";
import InfoLogin from "../components/infoLogin";

export default function Login() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Form />
      <InfoLogin />
      <Footer/>
    </div>
  );
}