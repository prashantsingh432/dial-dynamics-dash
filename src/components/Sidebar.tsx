
import React from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectSelector from './ProjectSelector';
import AgentSelector from './AgentSelector';

const Sidebar: React.FC = () => {
  const { sidebarCollapsed, toggleSidebar } = useDashboard();
  
  return (
    <div
      className={cn(
        "h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Sidebar Header */}
      <div className={cn(
        "h-16 border-b border-gray-200 flex items-center px-4",
        sidebarCollapsed ? "justify-center" : "justify-between"
      )}>
        {!sidebarCollapsed && (
          <h2 className="font-semibold text-lg text-dashboard-blue">OutboundDash</h2>
        )}
        
        <button
          onClick={toggleSidebar}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
      
      {/* Sidebar Content */}
      <div className="flex-grow overflow-auto py-4">
        <ProjectSelector />
        <div className="mt-8">
          <AgentSelector />
        </div>
      </div>
      
      {/* Sidebar Footer */}
      <div className={cn(
        "h-16 border-t border-gray-200 flex items-center px-4",
        sidebarCollapsed ? "justify-center" : "justify-start"
      )}>
        {!sidebarCollapsed ? (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-dashboard-blue flex items-center justify-center text-white">
              RC
            </div>
            <div className="ml-2">
              <div className="text-sm font-medium">Rajesh Choudhari</div>
              <div className="text-xs text-gray-500">Sales Manager</div>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-dashboard-blue flex items-center justify-center text-white">
            RC
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
