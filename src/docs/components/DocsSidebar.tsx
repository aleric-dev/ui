import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Layers, Box, Cpu, Layout, BookOpen, Terminal, History } from 'lucide-react';
import { COMPONENTS_REGISTRY, type ComponentItem } from '../data/componentsRegistry';

export const DocsSidebar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredComponents = COMPONENTS_REGISTRY.filter((comp) =>
    comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comp.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const atoms = filteredComponents.filter((c) => c.category === 'atoms');
  const molecules = filteredComponents.filter((c) => c.category === 'molecules');
  const organisms = filteredComponents.filter((c) => c.category === 'organisms');
  const templates = filteredComponents.filter((c) => c.category === 'templates');

  const renderNavList = (items: ComponentItem[]) => {
    if (items.length === 0) return null;
    return (
      <ul className="space-y-1 mt-1">
        {items.map((item) => (
          <li key={item.id}>
            <NavLink
              to={`/docs/components/${item.id}`}
              className={({ isActive }) =>
                `w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold border-l-2 border-indigo-600'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-[#0B0F19]/50 p-4 min-h-[calc(100vh-3.5rem)] overflow-y-auto">
      {/* Search Input */}
      <div className="relative mb-5">
        <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar componentes..."
          className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      <nav className="space-y-6">
        {/* Getting Started */}
        <div>
          <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Primeros Pasos
          </h4>
          <ul className="space-y-1 text-xs font-medium">
            <li>
              <NavLink
                to="/docs/installation"
                className={({ isActive }) =>
                  `w-full text-left px-3 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold border-l-2 border-indigo-600'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                  }`
                }
              >
                <span>Instalación (npm / pnpm / CLI)</span>
                <Terminal className="w-3.5 h-3.5 text-slate-400" />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/docs/documentation"
                className={({ isActive }) =>
                  `w-full text-left px-3 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold border-l-2 border-indigo-600'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                  }`
                }
              >
                <span>Documentación Adicional</span>
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/docs/changelog"
                className={({ isActive }) =>
                  `w-full text-left px-3 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold border-l-2 border-indigo-600'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                  }`
                }
              >
                <span>Historial de Cambios</span>
                <History className="w-3.5 h-3.5 text-slate-400" />
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Átomos */}
        {atoms.length > 0 && (
          <div>
            <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5" />
                Átomos
              </span>
              <span className="text-[10px] font-mono text-slate-400">{atoms.length}</span>
            </h4>
            {renderNavList(atoms)}
          </div>
        )}

        {/* Moléculas */}
        {molecules.length > 0 && (
          <div>
            <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Moléculas
              </span>
              <span className="text-[10px] font-mono text-slate-400">{molecules.length}</span>
            </h4>
            {renderNavList(molecules)}
          </div>
        )}

        {/* Organismos */}
        {organisms.length > 0 && (
          <div>
            <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                Organismos
              </span>
              <span className="text-[10px] font-mono text-slate-400">{organisms.length}</span>
            </h4>
            {renderNavList(organisms)}
          </div>
        )}

        {/* Templates */}
        {templates.length > 0 && (
          <div>
            <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Layout className="w-3.5 h-3.5" />
                Templates
              </span>
              <span className="text-[10px] font-mono text-slate-400">{templates.length}</span>
            </h4>
            {renderNavList(templates)}
          </div>
        )}
      </nav>
    </aside>
  );
};
