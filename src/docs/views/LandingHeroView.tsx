import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Terminal,
  Layers,
  ShieldCheck,
  Check,
  Copy,
  BookOpen,
} from 'lucide-react';
import {
  Button,
  Badge,
  Card,
  SearchInput,
  Toggle,
  StatusBadge,
  MetricStatCard,
  DatePicker,
} from '../../index';
import pkg from '../../../package.json';

export interface LandingHeroViewProps {
  onExploreComponents?: () => void;
  onOpenInstallGuide?: () => void;
  onOpenDocs?: () => void;
}

export const LandingHeroView: React.FC<LandingHeroViewProps> = ({
  onExploreComponents,
  onOpenInstallGuide,
  onOpenDocs,
}) => {
  const navigate = useNavigate();
  const handleExplore = onExploreComponents || (() => navigate('/docs/components/button'));
  const handleInstall = onOpenInstallGuide || (() => navigate('/docs/installation'));
  const handleDocs = onOpenDocs || (() => navigate('/docs/documentation'));
  const [installTab, setInstallTab] = useState<'pnpm' | 'npm' | 'cli'>('pnpm');
  const [copied, setCopied] = useState(false);
  const [demoSearch, setDemoSearch] = useState('');
  const [demoToggle, setDemoToggle] = useState(true);
  const [demoDate, setDemoDate] = useState('2026-10-19');

  const getCommand = () => {
    switch (installTab) {
      case 'pnpm':
        return 'pnpm add @aleric.dev/ui';
      case 'npm':
        return 'npm install @aleric.dev/ui';
      case 'cli':
        return 'npx @aleric.dev/ui init';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCommand());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden py-12 lg:py-20">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-grid-slate opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-slate-700 dark:text-slate-300 hover:border-slate-300 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">@aleric.dev/ui v{pkg.version}</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-slate-600 dark:text-slate-400">Diseño Atómico para React 19</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Diseña interfaces SaaS con{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500">
              precisión quirúrgica.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Componentes atómicos desacoplados, sobrios y sin dependencias pesadas. Instálalos como librería vía npm/pnpm o copia los componentes directamente a tu proyecto con nuestro CLI.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              size="lg"
              variant="primary"
              onClick={handleExplore}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="shadow-sm shadow-indigo-600/30"
            >
              Explorar Componentes
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={handleInstall}
              icon={<Terminal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
            >
              Guía de Instalación
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleDocs}
              icon={<BookOpen className="w-4 h-4" />}
            >
              Documentación
            </Button>
          </div>

          {/* CLI Pill */}
          <div className="pt-4 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
              <div className="flex items-center gap-1 text-xs">
                {(['pnpm', 'npm', 'cli'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setInstallTab(tab)}
                    className={`px-2.5 py-1 rounded-lg font-mono uppercase text-[11px] transition-colors cursor-pointer ${
                      installTab === tab
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <code className="px-3 py-1 font-mono text-xs text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700/60 select-all">
                {getCommand()}
              </code>
              <button
                onClick={handleCopy}
                className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Copiar comando"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* LIVE INTERACTIVE SHOWCASE BENTO GRID */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Componentes Atómicos en Vivo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Metric KPI & Status */}
            <Card hover className="flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase font-semibold">
                  Métricas & Estados
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  Indicadores de Negocio
                </h3>
              </div>
              <MetricStatCard
                label="MRR Contratado"
                value="$18,450 USD"
                subtitle="+14.2% vs mes anterior"
              />
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <StatusBadge status="active" />
                <StatusBadge status="ready" />
                <StatusBadge status="pending" />
              </div>
            </Card>

            {/* Card 2: Interactive Controls */}
            <Card hover className="flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase font-semibold">
                  Controles Interactivos
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  Búsqueda y Acciones
                </h3>
              </div>
              <div className="space-y-3">
                <SearchInput
                  value={demoSearch}
                  onChange={(val) => setDemoSearch(val)}
                  onClear={() => setDemoSearch('')}
                  placeholder="Probar SearchInput..."
                />
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="primary">Guardar</Button>
                  <Button size="sm" variant="secondary">Cancelar</Button>
                  <Button size="sm" variant="emerald">Aprobar</Button>
                  <Button size="sm" variant="danger">Eliminar</Button>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Toggle
                    checked={demoToggle}
                    onChange={(val) => setDemoToggle(val)}
                  />
                  <span className="text-xs text-slate-700 dark:text-slate-300">Notificaciones en vivo</span>
                </div>
              </div>
            </Card>

            {/* Card 3: DatePicker & Badges */}
            <Card hover className="flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase font-semibold">
                  Selectores & Calendario
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  DatePicker con Atajos
                </h3>
              </div>
              <div className="space-y-2">
                <DatePicker
                  value={demoDate}
                  onChange={(val) => setDemoDate(val)}
                  placeholder="Elegir fecha de entrega..."
                />
                <p className="text-xs font-mono text-slate-500">
                  Seleccionado: <span className="text-indigo-600 font-semibold">{demoDate}</span>
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <Badge variant="indigo">React 19</Badge>
                <Badge variant="emerald" dot>Tailwind 3.4</Badge>
                <Badge variant="amber">TypeScript</Badge>
                <Badge variant="slate">Zero Bloat</Badge>
              </div>
            </Card>
          </div>
        </div>

        {/* 3 VALUE PILLARS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Arquitectura Atómica Pura
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Estructurado estrictamente en Átomos, Moléculas, Organismos y Templates para máxima reusabilidad y cero estilos duplicados.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Distribución Dual (npm / pnpm / CLI)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Instala el paquete empaquetado completo o usa el comando <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">npx @aleric.dev/ui add</code> para copiar los componentes individuales.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Diseño Sobrio & Alta Fidelidad
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Modo claro nativo como base, bordes nítidos de 1px, tipografía legible y micro-interacciones de alto rendimiento para software SaaS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
