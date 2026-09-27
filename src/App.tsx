import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PageShell } from './components/layout/PageShell';
import { HomePage } from './pages/Home';
import { GameArena } from './pages/GameArena';
import { DailyChallengePage } from './pages/DailyChallengePage';
import { StatsPage } from './pages/StatsPage';
import { HowToPlayPage } from './pages/HowToPlay';
import { ColorTheoryPage } from './pages/ColorTheory';
import { ColorTheoryGuidePage } from './pages/ColorTheoryGuidePage';
import { RgbVsHexPage } from './pages/RgbVsHex';
import { ColorCodesPage } from './pages/ColorCodes';
import { UnderstandingRgbPage } from './pages/UnderstandingRgbPage';
import { UnderstandingHexPage } from './pages/UnderstandingHexPage';
import { UnderstandingHslPage } from './pages/UnderstandingHslPage';
import { ColorConverterPage } from './pages/ColorConverterPage';
import { ColorContrastCheckerPage } from './pages/ColorContrastCheckerPage';
import { ColorDistancePage } from './pages/ColorDistancePage';
import { FaqPage } from './pages/FaqPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';

// Scroll restoration component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageShell>
        <Routes>
          {/* Main Homepage */}
          <Route path="/" element={<HomePage />} />

          {/* Core Game & Mode Specific Arenas */}
          <Route path="/color-guessing-game" element={<GameArena />} />
          <Route path="/color-guessing-game/:difficultyParam" element={<GameArena />} />
          <Route path="/color-guessing-game-online" element={<GameArena />} />
          <Route path="/color-game" element={<GameArena />} />
          <Route path="/color-match-game" element={<GameArena forcedMode="color-match" />} />
          <Route path="/rgb-color-game" element={<GameArena forcedMode="rgb-guess" />} />
          <Route path="/rgb-color-guessing-game" element={<GameArena forcedMode="rgb-guess" />} />
          <Route path="/hex-color-game" element={<GameArena forcedMode="hex-guess" />} />
          <Route path="/hex-color-guessing-game" element={<GameArena forcedMode="hex-guess" />} />
          <Route path="/color-picker-game" element={<GameArena forcedMode="color-picker" />} />
          <Route path="/color-matching-game" element={<GameArena forcedMode="color-match" />} />
          <Route path="/guess-the-color" element={<GameArena />} />
          <Route path="/color-challenge" element={<GameArena />} />
          <Route path="/color-quiz" element={<GameArena />} />
          <Route path="/color-test" element={<GameArena />} />

          {/* Formats & Variations */}
          <Route path="/daily-color-challenge" element={<DailyChallengePage />} />
          <Route path="/color-game-timed" element={<GameArena forcedFormat="timed" />} />
          <Route path="/color-game-practice" element={<GameArena forcedFormat="practice" />} />
          <Route path="/color-game-for-beginners" element={<GameArena forcedDifficulty="easy" />} />
          <Route path="/color-theory-game" element={<GameArena forcedMode="warm-cool" />} />
          <Route path="/color-theory-quiz" element={<GameArena forcedMode="warm-cool" />} />

          {/* Interactive Tools */}
          <Route path="/color-distance" element={<ColorDistancePage />} />
          <Route path="/rgb-to-hex" element={<ColorConverterPage initialFormat="rgb" />} />
          <Route path="/hex-to-rgb" element={<ColorConverterPage initialFormat="hex" />} />
          <Route path="/color-converter" element={<ColorConverterPage initialFormat="all" />} />
          <Route path="/color-contrast-checker" element={<ColorContrastCheckerPage />} />

          {/* Educational & Guides */}
          <Route path="/how-to-play" element={<HowToPlayPage />} />
          <Route path="/color-theory" element={<ColorTheoryPage />} />
          <Route path="/color-theory-guide" element={<ColorTheoryGuidePage />} />
          <Route path="/understanding-rgb" element={<UnderstandingRgbPage />} />
          <Route path="/understanding-hex-colors" element={<UnderstandingHexPage />} />
          <Route path="/understanding-hsl" element={<UnderstandingHslPage />} />
          <Route path="/rgb-vs-hex" element={<RgbVsHexPage />} />
          <Route path="/color-codes" element={<ColorCodesPage />} />

          {/* Statistics & Community */}
          <Route path="/statistics" element={<StatsPage />} />

          {/* Platform & Compliance */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/color-guessing-game-faq" element={<FaqPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageShell>
    </BrowserRouter>
  );
};

export default App;
