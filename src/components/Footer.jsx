import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiGithub, FiLinkedin, FiMail, FiCode
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { profile } from '../data/portfolio';

const socials = [
  { Icon: FiGithub, href: profile.github, label: 'GitHub' },
  { Icon: FiLinkedin, href: profile.linkedin, label: 'LinkedIn' },
  { Icon: FaWhatsapp, href: `https://wa.me/919600752209?text=${encodeURIComponent("Hi Leiya, I visited your portfolio and would like to connect regarding a potential opportunity.")}`, label: 'WhatsApp' },
  { Icon: FiMail, href: `mailto:${profile.email}`, label: 'Email' },
];

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#06080F]">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-3xl" />
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-purple-600/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-indigo-500/3 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-8 py-16 lg:px-12">
        {/* ===== MAIN FOOTER GRID ===== */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand / Logo */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                LS
              </div>
              <span className="text-lg font-bold text-white">Leiya Sree M</span>
            </div>
            <p className="mt-4 text-sm text-white/40 max-w-xs leading-relaxed">
              Full Stack Developer focused on building practical web applications with modern technologies and AI-powered features.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-white/30">
              <FiCode size={14} className="text-blue-400" />
              <span>Full Stack Developer</span>
              <span className="mx-1">•</span>
              <span>AI Applications</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link
                      to={link.href}
                      className="text-sm text-white/40 transition-all hover:text-white hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-white/40 transition-all hover:text-white hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ===== BOTTOM BAR ===== */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}