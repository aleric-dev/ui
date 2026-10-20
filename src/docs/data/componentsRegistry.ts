export interface ComponentPropDoc {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ComponentItem {
  id: string;
  name: string;
  category: 'atoms' | 'molecules' | 'organisms' | 'templates';
  description: string;
  cliCommand: string;
  importCode: string;
  exampleCode: string;
  props: ComponentPropDoc[];
}

export const COMPONENTS_REGISTRY: ComponentItem[] = [
  // ==========================================
  // ÁTOMOS
  // ==========================================
  {
    id: 'button',
    name: 'Button',
    category: 'atoms',
    description: 'Botón con múltiples variantes semánticas, tamaños ergonómicos, estados de carga y slots para iconos.',
    cliCommand: 'npx @aleric.dev/ui add button',
    importCode: "import { Button } from '@aleric.dev/ui';",
    exampleCode: `<div className="flex flex-wrap items-center gap-3">
  <Button variant="primary">Guardar Cambios</Button>
  <Button variant="secondary">Cancelar</Button>
  <Button variant="emerald">Aprobar Factura</Button>
  <Button variant="outline">Ver Detalles</Button>
  <Button variant="ghost">Opciones</Button>
  <Button variant="danger">Eliminar</Button>
  <Button variant="primary" loading>Procesando...</Button>
</div>`,
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'emerald' | 'danger' | 'ghost' | 'outline'", default: "'primary'", description: 'Estilo visual semántico del botón.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamaño del padding y tipografía.' },
      { name: 'icon', type: 'React.ReactNode', default: 'undefined', description: 'Icono opcional para renderizar.' },
      { name: 'iconPosition', type: "'left' | 'right'", default: "'left'", description: 'Posición del icono respecto al texto.' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Muestra un spinner animado y desactiva el botón.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Desactiva la interacción del botón.' },
    ],
  },
  {
    id: 'badge',
    name: 'Badge',
    category: 'atoms',
    description: 'Etiqueta compacta para estados, categorías y conteos rápidos con soporte de indicador circular.',
    cliCommand: 'npx @aleric.dev/ui add badge',
    importCode: "import { Badge } from '@aleric.dev/ui';",
    exampleCode: `<div className="flex flex-wrap items-center gap-2">
  <Badge variant="indigo">Nuevo Release</Badge>
  <Badge variant="emerald" dot>En Vivo</Badge>
  <Badge variant="amber">Pendiente</Badge>
  <Badge variant="rose">Error 404</Badge>
  <Badge variant="slate">Archivado</Badge>
</div>`,
    props: [
      { name: 'variant', type: "'indigo' | 'emerald' | 'amber' | 'rose' | 'slate'", default: "'indigo'", description: 'Color semántico de fondo y borde.' },
      { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Dimensiones del badge.' },
      { name: 'dot', type: 'boolean', default: 'false', description: 'Muestra un indicador circular de estado pulsante.' },
    ],
  },
  {
    id: 'card',
    name: 'Card',
    category: 'atoms',
    description: 'Contenedor de superficie estructurada con bordes nítidos de 1px y efecto de elevación sutil en hover.',
    cliCommand: 'npx @aleric.dev/ui add card',
    importCode: "import { Card } from '@aleric.dev/ui';",
    exampleCode: `<Card hover className="max-w-md">
  <h3 className="text-base font-semibold text-slate-900 dark:text-white">Tarjeta de Alta Conversión</h3>
  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
    Contenedor optimizado para paneles de métricas, listas comerciales y vistas de detalle.
  </p>
</Card>`,
    props: [
      { name: 'hover', type: 'boolean', default: 'false', description: 'Habilita transición y resalte de borde al pasar el cursor.' },
      { name: 'children', type: 'React.ReactNode', default: 'undefined', description: 'Contenido interno de la tarjeta.' },
      { name: 'className', type: 'string', default: "''", description: 'Clases adicionales de Tailwind.' },
    ],
  },
  {
    id: 'input',
    name: 'Input',
    category: 'atoms',
    description: 'Campo de texto con soporte para iconos laterales, modo monoespaciado y validación de errores.',
    cliCommand: 'npx @aleric.dev/ui add input',
    importCode: "import { Input } from '@aleric.dev/ui';",
    exampleCode: `<div className="space-y-3 max-w-sm">
  <Input placeholder="nombre@empresa.com" />
  <Input placeholder="API Key Secreta" mono />
  <Input placeholder="Campo con error" error="El correo es requerido" />
</div>`,
    props: [
      { name: 'error', type: 'string', default: 'undefined', description: 'Mensaje de error para pintar el borde rojo y texto de advertencia.' },
      { name: 'mono', type: 'boolean', default: 'false', description: 'Aplica tipografía JetBrains Mono ideal para slugs, keys o códigos.' },
      { name: 'icon', type: 'React.ReactNode', default: 'undefined', description: 'Icono SVG en el extremo del campo.' },
      { name: 'iconPosition', type: "'left' | 'right'", default: "'left'", description: 'Lado de anclaje del icono.' },
    ],
  },
  {
    id: 'textarea',
    name: 'Textarea',
    category: 'atoms',
    description: 'Área de texto multilínea con foco reactivo y scrollbars integrados.',
    cliCommand: 'npx @aleric.dev/ui add textarea',
    importCode: "import { Textarea } from '@aleric.dev/ui';",
    exampleCode: `<Textarea placeholder="Describe los requerimientos del proyecto..." rows={4} />`,
    props: [
      { name: 'error', type: 'string', default: 'undefined', description: 'Texto de error de validación.' },
      { name: 'rows', type: 'number', default: '3', description: 'Filas visibles iniciales.' },
    ],
  },
  {
    id: 'select',
    name: 'Select',
    category: 'atoms',
    description: 'Selector desplegable estilizado con opciones tipadas y soporte para iconos.',
    cliCommand: 'npx @aleric.dev/ui add select',
    importCode: "import { Select } from '@aleric.dev/ui';",
    exampleCode: `<Select
  options={[
    { value: 'starter', label: 'Plan Starter' },
    { value: 'growth', label: 'Plan Crecimiento' },
    { value: 'enterprise', label: 'Plan Corporativo' },
  ]}
  value="growth"
  onChange={(val) => console.log(val)}
/>`,
    props: [
      { name: 'options', type: 'Array<{ value: string; label: string; icon?: React.ReactNode }>', default: '[]', description: 'Colección de opciones a renderizar.' },
      { name: 'value', type: 'string', default: "''", description: 'Valor activo seleccionado.' },
      { name: 'onChange', type: '(val: string) => void', default: 'undefined', description: 'Callback al cambiar la selección.' },
      { name: 'placeholder', type: 'string', default: "'Seleccionar...'", description: 'Texto visible cuando no hay valor.' },
    ],
  },
  {
    id: 'toggle',
    name: 'Toggle',
    category: 'atoms',
    description: 'Interruptor booleano accesible con microanimación de deslizamiento.',
    cliCommand: 'npx @aleric.dev/ui add toggle',
    importCode: "import { Toggle } from '@aleric.dev/ui';",
    exampleCode: `<Toggle
  checked={true}
  onChange={(checked) => console.log(checked)}
  label="Activar notificaciones instantáneas de WhatsApp"
/>`,
    props: [
      { name: 'checked', type: 'boolean', default: 'false', description: 'Estado activo o inactivo del switch.' },
      { name: 'onChange', type: '(checked: boolean) => void', default: 'undefined', description: 'Callback al alternar estado.' },
      { name: 'label', type: 'string', default: 'undefined', description: 'Texto descriptivo adyacente.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Desactiva la interacción.' },
    ],
  },
  {
    id: 'status-toggle',
    name: 'StatusToggle',
    category: 'atoms',
    description: 'Interruptor visual con badges informativos que representan estados de negocio (Activo / Inactivo).',
    cliCommand: 'npx @aleric.dev/ui add status-toggle',
    importCode: "import { StatusToggle } from '@aleric.dev/ui';",
    exampleCode: `<StatusToggle
  checked={true}
  onChange={(checked) => console.log(checked)}
  activeLabel="Publicado"
  inactiveLabel="Borrador"
/>`,
    props: [
      { name: 'checked', type: 'boolean', default: 'false', description: 'Estado del interruptor.' },
      { name: 'onChange', type: '(val: boolean) => void', default: 'undefined', description: 'Manejador de cambio de estado.' },
      { name: 'activeLabel', type: 'string', default: "'Activo'", description: 'Texto mostrado al estar activado.' },
      { name: 'inactiveLabel', type: 'string', default: "'Inactivo'", description: 'Texto mostrado al estar desactivado.' },
    ],
  },
  {
    id: 'modal',
    name: 'Modal',
    category: 'atoms',
    description: 'Diálogo accesible montado sobre portal, con backdrop desenfocado y soporte de tecla Escape.',
    cliCommand: 'npx @aleric.dev/ui add modal',
    importCode: "import { Modal, ModalHeader, ModalBody, ModalFooter } from '@aleric.dev/ui';",
    exampleCode: `<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Detalles del Contrato">
  <ModalBody>
    <p className="text-slate-600 dark:text-slate-300 text-sm">
      Contenido del contrato con especificaciones técnicas y alcances.
    </p>
  </ModalBody>
  <ModalFooter>
    <Button variant="secondary" onClick={() => setIsOpen(false)}>Cerrar</Button>
    <Button variant="primary">Firmar Digitalmente</Button>
  </ModalFooter>
</Modal>`,
    props: [
      { name: 'isOpen', type: 'boolean', default: 'false', description: 'Controla la visibilidad del modal.' },
      { name: 'onClose', type: '() => void', default: 'undefined', description: 'Función invocada al cerrar por backdrop, botón o Escape.' },
      { name: 'title', type: 'string', default: 'undefined', description: 'Título superior del diálogo.' },
      { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", default: "'md'", description: 'Ancho máximo del contenedor.' },
    ],
  },
  {
    id: 'spinner',
    name: 'Spinner',
    category: 'atoms',
    description: 'Indicador de carga circular con rotación SVG.',
    cliCommand: 'npx @aleric.dev/ui add spinner',
    importCode: "import { Spinner } from '@aleric.dev/ui';",
    exampleCode: `<div className="flex items-center gap-4">
  <Spinner size="sm" />
  <Spinner size="md" variant="indigo" />
  <Spinner size="lg" variant="emerald" />
</div>`,
    props: [
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Dimensiones del spinner.' },
      { name: 'variant', type: "'indigo' | 'emerald' | 'white' | 'slate'", default: "'indigo'", description: 'Color del arco activo.' },
    ],
  },
  {
    id: 'social-icons',
    name: 'SocialIcon',
    category: 'atoms',
    description: 'Iconografía vectorial normalizada para redes sociales y plataformas de desarrollo.',
    cliCommand: 'npx @aleric.dev/ui add social-icons',
    importCode: "import { SocialIcon } from '@aleric.dev/ui';",
    exampleCode: `<div className="flex items-center gap-3">
  <SocialIcon platform="github" className="w-5 h-5 text-slate-700 dark:text-slate-300" />
  <SocialIcon platform="linkedin" className="w-5 h-5 text-indigo-600" />
  <SocialIcon platform="whatsapp" className="w-5 h-5 text-emerald-600" />
  <SocialIcon platform="x" className="w-5 h-5 text-slate-900 dark:text-white" />
</div>`,
    props: [
      { name: 'platform', type: "'github' | 'linkedin' | 'whatsapp' | 'x' | 'instagram' | 'youtube'", default: 'undefined', description: 'Plataforma a renderizar.' },
      { name: 'className', type: 'string', default: "''", description: 'Clases de tamaño y color.' },
    ],
  },

  // ==========================================
  // MOLÉCULAS
  // ==========================================
  {
    id: 'form-field',
    name: 'FormField',
    category: 'molecules',
    description: 'Envoltorio estructurado para formularios con etiqueta, indicador obligatorio, texto de ayuda y error.',
    cliCommand: 'npx @aleric.dev/ui add form-field',
    importCode: "import { FormField, Input } from '@aleric.dev/ui';",
    exampleCode: `<FormField label="Teléfono de WhatsApp" required helperText="Con código de país (+57)">
  <Input placeholder="+57 300 123 4567" />
</FormField>`,
    props: [
      { name: 'label', type: 'string', default: "''", description: 'Etiqueta del campo.' },
      { name: 'required', type: 'boolean', default: 'false', description: 'Añade un asterisco rojo indicador.' },
      { name: 'helperText', type: 'string', default: 'undefined', description: 'Texto auxiliar explicativo debajo del campo.' },
      { name: 'error', type: 'string', default: 'undefined', description: 'Mensaje de error que invalida el campo.' },
    ],
  },
  {
    id: 'search-input',
    name: 'SearchInput',
    category: 'molecules',
    description: 'Barra de búsqueda con lupa integrada y botón de limpieza automática con tecla Escape.',
    cliCommand: 'npx @aleric.dev/ui add search-input',
    importCode: "import { SearchInput } from '@aleric.dev/ui';",
    exampleCode: `<SearchInput
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onClear={() => setQuery('')}
  placeholder="Buscar clientes, facturas o servicios..."
/>`,
    props: [
      { name: 'value', type: 'string', default: "''", description: 'Valor del input de búsqueda.' },
      { name: 'onChange', type: '(e: React.ChangeEvent<HTMLInputElement>) => void', default: 'undefined', description: 'Manejador de cambio de texto.' },
      { name: 'onClear', type: '() => void', default: 'undefined', description: 'Callback al pulsar el botón de borrar.' },
      { name: 'placeholder', type: 'string', default: "'Buscar...'", description: 'Placeholder del buscador.' },
    ],
  },
  {
    id: 'confirm-dialog',
    name: 'ConfirmDialog',
    category: 'molecules',
    description: 'Diálogo de confirmación para acciones críticas, destructivas o irreversibles.',
    cliCommand: 'npx @aleric.dev/ui add confirm-dialog',
    importCode: "import { ConfirmDialog } from '@aleric.dev/ui';",
    exampleCode: `<ConfirmDialog
  isOpen={isConfirmOpen}
  onClose={() => setIsConfirmOpen(false)}
  onConfirm={() => { alert('Confirmado'); setIsConfirmOpen(false); }}
  title="¿Eliminar automatización comercial?"
  description="Esta acción detendrá de inmediato el webhook activo de WhatsApp."
  confirmText="Sí, eliminar"
  danger
/>`,
    props: [
      { name: 'isOpen', type: 'boolean', default: 'false', description: 'Control de apertura del modal.' },
      { name: 'onClose', type: '() => void', default: 'undefined', description: 'Callback de cancelación.' },
      { name: 'onConfirm', type: '() => void', default: 'undefined', description: 'Callback de confirmación.' },
      { name: 'title', type: 'string', default: "''", description: 'Título de la confirmación.' },
      { name: 'description', type: 'string', default: "''", description: 'Detalle del impacto de la acción.' },
      { name: 'danger', type: 'boolean', default: 'false', description: 'Estiliza el botón en rojo de peligro.' },
    ],
  },
  {
    id: 'empty-state',
    name: 'EmptyState',
    category: 'molecules',
    description: 'Pantalla de estado vacío con ilustración sutil, título explicativo y llamado a la acción.',
    cliCommand: 'npx @aleric.dev/ui add empty-state',
    importCode: "import { EmptyState } from '@aleric.dev/ui';",
    exampleCode: `<EmptyState
  title="No hay clientes registrados"
  description="Empieza creando un nuevo prospecto comercial en tu pipeline."
  actionText="Nuevo Cliente"
  onAction={() => console.log('crear cliente')}
/>`,
    props: [
      { name: 'title', type: 'string', default: "''", description: 'Título principal del estado vacío.' },
      { name: 'description', type: 'string', default: "''", description: 'Texto orientativo para el usuario.' },
      { name: 'actionText', type: 'string', default: 'undefined', description: 'Texto del botón de acción.' },
      { name: 'onAction', type: '() => void', default: 'undefined', description: 'Callback al hacer clic en el botón.' },
    ],
  },
  {
    id: 'metric-stat-card',
    name: 'MetricStatCard',
    category: 'molecules',
    description: 'Tarjeta de KPI SaaS con valor numérico, tendencia porcentual y acentos de color.',
    cliCommand: 'npx @aleric.dev/ui add metric-stat-card',
    importCode: "import { MetricStatCard } from '@aleric.dev/ui';",
    exampleCode: `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
  <MetricStatCard
    title="Ingresos Recurrentes (MRR)"
    value="$18,450 USD"
    change="+14.2%"
    trend="up"
    subtitle="vs mes anterior"
  />
  <MetricStatCard
    title="Tasa de Cierre en WhatsApp"
    value="34.8%"
    change="+6.1%"
    trend="up"
    subtitle="Leads calificados"
  />
</div>`,
    props: [
      { name: 'title', type: 'string', default: "''", description: 'Nombre del indicador métrico.' },
      { name: 'value', type: 'string | number', default: "''", description: 'Cifra principal formateada.' },
      { name: 'change', type: 'string', default: 'undefined', description: 'Variación porcentual o delta.' },
      { name: 'trend', type: "'up' | 'down' | 'neutral'", default: "'neutral'", description: 'Dirección del indicador (verde/rojo/gris).' },
      { name: 'subtitle', type: 'string', default: 'undefined', description: 'Texto explicativo del periodo.' },
    ],
  },
  {
    id: 'metric-strip',
    name: 'MetricStrip',
    category: 'molecules',
    description: 'Franja horizontal o rejilla responsive para agrupar múltiples KPIs de un vistazo.',
    cliCommand: 'npx @aleric.dev/ui add metric-strip',
    importCode: "import { MetricStrip } from '@aleric.dev/ui';",
    exampleCode: `<MetricStrip
  items={[
    { label: 'Leads Activos', value: '142', change: '+24' },
    { label: 'Cotizaciones', value: '$84,000 USD' },
    { label: 'Tasa de Conversión', value: '18.4%', trend: 'up' },
    { label: 'Soporte SLA', value: '99.9%', trend: 'up' },
  ]}
/>`,
    props: [
      { name: 'items', type: 'Array<{ label: string; value: string | number; change?: string; trend?: "up" | "down" }>', default: '[]', description: 'Colección de indicadores a mostrar en la franja.' },
    ],
  },
  {
    id: 'status-badge',
    name: 'StatusBadge',
    category: 'molecules',
    description: 'Insignia que traduce estados de negocio normalizados (active, pending, resolved, etc.) a colores y textos coherentes.',
    cliCommand: 'npx @aleric.dev/ui add status-badge',
    importCode: "import { StatusBadge } from '@aleric.dev/ui';",
    exampleCode: `<div className="flex flex-wrap gap-2">
  <StatusBadge status="active" />
  <StatusBadge status="pending" />
  <StatusBadge status="ready" />
  <StatusBadge status="resolved" />
  <StatusBadge status="failed" />
</div>`,
    props: [
      { name: 'status', type: "'active' | 'pending' | 'ready' | 'resolved' | 'archived' | 'failed'", default: 'undefined', description: 'Estado normalizado del ciclo de vida.' },
    ],
  },
  {
    id: 'date-picker',
    name: 'DatePicker',
    category: 'molecules',
    description: 'Selector de fecha tipo dropdown con atajos rápidos de selección inmediata ("Hoy", "Mañana", "+1 Semana").',
    cliCommand: 'npx @aleric.dev/ui add date-picker',
    importCode: "import { DatePicker } from '@aleric.dev/ui';",
    exampleCode: `<DatePicker
  value={selectedDate}
  onChange={(newDate) => setSelectedDate(newDate)}
  placeholder="Seleccionar fecha de entrega..."
/>`,
    props: [
      { name: 'value', type: 'string', default: "''", description: 'Fecha seleccionada en formato ISO YYYY-MM-DD.' },
      { name: 'onChange', type: '(date: string) => void', default: 'undefined', description: 'Callback al elegir una fecha.' },
      { name: 'placeholder', type: 'string', default: "'Elegir fecha'", description: 'Placeholder del trigger.' },
    ],
  },
  {
    id: 'markdown-renderer',
    name: 'MarkdownRenderer',
    category: 'molecules',
    description: 'Renderizador de Markdown enriquecido con estilos de tipografía, código monoespaciado y tablas.',
    cliCommand: 'npx @aleric.dev/ui add markdown-renderer',
    importCode: "import { MarkdownRenderer } from '@aleric.dev/ui';",
    exampleCode: `<MarkdownRenderer content="# Título de Propuesta\\n\\n- Alcance 100% cloud\\n- Despliegue en Cloudflare Edge" />`,
    props: [
      { name: 'content', type: 'string', default: "''", description: 'Texto crudo en formato Markdown.' },
    ],
  },

  // ==========================================
  // ORGANISMOS
  // ==========================================
  {
    id: 'sidebar',
    name: 'Sidebar',
    category: 'organisms',
    description: 'Barra lateral de navegación colapsable a iconos, con tooltips flotantes en estado compacto y soporte móvil con backdrop.',
    cliCommand: 'npx @aleric.dev/ui add sidebar',
    importCode: "import { Sidebar, type NavGroup } from '@aleric.dev/ui';",
    exampleCode: `<Sidebar
  collapsed={isCollapsed}
  onToggle={() => setIsCollapsed(!isCollapsed)}
  groups={navGroups}
  brandSlot={<div className="font-bold text-slate-900 dark:text-white">Aleric Hub</div>}
/>`,
    props: [
      { name: 'collapsed', type: 'boolean', default: 'false', description: 'Control de colapso a solo iconos.' },
      { name: 'onToggle', type: '() => void', default: 'undefined', description: 'Manejador para alternar colapso.' },
      { name: 'groups', type: 'NavGroup[]', default: '[]', description: 'Colección de secciones y enlaces de navegación.' },
      { name: 'brandSlot', type: 'React.ReactNode', default: 'undefined', description: 'Elemento de logo en la cabecera.' },
    ],
  },
  {
    id: 'top-nav',
    name: 'TopNav',
    category: 'organisms',
    description: 'Barra superior con migas de pan (Breadcrumbs), título de sección, botones de acción y selector de temas.',
    cliCommand: 'npx @aleric.dev/ui add top-nav',
    importCode: "import { TopNav, type BreadcrumbItem } from '@aleric.dev/ui';",
    exampleCode: `<TopNav
  title="Cotizaciones Comerciales"
  breadcrumbs={[
    { label: 'Admin', href: '#' },
    { label: 'Comercial', href: '#' },
    { label: 'Cotizaciones', current: true },
  ]}
  actions={<Button size="sm">Nueva Cotización</Button>}
/>`,
    props: [
      { name: 'title', type: 'string', default: "''", description: 'Título visible en la cabecera.' },
      { name: 'breadcrumbs', type: 'BreadcrumbItem[]', default: '[]', description: 'Ruta de navegación jerárquica.' },
      { name: 'actions', type: 'React.ReactNode', default: 'undefined', description: 'Slot para botones o acciones rápidas.' },
    ],
  },
  {
    id: 'notification-center',
    name: 'NotificationCenter',
    category: 'organisms',
    description: 'Panel de notificaciones con contador de no leídas, filtros de categorías y acciones rápidas.',
    cliCommand: 'npx @aleric.dev/ui add notification-center',
    importCode: "import { NotificationCenter } from '@aleric.dev/ui';",
    exampleCode: `<NotificationCenter
  notifications={myNotifications}
  onMarkAsRead={(id) => markRead(id)}
/>`,
    props: [
      { name: 'notifications', type: 'NotificationItem[]', default: '[]', description: 'Listado de eventos y alertas.' },
      { name: 'onMarkAsRead', type: '(id: string) => void', default: 'undefined', description: 'Callback al marcar como leída.' },
    ],
  },

  // ==========================================
  // TEMPLATES
  // ==========================================
  {
    id: 'app-layout',
    name: 'AppLayout',
    category: 'templates',
    description: 'Layout completo de panel de control que integra Sidebar + TopNav + contenedor principal con scroll fluido.',
    cliCommand: 'npx @aleric.dev/ui add app-layout',
    importCode: "import { AppLayout } from '@aleric.dev/ui';",
    exampleCode: `<AppLayout
  sidebar={<Sidebar {...sidebarProps} />}
  topNav={<TopNav {...topNavProps} />}
>
  <div className="p-8">
    <h1 className="text-2xl font-bold">Bienvenido al Panel</h1>
  </div>
</AppLayout>`,
    props: [
      { name: 'sidebar', type: 'React.ReactNode', default: 'undefined', description: 'Componente de barra lateral.' },
      { name: 'topNav', type: 'React.ReactNode', default: 'undefined', description: 'Componente de barra superior.' },
      { name: 'children', type: 'React.ReactNode', default: 'undefined', description: 'Área de contenido de la vista.' },
    ],
  },
  {
    id: 'studio-layout',
    name: 'StudioLayout',
    category: 'templates',
    description: 'Estructura de maquetación de pantalla completa sin márgenes, pensada para lienzos gráficos y editores multimedia.',
    cliCommand: 'npx @aleric.dev/ui add studio-layout',
    importCode: "import { StudioLayout } from '@aleric.dev/ui';",
    exampleCode: `<StudioLayout
  header={<div>Barra de herramientas</div>}
  sidebar={<div>Herramientas laterales</div>}
>
  <div>Lienzo 1080p interactivo</div>
</StudioLayout>`,
    props: [
      { name: 'header', type: 'React.ReactNode', default: 'undefined', description: 'Barra superior del editor.' },
      { name: 'sidebar', type: 'React.ReactNode', default: 'undefined', description: 'Panel de configuración lateral.' },
      { name: 'children', type: 'React.ReactNode', default: 'undefined', description: 'Lienzo principal de trabajo.' },
    ],
  },
];
