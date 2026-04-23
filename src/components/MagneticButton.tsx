import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  strength?: number;
}

const MagneticButton = ({ children, className, href, onClick, style, strength = 0.35 }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setPos({ x, y });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  const inner = (
    <motion.div
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 22, mass: 0.5 }}
      style={{ display: 'inline-flex', width: '100%' }}
    >
      {href ? (
        <a href={href} className={className} style={{ ...style, width: '100%', justifyContent: 'center' }}>
          {children}
        </a>
      ) : (
        <button onClick={onClick} className={className} style={{ ...style, width: '100%' }}>
          {children}
        </button>
      )}
    </motion.div>
  );

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-flex' }}
    >
      {inner}
    </div>
  );
};

export default MagneticButton;
