import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary';
import { logger } from './utils/observability';
import './index.css';

window.addEventListener('unhandledrejection', (e) => {
  logger.error('Unhandled promise rejection', { reason: e.reason });
});

window.addEventListener('error', (e) => {
  logger.error('Uncaught runtime error', { message: e.message, filename: e.filename, lineno: e.lineno });
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
