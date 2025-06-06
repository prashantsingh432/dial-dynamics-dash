
import React, { useEffect, useState } from 'react';
import { useDashboard, Project } from '@/context/DashboardContext';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

interface ProjectSelectorProps {
  className?: string;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ className }) => {
  const { filters, setProject, sidebarCollapsed } = useDashboard();
  const [projects, setProjects] = useState<Project[]>(['All']);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('project_name')
          .order('project_name');
        
        if (error) throw error;
        
        const projectNames = data.map(p => p.project_name as Project);
        setProjects(['All', ...projectNames]);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    
    fetchProjects();
  }, []);
  
  // Generate project icon (simplified for this demo)
  const getProjectIcon = (project: Project) => {
    const firstLetter = project === 'All' ? 'A' : project[0];
    return (
      <div className="w-8 h-8 rounded-md flex items-center justify-center bg-dashboard-lightBlue text-white font-semibold">
        {firstLetter}
      </div>
    );
  };
  
  return (
    <div className={cn("flex flex-col space-y-1", className)}>
      <h3 className={cn("px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider", 
        sidebarCollapsed ? "sr-only" : "")}>
        Projects
      </h3>
      
      <ul className="mt-1">
        {projects.map((project) => (
          <li key={project}>
            <button 
              onClick={() => setProject(project)}
              className={cn(
                "w-full flex items-center px-3 py-2 text-sm rounded-md transition-all duration-200",
                "hover:bg-gray-100",
                filters.project === project ? "bg-blue-50 text-dashboard-blue font-medium" : "text-gray-700",
                sidebarCollapsed && "justify-center"
              )}
            >
              {getProjectIcon(project)}
              {!sidebarCollapsed && (
                <span className="ml-3">{project}</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectSelector;
