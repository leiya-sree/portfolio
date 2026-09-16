import { motion } from "framer-motion";

export default function HeroImage() {
  return (
    <motion.div
      className="relative flex items-center justify-center mt-12 lg:mt-0"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Purple Glow */}
      <div className="absolute h-80 w-80 rounded-full bg-primary opacity-20 blur-3xl"></div>

      {/* Glass Card */}
      <div className="relative glass-card rounded-3xl p-4 shadow-glass">
        <img
          src="/images/profile.png.jpeg"
          alt="M Leiya Sree"
          className="h-[500px] w-[380px] rounded-2xl object-cover"
        />

       
      </div>
    </motion.div>
  );
}