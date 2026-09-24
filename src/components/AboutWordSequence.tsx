import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

const WORDS = [
  'Strategy',
  'Campaigns',
  'Copywriting',
  'Art Direction',
  'Branding',
  'UI/UX',
  'Video',
  'Web Design',
] as const;

const WORD_CLASS =
  'whitespace-nowrap text-right font-sans font-medium tracking-[-0.035em] text-white leading-[0.95] text-[clamp(2rem,4.6vw,5.4rem)]';

const STEP = 132;

type WordProps = {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
};

const SequenceWord: React.FC<WordProps> = ({ word, index, total, progress }) => {
  const opacity = useTransform(progress, (value) => {
    const distance = Math.abs(index - value * (total - 1));
    if (distance >= 1.7) return 0;
    if (distance <= 0.15) return 1;
    return 1 - (distance - 0.15) / 1.55;
  });

  return (
    <motion.p className={`flex h-[92px] items-center justify-end ${WORD_CLASS}`} style={{ opacity }} aria-hidden>
      {word}
    </motion.p>
  );
};

type AboutWordSequenceProps = {
  children: React.ReactNode;
};

const AboutWordSequence: React.FC<AboutWordSequenceProps> = ({ children }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const listY = useTransform(scrollYProgress, (value) => -value * (WORDS.length - 1) * STEP);

  return (
    <section
      id="about-me"
      ref={sectionRef}
      className="relative z-30"
      style={{ height: `${WORDS.length * 100}vh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {children}
        <div className="pointer-events-none absolute inset-y-0 right-[12%] z-20 flex w-[min(46vw,34rem)] items-center">
          <div className="relative h-[52vh] w-full overflow-hidden">
            <motion.div
              className="absolute right-0 flex w-full flex-col items-end gap-10"
              style={{ y: listY, top: '50%', marginTop: -46 }}
            >
              {WORDS.map((word, index) => (
                <SequenceWord
                  key={word}
                  word={word}
                  index={index}
                  total={WORDS.length}
                  progress={scrollYProgress}
                />
              ))}
            </motion.div>
          </div>
        </div>
        <p className="sr-only">{WORDS.join(', ')}</p>
      </div>
    </section>
  );
};

export default AboutWordSequence;
