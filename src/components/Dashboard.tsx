
import React from 'react';
import Header from './Header';
import KPISection from './KPISection';
import PerformanceChart from './PerformanceChart';
import TopPerformers from './TopPerformers';
import ConversionFunnel from './ConversionFunnel';
import ProjectPerformance from './ProjectPerformance';
import AgentPerformance from './AgentPerformance';
import DataEntryPage from './DataEntryPage';
import { useDashboard } from '@/context/DashboardContext';
import LoadingOverlay from './LoadingOverlay';
import DataNotFoundPage from './DataNotFoundPage';

const Dashboard: React.FC = () => {
  const { loading, dataAvailable, activeSection, filters } = useDashboard();
  
  return (
    <div className="flex-1 overflow-auto bg-gray-50 relative">
      <LoadingOverlay visible={loading} />
      
      {!loading && !dataAvailable ? (
        <DataNotFoundPage />
      ) : (
        <>
          <Header />
          
          <div className="p-6">
            {activeSection === 'dashboard' && (
              <div className="space-y-6">
                <KPISection />
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2">
                    <PerformanceChart />
                  </div>
                  <div className="xl:col-span-1">
                    <ConversionFunnel />
                  </div>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-1">
                    <TopPerformers />
                  </div>
                  <div className="xl:col-span-2">
                    {filters.agent ? (
                      <AgentPerformance />
                    ) : (
                      <ProjectPerformance />
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'project-performance' && (
              <ProjectPerformance fullWidth={true} />
            )}
            
            {activeSection === 'data-entry' && (
              <DataEntryPage />
            )}
            
            {filters.agent && <AgentPerformance />}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
