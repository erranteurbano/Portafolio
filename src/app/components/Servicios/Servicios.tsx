"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Server, 
  Layout, 
  Link2, 
  Workflow, 
  Globe 
} from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

const ServicesSection: React.FC = () => {
  const { theme } = useTheme();

  const services = [
    {
      icon: Code,
      title: "Desarrollo de Aplicaciones Personalizadas",
      description: "Diseño y desarrollo de aplicaciones web y móviles completamente adaptadas a tus necesidades específicas. Creamos soluciones únicas que transforman tus ideas en herramientas digitales funcionales y eficientes.",
      keyPoints: [
        "Aplicaciones web y móviles a medida",
        "Funcionalidades personalizadas",
        "Interfaces intuitivas",
        "Soluciones adaptadas a objetivos específicos"
      ]
    },
    {
      icon: Link2,
      title: "Diseño de APIs RESTful y GraphQL",
      description: "Desarrollo de interfaces de comunicación robustas y escalables que permiten una integración fluida entre diferentes sistemas y aplicaciones.",
      keyPoints: [
        "APIs seguras y eficientes",
        "Documentación clara y completa",
        "Fácil integración frontend/backend",
        "Escalabilidad garantizada"
      ]
    },
    {
      icon: Globe,
      title: "Integración de Sistemas Externos",
      description: "Conectamos tus aplicaciones con servicios de terceros, creando ecosistemas digitales interconectados que potencian la funcionalidad de tus proyectos.",
      keyPoints: [
        "Conexión con plataformas de pagos",
        "Integración de redes sociales",
        "Servicios de comunicación",
        "Automatización de flujos de datos"
      ]
    },
    {
      icon: Layout,
      title: "Frontends Modernos y Responsivos",
      description: "Creación de interfaces de usuario atractivas, intuitivas y completamente adaptables, utilizando las tecnologías más avanzadas del mercado.",
      keyPoints: [
        "Diseño responsive",
        "Tecnologías React, Angular, Vue.js",
        "Experiencia de usuario optimizada",
        "Compatibilidad multiplataforma"
      ]
    },
    {
      icon: Server,
      title: "Desarrollo y Optimización Backend",
      description: "Diseño de la arquitectura de servidores y bases de datos que garantizan el rendimiento, la seguridad y la escalabilidad de tus aplicaciones.",
      keyPoints: [
        "Lógica de negocio eficiente",
        "Bases de datos optimizadas",
        "Alto rendimiento",
        "Arquitectura escalable"
      ]
    },
    {
      icon: Workflow,
      title: "Automatización de Procesos",
      description: "Implementación de flujos de trabajo inteligentes que mejoran la productividad, reducen errores y optimizan los recursos de tu organización.",
      keyPoints: [
        "Automatización de tareas repetitivas",
        "Integración de herramientas",
        "Optimización de procesos",
        "Mejora de eficiencia empresarial"
      ]
    }
  ];

  return (
    <section 
      id="servicios" 
      className={`py-20 flex items-center justify-center transition-colors duration-300 
        ${theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white'
          : 'bg-gradient-to-br from-purple-50 via-white to-purple-100'
        }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className={`w-full max-w-6xl rounded-3xl shadow-2xl 
                   p-6 sm:p-8 md:p-12 lg:p-16 
                   relative overflow-hidden
                   transition-colors duration-300
                   ${theme === 'dark' 
                     ? 'bg-gray-900/60 backdrop-blur-xl' 
                     : 'bg-white/60 backdrop-blur-xl'
                   }`}
      >
        {/* Background Decorations */}
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

        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-light tracking-wide mb-4
                     ${theme === 'dark' 
                       ? 'text-white' 
                       : 'text-purple-900'
                     }`}>
            Servicios Profesionales
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto
                     ${theme === 'dark' 
                       ? 'text-gray-300' 
                       : 'text-purple-700'
                     }`}>
            Soluciones tecnológicas integrales diseñadas para transformar tu visión digital en realidad funcional y eficiente
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1 
              }}
              className={`rounded-2xl p-6 space-y-4 
                         transition-all duration-300 
                         hover:scale-105 hover:shadow-xl
                         ${theme === 'dark'
                           ? 'bg-white/5 border border-purple-300/10'
                           : 'bg-purple-50 border border-purple-100'
                         }`}
            >
              <div className="flex justify-center mb-4">
                <service.icon 
                  className={`w-12 h-12 
                    ${theme === 'dark' 
                      ? 'text-purple-400' 
                      : 'text-purple-600'
                    }`} 
                />
              </div>
              <h3 className={`text-xl font-semibold text-center mb-3
                         ${theme === 'dark' 
                           ? 'text-white' 
                           : 'text-purple-900'
                         }`}>
                {service.title}
              </h3>
              <p className={`text-center mb-4 leading-relaxed
                         ${theme === 'dark' 
                           ? 'text-gray-300' 
                           : 'text-purple-700'
                         }`}>
                {service.description}
              </p>
              <ul className={`list-disc list-inside text-sm 
                         ${theme === 'dark' 
                           ? 'text-gray-400' 
                           : 'text-purple-600'
                         }`}>
                {service.keyPoints.map((point, idx) => (
                  <li key={idx} className="mb-1">{point}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ServicesSection;