import { motion } from 'framer-motion';

const blobs = [
  { className: 'top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-primary/20', delay: 0 },
  { className: 'top-[30%] right-[-10%] w-[35rem] h-[35rem] bg-accent/15', delay: 2 },
  { className: 'bottom-[-15%] left-[20%] w-[38rem] h-[38rem] bg-secondary/15', delay: 4 },
];

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-hero-grid opacity-40" />
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${b.className}`}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: b.delay,
          }}
        />
      ))}
    </div>
  );
}
