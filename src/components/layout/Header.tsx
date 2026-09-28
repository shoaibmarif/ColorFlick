import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import {
  Palette,
  BarChart3,
  Settings,
  Calendar,
  ChevronDown,
  Menu,
  X,
  Sliders,
  Hash,
  Pipette,
  SunMedium,
  Timer,
  GraduationCap,
  Sparkles,
  Wrench,
  ShieldCheck,
  BookOpen,
  HelpCircle,
  Info,
  FileText,
  Mail,
  Zap,
} from 'lucide-react';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6z" />
  </svg>
);

interface HeaderProps {
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns & mobile menu on route change
  useEffect(() => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const gameModesList = [
    { to: '/color-guessing-game', label: 'Exact Color Match', desc: 'Identify matching target swatches', icon: <Palette className="w-4 h-4 text-brand-500" /> },
    { to: '/rgb-color-game', label: 'RGB Slider Mix', desc: 'Tune red, green, blue channels', icon: <Sliders className="w-4 h-4 text-rose-500" /> },
    { to: '/hex-color-game', label: 'HEX Code Quiz', desc: 'Predict hexadecimal notation', icon: <Hash className="w-4 h-4 text-sky-500" /> },
    { to: '/color-picker-game', label: 'Color Picker', desc: 'Manual palette recreation', icon: <Pipette className="w-4 h-4 text-purple-500" /> },
    { to: '/color-matching-game', label: 'HSL Matcher', desc: 'Hue, saturation & lightness', icon: <Sparkles className="w-4 h-4 text-emerald-500" /> },
    { to: '/color-theory-game', label: 'Warm vs Cool', desc: 'Thermal color classification', icon: <SunMedium className="w-4 h-4 text-amber-500" /> },
  ];

  const formatsList = [
    { to: '/daily-color-challenge', label: 'Daily Color Challenge', desc: '10 seeded questions fresh at midnight', icon: <Calendar className="w-4 h-4 text-amber-500" />, badge: 'Daily' },
    { to: '/color-game-timed', label: 'Timed Sprint', desc: 'High-speed 30s/60s/120s sprint', icon: <Timer className="w-4 h-4 text-sky-500" /> },
    { to: '/color-challenge', label: 'Multi-Challenge Arena', desc: 'All modes with progressive escalation', icon: <Zap className="w-4 h-4 text-brand-500" /> },
    { to: '/color-game-practice', label: 'Practice Mode', desc: 'Relaxed untimed training', icon: <GraduationCap className="w-4 h-4 text-emerald-500" /> },
    { to: '/color-game-for-beginners', label: 'Beginner Mode', desc: 'Simplified 3-choice rounds', icon: <Sparkles className="w-4 h-4 text-indigo-500" /> },
  ];

  const toolsList = [
    { to: '/color-converter', label: 'Universal Converter', desc: 'HEX ⇄ RGB ⇄ HSL with shades', icon: <Wrench className="w-4 h-4 text-brand-500" /> },
    { to: '/rgb-to-hex', label: 'RGB to HEX', desc: 'Integer channels to hex string', icon: <Sliders className="w-4 h-4 text-rose-500" /> },
    { to: '/hex-to-rgb', label: 'HEX to RGB', desc: 'Decipher 3 & 6-digit hex values', icon: <Hash className="w-4 h-4 text-sky-500" /> },
    { to: '/color-contrast-checker', label: 'WCAG Contrast Checker', desc: 'Validate AA/AAA accessibility ratios', icon: <ShieldCheck className="w-4 h-4 text-emerald-500" /> },
    { to: '/color-distance', label: 'OKLab Distance Lab', desc: 'Perceptual ΔE color difference test', icon: <Palette className="w-4 h-4 text-amber-500" /> },
  ];

  const guidesList = [
    { to: '/how-to-play', label: 'How to Play & Scoring', desc: 'Scoring formula, streaks & controls', icon: <HelpCircle className="w-4 h-4 text-amber-500" /> },
    { to: '/color-theory-guide', label: 'Color Theory Guide', desc: 'Harmonies, temperature & color wheel', icon: <BookOpen className="w-4 h-4 text-brand-500" /> },
    { to: '/understanding-rgb', label: 'Understanding RGB', desc: 'Additive digital light model', icon: <Sliders className="w-4 h-4 text-rose-500" /> },
    { to: '/understanding-hex-colors', label: 'Understanding HEX', desc: 'Hexadecimal web color codes', icon: <Hash className="w-4 h-4 text-sky-500" /> },
    { to: '/understanding-hsl', label: 'Understanding HSL', desc: 'Intuitive cylindrical color model', icon: <Sparkles className="w-4 h-4 text-purple-500" /> },
    { to: '/faq', label: 'Frequently Asked Questions', desc: '14 comprehensive FAQs & answers', icon: <Info className="w-4 h-4 text-emerald-500" /> },
  ];

  const platformList = [
    { to: '/statistics', label: 'Player Statistics', desc: 'Career metrics, streaks & badges', icon: <BarChart3 className="w-4 h-4 text-brand-500" /> },
    { to: '/about', label: 'About Platform', desc: 'Architecture & client-side ethos', icon: <Info className="w-4 h-4 text-sky-500" /> },
    { to: '/privacy', label: 'Privacy Policy', desc: '100% browser-native, zero tracking', icon: <ShieldCheck className="w-4 h-4 text-emerald-500" /> },
    { to: '/terms', label: 'Terms of Service', desc: 'Open web terms & conditions', icon: <FileText className="w-4 h-4 text-slate-500" /> },
    { to: '/contact', label: 'Contact Us', desc: 'Feedback, bug reports & requests', icon: <Mail className="w-4 h-4 text-amber-500" /> },
  ];

  const developerLinks = [
    { href: 'https://shoaibarif.vercel.app/', label: 'Shoaib Arif (Portfolio)', desc: 'Personal website & projects', icon: <Sparkles className="w-4 h-4 text-brand-500" /> },
    { href: 'https://github.com/shoaibmarif', label: 'GitHub Profile', desc: '@shoaibmarif', icon: <GithubIcon className="w-4 h-4 text-slate-800 dark:text-slate-200" /> },
    { href: 'https://www.linkedin.com/in/shoaibmarif/', label: 'LinkedIn Profile', desc: 'Connect on LinkedIn', icon: <LinkedinIcon className="w-4 h-4 text-[#0A66C2]" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 select-none"
          aria-label="Chroma Color Guessing Platform Home"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-rose-500 via-brand-500 to-sky-400 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Palette className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-base tracking-tight text-slate-900 dark:text-white leading-none">
              CHROMA<span className="text-brand-600 dark:text-brand-400">LABS</span>
            </span>
            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
              Precision Color Arcade
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links & Dropdowns */}
        <nav
          ref={dropdownRef}
          className="hidden lg:flex items-center gap-1 text-xs font-bold"
          aria-label="Main navigation"
        >
          {/* Game Modes Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('modes')}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                activeDropdown === 'modes'
                  ? 'bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
              aria-expanded={activeDropdown === 'modes'}
              aria-haspopup="true"
            >
              <span>Modes</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'modes' ? 'rotate-180 text-brand-500' : 'text-slate-400'}`} />
            </button>

            {activeDropdown === 'modes' && (
              <div className="absolute left-0 mt-2 w-[440px] p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-2xl grid grid-cols-2 gap-1.5 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="col-span-2 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 mb-1">
                  Core Game Modes
                </div>
                {gameModesList.map((m) => (
                  <Link
                    key={m.to}
                    to={m.to}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                  >
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                      {m.icon}
                    </div>
                    <div>
                      <span className="block font-black text-xs text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                        {m.label}
                      </span>
                      <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-normal leading-tight">
                        {m.desc}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Formats Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('formats')}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                activeDropdown === 'formats'
                  ? 'bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
              aria-expanded={activeDropdown === 'formats'}
              aria-haspopup="true"
            >
              <span>Formats</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'formats' ? 'rotate-180 text-brand-500' : 'text-slate-400'}`} />
            </button>

            {activeDropdown === 'formats' && (
              <div className="absolute left-0 mt-2 w-80 p-2.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-2xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 mb-1">
                  Challenge Types
                </div>
                {formatsList.map((f) => (
                  <Link
                    key={f.to}
                    to={f.to}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                        {f.icon}
                      </div>
                      <div>
                        <span className="block font-black text-xs text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                          {f.label}
                        </span>
                        <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-normal">
                          {f.desc}
                        </span>
                      </div>
                    </div>
                    {f.badge && (
                      <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black bg-amber-500 text-white font-mono uppercase shadow-xs">
                        {f.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Tools Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('tools')}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                activeDropdown === 'tools'
                  ? 'bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
              aria-expanded={activeDropdown === 'tools'}
              aria-haspopup="true"
            >
              <span>Tools</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'tools' ? 'rotate-180 text-brand-500' : 'text-slate-400'}`} />
            </button>

            {activeDropdown === 'tools' && (
              <div className="absolute left-0 mt-2 w-80 p-2.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-2xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 mb-1">
                  Interactive Color Utilities
                </div>
                {toolsList.map((t) => (
                  <Link
                    key={t.to}
                    to={t.to}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                  >
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                      {t.icon}
                    </div>
                    <div>
                      <span className="block font-black text-xs text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                        {t.label}
                      </span>
                      <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-normal">
                        {t.desc}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Learn / Guides Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('guides')}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                activeDropdown === 'guides'
                  ? 'bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
              aria-expanded={activeDropdown === 'guides'}
              aria-haspopup="true"
            >
              <span>Learn</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'guides' ? 'rotate-180 text-brand-500' : 'text-slate-400'}`} />
            </button>

            {activeDropdown === 'guides' && (
              <div className="absolute left-0 mt-2 w-80 p-2.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-2xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 mb-1">
                  Theory & Educational Guides
                </div>
                {guidesList.map((g) => (
                  <Link
                    key={g.to}
                    to={g.to}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                  >
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                      {g.icon}
                    </div>
                    <div>
                      <span className="block font-black text-xs text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                        {g.label}
                      </span>
                      <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-normal">
                        {g.desc}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Platform / More Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('more')}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                activeDropdown === 'more'
                  ? 'bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
              aria-expanded={activeDropdown === 'more'}
              aria-haspopup="true"
            >
              <span>More</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'more' ? 'rotate-180 text-brand-500' : 'text-slate-400'}`} />
            </button>

            {activeDropdown === 'more' && (
              <div className="absolute right-0 mt-2 w-72 p-2.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-2xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 mb-1">
                  Platform & Legal
                </div>
                {platformList.map((p) => (
                  <Link
                    key={p.to}
                    to={p.to}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                  >
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                      {p.icon}
                    </div>
                    <div>
                      <span className="block font-black text-xs text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                        {p.label}
                      </span>
                      <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-normal">
                        {p.desc}
                      </span>
                    </div>
                  </Link>
                ))}

                <div className="px-2 pt-2 pb-1 text-[10px] font-black uppercase tracking-wider text-slate-400 border-t border-slate-100 dark:border-slate-800 mt-1 mb-1">
                  Developer
                </div>
                {developerLinks.map((d) => (
                  <a
                    key={d.href}
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                  >
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                      {d.icon}
                    </div>
                    <div>
                      <span className="block font-black text-xs text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                        {d.label}
                      </span>
                      <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-normal">
                        {d.desc}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right Tools (Daily quick-launch, Stats, Settings, GitHub, Mobile Menu Toggle) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Daily Challenge Icon Button */}
          <Link
            to="/daily-color-challenge"
            aria-label="Daily Color Challenge"
            className="p-2 text-amber-600 hover:text-amber-700 dark:text-amber-400 hover:bg-amber-500/10 dark:hover:bg-amber-500/15 rounded-xl transition-colors"
            title="Today's Daily Color Challenge"
          >
            <Calendar className="w-5 h-5 text-amber-500" />
          </Link>

          {/* Stats Button */}
          <Link
            to="/statistics"
            aria-label="View Statistics & Achievements"
            className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            title="Statistics & Achievements"
          >
            <BarChart3 className="w-5 h-5" />
          </Link>

          {/* GitHub Profile Button */}
          <a
            href="https://github.com/shoaibmarif"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile (@shoaibmarif)"
            className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors hidden sm:inline-flex"
            title="GitHub (@shoaibmarif)"
          >
            <GithubIcon className="w-5 h-5" />
          </a>

          {/* Settings Button */}
          <button
            type="button"
            onClick={onOpenSettings}
            aria-label="Open settings"
            className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            title="Game Settings & Accessibility"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Mobile Navigation Drawer Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors ml-0.5"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Side Drawer (Rendered via Portal to prevent any backdrop-filter or container clipping) */}
      {isMobileMenuOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[1000] lg:hidden flex justify-end"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Backdrop overlay */}
            <div
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm animate-fadeInOverlay cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-in Drawer Container */}
            <aside className="relative w-[85vw] max-w-sm h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col z-10 animate-slideLeft border-l border-slate-200/80 dark:border-slate-800">
              {/* Drawer Header */}
              <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shrink-0">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 cursor-pointer"
                  aria-label="ChromaLabs Home"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 via-brand-500 to-sky-400 p-0.5 shadow-sm flex items-center justify-center">
                    <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                      <Palette className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-black text-sm tracking-tight text-slate-900 dark:text-white leading-none">
                      CHROMA<span className="text-brand-600 dark:text-brand-400">LABS</span>
                    </span>
                    <span className="text-[8px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
                      Precision Color Arcade
                    </span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
                {/* Game Modes */}
                <div className="space-y-2">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
                    Game Modes
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {gameModesList.map((m) => (
                      <Link
                        key={m.to}
                        to={m.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-brand-50 dark:hover:bg-brand-950/40 rounded-xl border border-slate-200/70 dark:border-slate-700/60 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors cursor-pointer"
                      >
                        {m.icon}
                        <span className="truncate">{m.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Challenge Formats */}
                <div className="space-y-2">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
                    Challenge Formats
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {formatsList.map((f) => (
                      <Link
                        key={f.to}
                        to={f.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-brand-50 dark:hover:bg-brand-950/40 rounded-xl border border-slate-200/70 dark:border-slate-700/60 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          {f.icon}
                          <div className="truncate text-left">
                            <span className="block truncate font-bold">{f.label}</span>
                            <span className="block text-[10px] text-slate-500 font-normal truncate">{f.desc}</span>
                          </div>
                        </div>
                        {f.badge && (
                          <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] bg-amber-500 text-white font-mono font-bold">
                            {f.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Color Tools */}
                <div className="space-y-2">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
                    Color Tools
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {toolsList.map((t) => (
                      <Link
                        key={t.to}
                        to={t.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-brand-50 dark:hover:bg-brand-950/40 rounded-xl border border-slate-200/70 dark:border-slate-700/60 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors cursor-pointer"
                      >
                        {t.icon}
                        <span className="truncate">{t.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Learn & Guides */}
                <div className="space-y-2">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
                    Learn & Guides
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {guidesList.map((g) => (
                      <Link
                        key={g.to}
                        to={g.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-brand-50 dark:hover:bg-brand-950/40 rounded-xl border border-slate-200/70 dark:border-slate-700/60 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors cursor-pointer"
                      >
                        {g.icon}
                        <span className="truncate">{g.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Platform & Info */}
                <div className="space-y-2">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
                    Platform & Info
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {platformList.map((p) => (
                      <Link
                        key={p.to}
                        to={p.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-brand-50 dark:hover:bg-brand-950/40 rounded-xl border border-slate-200/70 dark:border-slate-700/60 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors cursor-pointer"
                      >
                        {p.icon}
                        <span className="truncate">{p.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Developer / Shoaib Arif Profile Links */}
                <div className="space-y-2 pb-6">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
                    Developer
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {developerLinks.map((d) => (
                      <a
                        key={d.href}
                        href={d.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 p-2.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-brand-50 dark:hover:bg-brand-950/40 rounded-xl border border-slate-200/70 dark:border-slate-700/60 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
                      >
                        {d.icon}
                        <div className="truncate">
                          <span className="block truncate font-bold text-slate-900 dark:text-white">{d.label}</span>
                          <span className="block text-[10px] text-slate-500 font-normal truncate">{d.desc}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Quick Actions Footer */}
              <div className="p-3.5 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex items-center gap-2 shrink-0">
                <Link
                  to="/daily-color-challenge"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Daily Challenge</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenSettings();
                  }}
                  className="p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors cursor-pointer"
                  aria-label="Game Settings"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </aside>
          </div>,
          document.body
        )}
    </header>
  );
};
