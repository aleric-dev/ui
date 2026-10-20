import React, { useState } from 'react';
import { Copy, Check, Code2, Eye } from 'lucide-react';
import { type ComponentItem } from '../data/componentsRegistry';
import {
  Button,
  Badge,
  Card,
  Input,
  Textarea,
  Select,
  Toggle,
  StatusToggle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
  SocialIcon,
  FormField,
  SearchInput,
  ConfirmDialog,
  EmptyState,
  MetricStatCard,
  MetricStrip,
  StatusBadge,
  DatePicker,
  MarkdownRenderer,
  type IdeaStatus,
} from '../../index';

export interface ComponentViewerProps {
  component: ComponentItem;
}

export const ComponentViewer: React.FC<ComponentViewerProps> = ({ component }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [installTab, setInstallTab] = useState<'cli' | 'pnpm' | 'npm'>('cli');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);

  // Estados interactivos para las previsualizaciones en vivo
  const [demoToggle, setDemoToggle] = useState(true);
  const [demoStatus, setDemoStatus] = useState<IdeaStatus>('ready');
  const [demoSearch, setDemoSearch] = useState('');
  const [demoDate, setDemoDate] = useState('2026-10-19');
  const [demoSelect, setDemoSelect] = useState('growth');
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoConfirmOpen, setDemoConfirmOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const getInstallCommand = () => {
    switch (installTab) {
      case 'cli':
        return component.cliCommand;
      case 'pnpm':
        return 'pnpm add @aleric.dev/ui';
      case 'npm':
        return 'npm install @aleric.dev/ui';
    }
  };

  const handleCopyInstall = () => {
    navigator.clipboard.writeText(getInstallCommand());
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(component.exampleCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Renderizador de previsualizaciones interactivas según el componente
  const renderLivePreview = () => {
    switch (component.id) {
      case 'button':
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="emerald">Emerald</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <Button size="sm">Pequeño (sm)</Button>
              <Button size="md">Normal (md)</Button>
              <Button size="lg">Grande (lg)</Button>
              <Button
                variant="primary"
                loading={btnLoading}
                onClick={() => {
                  setBtnLoading(true);
                  setTimeout(() => setBtnLoading(false), 1500);
                }}
              >
                {btnLoading ? 'Cargando...' : 'Probar Loading'}
              </Button>
            </div>
          </div>
        );

      case 'badge':
        return (
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="indigo">Indigo</Badge>
            <Badge variant="emerald" dot>En Vivo</Badge>
            <Badge variant="amber">Pendiente</Badge>
            <Badge variant="rose">Error</Badge>
            <Badge variant="slate">Archivado</Badge>
          </div>
        );

      case 'card':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
            <Card hover>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Tarjeta con Hover</h4>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Pasa el cursor por encima para ver el micro-resalte de borde nítido de 1px.
              </p>
            </Card>
            <Card>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Tarjeta Estática</h4>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Superficie blanca limpia en modo claro y pizarra profunda en modo oscuro.
              </p>
            </Card>
          </div>
        );

      case 'input':
        return (
          <div className="space-y-3 w-full max-w-sm">
            <Input placeholder="nombre@empresa.com" />
            <Input placeholder="alr_live_8f3a9e2b1c4" mono />
            <Input placeholder="Campo con error" error={true} />
          </div>
        );

      case 'textarea':
        return (
          <div className="w-full max-w-md">
            <Textarea placeholder="Escribe aquí los requerimientos del software..." rows={3} />
          </div>
        );

      case 'select':
        return (
          <div className="w-full max-w-xs">
            <Select
              options={[
                { value: 'starter', label: 'Plan Starter ($99/mes)' },
                { value: 'growth', label: 'Plan Crecimiento ($249/mes)' },
                { value: 'enterprise', label: 'Plan Enterprise (A la medida)' },
              ]}
              value={demoSelect}
              onValueChange={(val) => setDemoSelect(val)}
            />
          </div>
        );

      case 'toggle':
        return (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Toggle checked={demoToggle} onChange={(val) => setDemoToggle(val)} />
              <span className="text-xs text-slate-700 dark:text-slate-300">Sincronización en tiempo real</span>
            </div>
            <div className="flex items-center gap-2">
              <Toggle checked={false} onChange={() => {}} />
              <span className="text-xs text-slate-400">Interruptor inactivo</span>
            </div>
          </div>
        );

      case 'status-toggle':
        return (
          <div className="flex items-center gap-3">
            <StatusToggle
              status={demoStatus}
              onChange={(val) => setDemoStatus(val)}
            />
            <span className="text-xs font-mono text-slate-500">Estado: {demoStatus}</span>
          </div>
        );

      case 'modal':
        return (
          <div>
            <Button onClick={() => setDemoModalOpen(true)}>Abrir Modal Accesible</Button>
            <Modal
              isOpen={demoModalOpen}
              onClose={() => setDemoModalOpen(false)}
              size="md"
            >
              <ModalHeader
                title="Detalle del Servicio Cloud"
                onClose={() => setDemoModalOpen(false)}
              />
              <ModalBody>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Este modal cuenta con backdrop borroso translúcido, foco contenido y cierre automático mediante la tecla Escape.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={() => setDemoModalOpen(false)}>
                  Cerrar
                </Button>
                <Button variant="primary" onClick={() => setDemoModalOpen(false)}>
                  Aceptar
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        );

      case 'spinner':
        return (
          <div className="flex items-center gap-6">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </div>
        );

      case 'social-icons':
        return (
          <div className="flex items-center gap-4">
            <SocialIcon name="github" size={20} className="text-slate-700 dark:text-slate-300" />
            <SocialIcon name="linkedin" size={20} className="text-indigo-600" />
            <SocialIcon name="whatsapp" size={20} className="text-emerald-600" />
            <SocialIcon name="x" size={20} className="text-slate-900 dark:text-white" />
          </div>
        );

      case 'form-field':
        return (
          <div className="w-full max-w-sm space-y-4">
            <FormField label="Correo Corporativo" required helperText="Usaremos este email para enviarte la propuesta">
              <Input placeholder="ceo@empresa.com" />
            </FormField>
          </div>
        );

      case 'search-input':
        return (
          <div className="w-full max-w-sm">
            <SearchInput
              value={demoSearch}
              onChange={(val) => setDemoSearch(val)}
              onClear={() => setDemoSearch('')}
              placeholder="Buscar clientes o contratos..."
            />
          </div>
        );

      case 'confirm-dialog':
        return (
          <div>
            <Button variant="danger" onClick={() => setDemoConfirmOpen(true)}>
              Probar Diálogo de Confirmación
            </Button>
            <ConfirmDialog
              isOpen={demoConfirmOpen}
              onClose={() => setDemoConfirmOpen(false)}
              onConfirm={() => {
                alert('Acción confirmada correctamente');
                setDemoConfirmOpen(false);
              }}
              title="¿Eliminar automatización de WhatsApp?"
              message="Esta acción desconectará el número y detendrá los disparadores inmediatos."
              confirmText="Sí, eliminar"
              variant="danger"
            />
          </div>
        );

      case 'empty-state':
        return (
          <div className="w-full max-w-md">
            <EmptyState
              title="Sin facturas pendientes"
              description="Todas las cotizaciones del mes en curso han sido conciliadas satisfactoriamente."
              actionText="Emitir Nueva Factura"
              onAction={() => alert('Nueva factura')}
            />
          </div>
        );

      case 'metric-stat-card':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
            <MetricStatCard
              label="MRR Contratado"
              value="$14,800 USD"
              subtitle="+22.4% vs mes anterior"
            />
            <MetricStatCard
              label="Leads Calificados"
              value="128"
              subtitle="Conversión 32%"
            />
          </div>
        );

      case 'metric-strip':
        return (
          <div className="w-full">
            <MetricStrip
              items={[
                { label: 'Pipeline Total', value: '$96,000 USD' },
                { label: 'Cierres Activos', value: '18', subtext: '+3 este mes' },
                { label: 'SLA Cloudflare', value: '100%', color: 'emerald' },
              ]}
            />
          </div>
        );

      case 'status-badge':
        return (
          <div className="flex flex-wrap gap-2.5">
            <StatusBadge status="active" />
            <StatusBadge status="pending" />
            <StatusBadge status="ready" />
            <StatusBadge status="resolved" />
            <StatusBadge status="failed" />
          </div>
        );

      case 'date-picker':
        return (
          <div className="w-full max-w-xs">
            <DatePicker
              value={demoDate}
              onChange={(val) => setDemoDate(val)}
              placeholder="Elegir fecha de entrega..."
            />
            <p className="mt-2 text-xs font-mono text-slate-500">
              Valor actual: <span className="text-indigo-600 font-semibold">{demoDate}</span>
            </p>
          </div>
        );

      case 'markdown-renderer':
        return (
          <div className="w-full max-w-lg p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <MarkdownRenderer
              content={`### Especificación Técnica de Aleric Dev
- **Frontend:** React 19 + TypeScript
- **Estilos:** Tailwind CSS con tokens puros
- **Edge:** Despliegue en Cloudflare Pages Functions
`}
            />
          </div>
        );

      default:
        return (
          <div className="p-6 text-center text-sm text-slate-500">
            Vista previa interactiva disponible en la pestaña Código y en la documentación.
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Title & Category Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2.5 mb-2">
          <span className="px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            {component.category}
          </span>
          <span className="text-xs text-slate-400 font-mono">@aleric.dev/ui</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {component.name}
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
          {component.description}
        </p>
      </div>

      {/* Quick Install Bar */}
      <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-1.5 text-xs font-medium">
          <button
            onClick={() => setInstallTab('cli')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              installTab === 'cli'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            CLI Aleric
          </button>
          <button
            onClick={() => setInstallTab('pnpm')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              installTab === 'pnpm'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            pnpm
          </button>
          <button
            onClick={() => setInstallTab('npm')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              installTab === 'npm'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            npm
          </button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <code className="text-xs font-mono text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/80 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700 select-all">
            {getInstallCommand()}
          </code>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopyInstall}
            className="text-xs h-7 px-2"
          >
            {copiedInstall ? (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <Check className="w-3.5 h-3.5" /> Copiado
              </span>
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </Button>
        </div>
      </div>

      {/* Interactive Tabs (Preview vs Code) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700/80">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Vista Previa
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Código
            </button>
          </div>

          {activeTab === 'code' && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyCode}
              className="text-xs h-7 gap-1.5"
            >
              {copiedCode ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Copiado al portapapeles
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copiar Código
                </>
              )}
            </Button>
          )}
        </div>

        {/* Content Box */}
        {activeTab === 'preview' ? (
          <div className="min-h-[260px] p-8 rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 flex items-center justify-center relative overflow-hidden transition-colors shadow-xs">
            {/* Grid Pattern sutil en el fondo */}
            <div className="absolute inset-0 bg-grid-slate opacity-40 pointer-events-none" />
            <div className="relative z-10 w-full flex items-center justify-center">
              {renderLivePreview()}
            </div>
          </div>
        ) : (
          <div className="relative rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 overflow-hidden font-mono text-xs shadow-md">
            <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-slate-400">
              <span>{component.name}.tsx</span>
              <span className="text-[10px] text-slate-500">React 19 + TypeScript</span>
            </div>
            <pre className="p-4 overflow-x-auto leading-relaxed selection:bg-indigo-500 selection:text-white">
              <code>{component.exampleCode}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Props & API Reference */}
      {component.props.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            Referencia de Propiedades (Props)
          </h3>
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">Prop</th>
                  <th className="py-2.5 px-4 font-semibold">Tipo</th>
                  <th className="py-2.5 px-4 font-semibold">Por Defecto</th>
                  <th className="py-2.5 px-4 font-semibold">Descripción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {component.props.map((prop) => (
                  <tr key={prop.name} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-2.5 px-4 font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                      {prop.name}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-slate-600 dark:text-slate-300 break-words max-w-xs">
                      {prop.type}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-slate-400 dark:text-slate-500">
                      {prop.default || '-'}
                    </td>
                    <td className="py-2.5 px-4 text-slate-600 dark:text-slate-400">
                      {prop.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
