import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PageShell } from './components/layout/PageShell';
import { HomePage } from './pages/Home';
import { REDIRECTS } from './seo/routes';

// Route-level code splitting keeps the first load small (better Core Web Vitals).
const named = <K extends string>(loader: () => Promise<Record<K, React.ComponentType<any>>>, key: K) =>
  lazy(() => loader().then((m) => ({ default: m[key] })));

const GameArena = named(() => import('./pages/GameArena'), 'GameArena');
const DailyChallengePage = named(() => import('./pages/DailyChallengePage'), 'DailyChallengePage');
const StatsPage = named(() => import('./pages/StatsPage'), 'StatsPage');
const HowToPlayPage = named(() => import('./pages/HowToPlay'), 'HowToPlayPage');
const ColorTheoryPage = named(() => import('./pages/ColorTheory'), 'ColorTheoryPage');
const ColorTheoryGuidePage = named(() => import('./pages/ColorTheoryGuidePage'), 'ColorTheoryGuidePage');
const RgbVsHexPage = named(() => import('./pages/RgbVsHex'), 'RgbVsHexPage');
const ColorCodesPage = named(() => import('./pages/ColorCodes'), 'ColorCodesPage');
const UnderstandingRgbPage = named(() => import('./pages/UnderstandingRgbPage'), 'UnderstandingRgbPage');
const UnderstandingHexPage = named(() => import('./pages/UnderstandingHexPage'), 'UnderstandingHexPage');
const UnderstandingHslPage = named(() => import('./pages/UnderstandingHslPage'), 'UnderstandingHslPage');
const ColorConverterPage = named(() => import('./pages/ColorConverterPage'), 'ColorConverterPage');
const ColorContrastCheckerPage = named(() => import('./pages/ColorContrastCheckerPage'), 'ColorContrastCheckerPage');
const ColorDistancePage = named(() => import('./pages/ColorDistancePage'), 'ColorDistancePage');
const FaqPage = named(() => import('./pages/FaqPage'), 'FaqPage');
const AboutPage = named(() => import('./pages/AboutPage'), 'AboutPage');
const PrivacyPage = named(() => import('./pages/PrivacyPage'), 'PrivacyPage');
const TermsPage = named(() => import('./pages/TermsPage'), 'TermsPage');
const ContactPage = named(() => import('./pages/ContactPage'), 'ContactPage');
const NotFoundPage = named(() => import('./pages/NotFoundPage'), 'NotFoundPage');

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const PageFallback = () => <div className="min-h-[60vh]" aria-busy="true" />;

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageShell>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* Games */}
            <Route path="/color-guessing-game" element={<GameArena />} />
            <Route path="/color-guessing-game/:difficultyParam" element={<GameArena />} />
            <Route path="/rgb-color-game" element={<GameArena forcedMode="rgb-guess" />} />
            <Route path="/hex-color-game" element={<GameArena forcedMode="hex-guess" />} />
            <Route path="/color-picker-game" element={<GameArena forcedMode="color-picker" />} />
            <Route path="/color-matching-game" element={<GameArena forcedMode="color-match" />} />
            <Route path="/color-theory-game" element={<GameArena forcedMode="warm-cool" />} />
            <Route path="/daily-color-challenge" element={<DailyChallengePage />} />
            <Route path="/color-game-timed" element={<GameArena forcedFormat="timed" />} />
            <Route path="/color-game-practice" element={<GameArena forcedFormat="practice" />} />
            <Route path="/color-game-for-beginners" element={<GameArena forcedDifficulty="easy" />} />

            {/* Tools */}
            <Route path="/color-converter" element={<ColorConverterPage initialFormat="all" />} />
            <Route path="/rgb-to-hex" element={<ColorConverterPage initialFormat="rgb" />} />
            <Route path="/hex-to-rgb" element={<ColorConverterPage initialFormat="hex" />} />
            <Route path="/color-contrast-checker" element={<ColorContrastCheckerPage />} />
            <Route path="/color-distance" element={<ColorDistancePage />} />
            <Route path="/color-codes" element={<ColorCodesPage />} />

            {/* Learn */}
            <Route path="/how-to-play" element={<HowToPlayPage />} />
            <Route path="/color-theory-guide" element={<ColorTheoryGuidePage />} />
            <Route path="/color-theory" element={<ColorTheoryPage />} />
            <Route path="/understanding-rgb" element={<UnderstandingRgbPage />} />
            <Route path="/understanding-hex-colors" element={<UnderstandingHexPage />} />
            <Route path="/understanding-hsl" element={<UnderstandingHslPage />} />
            <Route path="/rgb-vs-hex" element={<RgbVsHexPage />} />
            <Route path="/faq" element={<FaqPage />} />

            {/* Site */}
            <Route path="/statistics" element={<StatsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Retired duplicate URLs (also 301-redirected by the host) */}
            {Object.entries(REDIRECTS).map(([from, to]) => (
              <Route key={from} path={from} element={<Navigate to={to} replace />} />
            ))}

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </PageShell>
    </BrowserRouter>
  );
};

export default App;
