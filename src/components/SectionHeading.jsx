import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, highlight, description }) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      {eyebrow && (
        <motion.span
          className="eyebrow mb-5"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <span className="h-1 w-1 rounded-full bg-accent" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        className="section-title text-balance"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ delay: 0.05 }}
      >
        {title} {highlight && <span className="gradient-text-animated">{highlight}</span>}
      </motion.h2>
      {description && (
        <motion.p
          className="mt-4 text-base text-muted text-balance"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.1 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
