import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Sun, Moon, Terminal, BookOpen, Layers } from 'lucide-react';
import { SocialIcon } from '../../index';

export interface DocsHeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const DocsHeader: React.FC<DocsHeaderProps> = ({
  theme,
  onToggleTheme,
}) => {
  const location = useLocation();

  const isComponentsActive = location.pathname.startsWith('/docs/components');
  const isInstallActive = location.pathname === '/docs/installation';
  const isDocsActive = location.pathname === '/docs/documentation';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Logo & Version */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
          >
            <img
              src="/favicon.svg"
              alt="@aleric.dev/ui"
              className="w-8 h-8 rounded-xl shadow-xs group-hover:scale-105 transition-transform object-contain"
            />
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white tracking-tight text-sm">
                @aleric.dev/ui
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                v0.1.0
              </span>
            </div>
          </Link>

          {/* Nav Links con react-router-dom */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <NavLink
              to="/docs/components/button"
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                isComponentsActive
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Componentes
            </NavLink>
            <NavLink
              to="/docs/installation"
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                isInstallActive
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              Instalación
            </NavLink>
            <NavLink
              to="/docs/documentation"
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                isDocsActive
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Documentación
            </NavLink>
          </nav>
        </div>

        {/* Herramientas derechas */}
        <div className="flex items-center gap-2">
          {/* Quick CLI Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 select-all">
            <span className="text-slate-400">$</span> pnpm add @aleric.dev/ui
          </div>

          {/* GitHub Link */}
          <a
            href="https://github.com/aleric-dev/ui"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Ver repositorio en GitHub"
          >
            <SocialIcon name="github" size={16} />
          </a>

          {/* Selector de Tema (Light / Dark) */}
          <button
            onClick={onToggleTheme}
            className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer focus:outline-none"
            title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-slate-700" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
