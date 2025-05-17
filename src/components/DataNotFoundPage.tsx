
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Calendar, AlertCircle, ArrowLeft } from 'lucide-react';

interface DataNotFoundPageProps {
  month: string;
  onGoBack: () => void;
}

const DataNotFoundPage: React.FC<DataNotFoundPageProps> = ({ month, onGoBack }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };
  
  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full p-6 text-center max-w-md mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ 
          y: [0, -15, 0],
          rotateZ: [0, -5, 0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="mb-8 text-blue-500 relative"
      >
        <Calendar size={140} strokeWidth={1.5} className="drop-shadow-lg" />
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute -right-3 -top-3 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-500"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <AlertCircle size={16} />
        </motion.div>
      </motion.div>
      
      <motion.h1 
        className="text-4xl font-bold mb-4 text-gray-800 font-poppins bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
        variants={itemVariants}
      >
        No Data Available
      </motion.h1>
      
      <motion.div 
        className="flex items-center gap-2 mb-6 text-amber-600 bg-amber-50 px-5 py-3 rounded-xl shadow-sm border border-amber-100"
        variants={itemVariants}
      >
        <AlertCircle className="h-5 w-5" />
        <p className="text-sm">Data for <span className="font-semibold">{month}</span> is not yet available</p>
      </motion.div>
      
      <motion.p 
        className="text-gray-600 mb-10 max-w-sm leading-relaxed"
        variants={itemVariants}
      >
        Please try selecting a different time period or check back later when data for this period has been uploaded.
      </motion.p>
      
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button 
          onClick={onGoBack} 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg px-6 py-6 h-auto text-base group"
        >
          <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
          Go Back to Dashboard
        </Button>
      </motion.div>
      
      {/* Background decorations */}
      <motion.div 
        className="absolute top-1/3 -right-10 w-32 h-32 rounded-full bg-blue-50 opacity-60 blur-3xl"
        animate={{ 
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 -left-10 w-40 h-40 rounded-full bg-indigo-50 opacity-60 blur-3xl"
        animate={{ 
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
    </motion.div>
  );
};

export default DataNotFoundPage;
