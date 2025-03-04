import * as motion from 'motion/react-client';

import { VisuallyHidden } from '@radix-ui/themes';

interface CharacterFadeProps {
  children: string;
}

const characterVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const CharacterFade = ({ children }: CharacterFadeProps) => (
  <motion.span
    initial='hidden'
    animate='show'
    transition={{ staggerChildren: 0.01, delayChildren: 0.5 }}
  >
    <VisuallyHidden>{children}</VisuallyHidden>
    {[...children].map((char, index) => (
      <motion.span aria-hidden key={index} variants={characterVariants}>
        {char}
      </motion.span>
    ))}
  </motion.span>
);

export default CharacterFade;
