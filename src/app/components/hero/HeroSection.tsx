"use client";

import React, { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, Terminal, Server, Monitor, Puzzle, User } from "lucide-react";
import { useTheme } from '../theme/ThemeContext'; // Mantenemos la importación original

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

type TechKey = "Fullstack Developer" | "Backend Builder" | "Frontend Enthusiast" | "Creative Coder" | "Problem Solver" | "Junior Engineer";

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
    "Fullstack Developer": <Terminal className="inline-block mr-2" />,
    "Backend Builder": <Server className="inline-block mr-2" />,
    "Frontend Enthusiast": <Monitor className="inline-block mr-2" />,
    "Creative Coder": <Code className="inline-block mr-2" />,
    "Problem Solver": <Puzzle className="inline-block mr-2" />,
    "Junior Engineer": <User className="inline-block mr-2" />,
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
     id="inicio"
      className={`min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 font-serif transition-colors duration-300
        ${theme === 'dark'
          ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white'
          : 'bg-gradient-to-br from-purple-50 via-white to-purple-100'
        }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: isMobile ? 1 : 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: isMobile ? 0.5 : 0.8 }}
        className={`w-full max-w-5xl rounded-3xl shadow-2xl 
                   p-6 sm:p-8 md:p-12 lg:p-16 
                   flex flex-col lg:flex-row items-center gap-8 lg:gap-16 
                   relative overflow-hidden mt-16 md:mt-20
                   transition-colors duration-300
                   ${theme === 'dark' 
                     ? 'bg-gray-900/60 backdrop-blur-xl' 
                     : 'bg-white/60 backdrop-blur-xl'
                   }`}
      >
        {/* Decoraciones */}
        <div className={`absolute top-0 left-0 w-48 md:w-64 h-48 md:h-64 
                      rounded-full -translate-x-24 -translate-y-24 blur-3xl
                      ${theme === 'dark' 
                        ? 'bg-purple-900/30' 
                        : 'bg-purple-200/30'
                      }`} />
        <div className={`absolute bottom-0 right-0 w-48 md:w-64 h-48 md:h-64 
                      rounded-full translate-x-24 translate-y-24 blur-3xl
                      ${theme === 'dark' 
                        ? 'bg-purple-800/30' 
                        : 'bg-purple-300/30'
                      }`} />

        {/* Imagen de perfil */}
        <motion.div whileHover={{ scale: 1.02 }} className="relative flex-shrink-0">
          <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 
                      rounded-full border-4 sm:border-6 md:border-8 border-white shadow-2xl 
                      overflow-hidden relative z-10">
            <img
              src="https://avatars.githubusercontent.com/u/98560882?v=4"
              alt="Orlando Daniel"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className={`absolute inset-0 rounded-full blur-xl transform scale-110
                        ${theme === 'dark' 
                          ? 'bg-purple-900/20' 
                          : 'bg-purple-300/20'
                        }`} />
        </motion.div>

        {/* Contenido */}
        <div className="flex-1 space-y-4 sm:space-y-6 md:space-y-8 relative z-10 text-center lg:text-left">
          <motion.h1
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-4xl sm:text-5xl md:text-6xl font-light tracking-wide
                     ${theme === 'dark' 
                       ? 'text-white' 
                       : 'text-purple-900'
                     }`}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Orlando Daniel
            <br />
            <span className={`text-3xl sm:text-4xl md:text-5xl
                          ${theme === 'dark' 
                            ? 'text-purple-400' 
                            : 'text-purple-700'
                          }`}>
              Mena Cabezas
            </span>
          </motion.h1>

          <div className="relative">
            <motion.div
              key={dynamicText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`text-2xl sm:text-3xl md:text-4xl font-medium relative inline-block
                       ${theme === 'dark' 
                         ? 'text-purple-400' 
                         : 'text-purple-600'
                       }`}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {techIcons[dynamicText]}
              {dynamicText}
              <div
                className={`absolute -bottom-2 left-0 w-full h-0.5 transform scale-x-0 animate-expandWidth
                         ${theme === 'dark' 
                           ? 'bg-gradient-to-r from-purple-400 to-transparent' 
                           : 'bg-gradient-to-r from-purple-400 to-transparent'
                         }`}
              />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className={`text-base sm:text-lg md:text-xl leading-relaxed 
                     mt-4 sm:mt-6 max-w-2xl mx-auto lg:mx-0
                     ${theme === 'dark' 
                       ? 'text-gray-300' 
                       : 'text-purple-700'
                     }`}
            style={{ fontFamily: "'Lora', serif" }}
          >
            Transformando ideas en experiencias digitales excepcionales.
            Especializado en desarrollo frontend y diseño UI/UX, creando interfaces que destacan por su elegancia y funcionalidad.
          </motion.p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-xl
                       text-base sm:text-lg font-medium
                       transition-all duration-300
                       ${theme === 'dark'
                         ? 'bg-gradient-to-r from-purple-500 to-purple-400 text-white hover:from-purple-600 hover:to-purple-500 border-purple-300/20'
                         : 'bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600 border-purple-400/20'
                       } border backdrop-blur-sm`}
              onClick={() => document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" })}
            >
              Ver Proyectos
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-xl
                       text-base sm:text-lg font-medium
                       transition-all duration-300
                       ${theme === 'dark'
                         ? 'bg-white/10 text-white hover:bg-white/20 border-purple-300/20'
                         : 'bg-white/80 text-purple-600 hover:bg-purple-50 border-purple-200'
                       } border`}
              onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
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