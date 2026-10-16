import React, { useState } from 'react';
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
  SocialIcon,
  FormField,
  SearchInput,
  ConfirmDialog,
  EmptyState,
  MetricStatCard,
  MetricStrip,
  StatusBadge,
  DatePicker,
  Sidebar,
  TopNav,
  AppLayout,
  NotificationCenter,
  type NavGroup,
  type BreadcrumbItem,
  type NotificationItem,
  type IdeaStatus,
} from '../index';
import {
  Copy,
  Check,
  LayoutDashboard,
  Layers,
  Box,
  Users,
  Settings,
  ExternalLink,
  AlertTriangle,
  FolderOpen,
  TrendingUp,
  Activity,
  Plus,
  Trash2,
} from 'lucide-react';

export const DemoApp: React.FC = () => {
  // Pestaña activa del Showcase
  const [activeTab, setActiveTab] = useState<'simulator' | 'atoms' | 'molecules' | 'docs'>('simulator');

  // Estados interactivos
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [btnLoading, setBtnLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [dateVal, setDateVal] = useState('2026-10-16');
  const [toggleVal, setToggleVal] = useState(true);
  const [statusVal, setStatusVal] = useState<IdeaStatus>('ready');
  const [selectVal, setSelectVal] = useState('pro');

  // Estados del Simulador de Dashboard
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNavId, setActiveNavId] = useState('overview');

  const handleCopyInstall = () => {
    navigator.clipboard.writeText('npm i @aleric/ui');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navGroups: NavGroup[] = [
    {
      label: 'Navegación',
      items: [
        {
          id: 'overview',
          label: 'Dashboard',
          icon: <LayoutDashboard className="w-4 h-4" />,
          active: activeNavId === 'overview',
          onClick: () => setActiveNavId('overview'),
        },
        {
          id: 'analytics',
          label: 'Analítica',
          icon: <Activity className="w-4 h-4" />,
          badge: 'Live',
          badgeVariant: 'success',
          active: activeNavId === 'analytics',
          onClick: () => setActiveNavId('analytics'),
        },
        {
          id: 'customers',
          label: 'Clientes',
          icon: <Users className="w-4 h-4" />,
          badge: 48,
          active: activeNavId === 'customers',
          onClick: () => setActiveNavId('customers'),
        },
      ],
    },
    {
      label: 'Sistema',
      items: [
        {
          id: 'integrations',
          label: 'Módulos',
          icon: <Layers className="w-4 h-4" />,
          active: activeNavId === 'integrations',
          onClick: () => setActiveNavId('integrations'),
        },
        {
          id: 'settings',
          label: 'Configuración',
          icon: <Settings className="w-4 h-4" />,
          active: activeNavId === 'settings',
          onClick: () => setActiveNavId('settings'),
        },
      ],
    },
  ];

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Workspace' },
    { label: 'Producción' },
    { label: activeNavId === 'overview' ? 'Dashboard General' : activeNavId.toUpperCase(), color: 'text-indigo-400' },
  ];

  const notifications: NotificationItem[] = [
    {
      id: '1',
      title: 'Despliegue completado',
      description: 'La versión v0.1.0 de la plataforma está en línea.',
      timestamp: 'Hace 5m',
      read: false,
      type: 'success',
    },
    {
      id: '2',
      title: 'Alerta de capacidad',
      description: 'El uso de base de datos superó el 75% del límite.',
      timestamp: 'Hace 1h',
      read: false,
      type: 'warning',
      actionLabel: 'Ver métricas',
      onAction: () => setActiveNavId('analytics'),
    },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-[#07090E] text-slate-100' : 'bg-slate-50 text-slate-900'} font-sans select-none`}>
      {/* 1. Header Global de la Landing */}
      <header className="sticky top-0 z-50 bg-[#07090E]/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-mono font-bold text-sm shadow-md">
              UI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm text-white">@aleric/ui</span>
                <Badge variant="indigo" size="xs">v0.1.0</Badge>
              </div>
              <p className="text-[10px] font-mono text-slate-400 hidden sm:block">
                Design System Atómico & Clean Architecture
              </p>
            </div>
          </div>

          {/* Navegación por pestañas */}
          <div className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            <button
              type="button"
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'simulator' ? 'bg-indigo-600 text-white font-semibold shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Simulador Dashboard
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('atoms')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'atoms' ? 'bg-indigo-600 text-white font-semibold shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Átomos
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('molecules')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'molecules' ? 'bg-indigo-600 text-white font-semibold shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Moléculas
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('docs')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'docs' ? 'bg-indigo-600 text-white font-semibold shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Instalación
            </button>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Alternar tema"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <a
              href="https://github.com/aleric-dev/ui"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-xs font-mono text-slate-300 transition-colors"
            >
              <SocialIcon name="github" size={14} />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>
        </div>
      </header>

      {/* Selector móvil de pestañas */}
      <div className="md:hidden flex border-b border-slate-800 bg-slate-950 px-4 py-2 gap-2 overflow-x-auto text-xs font-mono">
        <button
          type="button"
          onClick={() => setActiveTab('simulator')}
          className={`px-2.5 py-1 rounded-md shrink-0 ${activeTab === 'simulator' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Simulador
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('atoms')}
          className={`px-2.5 py-1 rounded-md shrink-0 ${activeTab === 'atoms' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Átomos
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('molecules')}
          className={`px-2.5 py-1 rounded-md shrink-0 ${activeTab === 'molecules' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Moléculas
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('docs')}
          className={`px-2.5 py-1 rounded-md shrink-0 ${activeTab === 'docs' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Docs
        </button>
      </div>

      {/* 2. Contenido según la pestaña */}
      {activeTab === 'simulator' && (
        <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
            <div>
              <h2 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <Box className="w-4 h-4 text-indigo-400" />
                Simulador de AppLayout, Sidebar y TopNav en Vivo
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Demostración con una marca de ejemplo neutra (Horizon OS). Todos los logos, menús y acciones son parametrizables.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                {sidebarCollapsed ? 'Expandir Sidebar' : 'Colapsar Sidebar'}
              </Button>
            </div>
          </div>

          {/* Ventana contenedora del Layout simulado */}
          <div className="border border-slate-800 rounded-3xl overflow-hidden shadow-2xl h-[680px] flex flex-col bg-[#0B0F19]">
            <AppLayout
              sidebar={
                <Sidebar
                  collapsed={sidebarCollapsed}
                  onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                  brand={{
                    name: 'Horizon Console',
                    subtitle: 'Multi-Tenant Cloud',
                    logo: (
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm">
                        HZ
                      </div>
                    ),
                  }}
                  groups={navGroups}
                  footer={
                    <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-2.5'} p-1`}>
                      <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-mono font-bold text-white shrink-0">
                        OP
                      </div>
                      {!sidebarCollapsed && (
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-slate-200 truncate">Operador Demo</p>
                          <p className="text-[10px] font-mono text-slate-500 truncate">admin@demo.org</p>
                        </div>
                      )}
                    </div>
                  }
                />
              }
              topNav={
                <TopNav
                  breadcrumbs={breadcrumbs}
                  notificationSlot={
                    <NotificationCenter
                      notifications={notifications}
                      onMarkAllAsRead={() => {}}
                    />
                  }
                  actions={
                    <div className="flex items-center gap-2">
                      <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Nuevo Registro</span>
                      </Button>
                    </div>
                  }
                />
              }
            >
              {/* Contenido interior del Dashboard simulado */}
              <div className="p-6 space-y-6 max-w-6xl mx-auto w-full">
                {/* Métricas KPI */}
                <MetricStrip
                  items={[
                    {
                      label: 'MRR Proyectado',
                      value: '$42,850',
                      subtext: <span className="text-emerald-400 font-semibold">+18.4% vs mes anterior</span>,
                      icon: TrendingUp,
                      color: 'emerald',
                      badge: 'USD',
                    },
                    {
                      label: 'Tenants Activos',
                      value: '124',
                      subtext: <span>99.98% de disponibilidad SLA</span>,
                      icon: Activity,
                      color: 'indigo',
                    },
                    {
                      label: 'Tickets Abiertos',
                      value: '3',
                      subtext: <span className="text-amber-400">2 de alta prioridad</span>,
                      icon: AlertTriangle,
                      color: 'amber',
                    },
                  ]}
                />

                {/* Tabla de Registros / Clientes */}
                <Card className="p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-white font-mono">
                        Tenants y Cuentas Conectadas
                      </h3>
                      <p className="text-xs text-slate-400">
                        Administración centralizada de instancias y estados de servicio.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-64">
                      <SearchInput
                        value={searchVal}
                        onChange={setSearchVal}
                        placeholder="Filtrar tenants..."
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                        <tr>
                          <th className="p-3">Organización</th>
                          <th className="p-3">Plan</th>
                          <th className="p-3">Estado</th>
                          <th className="p-3">Última Actividad</th>
                          <th className="p-3 text-right">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {[
                          { name: 'Acme Logistics Corp', plan: 'Enterprise', status: 'active', date: '2026-10-16' },
                          { name: 'Nova Health Clinic', plan: 'Pro SaaS', status: 'ready', date: '2026-10-15' },
                          { name: 'Solaria Energy Lab', plan: 'Starter', status: 'pending', date: '2026-10-14' },
                        ].map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                            <td className="p-3 font-semibold text-white">{row.name}</td>
                            <td className="p-3 text-slate-400">{row.plan}</td>
                            <td className="p-3">
                              <StatusBadge status={row.status} />
                            </td>
                            <td className="p-3 text-slate-400">{row.date}</td>
                            <td className="p-3 text-right space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsConfirmOpen(true)}
                              >
                                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            </AppLayout>
          </div>
        </div>
      )}

      {/* 3. Pestaña de Átomos */}
      {activeTab === 'atoms' && (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
          <div>
            <h2 className="text-xl font-bold font-mono text-white">Catálogo de Átomos</h2>
            <p className="text-xs text-slate-400 mt-1">
              Componentes individuales sin lógica de negocio, ultra estilizados y accesibles.
            </p>
          </div>

          {/* Botones */}
          <Card className="p-6 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
              Button (Variantes, Tamaños y Estados)
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button
                variant="primary"
                loading={btnLoading}
                onClick={() => {
                  setBtnLoading(true);
                  setTimeout(() => setBtnLoading(false), 1500);
                }}
              >
                Click para Loading
              </Button>
              <Button variant="outline" disabled>
                Disabled
              </Button>
            </div>
          </Card>

          {/* Badges */}
          <Card className="p-6 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
              Badge (Semánticos & Acentos)
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="indigo">Indigo</Badge>
              <Badge variant="emerald" dot>Emerald Dot</Badge>
              <Badge variant="amber">Amber</Badge>
              <Badge variant="rose" dot>Rose Dot</Badge>
              <Badge variant="slate">Slate</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </Card>

          {/* Switches y Toggles */}
          <Card className="p-6 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
              Toggle & StatusToggle
            </h3>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <Toggle checked={toggleVal} onChange={setToggleVal} />
                <span className="text-xs font-mono text-slate-300">Notificaciones push activadas</span>
              </div>
              <div className="flex items-center gap-3">
                <StatusToggle status={statusVal} onChange={setStatusVal} />
              </div>
            </div>
          </Card>

          {/* Inputs y Selects */}
          <Card className="p-6 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
              Input, Textarea & Select
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input placeholder="Input de texto estándar..." />
              <Select
                value={selectVal}
                onValueChange={setSelectVal}
                options={[
                  { value: 'starter', label: 'Plan Starter' },
                  { value: 'pro', label: 'Plan Pro SaaS' },
                  { value: 'enterprise', label: 'Plan Enterprise' },
                ]}
              />
              <Textarea placeholder="Área de texto estilizada..." rows={2} />
            </div>
          </Card>
        </div>
      )}

      {/* 4. Pestaña de Moléculas */}
      {activeTab === 'molecules' && (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
          <div>
            <h2 className="text-xl font-bold font-mono text-white">Catálogo de Moléculas</h2>
            <p className="text-xs text-slate-400 mt-1">
              Combinaciones funcionales de átomos para flujos de datos reales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* FormField */}
            <Card className="p-6 space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
                FormField con Validación
              </h3>
              <div className="space-y-4">
                <FormField label="Correo Electrónico" required helperText="Usaremos este email para enviar el enlace de acceso.">
                  <Input placeholder="usuario@empresa.com" />
                </FormField>

                <FormField label="Clave de API" required error="La clave debe comenzar con 'sk_live_'">
                  <Input value="sk_test_invalida" error />
                </FormField>
              </div>
            </Card>

            {/* DatePicker */}
            <Card className="p-6 space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
                DatePicker Popup
              </h3>
              <p className="text-xs text-slate-400">
                Selector de fechas modal con atajos rápidos ('Hoy', '+1 Sem').
              </p>
              <div className="flex items-center gap-3">
                <DatePicker value={dateVal} onChange={setDateVal} />
                <span className="text-xs font-mono text-slate-300">
                  Seleccionada: <strong className="text-indigo-400">{dateVal}</strong>
                </span>
              </div>
            </Card>

            {/* EmptyState */}
            <Card className="p-6">
              <EmptyState
                icon={<FolderOpen className="w-6 h-6" />}
                title="No se encontraron registros"
                description="Ajusta los filtros de búsqueda o agrega un nuevo tenant a tu catálogo."
                actionText="Crear Primer Tenant"
                onAction={() => setIsModalOpen(true)}
              />
            </Card>

            {/* MetricStatCard */}
            <Card className="p-6 space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
                MetricStatCard Individual
              </h3>
              <MetricStatCard
                label="Tasa de Conversión"
                value="24.8%"
                subtitle="vs. 18.2% periodo anterior"
                icon={<Activity className="w-5 h-5 text-indigo-400" />}
              />
            </Card>
          </div>
        </div>
      )}

      {/* 5. Pestaña de Instalación & Documentación */}
      {activeTab === 'docs' && (
        <div className="p-6 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-extrabold text-white font-mono">
              Comienza en 2 minutos con <span className="text-indigo-400">@aleric/ui</span>
            </h2>
            <p className="text-sm text-slate-400 max-w-lg mx-auto">
              Librería de componentes atómicos para React 19 y Tailwind CSS, lista para cualquier SaaS, dashboard o CMS multi-tenant.
            </p>
          </div>

          <Card className="p-6 space-y-4 bg-slate-900/60 border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">1. Instalación mediante NPM o PNPM</span>
              <button
                type="button"
                onClick={handleCopyInstall}
                className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 font-mono text-xs text-indigo-300 overflow-x-auto">
              npm install @aleric/ui
            </pre>
          </Card>

          <Card className="p-6 space-y-4 bg-slate-900/60 border-slate-800">
            <span className="text-xs font-mono text-slate-400">2. Importación de estilos globales</span>
            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 font-mono text-xs text-slate-300 overflow-x-auto">
{`// En tu main.tsx o App.tsx:
import '@aleric/ui/dist/styles.css';`}
            </pre>
          </Card>

          <Card className="p-6 space-y-4 bg-slate-900/60 border-slate-800">
            <span className="text-xs font-mono text-slate-400">3. Ejemplo de uso con AppLayout y Sidebar</span>
            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 font-mono text-xs text-slate-300 overflow-x-auto">
{`import { AppLayout, Sidebar, TopNav, MetricStrip, Button } from '@aleric/ui';

export function MyDashboard() {
  return (
    <AppLayout
      sidebar={
        <Sidebar
          brand={{ name: 'Mi Empresa', logo: <MyLogo /> }}
          groups={[{ label: 'General', items: [{ id: '1', label: 'Inicio', icon: <Home /> }] }]}
        />
      }
      topNav={<TopNav title="Dashboard Principal" />}
    >
      <div className="p-6">
        <MetricStrip items={[{ label: 'Ventas', value: '$10,000' }]} />
      </div>
    </AppLayout>
  );
}`}
            </pre>
          </Card>
        </div>
      )}

      {/* Modal de Ejemplo */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="md">
        <ModalHeader title="Crear Nuevo Tenant" onClose={() => setIsModalOpen(false)} />
        <ModalBody className="space-y-4">
          <FormField label="Nombre de la Organización" required>
            <Input placeholder="Ej. Soluciones Beta SAS" />
          </FormField>
          <FormField label="Subdominio">
            <Input placeholder="beta" />
          </FormField>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => setIsModalOpen(false)}>
            Guardar Tenant
          </Button>
        </ModalFooter>
      </Modal>

      {/* ConfirmDialog de Ejemplo */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => setIsConfirmOpen(false)}
        title="¿Eliminar Tenant?"
        message="Esta acción archivará la instancia y suspenderá los accesos de los usuarios asociados."
        confirmText="Sí, eliminar"
        variant="danger"
      />
    </div>
  );
};
