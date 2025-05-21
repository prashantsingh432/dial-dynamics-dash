
import React from 'react';
import { useDashboard } from '@/context/DashboardContext';
import AgentDataEntry from './AgentDataEntry';
import { motion } from 'framer-motion';

const DataEntryPage: React.FC = () => {
  const { filters, loading, dataAvailable } = useDashboard();
  
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-6">Team Data Entry</h1>
        
        <div className="mb-8">
          <p className="text-gray-600">
            Enter or edit performance data for agents. Select a project from the sidebar, then choose an agent to input their daily metrics.
          </p>
        </div>
        
        <AgentDataEntry />
      </motion.div>
    </div>
  );
};

export default DataEntryPage;
