import React, { useCallback, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectPreview from '../components/ProjectPreview';
import { projects } from '../data/projects';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import type { Engine } from '@tsparticles/engine';
import { useTheme } from '../context/ThemeContext';
import LoadingScreen from '../components/LoadingScreen';
import profileImage from '../assets/profileimage.png';

const Home: React.FC = () => {
  const [particlesInitd, setParticlesInitd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useTheme();
  const controls = useAnimation();

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    }).then(() => {
      setParticlesInitd(true);
    });
  }, []);

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const container = {
    hidden: { opacity: 0, y: 50 },
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
        value: 500,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: isDarkMode ? "#ffffff" : "#1a1a1a",
      },
      shape: {
        type: "circle",
      },
      shadow: {
        enable: false,
      },
      opacity: {
        value: 0.6,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.2,
          sync: false,
        },
      },
      size: {
        value: { min: 1, max: 3 },
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false,
        },
      },
      links: {
        enable: true,
        distance: 150,
        color: isDarkMode ? "#ffffff" : "#1a1a1a",
        opacity: 0.3,
        width: 1.2,
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
        },
        onTouch: {
          enable: true,
          mode: "attract",
        },
        resize: true,
      },
      modes: {
        attract: {
          distance: 400,
          duration: 0.2,
          factor: 24,
          maxSpeed: 6,
        },
      },
    },
    detectRetina: true,
  };

  return (
    <>
      <LoadingScreen isLoading={isLoading} onLoadingComplete={handleLoadingComplete} />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="min-h-screen flex items-center pt-20 pb-20 relative overflow-hidden"
      >
        {particlesInitd && (
          <Particles
            id="tsparticles"
            options={particlesOptions as any}
            className="absolute inset-0 z-0"
          />
        )}
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate="show"
            variants={container}
            className="max-w-4xl"
          >
            <motion.p variants={item} className="text-primary font-display text-lg mb-4">
              Alex Munene — Crafting Digital Experiences
            </motion.p>
            {/* Define animated characters array before rendering */}
            {/* const animatedCharacters = Array.from('Connect & Inspire').map((char, index) => ( */}
            {/*   <motion.span */}
            {/*     key={`${char}-${index}`} */}
            {/*     initial={{ opacity: 0, y: 10 }} */}
            {/*     animate={{ opacity: 1, y: 0 }} */}
            {/*     transition={{ */}
            {/*       duration: 0.4,  */}
            {/*       ease: [0.04, 0.62, 0.23, 0.98], */}
            {/*       delay: index * 0.03 // Stagger delay */}
            {/*     }}  */}
            {/*     style={{ display: 'inline-block', whiteSpace: 'pre' }} // Preserve spaces and ensure block display */}
            {/*   > */}
            {/*     {char === ' ' ? '\u00A0' : char} */}
            {/*   </motion.span> */}
            {/* )); */}

            {/* return ( */}
              <motion.h1 
                // Use motion.h1 with variants for staggered children animation
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.03 // Stagger delay between characters
                    }
                  }
                }}
                initial="hidden"
                animate="show"
                className="font-display font-bold mb-6 text-3xl md:text-4xl"
              >
                {Array.from('Connect & Inspire').map((char, index) => (
                  <motion.span
                    key={`${char}-${index}`}
                    // Define individual character animation variants
                    variants={{
                      hidden: { opacity: 0, y: 10 }, // Initial state
                      show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] } } // Animate to this state
                    }}
                    style={{ display: 'inline-block', whiteSpace: 'pre' }} // Preserve spaces and ensure block display
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.h1>
            {/* ); */}
            <motion.div variants={item} className="flex flex-wrap gap-4">
              <Link 
                to="/projects"
                className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                Explore Projects <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center border border-dark dark:border-light px-6 py-3 rounded-full font-medium hover:bg-highlight dark:hover:bg-dark-600 transition-colors"
              >
                Reach Out
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute -bottom-36 md:-bottom-60 left-1/2 -translate-x-1/2"
          >
            <a 
              href="#featured-work"
              className="flex flex-col items-center text-muted hover:text-dark dark:hover:text-light transition-colors"
            >
              <span className="text-sm mb-3">psst, over here</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </motion.section>

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
                I'm a web developer and designer with over 2 years of experience crafting digital solutions for brands and businesses.
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
            <div className="bg-highlight dark:bg-dark-600 aspect-square rounded-md overflow-hidden">
              <img 
                src={profileImage} 
                alt="Alex Munene" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Teaser */}
      <section className="py-24 relative overflow-hidden">
        {/* Space Background */}
        <div className="absolute inset-0">
          {/* Galaxy Background */}
          <div className="absolute inset-0 bg-[url('/galaxy-bg.jpg')] bg-cover bg-center opacity-40 dark:opacity-30" />
          
          {/* Animated Stars */}
          <div className="absolute inset-0">
            {/* Main Star Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.8)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[length:40px_40px] animate-twinkle" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.8)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[length:35px_35px] animate-twinkle-delayed" />
            
            {/* Additional Star Layer */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.8)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[length:45px_45px] animate-twinkle-delayed-2" />
            
            {/* Star Glow Effect */}
            <div className="absolute inset-0">
              {/* Core Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.48)_3px,transparent_3px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.48)_3px,transparent_3px)] bg-[length:50px_50px] animate-twinkle-slow" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.48)_3px,transparent_3px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.48)_3px,transparent_3px)] bg-[length:45px_45px] animate-twinkle-slow-delayed" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.48)_3px,transparent_3px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.48)_3px,transparent_3px)] bg-[length:55px_55px] animate-twinkle-slow-delayed-2" />
              
              {/* Diffused Outer Glow */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.24)_5px,transparent_7px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.24)_5px,transparent_7px)] bg-[length:50px_50px] animate-twinkle-slow blur-[1px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.24)_5px,transparent_7px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.24)_5px,transparent_7px)] bg-[length:45px_45px] animate-twinkle-slow-delayed blur-[1px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.24)_5px,transparent_7px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.24)_5px,transparent_7px)] bg-[length:55px_55px] animate-twinkle-slow-delayed-2 blur-[1px]" />
              </div>

              {/* Soft Light Emission */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.12)_7px,transparent_10px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.12)_7px,transparent_10px)] bg-[length:50px_50px] animate-twinkle-slow blur-[2px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.12)_7px,transparent_10px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.12)_7px,transparent_10px)] bg-[length:45px_45px] animate-twinkle-slow-delayed blur-[2px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.12)_7px,transparent_10px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.12)_7px,transparent_10px)] bg-[length:55px_55px] animate-twinkle-slow-delayed-2 blur-[2px]" />
              </div>
            </div>

          </div>

          {/* Nebula Effect */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 dark:bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 dark:bg-primary/20 rounded-full blur-3xl animate-pulse-slow-reverse" />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background dark:via-background/50" />
        </div>

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 50, rotateZ: -5 }}
            whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative inline-block mb-8"
            >
              <div className="absolute -inset-4 bg-primary/10 dark:bg-primary/10 rounded-full blur-xl" />
              <h2 className="font-display text-4xl md:text-5xl font-bold relative">
              Let's work together
            </h2>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-muted max-w-2xl mx-auto mb-12"
            >
              Have a project in mind? Let's discuss how we can bring your ideas to life.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
            <Link
              to="/contact"
                className="group relative inline-flex items-center px-8 py-4 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 dark:from-primary/20 dark:to-primary/10 rounded-full transition-all duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative font-medium text-dark dark:text-light group-hover:text-white transition-colors">
                  Get in Touch <ArrowRight className="ml-2 w-4 h-4 inline-block transition-transform duration-300 group-hover:translate-x-1" />
                </span>
            </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.8; }
          }

          @keyframes twinkle-delayed {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.7; }
          }

          @keyframes twinkle-delayed-2 {
            0%, 100% { opacity: 0.35; }
            50% { opacity: 0.75; }
          }

          @keyframes twinkle-slow {
            0%, 100% { opacity: 0.24; }
            50% { opacity: 0.48; }
          }

          @keyframes twinkle-slow-delayed {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.44; }
          }

          @keyframes twinkle-slow-delayed-2 {
            0%, 100% { opacity: 0.28; }
            50% { opacity: 0.52; }
          }

          .animate-twinkle {
            animation: twinkle 4s ease-in-out infinite;
          }

          .animate-twinkle-delayed {
            animation: twinkle-delayed 4s ease-in-out infinite;
            animation-delay: 1.3s;
          }

          .animate-twinkle-delayed-2 {
            animation: twinkle-delayed-2 4s ease-in-out infinite;
            animation-delay: 2.6s;
          }

          .animate-twinkle-slow {
            animation: twinkle-slow 6s ease-in-out infinite;
          }

          .animate-twinkle-slow-delayed {
            animation: twinkle-slow-delayed 6s ease-in-out infinite;
            animation-delay: 2s;
          }

          .animate-twinkle-slow-delayed-2 {
            animation: twinkle-slow-delayed-2 6s ease-in-out infinite;
            animation-delay: 4s;
          }

          @keyframes pulse-slow {
            0% { opacity: 0.15; transform: scale(1); }
            50% { opacity: 0.25; transform: scale(1.1); }
            100% { opacity: 0.15; transform: scale(1); }
          }

          @keyframes pulse-slow-reverse {
            0% { opacity: 0.15; transform: scale(1); }
            50% { opacity: 0.25; transform: scale(0.9); }
            100% { opacity: 0.15; transform: scale(1); }
          }

          .animate-pulse-slow {
            animation: pulse-slow 8s ease-in-out infinite;
          }

          .animate-pulse-slow-reverse {
            animation: pulse-slow-reverse 8s ease-in-out infinite;
          }
        `}
      </style>
    </>
  );
};

export default Home;