
import React, { useState, useMemo } from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Search, ArrowUpDown, Filter, ArrowDown, ArrowUp } from 'lucide-react';
import { formatMinutes } from '@/lib/formatters';

type SortField = 'name' | 'dials' | 'connected' | 'talkTime' | 'scheduledMeetings' | 'successfulMeetings' | 'successRate';
type SortDirection = 'asc' | 'desc';

const ProjectPerformance: React.FC = () => {
  const { filteredData } = useDashboard();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  
  // Handle sort change
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Filter and sort projects
  const projectsToDisplay = useMemo(() => {
    let filtered = filteredData.projectPerformance.filter(project =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'dials':
          comparison = a.dials - b.dials;
          break;
        case 'connected':
          comparison = a.connected - b.connected;
          break;
        case 'talkTime':
          comparison = a.talkTime - b.talkTime;
          break;
        case 'scheduledMeetings':
          comparison = a.scheduledMeetings - b.scheduledMeetings;
          break;
        case 'successfulMeetings':
          comparison = a.successfulMeetings - b.successfulMeetings;
          break;
        case 'successRate':
          comparison = a.successRate - b.successRate;
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredData.projectPerformance, searchTerm, sortField, sortDirection]);
  
  // Render sort indicator
  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-1 h-4 w-4 text-gray-400" />;
    }
    
    return sortDirection === 'asc' 
      ? <ArrowUp className="ml-1 h-4 w-4 text-blue-500" />
      : <ArrowDown className="ml-1 h-4 w-4 text-blue-500" />;
  };
  
  return (
    <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="border-b pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <CardTitle className="text-xl font-bold text-gray-800">Project Performance</CardTitle>
          
          <div className="flex space-x-2 items-center">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search projects..."
                className="pl-9 h-10 w-full md:w-[200px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Project
                  {renderSortIndicator('name')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('dials')}
              >
                <div className="flex items-center">
                  Dials
                  {renderSortIndicator('dials')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('connected')}
              >
                <div className="flex items-center">
                  Connected
                  {renderSortIndicator('connected')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('talkTime')}
              >
                <div className="flex items-center">
                  Talk Time
                  {renderSortIndicator('talkTime')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('scheduledMeetings')}
              >
                <div className="flex items-center">
                  Scheduled
                  {renderSortIndicator('scheduledMeetings')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('successfulMeetings')}
              >
                <div className="flex items-center">
                  Successful
                  {renderSortIndicator('successfulMeetings')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('successRate')}
              >
                <div className="flex items-center">
                  Success Rate
                  {renderSortIndicator('successRate')}
                </div>
              </th>
            </tr>
          </thead>
          
          <tbody className="bg-white divide-y divide-gray-200">
            {projectsToDisplay.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                  {searchTerm ? 'No projects match your search' : 'No project data available'}
                </td>
              </tr>
            ) : (
              projectsToDisplay.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-md bg-blue-500 flex items-center justify-center text-white font-medium">
                        {project.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{project.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {project.dials.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {project.connected.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {formatMinutes(project.talkTime)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {project.scheduledMeetings.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {project.successfulMeetings.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={cn(
                        "text-sm font-medium mr-2",
                        project.successRate >= 50 ? "text-amber-600" : "text-red-600"
                      )}>
                        {project.successRate.toFixed(1)}%
                      </span>
                      <div className="w-24 bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={cn(
                            "h-2.5 rounded-full",
                            project.successRate >= 50 ? "bg-amber-500" : "bg-red-500"
                          )}
                          style={{ width: `${project.successRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default ProjectPerformance;
