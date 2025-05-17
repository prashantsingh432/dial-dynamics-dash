
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowUpIcon } from 'lucide-react';

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
          bg: "bg-gradient-to-r from-purple-400 to-purple-600",
          iconBg: "bg-gradient-to-br from-purple-50/30 to-purple-100/10",
          text: "text-purple-600",
          progressBg: "bg-purple-100",
          progressFill: "bg-purple-600"
        };
      case "green":
        return {
          bg: "bg-gradient-to-r from-emerald-400 to-emerald-600",
          iconBg: "bg-gradient-to-br from-emerald-50/30 to-emerald-100/10",
          text: "text-emerald-600",
          progressBg: "bg-emerald-100",
          progressFill: "bg-emerald-600"
        };
      case "amber":
        return {
          bg: "bg-gradient-to-r from-amber-400 to-amber-600",
          iconBg: "bg-gradient-to-br from-amber-50/30 to-amber-100/10",
          text: "text-amber-600",
          progressBg: "bg-amber-100",
          progressFill: "bg-amber-600"
        };
      case "rose":
        return {
          bg: "bg-gradient-to-r from-rose-400 to-rose-600",
          iconBg: "bg-gradient-to-br from-rose-50/30 to-rose-100/10",
          text: "text-rose-600",
          progressBg: "bg-rose-100",
          progressFill: "bg-rose-600"
        };
      case "cyan":
        return {
          bg: "bg-gradient-to-r from-cyan-400 to-cyan-600",
          iconBg: "bg-gradient-to-br from-cyan-50/30 to-cyan-100/10",
          text: "text-cyan-600",
          progressBg: "bg-cyan-100",
          progressFill: "bg-cyan-600"
        };
      default:
        return {
          bg: "bg-gradient-to-r from-blue-400 to-blue-600",
          iconBg: "bg-gradient-to-br from-blue-50/30 to-blue-100/10",
          text: "text-blue-600",
          progressBg: "bg-blue-100",
          progressFill: "bg-blue-600"
        };
    }
  };

  const colors = getColorClasses();
  
  return (
    <motion.div 
      className={cn(
        "relative overflow-hidden rounded-xl bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100", 
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
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      {/* Card content */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <motion.div 
          className={`w-10 h-10 rounded-full flex items-center justify-center ${colors.bg} shadow-md`}
          whileHover={{ 
            rotate: 15,
            scale: 1.1 
          }}
          animate={{ 
            y: [0, -3, 0],
          }}
          transition={{ 
            type: 'spring', 
            stiffness: 200,
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          {icon}
        </motion.div>
      </div>
      
      <motion.div 
        className={`text-3xl font-bold mt-4 ${colors.text} font-poppins`}
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
        <div className="flex items-center mt-2">
          <span className={`flex items-center text-xs ${percentChange > 0 ? 'text-green-600' : 'text-rose-600'} font-medium`}>
            <ArrowUpIcon className={`h-3 w-3 mr-1 ${percentChange < 0 ? 'rotate-180' : ''}`} />
            {Math.abs(percentChange).toFixed(1)}%
          </span>
          <span className="text-xs text-gray-400 ml-1">from previous period</span>
        </div>
      )}
      
      {/* Subtle decoration element */}
      <motion.div 
        className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full ${colors.iconBg} dark:opacity-25 z-0`}
        animate={{ 
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
    </motion.div>
  );
};

export default KPICard;
