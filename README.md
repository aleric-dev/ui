# @aleric.dev/ui

> **Sistema de Diseño Atómico y Componentes UI Limpios para React 19 y Tailwind CSS**

`@aleric.dev/ui` es una biblioteca de componentes visuales desacoplados, 100% tipados con TypeScript y listos para construir dashboards modernos, paneles SaaS y aplicaciones multi-tenant sin dependencias de marcas propietarias.

---

## 📦 Instalación

```bash
npm install @aleric.dev/ui
# o con pnpm
pnpm add @aleric.dev/ui
```

Importa la hoja de estilos en tu punto de entrada (`main.tsx` o `App.tsx`):

```tsx
import '@aleric.dev/ui/dist/styles.css';
```

---

## 🧩 Catálogo de Componentes

### 1. Átomos (`atoms`)
- **`Button`**: Variantes (`primary`, `secondary`, `outline`, `ghost`, `danger`), tamaños (`sm`, `md`, `lg`), estados de carga (`loading`) y slots para iconos.
- **`Badge`**: Variantes semánticas (`indigo`, `emerald`, `amber`, `rose`, `slate`), con soporte de indicador circular (`dot`).
- **`Card`**: Contenedores estructurados (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`) con soporte de hover.
- **`Input` / `Textarea`**: Entradas de formulario con estados de error, soporte monoespaciado y slots para iconos.
- **`Select`**: Dropdown estilizado para opciones tipadas.
- **`Toggle` / `StatusToggle`**: Interruptores accesibles para alternancia de estados de negocio.
- **`Modal`**: Diálogos accesibles con animación de entrada, backdrop y cierre con tecla Escape.
- **`Spinner`**: Indicador de carga animado.
- **`SocialIcon`**: Iconografía vectorial para redes y plataformas.

### 2. Moléculas (`molecules`)
- **`FormField`**: Wrapper de campo con etiqueta, indicador de requerido, textos de ayuda y manejo de errores.
- **`SearchInput`**: Input de búsqueda con icono de lupa y botón para limpiar texto.
- **`ConfirmDialog`**: Diálogo modal preconfigurado para confirmaciones o acciones críticas.
- **`EmptyState`**: Estado vacío elegante para listas y tablas con llamadas a la acción.
- **`MetricStatCard`**: Tarjetas de indicadores KPI con valores y tendencias de crecimiento.
- **`MetricStrip`**: Fila/rejilla responsive de métricas con separadores sutiles y acentos cromáticos.
- **`StatusBadge`**: Badge que mapea estados de ciclo de vida (`active`, `pending`, `ready`, `resolved`) con estilos consistentes.
- **`DatePicker`**: Selector de fechas con portal flotante y atajos rápidos (*"Hoy"*, *"Mañana"*, *"+1 Sem"*).
- **`MarkdownRenderer`**: Renderizador de texto enriquecido en markdown sanitizado.

### 3. Organismos (`organisms`)
- **`Sidebar`**: Barra de navegación lateral colapsable a iconos con tooltips emergentes, grupos jerárquicos (`NavGroup[]`), soporte responsive (drawer móvil con backdrop) y slots libres para logo de marca y pie de usuario.
- **`TopNav`**: Barra superior con navegación por migas de pan (`Breadcrumbs`), títulos dinámicos, botones de acción y switcher de tema.
- **`NotificationCenter`**: Centro de notificaciones desplegable con conteo de no leídas y filtrado de eventos.

### 4. Templates & Layouts (`templates`)
- **`AppLayout`**: Ensamblador maestro de pantalla completa que combina `Sidebar` + `TopNav` + área de contenido con scroll independiente y tema oscuro slate.
- **`StudioLayout`**: Layout de pantalla completa optimizado para editores y lienzos visuales.

---

## 🚀 Ejemplo de Uso: Dashboard Multi-Tenant

```tsx
import React, { useState } from 'react';
import { 
  AppLayout, 
  Sidebar, 
  TopNav, 
  MetricStrip, 
  Card, 
  StatusBadge, 
  Button 
} from '@aleric.dev/ui';
import { LayoutDashboard, Users, Activity } from 'lucide-react';

export function DashboardExample() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AppLayout
      sidebar={
        <Sidebar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
          brand={{
            name: 'Acme Cloud',
            logo: <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">A</div>
          }}
          groups={[
            {
              label: 'General',
              items: [
                { id: 'dash', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, active: true },
                { id: 'clients', label: 'Clientes', icon: <Users className="w-4 h-4" />, badge: 12 }
              ]
            }
          ]}
        />
      }
      topNav={<TopNav title="Panel Principal" />}
    >
      <div className="p-6 space-y-6">
        <MetricStrip
          items={[
            { label: 'MRR Activo', value: '$24,500', color: 'emerald' },
            { label: 'Usuarios Conectados', value: '1,280', color: 'indigo' }
          ]}
        />
        <Card className="p-4">
          <StatusBadge status="active" />
        </Card>
      </div>
    </AppLayout>
  );
}
```

---

## 📄 Licencia

MIT © [Aleric Dev](https://aleric.dev)
