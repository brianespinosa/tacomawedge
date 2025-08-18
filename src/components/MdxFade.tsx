import * as motion from 'motion/react-client';

interface MdxFadeProps {
  as: 'p' | 'ul' | 'ol';
  children: string;
}

const fadeVariant = {
  hidden: { opacity: 0, filter: 'blur(.5em)', y: '1em' },
  show: {
    opacity: 1,
    filter: 'blur(0)',
    y: '0',
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const MdxFade = ({ children, as }: MdxFadeProps) => {
  const FadeComponent = motion[as];

  return <FadeComponent variants={fadeVariant}>{children}</FadeComponent>;
};

export default MdxFade;
