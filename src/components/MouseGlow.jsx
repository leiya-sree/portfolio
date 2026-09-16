import { useEffect, useRef } from 'react';

export default function MouseGlow() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = ref.current;
    let raf = 0;
    const move = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
        el.style.opacity = '1';
      });
    };
    const leave = () => {
      el.style.opacity = '0';
    };
    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 -z-10 h-[500px] w-[500px] rounded-full opacity-0 transition-opacity duration-500"
      style={{
        background:
          'radial-gradient(circle, rgba(37,99,235,0.10) 0%, rgba(6,182,212,0.05) 40%, transparent 70%)',
      }}
    />
  );
}
