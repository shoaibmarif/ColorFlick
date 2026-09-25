import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Play & Modes */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Game Modes
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/color-guessing-game" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Exact Color Match
                </Link>
              </li>
              <li>
                <Link to="/rgb-color-game" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  RGB Slider Challenge
                </Link>
              </li>
              <li>
                <Link to="/hex-color-game" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  HEX Code Quiz
                </Link>
              </li>
              <li>
                <Link to="/color-name-game" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Color Name Guess
                </Link>
              </li>
              <li>
                <Link to="/daily-color-challenge" className="text-amber-600 dark:text-amber-400 font-bold hover:underline">
                  Daily Challenge
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Education & Color Theory */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Learn & Guides
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/how-to-play" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  How to Play & Scoring
                </Link>
              </li>
              <li>
                <Link to="/color-theory" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Color Theory 101
                </Link>
              </li>
              <li>
                <Link to="/rgb-vs-hex" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  RGB vs HEX Guide
                </Link>
              </li>
              <li>
                <Link to="/color-codes" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Color Codes Reference
                </Link>
              </li>
              <li>
                <Link to="/color-guessing-game-faq" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: About & Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  About ColorGuess
                </Link>
              </li>
              <li>
                <Link to="/statistics" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Player Dashboard & Stats
                </Link>
              </li>
              <li>
                <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>100% Client-Side</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Legal & Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/privacy" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-brand-600" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Color Guessing Game
            </span>
            <span>— Fast, Free & Private</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Built for designers, developers, and color enthusiasts.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
