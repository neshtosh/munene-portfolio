import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { projects } from '../data/projects';
import { Project } from '../types';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const foundProject = projects.find(p => p.id === id) || null;
    setProject(foundProject);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project not found</h2>
          <Link
            to="/projects"
            className="inline-flex items-center text-primary font-medium"
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="pt-32 pb-12">
        <div className="container-custom">
          <Link
            to="/projects"
            className="inline-flex items-center text-muted hover:text-primary transition-colors mb-12"
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
          >
            <div>
              <span className="inline-block text-primary font-medium mb-4">{project.category}</span>
              <h1 className="font-display font-bold mb-6">{project.title}</h1>
              <p className="text-xl mb-8">{project.description}</p>
              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="text-sm text-muted uppercase mb-2">Year</h3>
                  <p>{project.year}</p>
                </div>
                <div>
                  <h3 className="text-sm text-muted uppercase mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-3 py-1 bg-highlight dark:bg-dark-600 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
                  >
                    Visit Site <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                )}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center border border-dark dark:border-light px-6 py-3 rounded-full font-medium hover:bg-highlight dark:hover:bg-dark-600 transition-colors"
                >
                  View Code <Github className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="aspect-video bg-highlight dark:bg-dark-600 rounded-lg overflow-hidden">
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Project Overview</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>{project.detailContent}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.</p>
              
              <h3>The Challenge</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.</p>
              
              <h3>The Solution</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* More Projects Section */}
      <section className="py-20 bg-highlight/30 dark:bg-dark-600/20">
        <div className="container-custom">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">More Projects</h2>
          <div className="space-y-2">
            {projects
              .filter(p => p.id !== project.id)
              .slice(0, 3)
              .map((p) => (
                <ProjectPreview key={p.id} project={p} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;