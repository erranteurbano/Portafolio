"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Proyectos', href: '#proyectos' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Contacto', href: '#contacto' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ThemeToggleButton: React.FC<{ className?: string }> = ({ className = '' }) => (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`p-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 ${className}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  );

  return (
    <motion.nav
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || isOpen
        ? 'dark:bg-gray-900 dark:backdrop-blur-lg dark:shadow-lg bg-white backdrop-blur-lg shadow-lg'
        : 'bg-transparent'
    }`}
  >  
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
              <span className="text-white text-xl font-bold">OD</span>
            </div>
            <span className="text-purple-900 dark:text-purple-300 font-semibold text-xl hidden sm:block">
              Mena Dev
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ scale: 1.1 }}
                className="text-purple-800 dark:text-purple-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {item.name}
              </motion.a>
            ))}
            
            <ThemeToggleButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggleButton />
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-purple-800 dark:text-purple-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isOpen ? 1 : 0,
              height: isOpen ? 'auto' : 0,
            }}
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              isOpen
                ? 'bg-white dark:bg-gray-900' 
                : scrolled
                ? 'dark:bg-gray-900/80 dark:backdrop-blur-lg dark:shadow-lg bg-white/80 backdrop-blur-lg shadow-lg'
                : 'bg-transparent'
            }`}
          >
            <div className="py-2 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-purple-800 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/50 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;