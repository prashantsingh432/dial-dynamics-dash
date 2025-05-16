
import React, { useState } from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, BarChart2, Users, Settings, HelpCircle } from 'lucide-react';
import ProjectSelector from './ProjectSelector';
import AgentSelector from './AgentSelector';
import { motion } from 'framer-motion';

const Sidebar: React.FC = () => {
  const { sidebarCollapsed, toggleSidebar } = useDashboard();
  const [activeSection, setActiveSection] = useState('dashboard');
  
  const sidebarVariants = {
    expanded: { width: 256 },
    collapsed: { width: 64 }
  };
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
    { id: 'agents', label: 'Agents', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help', icon: HelpCircle }
  ];
  
  return (
    <motion.div
      className={cn(
        "h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out",
      )}
      variants={sidebarVariants}
      initial={sidebarCollapsed ? "collapsed" : "expanded"}
      animate={sidebarCollapsed ? "collapsed" : "expanded"}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Sidebar Header */}
      <div className={cn(
        "h-16 border-b border-gray-200 flex items-center px-4",
        sidebarCollapsed ? "justify-center" : "justify-between"
      )}>
        {!sidebarCollapsed && (
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="font-semibold text-lg text-dashboard-blue font-poppins"
          >
            OutboundDash
          </motion.h2>
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
      
      {/* Main Navigation */}
      <div className="pt-5 px-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button 
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "w-full flex items-center rounded-lg transition-all duration-200 py-2",
                  activeSection === item.id 
                    ? "bg-blue-50 text-dashboard-blue font-medium" 
                    : "text-gray-600 hover:bg-gray-100",
                  sidebarCollapsed ? "justify-center px-2" : "px-3"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5",
                  activeSection === item.id ? "text-dashboard-blue" : "text-gray-500"
                )} />
                
                {!sidebarCollapsed && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="ml-3"
                  >
                    {item.label}
                  </motion.span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Sidebar Content */}
      <div className="flex-grow overflow-auto py-6 px-2">
        <ProjectSelector />
        <div className="mt-8">
          <AgentSelector />
        </div>
      </div>
      
      {/* Sidebar Footer */}
      <div className={cn(
        "h-16 border-t border-gray-200 flex items-center px-4 my-2",
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
    </motion.div>
  );
};

export default Sidebar;
