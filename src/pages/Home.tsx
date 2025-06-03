import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectPreview from '../components/ProjectPreview';
import { projects } from '../data/projects';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import type { Engine } from '@tsparticles/engine';
import { useTheme } from '../context/ThemeContext';

const Home: React.FC = () => {
  const [particlesInitd, setParticlesInitd] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    }).then(() => {
      setParticlesInitd(true);
    });
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] } },
  };

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

  const particlesOptions = {
    fullScreen: {
      enable: false,
    },
    particles: {
      number: {
        value: 16200,
        density: {
          enable: true,
          area: 100,
        },
      },
      color: {
        value: isDarkMode ? "#ffffff" : "#1a1a1a",
      },
      shape: {
        type: "circle",
      },
      shadow: {
        enable: true,
        blur: 15,
        color: isDarkMode ? "#ffffff" : "#1a1a1a",
        offset: { x: 0, y: 0 },
      },
      opacity: {
        value: 0.8,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.2,
          sync: false,
        },
      },
      size: {
        value: { min: 0.05, max: 2 },
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.05,
          sync: false,
        },
      },
      links: {
        enable: true,
        distance: 50,
        color: isDarkMode ? "#ffffff" : "#1a1a1a",
        opacity: 0.2,
        width: 0.5,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "attract",
        },
        onClick: {
          enable: false,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        attract: {
          distance: 400,
          duration: 0.2,
          factor: 20,
          maxSpeed: 5,
        },
      },
    },
    detectRetina: true,
  };

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 pb-20 relative overflow-hidden">
        {particlesInitd && (
          <Particles
            id="tsparticles"
            options={particlesOptions as any}
            className="absolute inset-0 z-0"
          />
        )}
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50, rotateZ: -5 }}
            animate="show"
            variants={container}
            className="max-w-4xl"
          >
            <motion.p variants={item} className="text-primary font-display text-lg mb-4">
              John Doe — Web Developer & Designer
            </motion.p>
            <motion.h1 variants={item} className="font-display font-bold mb-6">
              Creating digital experiences that connect & inspire
            </motion.h1>
            <motion.p variants={item} className="text-xl md:text-2xl text-muted max-w-3xl mb-8">
              Building fast, responsive, and beautiful digital products with a focus on user experience and performance.
            </motion.p>
            <motion.div variants={item} className="flex flex-wrap gap-4">
              <Link 
                to="/projects"
                className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                View Projects <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center border border-dark dark:border-light px-6 py-3 rounded-full font-medium hover:bg-highlight dark:hover:bg-dark-600 transition-colors"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
          >
            <a 
              href="#featured-work"
              className="flex flex-col items-center text-muted hover:text-dark dark:hover:text-light transition-colors"
            >
              <span className="text-sm mb-2">Scroll to explore</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section id="featured-work" className="py-24 bg-highlight/30 dark:bg-muted/20 bg-dot-pattern">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50, rotateZ: -5 }}
            whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-16">
              Featured Work
            </h2>

            <motion.div
              initial="hidden"
              whileInView="show"
              variants={projectsContainer}
              viewport={{ once: true, margin: "-100px" }}
            >
              {projects.slice(0, 3).map((project) => (
                <motion.div key={project.id} variants={projectItem}>
                  <ProjectPreview project={project} />
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-16 text-center">
              <Link
                to="/projects"
                className="inline-flex items-center text-dark dark:text-light font-medium hover:text-primary dark:hover:text-primary transition-colors"
              >
                View all projects <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Teaser Section */}
      <section className="py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50, rotateZ: -5 }}
            whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                About Me
              </h2>
              <p className="text-lg md:text-xl mb-6">
                I'm a web developer and designer with over 5 years of experience crafting digital solutions for brands and businesses.
              </p>
              <p className="text-muted mb-8">
                My approach combines technical expertise with design sensibility to create experiences that are both functional and beautiful.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center text-dark dark:text-light font-medium hover:text-primary dark:hover:text-primary transition-colors"
              >
                Learn more about my process <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <div className="bg-highlight dark:bg-dark-600 aspect-square rounded-md flex items-center justify-center">
              <p className="text-center text-muted">Profile Image</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Teaser */}
      <section className="py-24 bg-primary text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 50, rotateZ: -5 }}
            whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Let's work together
            </h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-10">
              Have a project in mind? Let's discuss how we can bring your ideas to life.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-white text-primary px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-colors"
            >
              Get in Touch <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;