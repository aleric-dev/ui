import React from 'react';
import { History, GitCommit, ExternalLink, Tag } from 'lucide-react';
import { Badge } from '../../index';
import { MarkdownRenderer } from '../../components/molecules/MarkdownRenderer';
import changelogRaw from '../../../CHANGELOG.md?raw';

export const ChangelogView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* HEADER */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="indigo" dot>
            Registro Oficial
          </Badge>
          <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
            <History className="w-3 h-3" /> Historial de Versiones
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
          Historial de Cambios (Changelog)
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Seguimiento exhaustivo de versiones, nuevas características, correcciones y cambios en{' '}
          <strong className="text-slate-900 dark:text-white">@aleric.dev/ui</strong>. Basado estrictamente en{' '}
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">Semantic Versioning (SemVer)</span> y{' '}
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">Keep a Changelog</span>.
        </p>

        {/* Resumen de Política SemVer */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5">
            <Tag className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100">Patch (v0.1.X)</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Fixes de bugs, mejoras visuales y retoques internos.</div>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5">
            <GitCommit className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100">Minor (v0.X.0)</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Nuevos componentes o props compatibles hacia atrás.</div>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5">
            <ExternalLink className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100">GitHub Releases</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                <a
                  href="https://github.com/aleric-dev/ui/releases"
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 underline hover:no-underline font-medium"
                >
                  Ver releases en GitHub →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENIDO DEL CHANGELOG */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 shadow-xs">
        <MarkdownRenderer content={changelogRaw} />
      </div>
    </div>
  );
};
