
import React, { useState, useEffect } from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

type ChartTimeFrame = 'Weekly' | 'Monthly' | 'Quarterly' | 'Yearly';

interface ChartDataItem {
  name: string;
  Scheduled: number;
  Successful: number;
}

const PerformanceChart: React.FC = () => {
  const { data, isAnimating } = useDashboard();
  const [chartTimeFrame, setChartTimeFrame] = useState<ChartTimeFrame>('Monthly');
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  
  useEffect(() => {
    // Generate appropriate data based on the selected time frame
    let newData: ChartDataItem[] = [];
    
    switch (chartTimeFrame) {
      case 'Weekly':
        newData = [
          { name: 'Week 1', Scheduled: 140, Successful: 12 },
          { name: 'Week 2', Scheduled: 310, Successful: 110 },
          { name: 'Week 3', Scheduled: 260, Successful: 153 },
          { name: 'Week 4', Scheduled: 10, Successful: 8 }
        ];
        break;
        
      case 'Monthly':
        newData = [
          { name: 'Jan', Scheduled: 120, Successful: 65 },
          { name: 'Feb', Scheduled: 98, Successful: 43 },
          { name: 'Mar', Scheduled: 145, Successful: 85 },
          { name: 'Apr', Scheduled: 178, Successful: 93 },
          { name: 'May', Scheduled: 213, Successful: 125 },
          { name: 'Jun', Scheduled: 198, Successful: 110 },
          { name: 'Jul', Scheduled: 173, Successful: 95 },
          { name: 'Aug', Scheduled: 155, Successful: 82 },
          { name: 'Sep', Scheduled: 140, Successful: 75 },
          { name: 'Oct', Scheduled: 0, Successful: 0 },
          { name: 'Nov', Scheduled: 0, Successful: 0 },
          { name: 'Dec', Scheduled: 0, Successful: 0 }
        ];
        break;
        
      case 'Quarterly':
        newData = [
          { name: 'Q1', Scheduled: 363, Successful: 193 },
          { name: 'Q2', Scheduled: 589, Successful: 328 },
          { name: 'Q3', Scheduled: 468, Successful: 252 },
          { name: 'Q4', Scheduled: 0, Successful: 0 }
        ];
        break;
        
      case 'Yearly':
        newData = [
          { name: '2022', Scheduled: 965, Successful: 612 },
          { name: '2023', Scheduled: 1245, Successful: 786 },
          { name: '2024', Scheduled: 1420, Successful: 773 },
          { name: '2025', Scheduled: 0, Successful: 0 }
        ];
        break;
        
      default:
        newData = data.performanceChart.labels.map((label, index) => ({
          name: label,
          Scheduled: data.performanceChart.scheduled[index],
          Successful: data.performanceChart.successful[index]
        }));
    }
    
    setChartData(newData);
  }, [chartTimeFrame, data.performanceChart]);
  
  // Time frame options for the chart
  const timeFrameOptions: ChartTimeFrame[] = ['Weekly', 'Monthly', 'Quarterly', 'Yearly'];

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-200">
          <p className="font-medium text-gray-700 mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={`tooltip-${index}`} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm font-medium" style={{ color: entry.color }}>
                  {entry.name}: {entry.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };
  
  // Calculate average values for reference lines
  const hasData = chartData.some(item => item.Scheduled > 0 || item.Successful > 0);
  
  const avgScheduled = hasData 
    ? chartData.reduce((sum, item) => sum + item.Scheduled, 0) / chartData.filter(item => item.Scheduled > 0).length || 0
    : 0;
    
  const avgSuccessful = hasData
    ? chartData.reduce((sum, item) => sum + item.Successful, 0) / chartData.filter(item => item.Successful > 0).length || 0
    : 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className={cn(
        "h-full transition-all duration-500 bg-white border-0 shadow-sm hover:shadow-md",
        isAnimating ? 'opacity-0' : 'opacity-100'
      )}>
        <CardHeader className="flex flex-row items-center justify-between border-b pb-3">
          <CardTitle className="text-lg font-semibold text-gray-800">Performance Comparison</CardTitle>
          
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {timeFrameOptions.map((option) => (
              <Button
                key={option}
                variant={chartTimeFrame === option ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartTimeFrame(option)}
                className={cn(
                  "text-xs px-3 py-1 h-7 transition-all duration-200 rounded-md",
                  chartTimeFrame === option
                    ? "bg-white shadow-sm text-gray-800"
                    : "hover:bg-gray-200 text-gray-600"
                )}
              >
                {option}
              </Button>
            ))}
          </div>
        </CardHeader>
        
        <CardContent className="pt-5">
          <AnimatePresence mode="wait">
            <motion.div 
              key={chartTimeFrame}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-[300px]"
            >
              {chartData.some(item => item.Scheduled > 0 || item.Successful > 0) ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    barCategoryGap="20%"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                      dx={-10}
                    />
                    <Tooltip 
                      content={<CustomTooltip />}
                      cursor={{ fill: 'rgba(249, 250, 251, 0.8)' }}
                    />
                    <Legend 
                      verticalAlign="top"
                      height={36}
                      iconType="circle"
                      iconSize={8}
                      wrapperStyle={{ paddingTop: '0px' }}
                    />
                    {avgScheduled > 0 && (
                      <ReferenceLine 
                        y={avgScheduled} 
                        stroke="#7C3AED" 
                        strokeDasharray="3 3"
                        strokeWidth={1}
                        label={{ 
                          value: 'Avg Scheduled', 
                          position: 'right',
                          fill: '#7C3AED',
                          fontSize: 11
                        }}
                      />
                    )}
                    {avgSuccessful > 0 && (
                      <ReferenceLine 
                        y={avgSuccessful} 
                        stroke="#22c55e" 
                        strokeDasharray="3 3"
                        strokeWidth={1}
                        label={{ 
                          value: 'Avg Successful', 
                          position: 'right',
                          fill: '#22c55e',
                          fontSize: 11
                        }}
                      />
                    )}
                    <Bar 
                      dataKey="Scheduled" 
                      fill="#8884d8" 
                      radius={[4, 4, 0, 0]}
                      animationDuration={1000}
                      animationEasing="ease-out"
                    />
                    <Bar 
                      dataKey="Successful" 
                      fill="#22c55e" 
                      radius={[4, 4, 0, 0]}
                      animationDuration={1000}
                      animationEasing="ease-out"
                      animationBegin={300}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="text-gray-500 mb-2">No data available for this period</p>
                  <p className="text-sm text-gray-400">Future or missing data will appear here when available</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          
          {chartTimeFrame === 'Monthly' && chartData.some(item => item.Scheduled === 0 && item.Successful === 0) && (
            <div className="mt-3 text-sm text-gray-500 italic text-center">
              Note: Future months show zero values
            </div>
          )}
          
          {chartTimeFrame === 'Quarterly' && chartData.some(item => item.Scheduled === 0 && item.Successful === 0) && (
            <div className="mt-3 text-sm text-gray-500 italic text-center">
              Note: Future quarters show zero values
            </div>
          )}
          
          {chartTimeFrame === 'Yearly' && chartData.some(item => item.Scheduled === 0 && item.Successful === 0) && (
            <div className="mt-3 text-sm text-gray-500 italic text-center">
              Note: Future years show zero values
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PerformanceChart;
