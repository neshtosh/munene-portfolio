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
    <section className="pt-32 pb-20 relative overflow-hidden">
      {/* Optical Illusion Pattern Background */}
      <div className="absolute inset-0 bg-highlight/10 dark:bg-dark-600/10">
        {/* Layer 1: Moving Grid */}
        <div className="absolute inset-0 opacity-15 dark:opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(90deg, currentColor 1.5px, transparent 1.5px),
                               linear-gradient(0deg, currentColor 1.5px, transparent 1.5px)`,
              backgroundSize: '40px 40px',
              backgroundPosition: 'center center',
              animation: 'float 20s linear infinite'
            }} 
          />
        </div>

        {/* Layer 2: Rotating Lines */}
        <div className="absolute inset-0 opacity-15 dark:opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(45deg, currentColor 1.5px, transparent 1.5px),
                               linear-gradient(-45deg, currentColor 1.5px, transparent 1.5px)`,
              backgroundSize: '60px 60px',
              backgroundPosition: 'center center',
              animation: 'rotate 30s linear infinite'
            }} 
          />
        </div>

        {/* Layer 3: Pulsing Dots */}
        <div className="absolute inset-0 opacity-10 dark:opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at center, currentColor 1.5px, transparent 1.5px)`,
              backgroundSize: '30px 30px',
              backgroundPosition: 'center center',
              animation: 'pulse 2s ease-in-out infinite'
            }} 
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-highlight/20 dark:to-dark-600/20" />
      </div>

      <style>
        {`
          @keyframes float {
            0% { transform: translate(0, 0); }
            25% { transform: translate(-1px, 1px); }
            50% { transform: translate(1px, -1px); }
            75% { transform: translate(-1px, -1px); }
            100% { transform: translate(0, 0); }
          }

          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.02); opacity: 1; }
            100% { transform: scale(1); opacity: 0.8; }
          }
        `}
      </style>

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 50, rotateZ: -5 }}
          animate={{ opacity: 1, y: 0, rotateZ: 0 }}
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="mb-16"
        >
          <h1 className="font-display font-bold mb-6">Selected Projects</h1>
          <p className="text-xl text-muted max-w-2xl">
            A collection of my recent work, showcasing my approach to design and development.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={projectsContainer}
          className="relative"
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