import React, { useState } from 'react';
import { isValidHex, sanitizeHexInput } from '../../utils/validation';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HexInputProps {
  onSubmit: (hex: string) => void;
  disabled?: boolean;
}

export const HexInput: React.FC<HexInputProps> = ({ onSubmit, disabled = false }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const cleanHex = sanitizeHexInput(value);
  const isValid = isValidHex(value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !cleanHex) {
      setError('Please enter a valid 3 or 6-character hex code (e.g. #3B82F6 or #FFF)');
      return;
    }
    setError(null);
    onSubmit(cleanHex);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Live Preview Box */}
        <div
          className="w-16 h-12 sm:h-12 rounded-xl flex items-center justify-center border-2 border-slate-300 dark:border-slate-700 shadow-inner flex-shrink-0 transition-colors"
          style={{ backgroundColor: cleanHex || 'transparent' }}
          title={cleanHex ? `Preview: ${cleanHex}` : 'Type a hex code to preview'}
        >
          {!cleanHex && (
            <Sparkles className="w-5 h-5 text-slate-400 dark:text-slate-500" />
          )}
        </div>

        {/* Input Field with Prefix */}
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-mono font-bold">
            #
          </div>
          <input
            type="text"
            value={value.replace(/^#/, '')}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError(null);
            }}
            placeholder="3B82F6 or FFF"
            maxLength={6}
            disabled={disabled}
            aria-label="Hex color code"
            aria-invalid={!!error}
            className="w-full pl-8 pr-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 transition-all disabled:opacity-50"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={disabled || !isValid}
          className="w-full sm:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-brand-400"
        >
          <span>Submit</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {error && (
        <p className="text-rose-600 dark:text-rose-400 text-xs font-semibold text-center" role="alert">
          {error}
        </p>
      )}

      <p className="text-slate-500 dark:text-slate-400 text-xs text-center">
        Tip: You can enter standard 6-digit (e.g. <code>#4F46E5</code>) or 3-digit shorthand (e.g. <code>#FFF</code>).
      </p>
    </form>
  );
};
