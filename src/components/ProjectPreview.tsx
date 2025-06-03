import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Project } from '../types';

interface ProjectPreviewProps {
  project: Project;
}

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <Link 
        to={`/projects/${project.id}`} 
        className="project-card group flex items-center"
      >
        <div className="flex-shrink-0 w-20 text-sm text-muted mr-8">
          {project.year}
        </div>
        <div className="flex-grow">
          <h3 className="text-3xl md:text-4xl font-display font-bold group-hover:text-primary transition-colors">
            {project.title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectPreview;