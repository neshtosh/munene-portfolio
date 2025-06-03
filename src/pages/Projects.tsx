import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectPreview from '../components/ProjectPreview';

const Projects: React.FC = () => {

  const projectsContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const projectItem = {
    hidden: { opacity: 0, y: 50, rotateZ: -2 },
    show: { opacity: 1, y: 0, rotateZ: 0, transition: { duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] } },
  };
  
  return (
    <section className="pt-32 pb-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50, rotateZ: -5 }}
          animate={{ opacity: 1, y: 0, rotateZ: 0 }}
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="mb-12"
        >
          <h1 className="font-display font-bold mb-6">Selected Projects</h1>
          {/* Removed description and category filter */}
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={projectsContainer}
          className=""
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={projectItem}>
              <ProjectPreview project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;