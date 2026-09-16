import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { fetchProjects } from '../lib/api';
import { projects as localProjects } from '../data/portfolio';

function ProjectCard({ project, onClick }) {
  return (
    <motion.div
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-white/[0.04] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-white/15 hover:shadow-2xl hover:shadow-blue-500/5 cursor-pointer"
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden bg-[#0A0F1F]">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080F] via-transparent to-transparent opacity-80" />
        
        {/* Tech chips overlay */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-md bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-md border border-white/10"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="rounded-md bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white/60 backdrop-blur-md border border-white/10">
              +{project.tech.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-white leading-snug group-hover:text-blue-400 transition-colors">{project.title}</h3>
          {project.category && (
            <span className="shrink-0 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400 border border-blue-500/20">
              {project.category}
            </span>
          )}
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-white/50 leading-relaxed">{project.description}</p>
        
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const navigate = useNavigate();
  const [list, setList] = useState(localProjects);

  useEffect(() => {
    let active = true;
    fetchProjects().then((data) => {
      if (active && data && data.length > 0) setList(data);
    }).catch(() => {
      // Keep professional data fallback if API is not configured
    });
    return () => { active = false; };
  }, []);

  const visibleProjects = useMemo(() => list, [list]);

  return (
    <section id="projects" className="relative overflow-hidden bg-[#06080F] py-24">
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
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-10 bg-gradient-to-r from-blue-400 to-transparent"></span>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
              Featured Work
            </span>
          </div>
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight">
            Featured <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Projects</span>
          </h2>
        </motion.div>

        {/* ===== PROJECT GRID ===== */}
        <motion.div
          className="grid gap-8 md:grid-cols-2"
          layout
        >
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id || project.title}
              project={project}
              onClick={() => navigate(`/projects/${project.id}`)}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}