
import React, { useMemo } from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { cn } from '@/lib/utils';
import { Users } from 'lucide-react';

interface AgentSelectorProps {
  className?: string;
}

const AgentSelector: React.FC<AgentSelectorProps> = ({ className }) => {
  const { agentsList, filters, setAgent, sidebarCollapsed } = useDashboard();
  
  // Filter agents by the selected project
  const filteredAgents = useMemo(() => {
    if (filters.project === 'All') {
      return [];
    }
    return agentsList.filter(agent => agent.project === filters.project);
  }, [agentsList, filters.project]);
  
  // Handle agent click
  const handleAgentClick = (agentId: string) => {
    if (filters.agent === agentId) {
      // If clicking the same agent, deselect
      setAgent(null);
    } else {
      setAgent(agentId);
    }
  };

  // If "All" is selected, show a message instead of the agent list
  if (filters.project === 'All') {
    return (
      <div className={cn("flex flex-col space-y-1", className)}>
        <h3 className={cn("px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider",
          sidebarCollapsed ? "sr-only" : "")}>
          Agents
        </h3>
        <div className="px-3 py-6 flex flex-col items-center justify-center text-gray-500 text-sm h-32">
          {!sidebarCollapsed ? (
            <>
              <Users className="h-5 w-5 mb-3 opacity-50" />
              <p className="text-center">Select a project to view its agents</p>
            </>
          ) : (
            <Users className="h-5 w-5 opacity-50" />
          )}
        </div>
      </div>
    );
  }
  
  // If sidebar is collapsed, we'll only show icons
  if (sidebarCollapsed) {
    return (
      <div className={cn("flex flex-col space-y-1", className)}>
        <h3 className="sr-only">Agents</h3>
        <div className="flex flex-col items-center space-y-2 pt-2">
          {filteredAgents.slice(0, 5).map((agent) => (
            <button
              key={agent.id}
              onClick={() => handleAgentClick(agent.id)}
              className={cn(
                "w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center",
                filters.agent === agent.id ? "ring-2 ring-dashboard-blue" : ""
              )}
              title={agent.name}
            >
              {agent.name.charAt(0)}
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className={cn("flex flex-col space-y-1", className)}>
      <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        Agents
      </h3>
      
      {filteredAgents.length === 0 ? (
        <p className="px-3 py-6 text-sm text-gray-500 italic text-center">No agents available for this project</p>
      ) : (
        <ul className="mt-1">
          {filteredAgents.map((agent) => (
            <li key={agent.id}>
              <button 
                onClick={() => handleAgentClick(agent.id)}
                className={cn(
                  "w-full flex items-center px-3 py-2 text-sm rounded-md transition-all duration-200",
                  "hover:bg-gray-100",
                  filters.agent === agent.id ? "bg-blue-50 text-dashboard-blue font-medium" : "text-gray-700"
                )}
              >
                <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                  {agent.name.charAt(0)}
                </div>
                <span className="ml-3 truncate">{agent.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AgentSelector;
