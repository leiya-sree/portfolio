import { motion } from "framer-motion";

export default function HeroContent() {
  return (
    <div className="relative z-10 text-center lg:text-left">
      {/* Greeting */}
      <motion.p
        className="text-lg font-medium text-primary"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Hi, I'm
      </motion.p>

      {/* Name */}
<motion.h1
  className="mt-2 font-display text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl"
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
>
  <span className="text-white">M </span>

  <span className="gradient-text-animated">
    Leiya
  </span>

  <span className="text-white"> Sree</span>
</motion.h1>

      {/* Role */}
      <motion.h2
        className="mt-4 text-2xl font-semibold text-white"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        AI Developer
      </motion.h2>

      {/* Description */}
      <motion.p
        className="mt-6 max-w-xl text-lg leading-8 text-muted"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Passionate about building modern web applications with
        <span className="text-primary font-semibold"> React</span>,
        <span className="text-primary font-semibold"> Python</span>,
        <span className="text-primary font-semibold"> FastAPI</span>, and
        <span className="text-primary font-semibold"> MySQL</span>.
        Always eager to learn, solve real-world problems, and grow as a developer.
      </motion.p>
    </div>
  );
}