import React, { useState } from 'react';
import { Layers, Palette, Terminal, Check, Copy } from 'lucide-react';
import { Card, Badge } from '../../index';

export const AdditionalDocsView: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-6">
      {/* HEADER */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <Badge variant="indigo" className="mb-2">Documentación Adicional</Badge>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Arquitectura, Tokens y Utilidades
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
          Fundamentos técnicos del sistema de diseño <strong>@aleric.dev/ui</strong>, tokens de color oficiales y convenciones de estilizado.
        </p>
      </div>

      {/* 1. PALETA DE COLORES ALERIC DEV */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Tokens de Color Oficiales
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          La paleta de Aleric Dev está concebida bajo el estándar de base clara nativa y contraste quirúrgico para paneles SaaS de alta conversión:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Indigo */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 shadow-xs">
            <div className="h-16 rounded-lg bg-indigo-600 flex items-end p-2.5">
              <span className="text-xs font-mono font-bold text-white">#6366F1</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Primario (Índigo)</h3>
              <p className="text-xs text-slate-500 mt-0.5">Acciones clave, CTAs y estados activos.</p>
            </div>
          </div>

          {/* Emerald */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 shadow-xs">
            <div className="h-16 rounded-lg bg-emerald-600 flex items-end p-2.5">
              <span className="text-xs font-mono font-bold text-white">#10B981</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Acento (Esmeralda)</h3>
              <p className="text-xs text-slate-500 mt-0.5">Métricas de crecimiento, aprobaciones y éxito.</p>
            </div>
          </div>

          {/* Slate */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 shadow-xs">
            <div className="h-16 rounded-lg bg-slate-900 flex items-end p-2.5">
              <span className="text-xs font-mono font-bold text-white">#0F172A</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Pizarra (Slate)</h3>
              <p className="text-xs text-slate-500 mt-0.5">Fondos base, bordes 1px y tipografía.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. UTILIDAD cn() */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            La Utilidad <code className="font-mono text-indigo-600 dark:text-indigo-400">cn()</code>
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Todos los componentes de <strong>@aleric.dev/ui</strong> utilizan la función de combinación inteligente <code className="font-mono text-xs">cn()</code>, combinando <code className="font-mono text-xs">clsx</code> para condiciones dinámicas y <code className="font-mono text-xs">tailwind-merge</code> para resolver colisiones de clases CSS:
        </p>

        <div className="relative rounded-xl bg-slate-900 text-slate-100 border border-slate-800 overflow-hidden font-mono text-xs shadow-xs">
          <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-slate-400 text-[11px]">
            <span>src/utils/cn.ts</span>
            <button
              onClick={() => handleCopy(`import { clsx, type ClassValue } from 'clsx';\nimport { twMerge } from 'tailwind-merge';\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}`, 'cn-copy')}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {copiedKey === 'cn-copy' ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Copiado
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Copy className="w-3 h-3" /> Copiar
                </span>
              )}
            </button>
          </div>
          <pre className="p-4 overflow-x-auto leading-relaxed">
            <code>{`import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}</code>
          </pre>
        </div>
      </section>

      {/* 3. JERARQUÍA ATÓMICA */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Metodología Atomic Design
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Para garantizar una escalabilidad sin fricción y evitar código inflado, el ecosistema se organiza en 4 capas concéntricas:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <Card className="p-4 space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">1. Átomos</h3>
              <Badge variant="indigo" size="xs">Indivisibles</Badge>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Botones, inputs, badges, selectores, modales y toggles sin lógica acoplada a negocio.
            </p>
          </Card>

          <Card className="p-4 space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">2. Moléculas</h3>
              <Badge variant="emerald" size="xs">Combinaciones</Badge>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              FormField, SearchInput, MetricStatCard, DatePicker y ConfirmDialog.
            </p>
          </Card>

          <Card className="p-4 space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">3. Organismos</h3>
              <Badge variant="amber" size="xs">Estructuras</Badge>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Sidebar colapsable con grupos, TopNav con breadcrumbs y NotificationCenter.
            </p>
          </Card>

          <Card className="p-4 space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">4. Templates</h3>
              <Badge variant="slate" size="xs">Layouts</Badge>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              AppLayout y StudioLayout con scroll independiente y slots desacoplados.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};
