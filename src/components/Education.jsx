import { motion } from 'framer-motion';
import {
  FiAward,
  FiBookOpen,
  FiCalendar,
  FiMapPin,
  FiStar,
} from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';
import { education } from '../data/portfolio';

export default function Education() {
  return (
    <section id="education" className="relative overflow-hidden bg-[#06080F] py-20 font-display">
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

      <div className="relative z-10 mx-auto max-w-7xl px-8 lg:px-12">
        {/* ===== SECTION HEADING ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-10 bg-gradient-to-r from-blue-400 to-transparent"></span>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
              Education
            </span>
          </div>
          <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Academic <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Journey</span>
          </h2>
        </motion.div>

        {/* ===== EDUCATION TIMELINE ===== */}
        <div className="mx-auto max-w-4xl">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-4 h-full w-px bg-gradient-to-b from-blue-400/20 via-purple-400/20 to-transparent" />

            <div className="flex flex-col gap-6">
              {education.map((edu, i) => {
                // Color cycling for each education entry
                const colors = [
                  { border: 'border-blue-500/20', bg: 'bg-blue-500/8', icon: 'text-blue-400', dot: 'bg-blue-400', score: 'bg-blue-500/10', scoreText: 'text-blue-400' },
                  { border: 'border-purple-500/20', bg: 'bg-purple-500/8', icon: 'text-purple-400', dot: 'bg-purple-400', score: 'bg-purple-500/10', scoreText: 'text-purple-400' },
                  { border: 'border-indigo-500/20', bg: 'bg-indigo-500/8', icon: 'text-indigo-400', dot: 'bg-indigo-400', score: 'bg-indigo-500/10', scoreText: 'text-indigo-400' },
                ];
                const color = colors[i % colors.length];

                return (
                  <motion.div
                    key={edu.degree}
                    className="relative pl-12"
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    {/* Timeline node */}
                    <span className={`absolute left-5 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border ${color.border} ${color.bg} backdrop-blur-sm shadow-lg shadow-black/20`}>
                      <FiBookOpen size={15} className={color.icon} />
                    </span>

                    {/* Education Card */}
                    <motion.div
                      className={`group rounded-3xl border border-white/5 ${color.bg} p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-white/15 hover:shadow-2xl hover:shadow-blue-500/5`}
                      whileHover={{ y: -4 }}
                    >
                      {/* Header: Degree + Period */}
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/50 border border-white/5 shrink-0">
                          <FiCalendar size={11} className="text-blue-400" />
                          {edu.period}
                        </span>
                      </div>

                      {/* Field */}
                      <p className="mt-1 text-sm font-medium text-blue-400">{edu.field}</p>

                      {/* Institution */}
                      <div className="mt-3 flex items-center gap-2 text-sm text-white/50">
                        <FiMapPin size={13} className="text-white/30" />
                        {edu.institution}
                        {edu.board && (
                          <span className="text-white/30">• {edu.board}</span>
                        )}
                      </div>

                      {/* Score */}
                      <div className={`mt-4 inline-flex items-center gap-2 rounded-xl ${color.score} px-3.5 py-1.5 text-sm font-semibold ${color.scoreText} border border-white/5`}>
                        <FiAward size={14} />
                        {edu.score}
                      </div>

                      {/* Additional achievements if any */}
                      {edu.achievements && edu.achievements.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {edu.achievements.map((ach) => (
                            <span
                              key={ach}
                              className="inline-flex items-center gap-1 rounded-full bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/50 border border-white/5"
                            >
                              <FiStar size={11} className="text-yellow-400/60" />
                              {ach}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}