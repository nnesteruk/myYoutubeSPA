import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './scss/style.scss';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/youtubeSpa/">
      <App />
    </BrowserRouter>
  </StrictMode>,
);
