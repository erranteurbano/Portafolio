"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Loader2, 
  Clock, 
  Code,
  X,
  Server,
  Laptop,
  Package
} from 'lucide-react';

// Tipos
interface Technology {
  client: string[];
  server: string[];
}

interface Project {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  created_at: string;
  updated_at: string;
  languages_url: string;
  languages: string[];
}

interface ProjectDetail {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  updated_at: string;
  languages: string[];
  technologies: Technology;
}

interface ApiResponse {
  success: boolean;
  message: string;
  projects: Project[];
}

interface ApiDetailResponse {
  success: boolean;
  message: string;
  projectData: ProjectDetail;
}

// Modal Component
const ProjectModal: React.FC<{
  projectName: string | null;
  onClose: () => void;
}> = ({ projectName, onClose }) => {
  const [projectDetail, setProjectDetail] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      if (!projectName) return;
      
      try {
        setLoading(true);
        const response = await fetch(`https://portfolio-vlch.onrender.com/api/v1/projects/${projectName}`);
        if (!response.ok) {
          throw new Error('Error al cargar los detalles del proyecto');
        }
        const data: ApiDetailResponse = await response.json();
        if (data.success) {
          setProjectDetail(data.projectData);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [projectName]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-300 flex items-center gap-2">
              <Code size={24} />
              {projectName?.replace(/-/g, ' ')}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
              </div>
            ) : error ? (
              <div className="text-red-500 dark:text-red-400 text-center">
                {error}
              </div>
            ) : projectDetail && (
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Descripción
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {projectDetail.description || 'No hay descripción disponible'}
                  </p>
                </div>

                {/* Languages */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                    <Package size={20} />
                    Lenguajes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {projectDetail.languages.map((lang) => (
                      <span
                        key={lang}
                        className="px-3 py-1 text-sm rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="space-y-4">
                  {/* Client Technologies */}
                  {projectDetail.technologies.client.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                        <Laptop size={20} />
                        Frontend
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {projectDetail.technologies.client.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Server Technologies */}
                  {projectDetail.technologies.server.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                        <Server size={20} />
                        Backend
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {projectDetail.technologies.server.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-sm rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* GitHub Link */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <a
                    href={projectDetail.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                  >
                    <Github size={20} />
                    <span>Ver en GitHub</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


export default ProjectModal