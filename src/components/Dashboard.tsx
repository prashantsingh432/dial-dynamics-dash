
import React from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Header from './Header';
import KPISection from './KPISection';
import PerformanceChart from './PerformanceChart';
import ConversionFunnel from './ConversionFunnel';
import ProjectPerformance from './ProjectPerformance';
import TopPerformers from './TopPerformers';
import LoadingOverlay from './LoadingOverlay';
import AgentPerformance from './AgentPerformance';
import DataNotFoundPage from './DataNotFoundPage';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard: React.FC = () => {
  const { filters, loading, dataAvailable, resetMonth } = useDashboard();
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <LoadingOverlay show={loading} />
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-auto p-4 md:p-6 pb-16">
          <AnimatePresence mode="wait">
            {!dataAvailable ? (
              <motion.div
                key="no-data"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="h-full"
              >
                <DataNotFoundPage month={filters.secondaryTimeFrame} onGoBack={resetMonth} />
              </motion.div>
            ) : (
              <motion.div
                key="dashboard-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                {/* Dashboard title & info */}
                <motion.div 
                  className="mb-6"
                  variants={itemVariants}
                >
                  <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100 font-poppins">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-dashboard-blue to-dashboard-brightBlue">
                      Dashboard
                    </span>
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Overview for {filters.project === 'All' ? 'All Projects' : filters.project}
                    {filters.agent ? ` - Agent: ${filters.agent}` : ''}
                  </p>
                </motion.div>
                
                {/* KPIs */}
                <motion.section 
                  className="mb-6"
                  variants={itemVariants}
                >
                  <KPISection />
                </motion.section>
                
                <AnimatePresence mode="wait">
                  {filters.agent ? (
                    /* Agent Performance View */
                    <motion.section 
                      key="agent-view"
                      className="mb-6"
                      variants={itemVariants}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <AgentPerformance />
                    </motion.section>
                  ) : (
                    /* Regular Dashboard View */
                    <motion.div
                      key="regular-view"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Charts */}
                      <motion.section 
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
                        variants={itemVariants}
                      >
                        <div className="md:col-span-2">
                          <PerformanceChart />
                        </div>
                        <div className="md:col-span-1">
                          <ConversionFunnel />
                        </div>
                      </motion.section>
                      
                      {/* Project Performance */}
                      <motion.section 
                        className="mb-6"
                        variants={itemVariants}
                      >
                        <ProjectPerformance />
                      </motion.section>
                      
                      {/* Top Performers */}
                      <motion.section
                        variants={itemVariants}
                      >
                        <TopPerformers />
                      </motion.section>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
