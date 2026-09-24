import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectPreview from '../components/ProjectPreview';
import { projects } from '../data/projects';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine } from '@tsparticles/engine';
import LoadingScreen from '../components/LoadingScreen';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import WireframeTerrain from '../components/WireframeTerrain';
import AboutWordSequence from '../components/AboutWordSequence';
import ScrollHighlightWords from '../components/ScrollHighlightWords';
import SobhaRevealTitle from '../components/SobhaRevealTitle';
import OvalAccent from '../components/OvalAccent';

const ABOUT_ME_LOTTIE_SRC =
  'https://lottie.host/d99459bc-822c-4453-a397-5e678103fd0e/CCjDEgyPFk.lottie';

const Home: React.FC = () => {
  const [particlesInitd, setParticlesInitd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [enableParticles, setEnableParticles] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isNarrow = window.matchMedia('(max-width: 768px)').matches;
    if (reduceMotion || isNarrow) {
      setEnableParticles(false);
      return;
    }
    setEnableParticles(true);
  }, []);

  useEffect(() => {
    if (isLoading || !enableParticles) return;

    let cancelled = false;
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback
      : (cb: IdleRequestCallback) => window.setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 0 } as IdleDeadline), 200);

    const id = idle(() => {
      initParticlesEngine(async (engine: Engine) => {
        await loadSlim(engine);
      }).then(() => {
        if (!cancelled) setParticlesInitd(true);
      });
    });

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(id as number);
      else window.clearTimeout(id as number);
    };
  }, [isLoading, enableParticles]);

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

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
    fpsLimit: 45,
    particles: {
      number: {
        value: 55,
        density: {
          enable: true,
          area: 900,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: { min: 0.2, max: 0.55 },
      },
      size: {
        value: { min: 1, max: 2.5 },
      },
      links: {
        enable: true,
        distance: 130,
        color: "#ffffff",
        opacity: 0.22,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.7,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        onClick: {
          enable: false,
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          links: { opacity: 0.35 },
        },
      },
    },
    detectRetina: true,
  };

  return (
    <>
      <LoadingScreen isLoading={isLoading} onLoadingComplete={handleLoadingComplete} />

      {/* Sticky stack (desktop): hero + trusted stay; Featured / About slide over.
          On mobile, sections flow normally for smoother scrolling. */}
      <div className="relative">
      {/* Hero — sticky under following panels (md+) */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative md:sticky md:top-0 z-0 min-h-[100svh] flex items-center pt-20 pb-16 md:pb-20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src="/newhero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        </div>
        {particlesInitd && enableParticles && (
          <div className="absolute inset-0 z-10">
            <Particles
              id="tsparticles"
              options={particlesOptions as any}
              className="absolute inset-0"
            />
          </div>
        )}
        <div className="container-custom relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate="show"
            variants={container}
            className="max-w-5xl"
          >
            <motion.p
              variants={item}
              className="text-white/50 font-sans text-xs sm:text-sm md:text-base tracking-[0.12em] sm:tracking-[0.18em] uppercase mb-4 sm:mb-6 max-w-[90%]"
            >
              Alex Munene — Crafting Digital Experiences
            </motion.p>
            <h1 className="hero-honey-title mb-6 sm:mb-8 text-[2.1rem] leading-[0.95] sm:text-5xl md:text-7xl lg:text-[7.5rem] max-w-5xl break-words">
              <SobhaRevealTitle text="Connect & Inspire" active={!isLoading} />
            </h1>
            <motion.div variants={item} className="flex flex-wrap gap-3 sm:gap-4">
              <Link 
                to="/projects"
                className="inline-flex items-center bg-primary text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-medium hover:bg-primary/90 transition-colors"
              >
                Explore Projects <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center border border-white/70 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-medium hover:bg-white/10 transition-colors"
              >
                Reach Out
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 md:-bottom-36 lg:-bottom-60"
          >
            <a 
              href="#trusted-by"
              className="flex flex-col items-center text-white/50 hover:text-white transition-colors"
            >
              <span className="text-xs sm:text-sm mb-2 sm:mb-3 tracking-wide">psst, over here</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Trusted By — sticky on md+ so Featured can slide over it */}
      <section
        id="trusted-by"
        className="relative md:sticky md:top-0 z-10 border-t border-white/10 bg-dark py-12 sm:py-16 md:py-20"
      >
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center px-1">
            <h2 className="font-sans text-xl sm:text-2xl font-normal tracking-[-0.03em] text-light md:text-3xl">
              Trusted by these companies
            </h2>
            <p className="mt-3 font-sans text-xs sm:text-sm tracking-wide text-white/40 md:text-base">
              used by the world&apos;s leading teams &amp; startups
            </p>
          </div>

          <ul className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-6 sm:gap-x-10 sm:gap-y-8 md:mt-14 md:gap-x-14 md:gap-y-10">
            {[
              { src: '/logos/tikiti.png', alt: 'Tikiti' },
              { src: '/logos/pressbox.png', alt: 'Pressbox' },
              { src: '/logos/smata.png', alt: 'Smata' },
              { src: '/logos/talanta.png', alt: 'Talanta' },
              { src: '/logos/teksmart.png', alt: 'Teksmart' },
              { src: '/logos/kibo-finance.png', alt: 'Kibo Finance' },
              { src: '/logos/mavuno-foods.png', alt: 'Mavuno Foods' },
              { src: '/logos/grand-memories.png', alt: 'Grand Memories Resort & Spa' },
              { src: '/logos/taji.png', alt: 'M-taji' },
            ].map((logo) => (
              <li key={logo.src} className="flex items-center justify-center">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-6 w-auto max-w-[6.5rem] object-contain opacity-45 transition-opacity duration-300 hover:opacity-70 sm:h-8 sm:max-w-[7.5rem] md:h-9 md:max-w-[8.5rem]"
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured Work — stacks over Trusted / hero on md+ */}
      <section
        id="featured-work"
        className="relative z-20 py-16 sm:py-20 md:py-24 bg-highlight dark:bg-[#161616] bg-dot-pattern"
      >
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50, rotateZ: -5 }}
            whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="relative inline-block font-sans font-normal tracking-[-0.04em] text-3xl sm:text-4xl md:text-5xl mb-6 text-dark dark:text-light">
              <OvalAccent />
              <span className="relative z-10">
                <ScrollHighlightWords text="Featured Work" as="span" className="block" />
              </span>
            </h2>
            <ScrollHighlightWords
              text="Selected projects spanning product interfaces, brand sites, and interactive experiences."
              className="font-sans text-base sm:text-lg md:text-xl lg:text-[1.55rem] leading-relaxed md:leading-[1.5] text-dark dark:text-light max-w-3xl mb-10 sm:mb-16"
            />

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

            <div className="mt-12 sm:mt-16 text-center">
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

      {/* About Me — pinned while the word sequence scrubs with scroll */}
      <AboutWordSequence>
        <div className="pointer-events-none absolute inset-0 bg-black">
          <div className="absolute inset-x-0 top-[7%] aspect-[16/9] w-full">
            <WireframeTerrain />
          </div>
        </div>
        <div className="container-custom relative z-10 flex h-full items-center py-16 sm:py-20 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 50, rotateZ: -5 }}
            whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-xl md:max-w-[46%]"
          >
            <div className="mb-6 space-y-3 md:space-y-4">
              <h2 className="font-sans font-normal tracking-[-0.04em] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-light">
                <ScrollHighlightWords text="About Me" as="span" className="block" />
              </h2>
              <span
                className="relative block h-[3.15rem] w-full max-w-[9rem] -translate-y-[10%] sm:max-w-[10.8rem] md:h-[4.05rem] md:max-w-[12.6rem] lg:max-w-[14.4rem] [filter:brightness(0)_invert(1)]"
                aria-hidden
              >
                <DotLottieReact
                  src={ABOUT_ME_LOTTIE_SRC}
                  loop
                  autoplay
                  className="h-full w-full"
                />
              </span>
            </div>
            <ScrollHighlightWords
              text="I'm a web developer and designer with over 5 years of experience crafting digital solutions for brands and businesses."
              className="font-sans text-base sm:text-lg md:text-xl lg:text-[1.55rem] leading-relaxed md:leading-[1.5] mb-6 text-light"
            />
            <ScrollHighlightWords
              text="My approach combines technical expertise with design sensibility to create experiences that are both functional and beautiful."
              className="font-sans text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed md:leading-[1.5] mb-8 text-light"
            />
            <Link
              to="/about"
              className="inline-flex items-center text-light font-medium hover:text-primary transition-colors"
            >
              Learn more about my process <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </AboutWordSequence>
      </div>

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
              <h2 className="font-sans font-normal tracking-[-0.04em] text-4xl md:text-5xl relative text-dark dark:text-light">
                <ScrollHighlightWords text="Let's work together" as="span" className="block" />
              </h2>
            </motion.div>

            <ScrollHighlightWords
              text="Have a project in mind? Let's discuss how we can bring your ideas to life."
              className="font-sans text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto mb-12 text-dark dark:text-light"
            />

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