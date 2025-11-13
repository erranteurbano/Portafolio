"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Loader2, 
  Clock, 
  Code, 
  Search, 
  Filter 
} from 'lucide-react';
import ProjectModal from './ModalProjects';

interface Project {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  created_at: string;
  updated_at: string;
  languages_url: string;
  languages: string[];
  categories?: string[];
}

interface ApiResponse {
  success: boolean;
  message: string;
  projects: Project[];
}

const FormattedDate: React.FC<{ date: string }> = ({ date }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return <time dateTime={date}>{formatDate(date)}</time>;
};

const ProjectCard: React.FC<{ 
  project: Project; 
  onSelect: (name: string) => void; 
}> = ({ project, onSelect }) => {
  return (
    <motion.div
      whileHover={{ 
        y: -10,
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)"
      }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden 
                 transition-all duration-300 hover:border-purple-300 
                 border border-transparent cursor-pointer group"
      onClick={() => onSelect(project.name)}
      aria-label={`View details for project ${project.name}`}
    >
      <div className="p-6 relative">
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="bg-purple-100 dark:bg-purple-900 rounded-full p-2"
          >
            <ExternalLink size={20} className="text-purple-600 dark:text-purple-300" />
          </motion.div>
        </div>

        <h3 className="text-xl font-bold text-purple-900 dark:text-purple-300 
                       mb-3 flex items-center gap-2 group-hover:text-purple-700">
          <Code size={20} />
          {project.name.replace(/-/g, ' ')}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 h-16 overflow-hidden">
          {project.description || 'No hay descripción disponible'}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.languages.slice(0, 3).map((lang) => (
            <span
              key={lang}
              className="px-3 py-1 text-xs rounded-full 
                         bg-purple-100 dark:bg-purple-900 
                         text-purple-800 dark:text-purple-200"
            >
              {lang}
            </span>
          ))}
          {project.languages.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-full 
                             bg-gray-200 dark:bg-gray-700 
                             text-gray-600 dark:text-gray-300">
              +{project.languages.length - 3}
            </span>
          )}
        </div>

        <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>Creado: <FormattedDate date={project.created_at} /></span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/api/v1/projects`);
        if (!response.ok) {
          throw new Error('Error al cargar los proyectos');
        }
        const data: ApiResponse = await response.json();
        if (data.success) {
          setProjects(data.projects);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProjects();
  }, []);
  

  const filteredProjects = useMemo(() => {
    return projects.filter(project => 
      (searchTerm === '' || 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        project.description?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === null || 
        project.categories?.includes(selectedCategory))
    );
  }, [projects, searchTerm, selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          <p className="text-purple-600 dark:text-purple-400">Cargando proyectos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
          <p className="text-red-600 dark:text-red-400">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <section id='proyectos' className="py-20 px-4 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wide text-purple-900 dark:text-purple-300">
              Proyectos
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">
              Explora mi colección de proyectos en GitHub. Cada repositorio representa
              un viaje de aprendizaje y desarrollo en diferentes tecnologías.
            </p>
          </motion.div>

          {/* Filtros y Búsqueda */}
          <div className="flex justify-center mb-8 space-x-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Buscar proyectos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-full 
                           bg-white dark:bg-gray-700 
                           border border-gray-200 dark:border-gray-600
                           focus:ring-2 focus:ring-purple-300 
                           transition-all duration-300"
              />
              <Search 
                size={20} 
                className="absolute left-3 top-1/2 -translate-y-1/2 
                           text-gray-400 dark:text-gray-300" 
              />
            </div>
          </div>

          {/* Grid de proyectos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project}
                onSelect={(name) => setSelectedProject(name)}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                No hay proyectos que coincidan con tu búsqueda.
              </p>
            </div>
          )}
        </div>
      </section>

      {selectedProject && (
        <ProjectModal 
          projectName={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default Projects;