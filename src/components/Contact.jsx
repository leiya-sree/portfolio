import emailjs from "@emailjs/browser";
import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser,
  FiTag,
  FiMessageSquare,
  FiSend,
  FiPhone,
  FiMapPin,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
  FiMail,
} from 'react-icons/fi';
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { profile } from '../data/portfolio';

const socials = [
  {
    Icon: FaLinkedin,
    href: profile.linkedin,
    label: "LinkedIn",
    color: "hover:bg-[#0A66C2]",
  },
  {
    Icon: FaGithub,
    href: profile.github,
    label: "GitHub",
    color: "hover:bg-[#24292F]",
  },
  {
    Icon: FaWhatsapp,
    href: `https://wa.me/919600752209?text=${encodeURIComponent("Hi Leiya, I visited your portfolio and would like to connect regarding a potential opportunity.")}`,
    label: "WhatsApp",
    color: "hover:bg-[#25D366]",
  },
  {
    Icon: MdEmail,
    href: `mailto:${profile.email}`,
    label: "Email",
    color: "hover:bg-[#EA4335]",
  },
];

const initial = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const submissionRef = useRef(0);
  const isSubmittingRef = useRef(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.subject.trim()) e.subject = 'Please add a subject';
    if (form.message.trim().length < 10) e.message = 'Message should be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmittingRef.current || status === 'loading') return;
    if (!validate()) return;

    const submissionId = submissionRef.current + 1;
    submissionRef.current = submissionId;
    isSubmittingRef.current = true;
    setStatus('loading');

    try {
      await emailjs.send(
        "service_u3we5pl",
        "template_uf6rbcw",
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        "UIQjuTcKf_537V0FD"
      );

      if (submissionRef.current !== submissionId) return;
      setForm(initial);
      setStatus('success');
      isSubmittingRef.current = false;
    } catch (error) {
      console.error("EmailJS Error:", error);
      if (submissionRef.current !== submissionId) return;
      setStatus('error');
      isSubmittingRef.current = false;
    }
  };

  const closeStatus = () => {
    submissionRef.current += 1;
    setStatus('idle');
  };

  const field = (name, label, Icon, type = 'text', textarea = false) => (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-medium text-white/40">
        {label}
      </label>
      <div className="relative">
        <Icon size={16} className="absolute left-3.5 top-3.5 text-white/30" />
        {textarea ? (
          <textarea
            id={name}
            name={name}
            rows={5}
            value={form[name]}
            onChange={handleChange}
            placeholder={`Your ${label.toLowerCase()}...`}
            className={`w-full resize-none rounded-xl border bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-white/70 placeholder:text-white/20 transition-colors focus:outline-none focus:ring-2 backdrop-blur-sm ${
              errors[name]
                ? 'border-red-400/50 focus:ring-red-400/30'
                : 'border-white/10 focus:border-blue-400/50 focus:ring-blue-400/20'
            }`}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={form[name]}
            onChange={handleChange}
            placeholder={label}
            className={`w-full rounded-xl border bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-white/70 placeholder:text-white/20 transition-colors focus:outline-none focus:ring-2 backdrop-blur-sm ${
              errors[name]
                ? 'border-red-400/50 focus:ring-red-400/30'
                : 'border-white/10 focus:border-blue-400/50 focus:ring-blue-400/20'
            }`}
          />
        )}
      </div>
      {errors[name] && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
          <FiAlertCircle size={12} /> {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <section id="contact" className="relative overflow-hidden bg-[#06080F] py-20">
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
              Contact
            </span>
          </div>
          <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Let's <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="mt-3 text-sm text-white/40 max-w-md">
            Currently seeking opportunities to start my career in software development.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
          {/* ===== LEFT: INFO PANEL ===== */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
          >
            <div className="relative h-full overflow-hidden rounded-3xl border border-white/5 bg-white/[0.04] p-6 backdrop-blur-md shadow-2xl shadow-black/20 sm:p-8">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
              
              <h3 className="text-xl font-bold text-white">Get in Touch</h3>
              <p className="mt-2 text-sm text-white/50">
                Open to software development opportunities and professional connections.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-all hover:border-blue-500/20 hover:bg-white/[0.06]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <MdEmail size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-white/40">Email</span>
                    <span className="block truncate text-sm font-medium text-white/80">{profile.email}</span>
                  </span>
                </a>
                <a
                  href={`tel:${profile.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-all hover:border-blue-500/20 hover:bg-white/[0.06]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <FiPhone size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-white/40">Phone</span>
                    <span className="block truncate text-sm font-medium text-white/80">{profile.phone}</span>
                  </span>
                </a>
                <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <FiMapPin size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-white/40">Location</span>
                    <span className="block truncate text-sm font-medium text-white/80">{profile.location}</span>
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="mb-4 text-sm font-semibold text-white/60">Connect With Me</h4>
                <div className="flex gap-3">
                  {socials.map(({ Icon, href, label, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className={`group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/40 transition-all duration-300 hover:-translate-y-1.5 hover:text-white hover:shadow-lg hover:shadow-black/20 ${color} hover:border-white/20`}
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ===== RIGHT: FORM ===== */}
          <motion.form
            onSubmit={handleSubmit}
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
          >
            <div className="rounded-3xl border border-white/5 bg-white/[0.04] p-6 backdrop-blur-md shadow-2xl shadow-black/20 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {field('name', 'Your Name', FiUser)}
                {field('email', 'Email Address', MdEmail, 'email')}
              </div>
              <div className="mt-4">{field('subject', 'Subject', FiTag)}</div>
              <div className="mt-4">{field('message', 'Message', FiMessageSquare, 'text', true)}</div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="group relative mt-5 w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              >
                {status === 'loading' ? (
                  <>
                    <FiLoader size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend size={16} className="transition-transform group-hover:translate-x-1" />
                    Send Message
                  </>
                )}
              </button>

            </div>
          </motion.form>
        </div>
      </div>

      <AnimatePresence>
        {(status === 'success' || status === 'error') && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#06080F]/70 p-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="presentation"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-status-title"
              className={`w-full max-w-sm rounded-3xl border p-7 text-center shadow-2xl backdrop-blur-xl ${
                status === 'success'
                  ? 'border-emerald-400/20 bg-[#0A1A1A]/95 shadow-emerald-500/10'
                  : 'border-red-400/20 bg-[#1A0A12]/95 shadow-red-500/10'
              }`}
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {status === 'success' ? (
                <FiCheckCircle size={38} className="mx-auto text-emerald-400" />
              ) : (
                <FiAlertCircle size={38} className="mx-auto text-red-400" />
              )}
              <h3 id="contact-status-title" className="mt-4 text-lg font-semibold text-white">
                {status === 'success' ? 'Message Sent Successfully!' : 'Message Could Not Be Sent'}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {status === 'success'
                  ? "Thank you for reaching out. I'll get back to you soon."
                  : 'Something went wrong. Please try again or contact me directly by email.'}
              </p>
              <button
                type="button"
                onClick={closeStatus}
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}