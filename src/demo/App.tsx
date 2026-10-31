import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DocsHeader } from '../docs/components/DocsHeader';
import { DocsLayout } from '../docs/layouts/DocsLayout';
import { LandingHeroView } from '../docs/views/LandingHeroView';
import { InstallationView } from '../docs/views/InstallationView';
import { AdditionalDocsView } from '../docs/views/AdditionalDocsView';
import { ComponentDetailView } from '../docs/views/ComponentDetailView';
import { ChangelogView } from '../docs/views/ChangelogView';
import { SocialIcon } from '../index';

export const DemoApp: React.FC = () => {
  // Sincronización de tema (Light por defecto, con soporte Dark)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('aleric-theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('aleric-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-500/20 selection:text-indigo-600 transition-colors duration-200">
        {/* 1. Header Global Superior con rutas y selector de tema */}
        <DocsHeader theme={theme} onToggleTheme={toggleTheme} />

        {/* 2. Enrutador Principal */}
        <div className="flex-1">
          <Routes>
            {/* Landing page inicial */}
            <Route path="/" element={<LandingHeroView />} />

            {/* Bounded Context de Documentación con Layout persistente (Sidebar + Outlet) */}
            <Route path="/docs" element={<DocsLayout />}>
              <Route index element={<Navigate to="/docs/installation" replace />} />
              <Route path="installation" element={<InstallationView />} />
              <Route path="documentation" element={<AdditionalDocsView />} />
              <Route path="changelog" element={<ChangelogView />} />
              <Route path="components" element={<Navigate to="/docs/components/button" replace />} />
              <Route path="components/:componentId" element={<ComponentDetailView />} />
            </Route>

            {/* Fallback de rutas no encontradas */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* 3. Footer con Enlace oficial a aleric.dev */}
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-[#0B0F19]/60 py-6 px-4 transition-colors">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2.5">
              <img
                src="/favicon.svg"
                alt="Aleric Dev"
                className="w-6 h-6 rounded-md shadow-xs object-contain"
              />
              <span>
                Construido por{' '}
                <a
                  href="https://aleric.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="underline font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Aleric Dev
                </a>
                . Código abierto bajo licencia MIT.
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/aleric-dev/ui"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors flex items-center gap-1.5"
              >
                <SocialIcon name="github" size={14} /> GitHub
              </a>
              <span className="font-mono text-[11px] text-slate-400">
                @aleric.dev/ui • React 19 • Tailwind 3.4
              </span>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default DemoApp;
