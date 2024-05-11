// import { redirect } from "react-router-dom";
import Footer from "../components/Footer";
import HeroSection from "../components/HomePage/HeroSection";
import NavBar from "../components/NavBar";
import OurTutors from "../components/HomePage/OurTutors";
// import { toast } from "react-toastify";
import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <NavBar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      {/* <button onClick={() => toast.success("Hello")}>Click me</button> */}
      <HeroSection />
      <OurTutors />
      <Footer />
    </>
  );
}
