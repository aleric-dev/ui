import React from 'react';
import { Outlet } from 'react-router-dom';
import { DocsSidebar } from '../components/DocsSidebar';

export const DocsLayout: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
      {/* Sidebar de navegación persistente */}
      <DocsSidebar />

      {/* Contenido principal dinámico según la ruta activa */}
      <main className="flex-1 min-w-0 p-6 lg:p-10">
        <Outlet />
      </main>
    </div>
  );
};
