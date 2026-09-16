import { motion } from 'framer-motion';
import {
  SiReact, SiTailwindcss, SiJavascript, SiHtml5, SiCss,
  SiPython, SiFastapi, SiMysql, SiPostgresql,
  SiNumpy, SiPandas, SiGit, SiGithub,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import {
  FiServer, FiDatabase, FiLayout, FiTool, FiBookOpen, FiCpu, FiBarChart2, FiTable, FiCloud, FiBox,
} from 'react-icons/fi';

const iconMap = {
  react: SiReact, tailwind: SiTailwindcss, javascript: SiJavascript,
  html5: SiHtml5, css3: SiCss,
  python: SiPython, fastapi: SiFastapi, api: FiServer,
  mysql: SiMysql, postgresql: SiPostgresql, sql: FiDatabase,
  numpy: SiNumpy, pandas: SiPandas,
  git: SiGit, github: SiGithub, vscode: VscVscode,
  powerbi: FiBarChart2, excel: FiTable, colab: FiCloud, roboflow: FiBox,
};

const groupIcons = {
  Frontend: FiLayout, Backend: FiServer, Database: FiDatabase,
  Libraries: FiBookOpen, Tools: FiTool,
};

const skillGroups = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React.js', icon: 'react' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'HTML5', icon: 'html5' },
      { name: 'CSS3', icon: 'css3' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Python', icon: 'python' },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'REST APIs', icon: 'api' },
    ],
  },
  {
    category: 'Database',
    skills: [
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'SQL', icon: 'sql' },
    ],
  },
  {
    category: 'Libraries',
    skills: [
      { name: 'NumPy', icon: 'numpy' },
      { name: 'Pandas', icon: 'pandas' },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'VS Code', icon: 'vscode' },
      { name: 'Power BI', icon: 'powerbi' },
      { name: 'Excel', icon: 'excel' },
      { name: 'Google Colab', icon: 'colab' },
      { name: 'Roboflow', icon: 'roboflow' },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-[#06080F] py-20">
      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#06080F] via-[#0A0F20] to-[#0D1326]"></div>
        
        {/* Ambient glows */}
        <motion.div
          className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-600/6 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-600/6 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
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
              Skills
            </span>
          </div>
          <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Technologies I <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Work With</span>
          </h2>
          <p className="mt-3 text-sm text-white/40 max-w-md">
            A snapshot of the tools, languages, and frameworks I use to build end-to-end products.
          </p>
        </motion.div>

        {/* ===== SKILL CATEGORIES GRID ===== */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => {
            const GroupIcon = groupIcons[group.category] ?? FiTool;
            // Define a color for each category
            const colors = {
              Frontend: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', icon: 'text-blue-400' },
              Backend: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', text: 'text-indigo-400', icon: 'text-indigo-400' },
              Database: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', icon: 'text-purple-400' },
              Libraries: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', icon: 'text-emerald-400' },
              Tools: { bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400', icon: 'text-rose-400' },
            };
            const color = colors[group.category] || colors.Tools;

            return (
              <motion.div
                key={group.category}
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.04] p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-white/15 hover:shadow-2xl hover:shadow-blue-500/5"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: gi * 0.08 }}
              >
                {/* Subtle glow on hover */}
                <div className={`absolute -right-16 -top-16 h-40 w-40 rounded-full ${color.bg} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60`} />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="mb-5 flex items-center gap-3">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${color.bg} border ${color.border} shadow-lg`}>
                      <GroupIcon size={20} className={color.icon} />
                    </span>
                    <h3 className="text-lg font-semibold text-white">{group.category}</h3>
                  </div>

                  {/* Skill chips - borderless modern style */}
                  <div className="flex flex-wrap gap-2.5">
                    {group.skills.map((skill, si) => {
                      const Icon = iconMap[skill.icon] ?? FiCpu;
                      return (
                        <motion.span
                          key={skill.name}
                          className={`inline-flex items-center gap-1.5 rounded-full ${color.bg} px-3.5 py-1.5 text-xs font-medium text-white/70 transition-all duration-200 hover:scale-105 hover:text-white shadow-sm shadow-black/5`}
                          whileHover={{ scale: 1.06, y: -2 }}
                          initial={{ opacity: 0, scale: 0.85 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: gi * 0.06 + si * 0.04 }}
                        >
                          <Icon size={13} className={color.icon} />
                          {skill.name}
                        </motion.span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}