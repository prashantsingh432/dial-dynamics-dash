
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface KPICardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  formatter?: (value: number) => string;
  className?: string;
  index?: number;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  icon,
  formatter = (val) => val.toLocaleString(),
  className,
  index = 0
}) => {
  return (
    <motion.div 
      className={cn(
        "kpi-card group relative overflow-hidden z-10", 
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
      {/* Glassmorphism background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/30 dark:from-slate-800/80 dark:to-slate-800/30 backdrop-blur-sm z-0 rounded-xl" />
      
      {/* Animated border */}
      <motion.div 
        className="absolute inset-0 rounded-xl border border-transparent z-0"
        initial={{ borderColor: 'rgba(219, 234, 254, 0)' }}
        animate={{ borderColor: 'rgba(219, 234, 254, 0)' }}
        whileHover={{ borderColor: 'rgba(59, 130, 246, 0.5)' }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Card content */}
      <div className="flex justify-between items-center relative z-10">
        <motion.h3 
          className="title text-sm font-medium text-gray-500 dark:text-gray-300"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
        >
          {title}
        </motion.h3>
        <motion.div 
          className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 text-dashboard-blue group-hover:from-blue-100 group-hover:to-blue-200 transition-colors dark:from-blue-900/30 dark:to-blue-900/10 dark:text-blue-300"
          whileHover={{ rotate: 15 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          {icon}
        </motion.div>
      </div>
      
      <motion.div 
        className="value text-3xl font-bold mt-2 font-poppins text-dashboard-blue dark:text-blue-300"
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
      
      {/* Subtle decoration element */}
      <motion.div 
        className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-tl from-blue-100/40 to-transparent dark:from-blue-900/20 dark:to-transparent z-0"
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
