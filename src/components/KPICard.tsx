
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
  // Determine color based on title
  const getIconColorClass = () => {
    switch (title) {
      case "Total Dials":
        return "from-purple-400 to-purple-600 text-purple-700";
      case "Total Connected":
        return "from-emerald-400 to-emerald-600 text-emerald-700";
      case "Total Talk Time":
        return "from-amber-400 to-amber-600 text-amber-700";
      case "Scheduled Meetings":
        return "from-rose-400 to-rose-600 text-rose-700";
      case "Successful Meetings":
        return "from-cyan-400 to-cyan-600 text-cyan-700";
      default:
        return "from-blue-400 to-blue-600 text-dashboard-blue";
    }
  };

  const iconColorClass = getIconColorClass();
  
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
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/50 dark:from-slate-800/90 dark:to-slate-800/50 backdrop-blur-sm z-0 rounded-xl" />
      
      {/* Animated border */}
      <motion.div 
        className="absolute inset-0 rounded-xl border border-transparent z-0"
        initial={{ borderColor: 'rgba(255, 255, 255, 0)' }}
        animate={{ borderColor: 'rgba(255, 255, 255, 0)' }}
        whileHover={{ borderColor: 'rgba(99, 102, 241, 0.5)' }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Card content */}
      <div className="flex justify-between items-center relative z-10 p-5">
        <motion.h3 
          className="title text-sm font-medium text-gray-600 dark:text-gray-300"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
        >
          {title}
        </motion.h3>
        <motion.div 
          className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${iconColorClass} shadow-md group-hover:shadow-lg transition-all`}
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
        className={`value text-3xl font-bold px-5 pb-5 font-poppins ${title === "Total Dials" ? "text-purple-600" : 
                     title === "Total Connected" ? "text-emerald-600" : 
                     title === "Total Talk Time" ? "text-amber-600" : 
                     title === "Scheduled Meetings" ? "text-rose-600" : 
                     title === "Successful Meetings" ? "text-cyan-600" : 
                     "text-dashboard-blue"}`}
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
        className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-tl ${
          title === "Total Dials" ? "from-purple-100/40 to-transparent" : 
          title === "Total Connected" ? "from-emerald-100/40 to-transparent" : 
          title === "Total Talk Time" ? "from-amber-100/40 to-transparent" : 
          title === "Scheduled Meetings" ? "from-rose-100/40 to-transparent" : 
          title === "Successful Meetings" ? "from-cyan-100/40 to-transparent" : 
          "from-blue-100/40 to-transparent"
        } dark:opacity-25 z-0`}
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
