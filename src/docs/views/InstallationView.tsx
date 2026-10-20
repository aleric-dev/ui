import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Badge } from '../../index';

export const InstallationView: React.FC = () => {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const renderCodeBlock = (code: string, id: string, title?: string) => (
    <div className="relative rounded-xl bg-slate-900 text-slate-100 border border-slate-800 overflow-hidden font-mono text-xs shadow-xs my-3">
      {title && (
        <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-slate-400 text-[11px]">
          <span>{title}</span>
          <button
            onClick={() => copyToClipboard(code, id)}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {copiedSnippet === id ? (
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
      )}
      <pre className="p-4 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-6">
      {/* HEADER */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <Badge variant="indigo" className="mb-2">Guía Oficial</Badge>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Instalación de @aleric.dev/ui
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
          Aprende a integrar <strong>@aleric.dev/ui</strong> en tus aplicaciones React 19 como paquete de dependencias o mediante nuestro CLI.
        </p>
      </div>

      {/* PARTE 1: INSTALACIÓN COMO DEPENDENCIA */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-indigo-600 text-white font-mono text-xs flex items-center justify-center font-bold">
            1
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Instalar como Paquete de Librería
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Instala la librería directamente usando tu gestor de paquetes preferido:
        </p>

        {renderCodeBlock(
          `# Con pnpm (Recomendado)
pnpm add @aleric.dev/ui

# O con npm
npm install @aleric.dev/ui`,
          'install-pkg',
          'Terminal'
        )}

        <h3 className="text-sm font-bold text-slate-900 dark:text-white pt-2">
          Importar Estilos
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          En el punto de entrada de tu aplicación (<code className="font-mono text-xs">main.tsx</code> o <code className="font-mono text-xs">App.tsx</code>), añade la hoja de estilos:
        </p>

        {renderCodeBlock(
          `// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Importa los estilos empaquetados de @aleric.dev/ui
import '@aleric.dev/ui/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);`,
          'import-css',
          'src/main.tsx'
        )}

        <h3 className="text-sm font-bold text-slate-900 dark:text-white pt-2">
          Uso en tus Componentes
        </h3>
        {renderCodeBlock(
          `import { Button, Card, Badge, MetricStatCard } from '@aleric.dev/ui';

export function Dashboard() {
  return (
    <Card hover className="p-6">
      <Badge variant="emerald" dot>Activo</Badge>
      <h2 className="text-lg font-bold mt-2">Métricas de Rendimiento</h2>
      <Button variant="primary" className="mt-4">Ver Reporte</Button>
    </Card>
  );
}`,
          'usage-example',
          'src/Dashboard.tsx'
        )}
      </section>

      {/* PARTE 2: DISTRIBUCIÓN VÍA CLI */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-emerald-600 text-white font-mono text-xs flex items-center justify-center font-bold">
            2
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Distribución vía CLI (@aleric.dev/ui)
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Si prefieres tener el código fuente de los componentes en tu propia carpeta <code className="font-mono text-xs">src/components/ui/</code> para personalizarlos libremente con total control, utiliza el CLI de Aleric Dev:
        </p>

        {renderCodeBlock(
          `# 1. Inicializar la utilidad cn() y estructura en tu proyecto
npx @aleric.dev/ui init

# 2. Agregar componentes individuales
npx @aleric.dev/ui add button
npx @aleric.dev/ui add sidebar
npx @aleric.dev/ui add metric-strip

# 3. Listar todos los componentes disponibles en el registro
npx @aleric.dev/ui list`,
          'cli-usage',
          'Terminal'
        )}
      </section>
    </div>
  );
};
