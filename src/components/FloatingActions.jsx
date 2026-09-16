import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            whileHover={{ y: -3 }}
            className="group relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-2xl shadow-blue-500/30 transition-all duration-300 hover:scale-110"
          >
            <FiArrowUp size={20} className="sm:text-2xl" />
            {/* Optional tooltip */}
            <span className="absolute right-14 hidden group-hover:flex items-center rounded-xl bg-[#0A0F1F] border border-white/10 px-3 py-1.5 text-xs font-medium text-white shadow-xl backdrop-blur-md whitespace-nowrap">
              Back to Top
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}