import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiBriefcase, FiCheckCircle, FiCalendar, FiMapPin } from 'react-icons/fi';

const experiences = [
  {
    company: 'Banibro Technologies Pvt Ltd',
    role: 'Software Development Intern',
    period: 'July 2026 – August 2026',
    location: 'Nagercoil, Kanyakumari, India',
    context: 'Odoo ERP Software',
    workedOn:
      'Worked in an Odoo ERP software development environment, contributing to real-world development tasks involving data scraping and data processing using Python, XML, and PostgreSQL.',
    learned:
      'Gained valuable exposure to real-world software development and learned how IT teams work on practical business requirements. I also gained hands-on experience with Python, XML, PostgreSQL, and Odoo ERP while understanding real-world development workflows.',
    technologies: 'Python • XML • PostgreSQL • Odoo ERP',
  },
  {
    company: 'Entuite Technologies Pvt Ltd',
    role: 'Web Development Internship',
    period: 'July 2024',
    location: 'Technopark, Tiruvandrum, India',
    context: 'Academic Internship',
    workedOn:
      'Worked on a Student Registration Form as part of my web development internship, using HTML5, CSS3, JavaScript, Python, FastAPI, and SQL.',
    learned:
      'Gained hands-on experience in web development and learned how frontend interfaces, backend APIs, and databases work together to build a web application.',
    technologies: 'HTML5 • CSS3 • JavaScript • Python • FastAPI • SQL',
  },
];

export default function Experience() {
  const [selectedExperience, setSelectedExperience] = useState(0);
  const experience = experiences[selectedExperience];

  return (
    <section id="experience" className="relative overflow-hidden bg-[#06080F] py-20">
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
              Experience
            </span>
          </div>
          <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            My <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Learning Journey</span>
          </h2>
          <p className="mt-3 text-sm text-white/40 max-w-md">
            A journey through internships where I gained practical experience and explored different technologies.
          </p>
        </motion.div>

        <div className="mx-auto max-w-5xl">
          <div className="mb-8 grid gap-3 sm:grid-cols-2" role="tablist">
            {experiences.map((item, index) => (
              <button
                key={item.company}
                type="button"
                onClick={() => setSelectedExperience(index)}
                className={`rounded-2xl border p-5 text-left backdrop-blur-md transition-all duration-300 ${
                  selectedExperience === index
                    ? 'border-purple-400/40 bg-purple-500/10 shadow-xl shadow-purple-500/10'
                    : 'border-white/5 bg-white/[0.04] hover:border-white/15 hover:bg-white/[0.06]'
                }`}
                aria-selected={selectedExperience === index}
                role="tab"
              >
                <span className="block text-lg font-semibold text-white">{item.company}</span>
                <span className="mt-1 block text-sm text-white/50">{item.role}</span>
              </button>
            ))}
          </div>

          <div role="tabpanel" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={experience.company}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="rounded-3xl border border-white/5 bg-white/[0.04] p-6 backdrop-blur-md shadow-2xl shadow-black/20 sm:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/5 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/50">
                      <FiCalendar size={11} className="text-blue-400" />
                      {experience.period}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{experience.company}</h3>
                    <p className="mt-1 text-sm font-medium text-blue-400">{experience.role}</p>
                  </div>
                  <div className="space-y-2 text-sm text-white/50">
                    <div className="flex items-center gap-2">
                      <FiMapPin size={14} className="text-purple-400" />
                      {experience.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <FiBriefcase size={14} className="text-blue-400" />
                      {experience.context}
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-semibold text-white">What I Worked On</h4>
                    <p className="mt-2 text-sm leading-relaxed text-white/50">{experience.workedOn}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">What I Learned</h4>
                    <p className="mt-2 text-sm leading-relaxed text-white/50">{experience.learned}</p>
                  </div>
                </div>

                <div className="mt-7">
                  <h4 className="text-sm font-semibold text-white">Technologies</h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-white/60">
                      <FiCheckCircle size={13} className="text-emerald-400" />
                      {experience.technologies}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}