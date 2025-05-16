
import React from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { cn } from '@/lib/utils';
import TimePeriodFilter from './TimePeriodFilter';
import { Search, Bell, Settings } from 'lucide-react';

const Header: React.FC = () => {
  const { loading } = useDashboard();
  
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center">
        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-md w-64">
          <Search className="h-4 w-4 text-gray-500 ml-3" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none focus:outline-none py-2 px-3 text-sm w-full"
          />
        </div>
      </div>
      
      <div className="flex-grow mx-4">
        <TimePeriodFilter />
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Loading indicator */}
        {loading && (
          <div className="text-xs text-dashboard-blue animate-pulse">Loading...</div>
        )}
        
        {/* Notifications */}
        <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-dashboard-red rounded-full"></span>
        </button>
        
        {/* Settings */}
        <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100">
          <Settings className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </header>
  );
};

export default Header;
