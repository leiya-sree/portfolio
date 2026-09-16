import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiBriefcase, FiCode, FiTrendingUp } from 'react-icons/fi';
import { FaGraduationCap, FaUserGraduate, FaLaptopCode } from 'react-icons/fa';
import { profile } from '../data/portfolio';

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#06080F] py-20">
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
              About Me
            </span>
          </div>
          <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Who <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">I Am</span>
          </h2>
        </motion.div>

        <div className="grid items-start gap-8 lg:grid-cols-5 lg:gap-12">
          {/* ===== LEFT — Profile Card ===== */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-3xl border border-white/5 bg-white/[0.04] p-8 backdrop-blur-md shadow-2xl shadow-black/20">
              {/* Avatar / Icon */}
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/10">
                <FaUserGraduate size={34} className="text-blue-400" />
              </div>

              <h3 className="text-2xl font-bold text-white">M Leiya Sree</h3>
              <p className="mt-1 text-sm text-white/50">Full Stack Developer</p>

              <div className="mt-8 space-y-4">
                {[
                  { icon: FaGraduationCap, label: 'Education', value: 'B.E. Computer Science', color: 'text-blue-400' },
                  { icon: FiCode, label: 'Specialization', value: 'Web Development', color: 'text-indigo-400' },
                  { icon: FiMapPin, label: 'Location', value: 'Tamil Nadu, India', color: 'text-purple-400' },
                  { icon: FiTrendingUp, label: 'Goal', value: 'To become a skilled AI Developer and build practical AI solutions.', color: 'text-emerald-400' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx, duration: 0.4 }}
                    className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3.5 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.06]"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] border border-white/5">
                      <item.icon size={15} className={item.color} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white/40">{item.label}</p>
                      <p className="text-sm font-medium text-white/80">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ===== RIGHT — About Content ===== */}
          <div className="lg:col-span-3 space-y-6">
            {/* About Me Card */}
            <motion.div
              className="rounded-3xl border border-white/5 bg-white/[0.04] p-7 backdrop-blur-md shadow-2xl shadow-black/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/10 text-xl">
                  👋
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">About Me</h3>
                </div>
              </div>

              <p className="text-sm font-normal leading-relaxed text-white/60">
                I’m a Full Stack Developer focused on building practical and user-friendly web applications. I work with React, Python, FastAPI, REST APIs, and SQL, and enjoy developing across both frontend and backend. I’m interested in AI application development and currently exploring AI integrations to …
              </p>
            </motion.div>

            {/* About Info Grid */}
            <motion.div
              className="grid grid-cols-1 gap-4 sm:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {[
                { icon: FaLaptopCode, label: 'Development', value: 'Frontend, backend and API development with modern technologies.', color: 'text-indigo-400', bg: 'bg-indigo-500/8' },
                { icon: FiTrendingUp, label: 'Learning', value: 'Exploring AI tools and continuously expanding my technical skills.', color: 'text-emerald-400', bg: 'bg-emerald-500/8' },
                { icon: FiBriefcase, label: 'Goal', value: 'To become a skilled AI Developer and build practical AI solutions.', color: 'text-purple-400', bg: 'bg-purple-500/8' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className={`rounded-2xl border border-white/5 ${stat.bg} p-5 backdrop-blur-sm transition-all duration-200 hover:border-white/10`}
                >
                  <stat.icon size={20} className={`${stat.color} mb-2`} />
                  <h4 className="text-sm font-semibold text-white">{stat.label}</h4>
                  <p className="mt-1 text-xs text-white/50">{stat.value}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Email Link */}
            <motion.a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] px-5 py-2.5 text-sm text-white/50 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.06] hover:text-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <FiMail size={14} className="text-blue-400" />
              {profile.email}
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}