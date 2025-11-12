"use Client";

import Navbar from "./components/navbar/Navbar";
import HeroSection from "./components/hero/HeroSection";
import Projects from "./components/projects/Projects";
import ModernContactSection from './components/contacto/Contacto';
import ServicesSection from './components/Servicios/Servicios';
//import Footer from "./components/footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
       <Projects/>
       <ServicesSection/>
       <ModernContactSection/>
    </>
  );
}

