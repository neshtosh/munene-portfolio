import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

type SobhaRevealTitleProps = {
  text: string;
  className?: string;
  active?: boolean;
};

/**
 * Sobha Privy–style character reveal:
 * chars start faded + slightly offset, then cascade in with a soft ease.
 * Render inside an h1 so gradient text-fill still works on the parent.
 */
const SobhaRevealTitle: React.FC<SobhaRevealTitleProps> = ({
  text,
  className = '',
  active = true,
}) => {
  const [ready, setReady] = useState(false);
  const characters = useMemo(() => Array.from(text), [text]);

  useEffect(() => {
    if (!active) {
      setReady(false);
      return;
    }
    const id = window.setTimeout(() => setReady(true), 60);
    return () => window.clearTimeout(id);
  }, [active, text]);

  return (
    <span className={className} aria-hidden={!active}>
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
          initial={{
            opacity: 0,
            y: `${10 + (index % 4) * 5}%`,
            rotate: index % 2 === 0 ? -1.5 : 1.5,
          }}
          animate={
            ready
              ? { opacity: 1, y: '0%', rotate: 0 }
              : {
                  opacity: 0,
                  y: `${10 + (index % 4) * 5}%`,
                  rotate: index % 2 === 0 ? -1.5 : 1.5,
                }
          }
          transition={{
            duration: 1.4,
            ease: [0.29, 0.52, 0.5, 1],
            delay: index * 0.02,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

export default SobhaRevealTitle;
