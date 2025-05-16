
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: number;
  previousValue: number;
  percentChange: number;
  icon: React.ReactNode;
  formatter?: (value: number) => string;
  className?: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  previousValue,
  percentChange,
  icon,
  formatter = (val) => val.toLocaleString(),
  className
}) => {
  // Determine trend direction
  const trendDirection = percentChange > 0 ? 'positive' : percentChange < 0 ? 'negative' : 'neutral';
  
  // Format percent change
  const formattedPercentChange = Math.abs(percentChange).toFixed(1);
  
  // Determine if significant change (>10%)
  const isSignificant = Math.abs(percentChange) >= 10;
  
  return (
    <div 
      className={cn(
        "kpi-card group animate-scale-in",
        isSignificant && trendDirection === 'positive' && "hover:bg-green-50",
        isSignificant && trendDirection === 'negative' && "hover:bg-red-50",
        className
      )}
    >
      <div className="flex justify-between items-center">
        <h3 className="title">{title}</h3>
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
          "group-hover:bg-opacity-10",
          trendDirection === 'positive' && "text-dashboard-green group-hover:bg-dashboard-green",
          trendDirection === 'negative' && "text-dashboard-red group-hover:bg-dashboard-red",
          trendDirection === 'neutral' && "text-dashboard-amber group-hover:bg-dashboard-amber"
        )}>
          {icon}
        </div>
      </div>
      
      <div className="value">
        {formatter(value)}
      </div>
      
      <div className={cn(
        "percentage-change",
        trendDirection === 'positive' && "positive",
        trendDirection === 'negative' && "negative",
        trendDirection === 'neutral' && "neutral",
        isSignificant && "pulse"
      )}>
        {trendDirection === 'positive' && <ArrowUp className="w-4 h-4 mr-1" />}
        {trendDirection === 'negative' && <ArrowDown className="w-4 h-4 mr-1" />}
        {trendDirection === 'neutral' && <Minus className="w-4 h-4 mr-1" />}
        <span>
          {formattedPercentChange}% vs previous {previousValue.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default KPICard;
