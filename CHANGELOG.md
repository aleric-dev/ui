# Changelog

Todas las modificaciones notables a este proyecto serán documentadas en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/),
y este proyecto se adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

---

## [0.3.0] - 2026-10-31

### Added / Features
- feat: add automated release workflow, governance guide, and docs components (`de0c1cc`)
- feat: add Tabs atom, Sidebar organism, and component registry data (`cb01469`)
- feat: add Table atom component and export it in atoms index (`c7762ce`)

### Fixed / Bug Fixes
- fix(ui): añade vista de changelog y soporte para publicacion segura en npm (`af4f8ac`)

### Maintenance & Chore
- chore: add trailing newline to node-version file (`5afdeb5`)
- chore(ui): configura node-version y simplifica wrangler.json para cloudflare (`1ea18b0`)

---

## [0.2.0] - 2026-10-22

### Added / Features
- feat: add automated release script, PR title validation workflow, and governance guide (`2ec56d2`)
- feat: add StepTimeline atom component for multi-step progress tracking (`83fa40a`)
- feat: add StepTimeline and ModalStepLayout components with index exports (`238921c`)
- feat: add ModalSplitLayout, DatePicker, Select, and Sidebar components along with CI/CD release workflows (`b70385b`)
- feat: add documentation layout, components registry, and navigation sidebar for ui package (`a058be2`)
- feat: add Sidebar organism component with collapsible groups and flyout navigation (`54010b3`)
- feat: add Select component and initialize UI package structure (`7668ee6`)

### Maintenance & Chore
- chore: update repository URL protocol and revise binary executable paths in package.json (`8094a52`)

### Other Changes
- Merge pull request #1 from aleric-dev/fix/governance-and-components (`43a3786`)

### Planned
- Soporte para temas personalizables vía CSS Variables dinámicas.
- Componente `DataTable` con ordenamiento y paginación integrada.

---

## [0.1.0] - 2026-10-16

### Added
- **Arquitectura Atómica 100% Genérica**: Biblioteca desacoplada, tipada con TypeScript estricto y sin marcas propietarias de Aleric.
- **Átomos (`atoms/`)**:
  - `Button`: Variantes (`primary`, `secondary`, `outline`, `ghost`, `danger`), tamaños, loading y slots de iconos.
  - `Badge`: Variantes cromáticas (`indigo`, `emerald`, `amber`, `rose`, `slate`) con opción de indicador circular `dot`.
  - `Card`: Estructura semántica (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`) con soporte de hover.
  - `Input` y `Textarea`: Entradas de formulario con estados de error, soporte tipográfico monoespaciado y slots para iconos.
  - `Select`: Dropdown estilizado para opciones enriquecidas o nativas.
  - `Toggle` y `StatusToggle`: Interruptores accesibles para alternancia de estados de negocio.
  - `Modal`: Diálogos flotantes con backdrop blur, animaciones de entrada y manejo de accesibilidad (Escape/Click Outside).
  - `Spinner`: Indicador de carga animado.
  - `SocialIcon`: Iconografía SVG vectorial limpia.
- **Moléculas (`molecules/`)**:
  - `FormField`: Contenedor de formulario con labels, indicador de requerido, textos de ayuda y manejo de errores.
  - `SearchInput`: Campo de búsqueda con icono de lupa integrado y botón de limpieza inmediata.
  - `ConfirmDialog`: Modal preconfigurado para confirmaciones de riesgo o acciones destructivas.
  - `EmptyState`: Estado vacío visual con icono y botón de llamada a la acción.
  - `MetricStatCard`: Tarjetas de indicadores KPI con valores y tendencias de crecimiento.
  - `MetricStrip`: Fila/rejilla responsive de métricas con acentos funcionales.
  - `StatusBadge`: Mapeo semántico de estados (`active`, `pending`, `ready`, `resolved`, `closed`).
  - `DatePicker`: Selector de fechas modal con portal flotante y atajos rápidos (*"Hoy"*, *"Mañana"*, *"+1 Sem"*).
  - `MarkdownRenderer`: Renderizador de texto enriquecido en markdown sanitizado.
- **Organismos (`organisms/`)**:
  - `Sidebar`: Barra lateral colapsable a iconos con tooltips emergentes en hover, navegación agrupada (`NavGroup[]`), drawer móvil con backdrop y slots libres para logo de marca y usuario.
  - `TopNav`: Barra superior con navegación por migas de pan dinámicas (`Breadcrumbs`), títulos, switcher de tema claro/oscuro y acciones.
  - `NotificationCenter`: Bandeja desplegable de notificaciones con conteo de no leídas y filtrado de eventos.
- **Templates / Layouts (`templates/`)**:
  - `AppLayout`: Layout maestro que combina `Sidebar` + `TopNav` + área de contenido principal con scroll independiente.
  - `StudioLayout`: Layout de pantalla completa optimizado para editores o lienzos visuales.
- **Showcase & Catálogo Interactivo**:
  - Simulador de Dashboard con marca neutra (*Horizon Console*).
  - Catálogos interactivos para Átomos, Moléculas y Guía de Instalación (`npm i @aleric/ui`).
- **Pipeline de Empaquetado**:
  - `npm run build:lib`: Generación dual ESM/CJS (`dist/index.js`, `dist/index.cjs`), estilos CSS (`dist/ui.css`) y tipados TypeScript (`dist/index.d.ts`).
  - `npm run build`: Compilación estática de la plataforma de catálogo con Vite 6.

### Removed
- `AlericLogo.tsx`: Retirado completamente para garantizar que la librería sea 100% agnóstica y reutilizable por cualquier SaaS o cliente.
