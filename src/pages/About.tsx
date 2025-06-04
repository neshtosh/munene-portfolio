import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownToLine, Code, Laptop, Zap } from 'lucide-react';

const About: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const skills = [
    'JavaScript (ES6+)', 
    'TypeScript', 
    'React', 
    'Next.js', 
    'Node.js', 
    'Express',
    'TailwindCSS', 
    'SASS/SCSS', 
    'GraphQL', 
    'RESTful APIs',
    'Figma', 
    'UI/UX Design', 
    'Responsive Design',
    'Git/GitHub'
  ];

  return (
    <>
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="max-w-4xl"
          >
            <motion.p variants={item} className="text-primary font-display text-lg mb-4">
              About
            </motion.p>
            <motion.h1 variants={item} className="font-display font-bold mb-8">
              Developer & Designer based in Kenya
            </motion.h1>
            <motion.div variants={item} className="space-y-6 text-lg">
              <p>
                I'm a full-stack developer with a passion for creating intuitive and engaging digital experiences. My journey in web development began over 5 years ago, and since then, I've worked with clients ranging from startups to established businesses.
              </p>
              <p>
                My approach combines technical expertise with a strong design sensibility. I believe that great digital products should not only function flawlessly but also connect with users on an emotional level through thoughtful design.
              </p>
              <p>
                When I'm not coding or designing, you can find me exploring hiking trails, experimenting with new recipes, or attending local tech meetups.
              </p>
            </motion.div>
            <motion.div variants={item} className="mt-8">
              <a
                href="/resume.pdf"
                className="inline-flex items-center border border-dark dark:border-light px-6 py-3 rounded-full font-medium hover:bg-highlight dark:hover:bg-dark-600 transition-colors"
              >
                Download Resume <ArrowDownToLine className="ml-2 w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-highlight/30 dark:bg-dark-600/20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display text-4xl font-bold mb-4">Services</h2>
            <p className="text-xl text-muted max-w-2xl">
              I specialize in delivering end-to-end solutions for digital products and experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="p-8 border border-highlight dark:border-dark-600 rounded-lg"
            >
              <Code className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-display font-bold mb-2">Web Development</h3>
              <p className="text-muted">
                Building responsive, accessible, and performant websites and web applications using modern technologies.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-8 border border-highlight dark:border-dark-600 rounded-lg"
            >
              <Laptop className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-display font-bold mb-2">UI/UX Design</h3>
              <p className="text-muted">
                Crafting intuitive user interfaces and experiences that are both aesthetically pleasing and functional.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="p-8 border border-highlight dark:border-dark-600 rounded-lg"
            >
              <Zap className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-display font-bold mb-2">Performance Optimization</h3>
              <p className="text-muted">
                Improving website speed, accessibility, and overall user experience through technical optimization.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display text-4xl font-bold mb-4">Skills & Technologies</h2>
            <p className="text-xl text-muted max-w-2xl">
              A selection of technologies and tools I work with regularly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3"
          >
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="px-4 py-2 bg-light dark:bg-dark-400 border border-highlight dark:border-dark-800 rounded-full text-sm font-medium dark:text-dark "
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;