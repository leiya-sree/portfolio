import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useEffect } from "react";
import {
  FiArrowRight, FiLinkedin,
} from "react-icons/fi";
import { profile } from "../data/portfolio";

export default function Hero() {
  const name = "Leiya Sree M";

  // Mouse-follow glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const glowStyle = useMotionTemplate`radial-gradient(circle at ${springX}px ${springY}px, rgba(79, 70, 229, 0.12), rgba(37, 99, 235, 0.05), transparent 65%)`;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Floating particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 1,
    duration: Math.random() * 25 + 15,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  // Rotating gradient border
  const rotate = useMotionValue(0);
  useEffect(() => {
    const interval = setInterval(() => {
      rotate.set(rotate.get() + 0.5);
    }, 30);
    return () => clearInterval(interval);
  }, [rotate]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#06080F]"
      onMouseMove={handleMouseMove}
    >
      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#06080F] via-[#0A0F20] to-[#0D1326]"></div>
        <motion.div className="absolute inset-0 pointer-events-none" style={{ background: glowStyle }} />
        <motion.div
          className="absolute -top-60 -right-60 h-[800px] w-[800px] rounded-full bg-blue-600/8 blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, -80, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-60 -left-60 h-[700px] w-[700px] rounded-full bg-purple-600/8 blur-3xl"
          animate={{ x: [0, -90, 0], y: [0, 70, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-indigo-500/6 blur-3xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-blue-300/20"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: p.opacity,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 30, 0],
              opacity: [p.opacity, p.opacity * 1.8, p.opacity],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(79, 70, 229, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(79, 70, 229, 0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(6,8,15,0.6))]"></div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center min-h-[calc(100vh-8rem)]">

          {/* ===== LEFT COLUMN ===== */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-7 max-w-xl"
          >
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-blue-500/20 bg-white/[0.04] px-4 py-2 backdrop-blur-md shadow-lg shadow-blue-500/5"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-medium tracking-wide text-white/80">
                Open to Work  •  Full Stack Developer
              </span>
            </motion.div>

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-10 bg-gradient-to-r from-blue-400 to-transparent"></span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-400">
                FULL STACK DEVELOPER | AI APPLICATIONS
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="space-y-1"
            >
              <h1 className="text-4xl font-light text-white/70 sm:text-5xl lg:text-6xl tracking-tight">
                Hi, I'm
              </h1>
              <h1 className="text-5xl font-semibold sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight">
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent drop-shadow-sm whitespace-nowrap">
  {name}
</span>
              </h1>
            </motion.div>

            {/* Description – updated for Full Stack */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-sm leading-relaxed text-white/45 lg:text-base max-w-md"
            >
              Full Stack Developer focused on building practical web applications using React,
              Python, FastAPI, REST APIs, SQL, and AI integrations.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-50 blur group-hover:opacity-100 transition duration-300" />
                <a
                  href="#projects"
                  className="relative inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3.5 text-sm font-medium text-white shadow-xl transition-all duration-300"
                >
                  View My Projects
                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" size={16} />
                </a>
              </motion.div>
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-medium text-white/70 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-white shadow-lg shadow-black/10"
              >
                <FiLinkedin size={16} className="text-blue-400" />
                Connect on LinkedIn
              </motion.a>
            </motion.div>

          </motion.div>

          {/* ===== RIGHT COLUMN: PORTRAIT ===== */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm lg:max-w-md xl:max-w-lg">
              {/* Organic glows (same as before) */}
              <motion.div
                className="absolute -inset-8 rounded-full blur-3xl"
                style={{
                  background: 'radial-gradient(ellipse at 45% 50%, rgba(37,99,235,0.15), rgba(124,58,237,0.08), transparent 70%)',
                }}
                animate={{ scale: [1, 1.12, 1], x: [0, 15, 0], y: [0, -10, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -inset-10 rounded-full blur-3xl"
                style={{
                  background: 'radial-gradient(ellipse at 70% 85%, rgba(139,92,246,0.12), rgba(37,99,235,0.05), transparent 60%)',
                }}
                animate={{ scale: [1, 1.18, 1], x: [0, -18, 0], y: [0, 12, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />
              <motion.div
                className="absolute -inset-6 rounded-full blur-2xl"
                style={{
                  background: 'radial-gradient(ellipse at 20% 20%, rgba(56,189,248,0.08), rgba(124,58,237,0.04), transparent 60%)',
                }}
                animate={{ scale: [1, 1.08, 1], x: [0, 12, 0], y: [0, -8, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
              />

              {/* Decorative rings */}
              <div className="absolute -inset-4 rounded-full border border-blue-500/8 opacity-50"></div>
              <div className="absolute -inset-8 rounded-full border border-purple-500/6 opacity-30"></div>
              <div className="absolute -inset-14 rounded-full border border-indigo-500/4 opacity-20"></div>

              {/* Floating geometric accents */}
              <motion.div
                className="absolute top-1/4 left-0 w-3 h-3 border border-blue-400/20 rounded-full"
                animate={{ y: [0, -12, 0], rotate: [0, 360] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute bottom-1/3 right-0 w-2 h-2 bg-purple-400/10 rounded-full"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Image */}
              <div className="relative">
                <img
                  src="/images/Pooja-img-cropped.png"
                  alt={name}
                  className="relative z-10 mx-auto w-full max-h-[580px] object-contain object-center"
                  loading="eager"
                  style={{
                    filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.4))',
                  }}
                />
              </div>

            </div>
          </motion.div>
        </div>

        {/* ===== SCROLL INDICATOR ===== */}
        <motion.div
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:flex"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <button
            onClick={() =>
              document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex flex-col items-center gap-2 text-white/30 transition duration-300 hover:text-white group"
          >
            <span className="text-[9px] font-semibold uppercase tracking-[0.3em] group-hover:text-blue-400 transition">Scroll</span>
            <div className="relative flex h-10 w-6 justify-center rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-sm group-hover:border-blue-400/50 transition shadow-lg shadow-black/10">
              <div className="absolute top-2 h-1.5 w-1.5 rounded-full bg-blue-400 animate-bounce" />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}