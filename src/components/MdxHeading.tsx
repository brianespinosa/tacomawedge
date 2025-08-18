import { Heading } from '@radix-ui/themes';

import CharacterFade from './CharacterFade';

interface MdxHeadingProps {
  heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: string;
}

const MdxHeading = ({ heading, children }: MdxHeadingProps) => {
  const level = Number(heading.replace('h', ''));
  const reducedLevel = level === 6 ? 6 : level + 1;
  const newHeading = `h${reducedLevel}` as MdxHeadingProps['heading'];

  return (
    <Heading
      size={
        reducedLevel === 3
          ? '6'
          : ((8 - reducedLevel).toString() as '1' | '2' | '3' | '4' | '5' | '6')
      }
      as={newHeading}
      my={reducedLevel === 3 ? '6' : '4'}
      color={reducedLevel === 3 ? 'cyan' : undefined}
    >
      <CharacterFade>{children}</CharacterFade>
    </Heading>
  );
};

export default MdxHeading;
