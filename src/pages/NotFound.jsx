import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import { FaGhost } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#06080F] px-6 text-center">
      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#06080F] via-[#0A0F20] to-[#0D1326]"></div>
        
        {/* Ambient glows */}
        <motion.div
          className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-600/6 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-purple-600/6 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Subtle grid */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(79, 70, 229, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(79, 70, 229, 0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(6,8,15,0.4))]"></div>
      </div>

      {/* ===== CONTENT CARD ===== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 max-w-lg rounded-3xl border border-white/5 bg-white/[0.04] p-8 backdrop-blur-md shadow-2xl shadow-black/40 sm:p-12"
      >
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/10">
          <FaGhost size={34} className="text-blue-400" />
        </div>

        {/* 404 Number */}
        <h1 className="text-7xl font-extrabold sm:text-8xl lg:text-9xl">
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            404
          </span>
        </h1>

        {/* Message */}
        <p className="mt-4 text-2xl font-bold text-white">Page not found</p>
        <p className="mt-2 text-sm text-white/50 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/40"
          >
            <FiHome size={16} className="transition-transform group-hover:-translate-y-0.5" />
            Back Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
          >
            <FiArrowLeft size={16} />
            Go Back
          </button>
        </div>

        {/* Decorative hint */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/30">
          <FiAlertCircle size={12} className="text-yellow-400/50" />
          <span>Lost? Don't worry, it happens.</span>
        </div>
      </motion.div>
    </div>
  );
}