
import React from 'react';
import { cn } from '@/lib/utils';
import { useDashboard } from '@/context/DashboardContext';
import ProjectSelector from './ProjectSelector';
import AgentSelector from './AgentSelector';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, LayoutDashboard, BarChartBig, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar: React.FC = () => {
  const { 
    sidebarCollapsed, 
    toggleSidebar, 
    activeSection, 
    setActiveSection,
    filters 
  } = useDashboard();
  
  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 z-10 transition-all duration-300 ease-in-out relative",
        sidebarCollapsed ? "w-20" : "w-72"
      )}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-8 bg-white border border-gray-200 rounded-full h-6 w-6 flex items-center justify-center shadow-sm z-20"
        onClick={toggleSidebar}
        aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {sidebarCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>
      
      {/* Sidebar Header with Logo */}
      <div 
        className={cn(
          "flex items-center h-16 border-b border-gray-200 px-6",
          sidebarCollapsed && "justify-center px-2"
        )}
      >
        {sidebarCollapsed ? (
          <div className="w-8 h-8 rounded-full bg-dashboard-blue text-white flex items-center justify-center font-bold text-xl">
            A
          </div>
        ) : (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-dashboard-blue text-white flex items-center justify-center font-bold text-xl">
              A
            </div>
            <span className="text-lg font-semibold text-gray-800 ml-2">Amplior</span>
          </div>
        )}
      </div>
      
      {/* Navigation Links */}
      <div className="pt-6 px-4">
        <ul className={cn("space-y-1", sidebarCollapsed && "flex flex-col items-center")}>
          <li>
            <button 
              className={cn(
                "flex items-center w-full px-3 py-2 text-sm rounded-md",
                activeSection === 'dashboard' 
                  ? "bg-blue-50 text-dashboard-blue font-medium" 
                  : "text-gray-700 hover:bg-gray-100",
                sidebarCollapsed && "justify-center px-2"
              )}
              onClick={() => setActiveSection('dashboard')}
            >
              <LayoutDashboard className="h-5 w-5" />
              {!sidebarCollapsed && <span className="ml-3">Dashboard</span>}
            </button>
          </li>
          <li>
            <button 
              className={cn(
                "flex items-center w-full px-3 py-2 text-sm rounded-md",
                activeSection === 'project-performance' 
                  ? "bg-blue-50 text-dashboard-blue font-medium" 
                  : "text-gray-700 hover:bg-gray-100",
                sidebarCollapsed && "justify-center px-2"
              )}
              onClick={() => setActiveSection('project-performance')}
            >
              <BarChartBig className="h-5 w-5" />
              {!sidebarCollapsed && <span className="ml-3">Project Performance</span>}
            </button>
          </li>
          <li>
            <button 
              className={cn(
                "flex items-center w-full px-3 py-2 text-sm rounded-md",
                activeSection === 'data-entry' 
                  ? "bg-blue-50 text-dashboard-blue font-medium" 
                  : "text-gray-700 hover:bg-gray-100",
                sidebarCollapsed && "justify-center px-2"
              )}
              onClick={() => setActiveSection('data-entry')}
            >
              <PlusCircle className="h-5 w-5" />
              {!sidebarCollapsed && <span className="ml-3">Data Entry</span>}
            </button>
          </li>
        </ul>
      </div>
      
      {/* Sidebar Content - Projects and Agents section */}
      <div className="flex-grow overflow-auto py-6 px-2">
        {!sidebarCollapsed && (
          <div className="text-xs font-semibold text-gray-500 uppercase mb-2 px-3">
            PROJECTS
          </div>
        )}
        <ProjectSelector className="mb-6" />
        
        {/* Only show Agents section if a project other than "All" is selected */}
        <AgentSelector className="mb-2" />
      </div>
      
      {/* Sidebar Footer */}
      <div className={cn(
        "h-16 border-t border-gray-200 flex items-center px-4",
        sidebarCollapsed ? "justify-center" : "px-6"
      )}>
        <div className={cn(
          "flex items-center",
          sidebarCollapsed && "flex-col"
        )}>
          <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-semibold">
            RC
          </div>
          {!sidebarCollapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">Rajesh Choudhari</p>
              <p className="text-xs text-gray-500">Sales Manager</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
