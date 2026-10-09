import { motion, type HTMLMotionProps } from 'motion/react';
import { type CSSProperties } from 'react';
import { usePointerSurface } from '../lib/usePointerSurface';
import '../styles/project-hover.css';

export default function ProjectHoverCard({ children, accent, ...props }: HTMLMotionProps<'article'> & { accent: string }) {
  const pointer = usePointerSurface<HTMLElement>();
  return <motion.article {...props} {...pointer} style={{ ...props.style, '--hover-accent': accent } as CSSProperties}>
    {children}
  </motion.article>;
}
