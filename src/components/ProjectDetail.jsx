import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiTag } from 'react-icons/fi';
import { projects } from '../data/portfolio';

export default function ProjectDetail() {
  const { projectId } = useParams();
  const project = projects.find((item) => item.id === projectId);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [projectId]);

  if (!project) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-[#06080F] px-8 py-32 lg:px-12">
        <div className="relative z-10 mx-auto max-w-5xl">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/80 transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
          >
            <FiArrowLeft size={16} />
            Back to Projects
          </Link>
          <h1 className="mt-10 text-3xl font-bold text-white">Project not found</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#06080F] py-32">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#06080F] via-[#0A0F20] to-[#0D1326]" />
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-600/6 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-600/6 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(6,8,15,0.4))]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-8 lg:px-12">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/80 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
        >
          <FiArrowLeft size={16} />
          Back to Projects
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-2xl shadow-black/30"
        >
          <div className="relative aspect-video overflow-hidden bg-[#0A0F1F]">
            <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1F] via-transparent to-transparent" />
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2">
              {project.category && (
                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-0.5 text-xs font-semibold text-blue-400">
                  {project.category}
                </span>
              )}
            </div>
            <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">{project.title}</h1>
            <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">{project.description}</p>

            {project.features?.length > 0 && (
              <>
                <h2 className="mt-8 text-xs font-semibold uppercase tracking-wider text-blue-400">Key Highlights</h2>
                <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-sm text-white/70">
                      <FiCheckCircle size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            <h2 className="mt-8 text-xs font-semibold uppercase tracking-wider text-blue-400">Tools & Technologies</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((technology) => (
                <span key={technology} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-xs font-medium text-white/80">
                  <FiTag size={11} className="text-blue-400" />
                  {technology}
                </span>
              ))}
            </div>

          </div>
        </motion.article>
      </div>
    </section>
  );
}
