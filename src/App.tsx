import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PageShell } from './components/layout/PageShell';
import { HomePage } from './pages/Home';
import { GameArena } from './pages/GameArena';
import { DailyChallengePage } from './pages/DailyChallengePage';
import { StatsPage } from './pages/StatsPage';
import { HowToPlayPage } from './pages/HowToPlay';
import { ColorTheoryPage } from './pages/ColorTheory';
import { RgbVsHexPage } from './pages/RgbVsHex';
import { ColorCodesPage } from './pages/ColorCodes';
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
          {/* Main Gameplay */}
          <Route path="/" element={<HomePage />} />
          <Route path="/color-guessing-game" element={<GameArena />} />
          <Route
            path="/color-guessing-game/:difficultyParam"
            element={<GameArena />}
          />

          {/* Mode-specific dedicated entry points */}
          <Route
            path="/rgb-color-game"
            element={<GameArena forcedMode="rgb-guess" />}
          />
          <Route
            path="/hex-color-game"
            element={<GameArena forcedMode="hex-guess" />}
          />
          <Route
            path="/color-name-game"
            element={<GameArena forcedMode="color-name" />}
          />

          {/* Canonical redirects for search engine aliases */}
          <Route
            path="/color-guessing-game-online"
            element={<Navigate to="/color-guessing-game" replace />}
          />
          <Route
            path="/color-guessing-game-free"
            element={<Navigate to="/color-guessing-game" replace />}
          />
          <Route
            path="/color-match-game"
            element={<Navigate to="/color-guessing-game" replace />}
          />
          <Route
            path="/color-quiz"
            element={<Navigate to="/color-guessing-game" replace />}
          />

          {/* Daily Challenge */}
          <Route path="/daily-color-challenge" element={<DailyChallengePage />} />

          {/* Statistics */}
          <Route path="/statistics" element={<StatsPage />} />

          {/* Educational & Guides */}
          <Route path="/how-to-play" element={<HowToPlayPage />} />
          <Route path="/color-theory" element={<ColorTheoryPage />} />
          <Route path="/rgb-vs-hex" element={<RgbVsHexPage />} />
          <Route path="/color-codes" element={<ColorCodesPage />} />
          <Route path="/color-guessing-game-faq" element={<FaqPage />} />

          {/* Platform & Compliance */}
          <Route path="/about" element={<AboutPage />} />
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
