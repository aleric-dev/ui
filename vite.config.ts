import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración para ejecutar la Landing Page & Catálogo Interactivo
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5190,
  },
});
