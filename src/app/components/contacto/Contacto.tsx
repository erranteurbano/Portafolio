"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, CheckCircle, MapPin, Mail, Phone, MessageCircle } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import { useTheme } from '../theme/ThemeContext';

const ModernContactSection: React.FC = () => {
  const { theme } = useTheme();
  const [state, handleSubmit] = useForm("mzzybnna"); // <-- tu ID de Formspree aquí

  return (
    <section 
      id="contacto" 
      className={`py-20 flex items-center justify-center transition-colors duration-300 
        ${theme === 'dark'
          ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white'
          : 'bg-gradient-to-br from-purple-50 via-white to-purple-100'
        }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className={`w-full max-w-5xl rounded-3xl shadow-2xl 
                   p-6 sm:p-8 md:p-12 lg:p-16 
                   flex flex-col lg:flex-row items-center gap-8 lg:gap-16 
                   relative overflow-hidden
                   transition-colors duration-300
                   ${theme === 'dark' 
                     ? 'bg-gray-900/60 backdrop-blur-xl' 
                     : 'bg-white/60 backdrop-blur-xl'
                   }`}
      >

        {/* Fondo decorativo */}
        <div className={`absolute top-0 left-0 w-48 md:w-64 h-48 md:h-64 rounded-full -translate-x-24 -translate-y-24 blur-3xl
                      ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-200/30'}`} />
        <div className={`absolute bottom-0 right-0 w-48 md:w-64 h-48 md:h-64 rounded-full translate-x-24 translate-y-24 blur-3xl
                      ${theme === 'dark' ? 'bg-purple-800/30' : 'bg-purple-300/30'}`} />

        {/* Información de contacto */}
        <div className="flex-1 space-y-6 relative z-10">
          <h3 className={`text-3xl sm:text-4xl md:text-5xl font-light tracking-wide
                     ${theme === 'dark' ? 'text-white' : 'text-purple-900'}`}>
            Información de Contacto
          </h3>
          
          <div className="space-y-4 text-lg">
            <div className="flex items-center space-x-4">
              <MapPin className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} />
              <span className={theme === 'dark' ? 'text-gray-300' : 'text-purple-700'}>
                Cartagena de Indias, Colombia
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} />
              <span className={theme === 'dark' ? 'text-gray-300' : 'text-purple-700'}>
                dmcymas@gmail.com
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} />
              <span className={theme === 'dark' ? 'text-gray-300' : 'text-purple-700'}>
                (+57) 304 525 8855
              </span>
            </div>
          </div>

          <p className={`italic text-base sm:text-lg
                     ${theme === 'dark' ? 'text-gray-400' : 'text-purple-600'}`}>
            "Respondo mensajes y llamadas de lunes a viernes, de 9:00 AM a 6:00 PM (Hora Colombia)"
          </p>
        </div>

        {/* Formulario */}
        <div className="flex-1 relative z-10 text-center lg:text-left">
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="rounded-full inline-flex p-4"
            >
              <Rocket className={theme === 'dark' ? 'text-purple-400' : 'text-purple-700'} size={40} />
            </motion.div>
          </div>

          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-light tracking-wide
                     ${theme === 'dark' ? 'text-white' : 'text-purple-900'}`}>
            Llevemos tu proyecto al siguiente nivel
          </h2>

          <p className={`text-base sm:text-lg md:text-xl leading-relaxed mt-6
                     ${theme === 'dark' ? 'text-gray-300' : 'text-purple-700'}`}>
            ¿Listo para transformar tu visión en realidad? Conéctate conmigo y comencemos a construir algo genial.
          </p>

          {state.succeeded ? (
            <div className={`mt-8 p-6 rounded-2xl
                           ${theme === 'dark'
                             ? 'bg-white/10 text-white'
                             : 'bg-purple-50 text-purple-900'}`}>
              <div className="flex justify-center mb-4">
                <CheckCircle className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} size={60} />
              </div>
              <h3 className="text-2xl font-semibold">¡Gracias por tu mensaje!</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-purple-700'}>
                Me pondré en contacto contigo pronto para hablar sobre tu proyecto.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Tu correo electrónico"
                required
                className={`w-full px-6 py-3 rounded-full text-base 
                           ${theme === 'dark'
                             ? 'bg-white/10 text-white placeholder-gray-400 border border-purple-300/20'
                             : 'bg-purple-50 text-purple-900 placeholder-purple-400 border border-purple-200'
                           }`}
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />

              <div className="flex items-center space-x-2">
                <MessageCircle className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} />
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-purple-700'}>
                  Cuéntame sobre tu proyecto
                </span>
              </div>

              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Describe brevemente tu proyecto, tus necesidades o ideas."
                className={`w-full px-6 py-3 rounded-2xl text-base resize-none
                           ${theme === 'dark'
                             ? 'bg-white/10 text-white placeholder-gray-400 border border-purple-300/20'
                             : 'bg-purple-50 text-purple-900 placeholder-purple-400 border border-purple-200'
                           }`}
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={state.submitting}
                className={`w-full px-6 py-3 rounded-full shadow-xl text-base font-medium transition-all duration-300
                           ${theme === 'dark'
                             ? 'bg-gradient-to-r from-purple-500 to-purple-400 text-white hover:from-purple-600 hover:to-purple-500'
                             : 'bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600'
                           }`}
              >
                {state.submitting ? "Enviando..." : "Iniciar Proyecto"}
              </motion.button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default ModernContactSection;
