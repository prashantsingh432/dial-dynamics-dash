
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
        "kpi-card group", 
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex justify-between items-center">
        <h3 className="title">{title}</h3>
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-50 text-dashboard-blue group-hover:bg-blue-100 transition-colors">
          {icon}
        </div>
      </div>
      
      <motion.div 
        className="value text-dashboard-blue"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
      >
        {formatter(value)}
      </motion.div>
    </motion.div>
  );
};

export default KPICard;
