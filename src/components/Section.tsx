import styles from './Section.module.scss';

import * as motion from 'motion/react-client';

import { Card, Section as RxSection, SectionProps } from '@radix-ui/themes';

const sectionVariant = {
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

const Section = ({ children }: SectionProps) => {
  return (
    <RxSection asChild className={styles._}>
      <Card
        asChild
        my={{ initial: '3', sm: '4' }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' opacity='.1' viewBox='0 0 300 300'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E")`,
        }}
      >
        <motion.section variants={sectionVariant}>{children}</motion.section>
      </Card>
    </RxSection>
  );
};

export default Section;
