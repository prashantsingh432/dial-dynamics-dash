import React from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const ProjectPerformance: React.FC = () => {
  const { data, filters, setProject } = useDashboard();
  const projects = [
    { id: 'All', name: 'All' },
    ...data.projectPerformance.map((p: any) => ({ id: p.name, name: p.name }))
  ];
  const activeProject = filters.project;

  return (
    <section className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 font-poppins mb-2 md:mb-0">Project Performance</h2>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
            disabled
          />
          <button className="absolute right-2 top-2 text-gray-400" disabled>
            <span className="material-icons">filter_list</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Project Filter */}
        <aside className="w-full md:w-48 mb-4 md:mb-0">
          <div className="bg-white rounded-lg shadow-sm border p-3">
            <div className="text-xs font-semibold text-gray-500 mb-2">PROJECTS</div>
            <ul className="space-y-1">
              {projects.map((project) => (
                <li key={project.id}>
                  <button
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-lg transition-all text-sm font-medium',
                      activeProject === project.id
                        ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                    )}
                    onClick={() => setProject(project.id)}
                  >
                    {project.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        {/* Table */}
        <div className="flex-1 overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-sm border">
            <thead>
              <tr className="text-xs text-gray-500 font-semibold bg-gray-50">
                <th className="px-4 py-3 text-left">Project</th>
                <th className="px-4 py-3 text-left">Dials</th>
                <th className="px-4 py-3 text-left">Connected</th>
                <th className="px-4 py-3 text-left">Talk Time</th>
                <th className="px-4 py-3 text-left">Scheduled</th>
                <th className="px-4 py-3 text-left">Successful</th>
                <th className="px-4 py-3 text-left">Success Rate</th>
              </tr>
            </thead>
            <tbody>
              {data.projectPerformance.map((project: any) => (
                <tr key={project.id} className="border-t text-sm">
                  <td className="px-4 py-3 font-medium text-gray-800">{project.name}</td>
                  <td className="px-4 py-3">{project.dials.toLocaleString()}</td>
                  <td className="px-4 py-3">{project.connected.toLocaleString()}</td>
                  <td className="px-4 py-3">{Math.floor(project.talkTime / 60)}h {Math.round(project.talkTime % 60)}m</td>
                  <td className="px-4 py-3">{project.scheduledMeetings}</td>
                  <td className="px-4 py-3">{project.successfulMeetings}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            'h-2 rounded-full',
                            project.successRate >= 50 ? 'bg-yellow-400' : 'bg-red-500'
                          )}
                          style={{ width: `${project.successRate}%` }}
                        ></div>
                      </div>
                      <span className={cn(
                        'text-xs font-semibold',
                        project.successRate >= 50 ? 'text-yellow-500' : 'text-red-500'
                      )}>
                        {project.successRate.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ProjectPerformance;
