import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 150, damping: 18, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 150, damping: 18, mass: 0.5 });

  const isHovering = useRef(false);
  const scale = useSpring(1, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const onEnter = () => { isHovering.current = true; scale.set(2.2); };
    const onLeave = () => { isHovering.current = false; scale.set(1); };

    window.addEventListener('mousemove', moveCursor);

    const interactables = document.querySelectorAll('a, button, [role="button"]');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Outer ring — lags behind */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1.5px solid rgba(232,80,10,0.5)',
          pointerEvents: 'none',
          zIndex: 9999,
          scale,
          mixBlendMode: 'multiply',
        }}
      />
      {/* Inner dot — exact position */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          background: 'var(--accent)',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
    </>
  );
};

export default CustomCursor;
