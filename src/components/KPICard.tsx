
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: number;
  percentChange?: number;
  icon: React.ReactNode;
  formatter?: (value: number) => string;
  className?: string;
  color?: "purple" | "green" | "amber" | "rose" | "cyan" | "blue";
  index?: number;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  percentChange = 0,
  icon,
  formatter = (val) => val.toLocaleString(),
  className,
  color = "blue",
  index = 0
}) => {
  // Determine color based on prop
  const getColorClasses = () => {
    switch (color) {
      case "purple":
        return {
          bg: "bg-gradient-to-br from-purple-50 to-purple-100",
          accent: "bg-purple-500",
          text: "text-purple-700",
          lightText: "text-purple-600",
          barBg: "bg-purple-100",
          barFill: "bg-purple-500",
          icon: "text-purple-600",
          iconBg: "bg-purple-100"
        };
      case "green":
        return {
          bg: "bg-gradient-to-br from-emerald-50 to-emerald-100",
          accent: "bg-emerald-500",
          text: "text-emerald-700",
          lightText: "text-emerald-600",
          barBg: "bg-emerald-100",
          barFill: "bg-emerald-500",
          icon: "text-emerald-600",
          iconBg: "bg-emerald-100"
        };
      case "amber":
        return {
          bg: "bg-gradient-to-br from-amber-50 to-amber-100",
          accent: "bg-amber-500",
          text: "text-amber-700",
          lightText: "text-amber-600",
          barBg: "bg-amber-100",
          barFill: "bg-amber-500",
          icon: "text-amber-600",
          iconBg: "bg-amber-100"
        };
      case "rose":
        return {
          bg: "bg-gradient-to-br from-rose-50 to-rose-100",
          accent: "bg-rose-500",
          text: "text-rose-700",
          lightText: "text-rose-600",
          barBg: "bg-rose-100",
          barFill: "bg-rose-500",
          icon: "text-rose-600",
          iconBg: "bg-rose-100"
        };
      case "cyan":
        return {
          bg: "bg-gradient-to-br from-cyan-50 to-cyan-100",
          accent: "bg-cyan-500",
          text: "text-cyan-700",
          lightText: "text-cyan-600",
          barBg: "bg-cyan-100",
          barFill: "bg-cyan-500",
          icon: "text-cyan-600",
          iconBg: "bg-cyan-100"
        };
      default:
        return {
          bg: "bg-gradient-to-br from-blue-50 to-blue-100",
          accent: "bg-blue-500",
          text: "text-blue-700",
          lightText: "text-blue-600",
          barBg: "bg-blue-100",
          barFill: "bg-blue-500",
          icon: "text-blue-600",
          iconBg: "bg-blue-100"
        };
    }
  };

  const colors = getColorClasses();
  
  return (
    <motion.div 
      className={cn(
        "relative overflow-hidden rounded-xl bg-white p-5 border border-gray-100 hover:shadow-md transition-all duration-300", 
        colors.bg,
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{ 
        y: -3,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.2 }
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <motion.div 
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors.iconBg}`}
          whileHover={{ 
            rotate: 5,
            scale: 1.05 
          }}
        >
          <div className={`${colors.icon}`}>{icon}</div>
        </motion.div>
      </div>
      
      <motion.div 
        className={`text-3xl font-bold mb-2 ${colors.text}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.5, 
          delay: 0.2 + index * 0.1,
          type: 'spring',
          stiffness: 100
        }}
      >
        {formatter(value)}
      </motion.div>
      
      {percentChange !== 0 && (
        <div className="flex items-center">
          <span className={`flex items-center text-xs font-medium ${percentChange > 0 ? 'text-green-600' : 'text-rose-600'}`}>
            {percentChange > 0 ? (
              <ArrowUpIcon className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDownIcon className="h-3 w-3 mr-1" />
            )}
            {Math.abs(percentChange).toFixed(1)}%
          </span>
          <span className="text-xs text-gray-400 ml-1">from previous period</span>
        </div>
      )}
      
      {/* Progress bar */}
      <div className="mt-4">
        <div className={`w-full h-1 ${colors.barBg} rounded-full overflow-hidden`}>
          <motion.div 
            className={`h-full ${colors.barFill}`}
            initial={{ width: "0%" }}
            animate={{ width: `${Math.min(Math.max(percentChange + 50, 10), 90)}%` }}
            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default KPICard;
