import React, { useEffect, useState } from 'react';

type OvalAccentProps = {
  className?: string;
};

/**
 * Animated oval underline from /oval.svg.
 * Remounts on an interval so the SMIL draw animation loops.
 */
const OvalAccent: React.FC<OvalAccentProps> = ({ className = '' }) => {
  const [loopKey, setLoopKey] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setLoopKey((key) => key + 1);
    }, 1450);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span
      className={`pointer-events-none absolute left-1/2 top-1/2 z-0 aspect-[5/3] w-[128%] max-w-none -translate-x-1/2 -translate-y-[58%] invert opacity-90 dark:invert-0 ${className}`}
      aria-hidden
    >
      <img
        key={loopKey}
        src={`/oval.svg?loop=${loopKey}`}
        alt=""
        className="h-full w-full object-contain"
      />
    </span>
  );
};

export default OvalAccent;
