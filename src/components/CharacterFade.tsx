import { VisuallyHidden } from '@radix-ui/themes';
import * as motion from 'motion/react-client';

interface CharacterFadeProps {
  children: string;
}

const characterVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const CharacterFade = ({ children }: CharacterFadeProps) => (
  <>
    <VisuallyHidden>{children}</VisuallyHidden>
    <motion.span
      role='presentation'
      initial='hidden'
      animate='show'
      transition={{ staggerChildren: 0.01, delayChildren: 0.5 }}
    >
      {[...children].map((char, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: character position is stable for string splitting
        <motion.span key={`${index}-${char}`} variants={characterVariants}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  </>
);

export default CharacterFade;
