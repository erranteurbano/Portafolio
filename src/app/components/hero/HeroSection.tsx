"use client";

import React, { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, Terminal , Server, Monitor, Puzzle, User } from "lucide-react";
import { useTheme } from '../theme/ThemeContext';

// Hook para detectar dispositivos móviles
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

type TechKey = "Fullstack Developer" | "Backend Builder" |"Frontend Enthusiast" | "Creative Coder" | "Problem Solver" | "Junior Engineer";

const HeroSection = memo(() => {
  const [dynamicText, setDynamicText] = useState<TechKey>("Fullstack Developer");
  const isMobile = useIsMobile();
  const { theme } = useTheme();

  const phrases: TechKey[] = [
    "Fullstack Developer",
    "Backend Builder",
    "Frontend Enthusiast",
    "Creative Coder",
    "Problem Solver",
    "Junior Engineer",
  ];
  
  const techIcons: Record<TechKey, JSX.Element> = {
    "Fullstack Developer":  <Terminal className="inline-block mr-2" />,
    "Backend Builder":  <Server className="inline-block mr-2" />,
    "Frontend Enthusiast":  <Monitor className="inline-block mr-2" />,
    "Creative Coder":  <Code className="inline-block mr-2" />,
    "Problem Solver":  <Puzzle className="inline-block mr-2" />,
    "Junior Engineer":  <User className="inline-block mr-2" />,
  };
  
  useEffect(() => {
    let currentIndex = 0;
    const changeText = () => {
      setDynamicText(phrases[currentIndex]);
      currentIndex = (currentIndex + 1) % phrases.length;
    };

    changeText();
    const intervalId = setInterval(changeText, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section
    className={`min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 font-serif
      ${theme === 'dark'
        ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black'
        : 'bg-gradient-to-br from-purple-50 via-white to-purple-100'}
    `}
  >  
      <motion.div
        initial={{ opacity: 0, scale: isMobile ? 1 : 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: isMobile ? 0.5 : 0.8 }}
        className="w-full max-w-5xl bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl 
                   p-6 sm:p-8 md:p-12 lg:p-16 
                   flex flex-col lg:flex-row items-center gap-8 lg:gap-16 
                   relative overflow-hidden mt-16 md:mt-20"
      >
        {/* Decoraciones */}
        <div className="absolute top-0 left-0 w-48 md:w-64 h-48 md:h-64 
                      bg-purple-200/30 rounded-full -translate-x-24 -translate-y-24 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-48 md:w-64 h-48 md:h-64 
                      bg-purple-300/30 rounded-full translate-x-24 translate-y-24 blur-3xl" />

        {/* Imagen de perfil */}
        <motion.div whileHover={{ scale: 1.02 }} className="relative flex-shrink-0">
          <div
            className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 
                      rounded-full border-4 sm:border-6 md:border-8 border-white shadow-2xl 
                      overflow-hidden relative z-10"
          >
            <img
              src="https://media.licdn.com/dms/image/v2/D4E03AQF4xe80uD7KKw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1704321495885?e=1737590400&v=beta&t=ar_1USNKU3DuKVy8koelZ1lw5fwC81BZ2ON9eMGqpJ4"
              alt="Orlando Daniel"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-purple-300/20 rounded-full blur-xl transform scale-110" />
        </motion.div>

        {/* Contenido */}
        <div className="flex-1 space-y-4 sm:space-y-6 md:space-y-8 relative z-10 text-center lg:text-left">
          <motion.h1
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-light text-purple-900 tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Orlando Daniel
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl text-purple-700">Mena Cabezas</span>
          </motion.h1>

          <div className="relative">
            <motion.div
              key={dynamicText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-medium text-purple-600 relative inline-block"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {techIcons[dynamicText]}
              {dynamicText}
              <div
                className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r 
                              from-purple-400 to-transparent transform scale-x-0 animate-expandWidth"
              />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-purple-700 leading-relaxed 
                        mt-4 sm:mt-6 max-w-2xl mx-auto lg:mx-0"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Transformando ideas en experiencias digitales excepcionales.
            Especializado en desarrollo frontend y diseño UI/UX, creando interfaces que destacan por su elegancia y funcionalidad.
          </motion.p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-purple-600 to-purple-500 text-white
                           px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-xl
                           hover:from-purple-700 hover:to-purple-600 transition-all duration-300
                           text-base sm:text-lg font-medium
                           border border-purple-400/20 backdrop-blur-sm"
            >
              Ver Proyectos
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/80 text-purple-600
                           px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-xl
                           hover:bg-purple-50 transition-all duration-300
                           text-base sm:text-lg font-medium
                           border border-purple-200"
            >
              Contactar
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
});

export default HeroSection;
