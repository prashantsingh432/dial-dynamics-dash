
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Calendar, AlertCircle } from 'lucide-react';

interface DataNotFoundPageProps {
  month: string;
  onGoBack: () => void;
}

const DataNotFoundPage: React.FC<DataNotFoundPageProps> = ({ month, onGoBack }) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full p-6 text-center max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: [0, -15, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="mb-6 text-dashboard-blue"
      >
        <Calendar size={120} strokeWidth={1} />
      </motion.div>
      
      <motion.h1 
        className="text-3xl font-bold mb-3 text-gray-800 font-poppins"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        No Data Available
      </motion.h1>
      
      <motion.div 
        className="flex items-center gap-2 mb-6 text-amber-500 bg-amber-50 px-4 py-2 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <AlertCircle className="h-5 w-5" />
        <p className="text-sm">Data for <strong>{month}</strong> is not yet available</p>
      </motion.div>
      
      <motion.p 
        className="text-gray-600 mb-8 max-w-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Please try selecting a different time period or check back later when data for this period has been uploaded.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <Button 
          onClick={onGoBack} 
          className="bg-dashboard-blue hover:bg-blue-700 transition-colors"
        >
          Go Back to Dashboard
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default DataNotFoundPage;
