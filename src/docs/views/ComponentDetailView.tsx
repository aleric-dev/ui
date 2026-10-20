import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ComponentViewer } from '../components/ComponentViewer';
import { COMPONENTS_REGISTRY } from '../data/componentsRegistry';

export const ComponentDetailView: React.FC = () => {
  const { componentId } = useParams<{ componentId: string }>();

  const component = COMPONENTS_REGISTRY.find((c) => c.id === componentId);

  if (!component) {
    return <Navigate to="/docs/components/button" replace />;
  }

  return <ComponentViewer component={component} />;
};
