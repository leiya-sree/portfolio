import { motion } from "framer-motion";
import { FiDownload, FiArrowRight, FiMail } from "react-icons/fi";

const scrollToSection = (id) => {
  document.querySelector(id)?.scrollIntoView({
    behavior: "smooth",
  });
};

export default function HeroButtons({ resumeUrl }) {
  return (
    <motion.div
      className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5 }}
    >
      {/* Resume Button */}
      <a
        href={resumeUrl}
        download
       className="rounded-xl bg-gradient-primary px-6 py-3 text-white hover:shadow-glow-primary"
      >
        <FiDownload
          size={18}
          className="transition-transform duration-300 group-hover:-translate-y-0.5"
        />
        <span>Download Resume</span>
      </a>

      {/* Projects */}
      <button
        onClick={() => scrollToSection("#projects")}
        className="btn-ghost group"
      >
        <span>View Projects</span>

        <FiArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>

      {/* Contact */}
      <button
        onClick={() => scrollToSection("#contact")}
        className="btn-ghost group"
      >
        <FiMail
          size={18}
          className="transition-transform duration-300 group-hover:rotate-6"
        />

        <span>Let's Connect</span>
      </button>
    </motion.div>
  );
}