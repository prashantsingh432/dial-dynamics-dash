
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
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const { filters, loading, dataAvailable, resetMonth } = useDashboard();
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
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
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      <LoadingOverlay show={loading} />
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-auto p-4 md:p-6 pb-16">
          {!dataAvailable ? (
            <DataNotFoundPage month={filters.secondaryTimeFrame} onGoBack={resetMonth} />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Dashboard title & info */}
              <motion.div 
                className="mb-6"
                variants={itemVariants}
              >
                <h1 className="text-2xl font-semibold text-gray-800 font-poppins">Dashboard</h1>
                <p className="text-sm text-gray-500">
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
              
              {filters.agent ? (
                /* Agent Performance View */
                <motion.section 
                  className="mb-6"
                  variants={itemVariants}
                >
                  <AgentPerformance />
                </motion.section>
              ) : (
                /* Regular Dashboard View */
                <>
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
                </>
              )}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
