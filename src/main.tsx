import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[var(--bg-primary)]">
        {/* Header */}
        <Header />

        {/* Main App Content */}
        <main className="flex-1">
          <App />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  </StrictMode>
);
