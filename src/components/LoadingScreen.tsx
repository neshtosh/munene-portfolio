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
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 0.85, opacity: 0 }}
            transition={{
              duration: 0.55,
              ease: [0.04, 0.62, 0.23, 0.98],
              delay: 0.65,
            }}
            onAnimationComplete={onLoadingComplete}
            className="relative w-14 h-14"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="w-full h-full object-contain dark:invert"
              width={56}
              height={56}
              decoding="async"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
