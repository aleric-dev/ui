# Changelog

Todas las modificaciones notables a este proyecto serán documentadas en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/),
y este proyecto se adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

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
