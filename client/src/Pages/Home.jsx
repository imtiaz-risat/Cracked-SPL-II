import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import NavBar from "../components/NavBar";
import OurTutors from "../components/OurTutors";
import { toast } from "react-toastify";

export default function Home() {
  return (
    <>
      <NavBar />
      <button onClick={() => toast.success("Hello")}>Click me</button>
      <HeroSection />
      <OurTutors />
      <Footer />
    </>
  );
}
