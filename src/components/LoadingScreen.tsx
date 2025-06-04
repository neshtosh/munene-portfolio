import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading, onLoadingComplete }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <motion.div
            initial={{ scale: 1, y: 0 }}
            animate={{ scale: 0.5, y: -100 }}
            transition={{ 
              duration: 1.5,
              ease: [0.04, 0.62, 0.23, 0.98],
              delay: 3.5
            }}
            onAnimationComplete={onLoadingComplete}
            className="relative w-16 h-16"
          >
            <motion.div
              initial={{ rotateY: 0, opacity: 1 }}
              animate={{ rotateY: 180, opacity: 0 }}
              transition={{ 
                duration: 1,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center">
                <span className="text-xs tracking-widest uppercase text-dark/60 dark:text-light/60">Welcome</span>
                <div className="flex justify-center gap-1 mt-1">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="text-xs text-dark/60 dark:text-light/60"
                  >
                    .
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                    className="text-xs text-dark/60 dark:text-light/60"
                  >
                    .
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.9 }}
                    className="text-xs text-dark/60 dark:text-light/60"
                  >
                    .
                  </motion.span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ rotateY: -180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ 
                duration: 1,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute inset-0"
            >
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="w-full h-full object-contain dark:invert"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen; 