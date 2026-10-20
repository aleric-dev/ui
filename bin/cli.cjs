#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const REGISTRY = {
  // 1. Átomos
  'button': { file: 'atoms/Button.tsx', deps: ['clsx', 'tailwind-merge', 'lucide-react'] },
  'badge': { file: 'atoms/Badge.tsx', deps: ['clsx', 'tailwind-merge'] },
  'card': { file: 'atoms/Card.tsx', deps: ['clsx', 'tailwind-merge'] },
  'input': { file: 'atoms/Input.tsx', deps: ['clsx', 'tailwind-merge'] },
  'textarea': { file: 'atoms/Textarea.tsx', deps: ['clsx', 'tailwind-merge'] },
  'select': { file: 'atoms/Select.tsx', deps: ['clsx', 'tailwind-merge', 'lucide-react'] },
  'toggle': { file: 'atoms/Toggle.tsx', deps: ['clsx', 'tailwind-merge'] },
  'status-toggle': { file: 'atoms/StatusToggle.tsx', deps: ['lucide-react'] },
  'modal': { file: 'atoms/Modal.tsx', deps: ['clsx', 'tailwind-merge', 'lucide-react'] },
  'spinner': { file: 'atoms/Spinner.tsx', deps: [] },
  'social-icons': { file: 'atoms/SocialIcons.tsx', deps: [] },

  // 2. Moléculas
  'form-field': { file: 'molecules/FormField.tsx', deps: ['clsx', 'tailwind-merge'] },
  'search-input': { file: 'molecules/SearchInput.tsx', deps: ['clsx', 'tailwind-merge', 'lucide-react'] },
  'confirm-dialog': { file: 'molecules/ConfirmDialog.tsx', deps: ['lucide-react'], requires: ['modal', 'button'] },
  'empty-state': { file: 'molecules/EmptyState.tsx', deps: ['clsx', 'tailwind-merge'], requires: ['button'] },
  'metric-stat-card': { file: 'molecules/MetricStatCard.tsx', deps: ['clsx', 'tailwind-merge'], requires: ['card'] },
  'metric-strip': { file: 'molecules/MetricStrip.tsx', deps: ['clsx', 'tailwind-merge'] },
  'status-badge': { file: 'molecules/StatusBadge.tsx', deps: [], requires: ['badge'] },
  'date-picker': { file: 'molecules/DatePicker.tsx', deps: ['lucide-react'] },
  'markdown-renderer': { file: 'molecules/MarkdownRenderer.tsx', deps: ['marked'] },

  // 3. Organismos
  'sidebar': { file: 'organisms/Sidebar.tsx', deps: ['clsx', 'tailwind-merge', 'lucide-react'] },
  'top-nav': { file: 'organisms/TopNav.tsx', deps: ['clsx', 'tailwind-merge', 'lucide-react'] },
  'notification-center': { file: 'organisms/NotificationCenter.tsx', deps: ['clsx', 'tailwind-merge', 'lucide-react'] },

  // 4. Templates
  'app-layout': { file: 'templates/AppLayout.tsx', deps: ['clsx', 'tailwind-merge'] },
  'studio-layout': { file: 'templates/StudioLayout.tsx', deps: ['clsx', 'tailwind-merge'] }
};

const args = process.argv.slice(2);
const command = args[0];

console.log('\n💎 @aleric.dev/ui — Component Distribution CLI\n');

if (!command || command === '--help' || command === '-h') {
  console.log('Uso:');
  console.log('  npx @aleric.dev/ui init               Inicializa el proyecto con la utilidad cn()');
  console.log('  npx @aleric.dev/ui add <component>    Añade un componente a src/components/ui/');
  console.log('  npx @aleric.dev/ui list               Lista todos los componentes disponibles\n');
  console.log('Ejemplo:');
  console.log('  npx @aleric.dev/ui add button');
  console.log('  npx @aleric.dev/ui add sidebar');
  console.log('  npx @aleric.dev/ui add metric-strip\n');
  process.exit(0);
}

if (command === 'list') {
  console.log('Componentes disponibles en el registro:');
  console.log('---------------------------------------');
  Object.keys(REGISTRY).forEach(name => {
    const item = REGISTRY[name];
    console.log(' • ' + name.padEnd(20) + '➔ src/components/' + item.file);
  });
  console.log('');
  process.exit(0);
}

const targetCwd = process.cwd();

if (command === 'init') {
  console.log('🚀 Inicializando configuración en ' + targetCwd);
  
  // 1. Crear carpeta src/lib
  const libDir = path.join(targetCwd, 'src', 'lib');
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }

  const utilsPath = path.join(libDir, 'utils.ts');
  const utilsCode = 'import { clsx, type ClassValue } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n';
  
  fs.writeFileSync(utilsPath, utilsCode, 'utf8');
  console.log('✅ Creado: src/lib/utils.ts con la función cn()');

  // 2. Crear directorio de componentes destino
  const uiDir = path.join(targetCwd, 'src', 'components', 'ui');
  if (!fs.existsSync(uiDir)) {
    fs.mkdirSync(uiDir, { recursive: true });
  }
  console.log('✅ Directorio listo: src/components/ui/');
  console.log('\n✨ Proyecto listo. Ahora añade componentes con: npx @aleric.dev/ui add <componente>\n');
  process.exit(0);
}

if (command === 'add') {
  const componentName = args[1]?.toLowerCase();
  if (!componentName) {
    console.error('❌ Debes especificar un componente. Ej: npx @aleric.dev/ui add button');
    process.exit(1);
  }

  const meta = REGISTRY[componentName];
  if (!meta) {
    console.error('❌ El componente "' + componentName + '" no existe en el registro.');
    console.log('Ejecuta "npx @aleric.dev/ui list" para ver la lista completa.');
    process.exit(1);
  }

  // Leer el componente fuente desde el paquete @aleric.dev/ui
  const sourcePath = path.resolve(__dirname, '..', 'src', 'components', meta.file);
  if (!fs.existsSync(sourcePath)) {
    console.error('❌ Archivo fuente no encontrado: ' + sourcePath);
    process.exit(1);
  }

  let code = fs.readFileSync(sourcePath, 'utf8');

  // Adaptar imports relativos a la convención estándar @/lib/utils o local
  code = code.replace(/\.\.\/\.\.\/utils\/cn/g, '@/lib/utils');
  code = code.replace(/\.\.\/utils\/cn/g, '@/lib/utils');

  const destDir = path.join(targetCwd, 'src', 'components', 'ui');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const destFile = path.basename(meta.file);
  const destPath = path.join(destDir, destFile);

  fs.writeFileSync(destPath, code, 'utf8');
  console.log('✅ Componente instalado en: src/components/ui/' + destFile);

  if (meta.deps && meta.deps.length > 0) {
    console.log('📦 Asegúrate de tener instaladas las dependencias: ' + meta.deps.join(', '));
  }
  if (meta.requires && meta.requires.length > 0) {
    console.log('🔗 Este componente utiliza otros átomos. Te recomendamos añadir también:');
    meta.requires.forEach(req => console.log('   npx @aleric.dev/ui add ' + req));
  }
  console.log('');
  process.exit(0);
}

console.error('❌ Comando no reconocido: ' + command);
process.exit(1);
