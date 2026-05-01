import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import ErrorBoundary from '@/components/ErrorBoundary';
import TriggerErrorButton from '@/components/TriggerErrorButton';
import { queryClient } from '@/lib/queryClient';
import { useIsDevMode } from '@/state/devMode/devModeStore';
import './i18n';
import './main.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

/** Floating demo button for the top-level ErrorBoundary; visible only in dev mode. */
const FloatingTriggerError = () => {
  const devModeOn = useIsDevMode();
  if (!import.meta.env.DEV && !devModeOn) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <TriggerErrorButton label="Trigger root error" />
    </div>
  );
};

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary
        onError={(error, info) => {
          if (import.meta.env.DEV) {
            console.error('ErrorBoundary caught:', error, info.componentStack);
          }
        }}
      >
        <App />
        <FloatingTriggerError />
      </ErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>,
);
