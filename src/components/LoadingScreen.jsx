import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className="absolute inset-0 bg-hero-grid opacity-30" />

      <motion.div
        className="relative flex flex-col items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative mb-6 h-16 w-16">
          <motion.span
            className="absolute inset-0 rounded-2xl bg-gradient-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            style={{ filter: 'blur(14px)', opacity: 0.6 }}
          />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-surface">
            <span className="font-display text-2xl font-bold gradient-text">LS</span>
          </div>
        </div>

        <motion.div
          className="h-1 w-40 overflow-hidden rounded-full bg-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="h-full w-1/2 rounded-full bg-gradient-primary"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        <motion.p
          className="mt-4 text-xs uppercase tracking-[0.3em] text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Loading Portfolio
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
