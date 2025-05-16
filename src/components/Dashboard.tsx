
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

const Dashboard: React.FC = () => {
  const { filters, loading } = useDashboard();
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {/* Dashboard title & info */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500">
              Overview for {filters.project === 'All' ? 'All Projects' : filters.project}
              {filters.agent ? ' - Agent View' : ''}
            </p>
          </div>
          
          {/* KPIs */}
          <section className="mb-6">
            <KPISection />
          </section>
          
          {/* Charts */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2">
              <PerformanceChart />
            </div>
            <div className="md:col-span-1">
              <ConversionFunnel />
            </div>
          </section>
          
          {/* Project Performance */}
          <section className="mb-6">
            <ProjectPerformance />
          </section>
          
          {/* Top Performers */}
          <section>
            <TopPerformers />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
