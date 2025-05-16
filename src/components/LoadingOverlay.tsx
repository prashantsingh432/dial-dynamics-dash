
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  show: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 text-dashboard-blue animate-spin" />
        <p className="mt-4 text-lg font-medium text-gray-800">Loading data...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
