
import React, { useState } from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { ArrowUp, ArrowDown } from 'lucide-react';

type SortField = 'dials' | 'connected' | 'talkTime' | 'scheduledMeetings' | 'successfulMeetings' | 'successRate';
type SortDirection = 'asc' | 'desc';

const ProjectPerformance: React.FC = () => {
  const { data, isAnimating } = useDashboard();
  const [sortField, setSortField] = useState<SortField>('successRate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
  // Handle sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to desc
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  // Sort projects
  const sortedProjects = [...data.projectPerformance].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    return (a[sortField] - b[sortField]) * multiplier;
  });
  
  // Format for minutes
  const formatMinutes = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  return (
    <Card className={cn(
      "transition-opacity duration-500",
      isAnimating ? 'opacity-0' : 'opacity-100'
    )}>
      <CardHeader>
        <CardTitle className="text-lg">Project Performance</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Project</TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => handleSort('dials')}>
                  <div className="flex items-center justify-end space-x-1">
                    <span>Dials</span>
                    {sortField === 'dials' && (
                      sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => handleSort('connected')}>
                  <div className="flex items-center justify-end space-x-1">
                    <span>Connected</span>
                    {sortField === 'connected' && (
                      sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => handleSort('talkTime')}>
                  <div className="flex items-center justify-end space-x-1">
                    <span>Talk Time</span>
                    {sortField === 'talkTime' && (
                      sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => handleSort('scheduledMeetings')}>
                  <div className="flex items-center justify-end space-x-1">
                    <span>Scheduled</span>
                    {sortField === 'scheduledMeetings' && (
                      sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => handleSort('successfulMeetings')}>
                  <div className="flex items-center justify-end space-x-1">
                    <span>Successful</span>
                    {sortField === 'successfulMeetings' && (
                      sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => handleSort('successRate')}>
                  <div className="flex items-center justify-end space-x-1">
                    <span>Success Rate</span>
                    {sortField === 'successRate' && (
                      sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                    )}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProjects.map((project) => (
                <TableRow key={project.id} className="hover:bg-blue-50 transition-colors duration-200">
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell className="text-right">{project.dials.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{project.connected.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{formatMinutes(project.talkTime)}</TableCell>
                  <TableCell className="text-right">{project.scheduledMeetings.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{project.successfulMeetings.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      <div className="w-12 bg-gray-200 h-2 rounded-full mr-2">
                        <div
                          className={cn(
                            "h-2 rounded-full",
                            project.successRate >= 70 ? "bg-dashboard-green" :
                            project.successRate >= 50 ? "bg-dashboard-amber" :
                            "bg-dashboard-red"
                          )}
                          style={{ width: `${project.successRate}%` }}
                        />
                      </div>
                      {project.successRate.toFixed(1)}%
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectPerformance;
