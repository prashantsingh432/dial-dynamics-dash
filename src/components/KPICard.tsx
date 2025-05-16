
import React from 'react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  formatter?: (value: number) => string;
  className?: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  icon,
  formatter = (val) => val.toLocaleString(),
  className
}) => {
  return (
    <div className={cn("kpi-card group animate-scale-in", className)}>
      <div className="flex justify-between items-center">
        <h3 className="title">{title}</h3>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-dashboard-blue">
          {icon}
        </div>
      </div>
      
      <div className="value">
        {formatter(value)}
      </div>
    </div>
  );
};

export default KPICard;
