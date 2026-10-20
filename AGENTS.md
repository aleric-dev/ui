# 🤖 AGENTS.md — Directrices Operativas para Asistentes de IA en @aleric.dev/ui

> **Manual de Contexto Rápido, Reglas de Ejecución y Filosofía de Diseño**  
> *Repositorio*: `aleric-dev/ui`  
> *Proyecto*: **@aleric.dev/ui — Atomic Design System & Component Library (React 19 + Tailwind CSS)**  
> *Objetivo*: Proveer lineamientos operativos para modelos y asistentes de IA para realizar cambios seguros, estéticamente excepcionales (Anti-IA Cliché), y alineados con la arquitectura dual (Librería empaquetable + Portal de Documentación estilo shadcn/ui).

---

## 🚫 1. Reglas de Oro Operativas

1. **NO Abrir Navegadores en Cada Prueba**:
   - **NO ejecutes `browser_subagent` ni abras pestañas del navegador** de forma autónoma.
   - La verificación de cambios se realiza mediante **compilación estática** (`npm run build` y `npm run build:lib`), comprobación de tipos TypeScript y linters.
   - Solo interactúa con el navegador si el usuario lo solicita **explícita y literalmente** en su mensaje.

2. **NO Commits Automáticos en Git**:
   - **NO ejecutes `git commit` ni `git push`** por iniciativa propia.
   - Mantén los cambios en el working tree para revisión del desarrollador.

---

## 🎨 2. Estándar de Diseño Aleric Dev (Anti-IA Cliché & Base Clara)

### ⚠️ Regla Fundamental del Tema Base:
* **El Color Base es CLARO (`light`)**:
  - Toda la interfaz debe concebirse primero con fondo claro ultra-limpio (`#FFFFFF` para cards y modales, `#F8FAFC` o `#F1F5F9` para fondos base).
  - Los bordes son nítidos de 1px (`border-slate-200`, `border-slate-300`).
  - La tipografía en modo claro usa contraste perfecto: títulos en `#0F172A` (`text-slate-900`), párrafos en `#475569` (`text-slate-600`), y código en `#334155` (`text-slate-700`).
  - El modo oscuro (`dark`) debe estar soportado impecablemente mediante la clase `.dark` con fondos pizarra profunda (`#0B0F19`, `#0D121F`), pero **el estado por defecto y foco principal es el MODO CLARO**.

### 🎨 Prohibiciones de Diseño Anti-IA Cliché:
1. **PROHIBIDO**:
   - Cajas flotantes con degradados morados/neón o sombras difusas exageradas (`shadow-2xl`).
   - Emojis gigantescos sin función semántica en títulos o tarjetas.
   - Fondos negros planos con tipografía gris ilegible o falta de contraste.
2. **REQUERIDO**:
   - **Inspiración**: [ui.shadcn.com](https://ui.shadcn.com/), Linear, Stripe, Raycast.
   - **Paleta Aleric**: 
     - Primario: Índigo (`#6366F1` / `bg-indigo-600 hover:bg-indigo-500`).
     - Acento funcional: Esmeralda (`#10B981` / `bg-emerald-600`).
     - Alertas: Ámbar (`#F59E0B`), Rosa/Rojo (`#E11D48` / `#F43F5E`).
     - Neutros: Escala Slate (`slate-50` a `slate-950`).
   - **Tipografía**: *Plus Jakarta Sans* para jerarquía de títulos y textos; *JetBrains Mono* para código, CLI, badges y métricas.
   - **Micro-interacciones**: Transiciones rápidas (`transition-all duration-150`), estados hover sutiles y bordes activos claros.

---

## 📦 3. Arquitectura Dual: Librería Instalable + Portal de Documentación

Este repositorio posee dos misiones complementarias:

### 3.1. Librería Instalable en npm y pnpm (`@aleric.dev/ui`)
* **Punto de Entrada**: `src/index.ts`.
* **Compilación de Librería**: `npm run build:lib`.
  - Genera `dist/index.js` (ESM).
  - Genera `dist/index.cjs` (CommonJS).
  - Genera `dist/index.d.ts` (Tipos TypeScript).
  - Genera `dist/ui.css` (Hoja de estilos Tailwind encapsulada).
* **CLI Tipo Shadcn**: `bin/cli.cjs` permite a cualquier desarrollador inicializar utilidades (`npx @aleric.dev/ui init`) o copiar componentes individuales (`npx @aleric.dev/ui add button`).

### 3.2. Portal de Documentación y Showcase Interactivo (react-router-dom)
* **Punto de Entrada Web**: `index.html` ➔ `src/main.tsx` ➔ `src/demo/App.tsx`.
* **Estructura Declarativa de Rutas**:
  - `/`: Landing page de bienvenida y showcase interactivo de alto impacto (`LandingHeroView`).
  - `/docs`: Layout de documentación (`DocsLayout`) con `DocsSidebar` persistente:
    - `/docs/installation`: Guía de instalación rápida con npm, pnpm y CLI (`InstallationView`).
    - `/docs/documentation`: Fundamentos de diseño atómico, tokens de color Aleric y utilidades (`AdditionalDocsView`).
    - `/docs/components/:componentId`: Visualizador interactivo de componentes individuales con tabs de Previsualización y Código (`ComponentDetailView` ➔ `ComponentViewer`).
* **Diseño e Identidad**:
  - Navbar superior con enlaces directos (`Link` / `NavLink`) a Landing, Componentes, Instalación, Documentación, GitHub y selector de tema (Light / Dark).
  - Sidebar con navegación organizada por categorías atómicas (Átomos, Moléculas, Organismos, Templates) y filtro de búsqueda instantáneo.

---

## ⚡ 4. Comandos Canónicos de Ejecución y Publicación

Ejecutar siempre en el directorio raíz de `ui/`:

```bash
# 1. Servidor de desarrollo local del Portal de Documentación (puerto 5190)
npm run dev

# 2. Compilación estática del Portal Web
npm run build

# 3. Compilación estática de la Librería empaquetable (ESM + CJS + Tipos + CSS)
npm run build:lib

# 4. Verificación previa de empaquetado para npm/pnpm (sin subir)
npm pack --dry-run

# 5. Publicación en el Registro de npm (accesible para npm y pnpm)
npm publish --access public
```

> ⚠️ **Regla de Validación Mandatoria**: Antes de finalizar cualquier tarea o entregar código, ejecuta siempre `npm run build` y `npm run build:lib` para garantizar 0 errores de compilación y 0 fallos de tipado TypeScript.

---
*© Aleric.dev — @aleric.dev/ui Design System & Documentation Hub.*
