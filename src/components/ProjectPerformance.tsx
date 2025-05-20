
import React, { useState, useMemo } from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { formatMinutes } from '@/lib/formatters';
import { Search, Filter } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

const ProjectPerformance: React.FC = () => {
  const { data, filters, setProject } = useDashboard();
  const [searchQuery, setSearchQuery] = useState('');
  const projects = [
    { id: 'All', name: 'All', avatar: 'A' },
    ...data.projectPerformance.map((p: any) => ({ 
      id: p.name, 
      name: p.name, 
      avatar: p.name.charAt(0)
    }))
  ];
  const activeProject = filters.project;

  const filteredProjects = useMemo(() => {
    return data.projectPerformance.filter((project: any) => {
      if (activeProject !== 'All' && project.name !== activeProject) {
        return false;
      }
      if (searchQuery && !project.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [data.projectPerformance, activeProject, searchQuery]);

  const getSuccessRateColor = (rate: number) => {
    return rate >= 50 ? 'bg-yellow-400' : 'bg-red-500';
  };

  const getSuccessRateTextColor = (rate: number) => {
    return rate >= 50 ? 'text-yellow-500' : 'text-red-500';
  };

  return (
    <section className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h2 className="text-lg md:text-xl font-semibold text-blue-700 font-poppins mb-2 md:mb-0">Project Performance</h2>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-200 rounded-lg pl-9 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <button className="absolute right-3 top-2 text-gray-400">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Project Filter */}
        <aside className="w-full lg:w-48 mb-4 lg:mb-0 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border p-3">
            <div className="text-xs font-semibold text-gray-500 mb-3 uppercase">PROJECTS</div>
            <ul className="space-y-2">
              {projects.map((project) => (
                <li key={project.id}>
                  <button
                    className={cn(
                      'w-full text-left flex items-center px-2 py-2 rounded-lg transition-all text-sm font-medium',
                      activeProject === project.id
                        ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                    )}
                    onClick={() => setProject(project.id)}
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium mr-3">
                      {project.avatar}
                    </div>
                    {project.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        
        {/* Table */}
        <div className="flex-1">
          <Card className="overflow-hidden border rounded-lg shadow-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="text-gray-500 font-semibold">Project</TableHead>
                    <TableHead className="text-gray-500 font-semibold">Dials</TableHead>
                    <TableHead className="text-gray-500 font-semibold">Connected</TableHead>
                    <TableHead className="text-gray-500 font-semibold">Talk Time</TableHead>
                    <TableHead className="text-gray-500 font-semibold">Scheduled</TableHead>
                    <TableHead className="text-gray-500 font-semibold">Successful</TableHead>
                    <TableHead className="text-gray-500 font-semibold">Success Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((project: any) => (
                      <TableRow key={project.id} className="border-t hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-800">{project.name}</TableCell>
                        <TableCell>{project.dials.toLocaleString()}</TableCell>
                        <TableCell>{project.connected.toLocaleString()}</TableCell>
                        <TableCell>{formatMinutes(project.talkTime)}</TableCell>
                        <TableCell>{project.scheduledMeetings}</TableCell>
                        <TableCell>{project.successfulMeetings}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={cn(
                                  'h-2 rounded-full',
                                  getSuccessRateColor(project.successRate)
                                )}
                                style={{ width: `${project.successRate}%` }}
                              ></div>
                            </div>
                            <span className={cn(
                              'text-xs font-semibold',
                              getSuccessRateTextColor(project.successRate)
                            )}>
                              {project.successRate.toFixed(1)}%
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                        No projects found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProjectPerformance;
