import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiDownload, FiMenu, FiX } from 'react-icons/fi';
import { navLinks, profile } from '../data/portfolio';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const sections = navLinks.map((l) => document.querySelector(l.href));
      const y = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= y) {
          setActive(navLinks[i].href);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-4' : 'py-6'
        }`}
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10 transition-all duration-500 ${
            scrolled
              ? 'rounded-2xl bg-[#0A0F1F]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 py-3'
              : 'bg-transparent py-2'
          }`}
          style={{ width: scrolled ? 'calc(100% - 3rem)' : '100%' }}
        >
          {/* Logo – initials only */}
          <button
            onClick={() => go('#home')}
            className="group relative focus:outline-none"
            aria-label="Home"
          >
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-40 blur group-hover:opacity-100 transition duration-300"></div>
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 font-display text-sm font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-105">
              LS
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex rounded-full border border-white/5 bg-white/[0.02] p-1.5 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <button
                    onClick={() => go(link.href)}
                    className={`relative rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-blue-600/30 to-indigo-600/30 border border-white/15 shadow-sm"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right: Resume + menu */}
          <div className="flex items-center gap-3">
            <div className="relative group hidden sm:block">
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-60 blur group-hover:opacity-100 transition duration-300"></div>
              <a
                href={profile.resumeUrl}
                download
                className="relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <FiDownload size={15} />
                Resume
              </a>
            </div>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md text-white/70 transition-all hover:bg-white/[0.08] hover:text-white lg:hidden"
            >
              {open ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-[#06080F]/85 backdrop-blur-2xl"
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 h-full w-80 max-w-[85vw] border-l border-white/10 bg-[#0A0F1F]/90 backdrop-blur-2xl p-6 pt-24 shadow-2xl shadow-black/80 flex flex-col justify-between"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            >
              <ul className="flex flex-col gap-2">
                {navLinks.map((link, i) => {
                  const isActive = active === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <button
                        onClick={() => go(link.href)}
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-sm font-semibold tracking-wide transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-white border border-white/10 shadow-lg'
                            : 'text-white/60 hover:bg-white/[0.04] hover:text-white'
                        }`}
                      >
                        {link.name}
                        <span className="text-[10px] font-mono text-white/30">0{i + 1}</span>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="pb-6">
                <a
                  href={profile.resumeUrl}
                  download
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-600/20 transition hover:scale-[1.02]"
                  onClick={() => setOpen(false)}
                >
                  <FiDownload size={16} />
                  Download Resume
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}