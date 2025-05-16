
import React, { useState } from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { ArrowUp, ArrowDown, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type SortField = 'dials' | 'connected' | 'talkTime' | 'scheduledMeetings' | 'successfulMeetings' | 'successRate';
type SortDirection = 'asc' | 'desc';

const ProjectPerformance: React.FC = () => {
  const { data, isAnimating } = useDashboard();
  const [sortField, setSortField] = useState<SortField>('successRate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
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
  
  // Filter and sort projects
  const filteredProjects = searchQuery 
    ? [...data.projectPerformance].filter(project => 
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [...data.projectPerformance];
  
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    return (a[sortField] - b[sortField]) * multiplier;
  });
  
  // Format for minutes
  const formatMinutes = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Animation variants for table rows
  const tableRowVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card className={cn(
        "transition-all duration-500 enhanced-card",
        isAnimating ? 'opacity-0' : 'opacity-100'
      )}>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg font-poppins text-dashboard-blue">Project Performance</CardTitle>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-400" />
              <Input 
                placeholder="Search projects..." 
                className="pl-9 h-9 w-48 focus-visible:ring-dashboard-blue" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  className={cn(
                    "h-9 w-9 border-gray-200",
                    showFilters && "bg-blue-50 border-blue-200"
                  )}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Hide Empty Projects</DropdownMenuItem>
                <DropdownMenuItem>Show Active Projects Only</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Reset Filters</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="overflow-x-auto rounded-md border border-gray-100 bg-white">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-[150px] font-medium">Project</TableHead>
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
                {sortedProjects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center">
                      No projects match your search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedProjects.map((project, i) => (
                    <motion.tr
                      key={project.id}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={tableRowVariants}
                      className="hover:bg-blue-50/70 transition-colors duration-200 border-b border-gray-100 last:border-0"
                    >
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell className="text-right">{project.dials.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{project.connected.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{formatMinutes(project.talkTime)}</TableCell>
                      <TableCell className="text-right">{project.scheduledMeetings.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{project.successfulMeetings.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <div className="w-24 bg-gray-200 h-2 rounded-full mr-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${project.successRate}%` }}
                              transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                              className={cn(
                                "h-2 rounded-full",
                                project.successRate >= 70 ? "bg-dashboard-green" :
                                project.successRate >= 50 ? "bg-dashboard-amber" :
                                "bg-dashboard-red"
                              )}
                            />
                          </div>
                          <span className="font-semibold">{project.successRate.toFixed(1)}%</span>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectPerformance;
