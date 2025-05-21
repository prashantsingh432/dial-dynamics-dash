
import React from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

const ConversionFunnel: React.FC = () => {
  const { filteredData, isAnimating, filters } = useDashboard();
  const { conversionFunnel } = filteredData;
  
  // Get total for calculating percentages
  const totalValue = conversionFunnel.length > 0 ? conversionFunnel[0].value : 0;
  
  // If project is selected, filter or adjust funnel data 
  // For a real implementation, this would be data from the backend filtered by project
  // Here we're just scaling based on the selected project's dial count
  const projectSpecificFunnel = React.useMemo(() => {
    if (filters.project === 'All') {
      return conversionFunnel;
    }

    const projectData = filteredData.projectPerformance.find(p => p.name === filters.project);
    if (!projectData || conversionFunnel.length === 0) {
      return conversionFunnel;
    }

    // Calculate the ratio for scaling
    const dialRatio = projectData.dials / (totalValue || 1);
    
    return conversionFunnel.map(item => ({
      ...item,
      value: item.stage === 'Dials' ? projectData.dials : 
             item.stage === 'Connected' ? projectData.connected :
             item.stage === 'Scheduled' ? projectData.scheduledMeetings :
             item.stage === 'Successful' ? projectData.successfulMeetings :
             // For "Qualified" which we don't have direct data for, estimate it
             Math.round(item.value * dialRatio)
    }));
  }, [conversionFunnel, filters.project, filteredData.projectPerformance, totalValue]);

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalValue) * 100).toFixed(1);
      
      return (
        <div className="p-3 bg-white rounded-lg shadow-md border border-gray-100">
          <p className="font-medium text-sm">{data.stage}</p>
          <p className="text-sm">{data.value.toLocaleString()}</p>
          <p className="text-xs text-gray-500">{percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      key={`funnel-${filters.project}`} // Re-animate when project changes
    >
      <Card className={cn(
        "h-full transition-all duration-500 bg-white border-0 shadow-sm hover:shadow-md",
        isAnimating ? 'opacity-0' : 'opacity-100'
      )}>
        <CardHeader className="border-b pb-3">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Conversion Funnel
            {filters.project !== 'All' ? ` (${filters.project})` : ''}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-4">
          <div className="h-[250px]">
            {projectSpecificFunnel.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectSpecificFunnel}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    animationBegin={0}
                    animationDuration={1000}
                  >
                    {projectSpecificFunnel.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">No funnel data available</p>
              </div>
            )}
          </div>
          
          {/* Conversion rates */}
          <div className="mt-2 grid grid-cols-3 gap-2">
            {projectSpecificFunnel.slice(2, 5).map((item, index) => {
              const percentage = ((item.value / totalValue) * 100).toFixed(1);
              return (
                <div 
                  key={item.stage}
                  className="text-center p-2 rounded-lg bg-gray-50"
                >
                  <h5 className="text-xs font-medium text-gray-600">{item.stage} Rate</h5>
                  <p className="text-lg font-bold" style={{ color: item.color }}>
                    {percentage}%
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ConversionFunnel;
