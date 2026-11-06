import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { analytics } from './utils/analytics';
import { sendToAnalytics } from './utils/consent';

// Forward game events (game_completed, daily_challenge_completed, …) to the
// Google Tag Manager data layer. Consent Mode decides whether cookies are used.
analytics.init((event, payload) => {
  // Per-answer events are too chatty to be useful in GA.
  if (event !== 'answer_submitted') sendToAnalytics(event, payload);
}, true);

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
