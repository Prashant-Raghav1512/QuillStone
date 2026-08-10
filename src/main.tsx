import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Note: intentionally not wrapped in <StrictMode>. The page below drives a
// canvas particle field and a scroll-linked logo with plain imperative DOM
// code (rAF loops, event listeners) set up once on mount — StrictMode's
// dev-only double-invoke of effects would double up listeners/loops.
createRoot(document.getElementById('root')!).render(<App />);
