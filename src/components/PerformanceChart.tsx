
import React, { useState, useEffect } from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

type ChartTimeFrame = 'Weekly' | 'Monthly' | 'Quarterly' | 'Yearly';

const PerformanceChart: React.FC = () => {
  const { data, isAnimating } = useDashboard();
  const [chartTimeFrame, setChartTimeFrame] = useState<ChartTimeFrame>('Weekly');
  const [chartData, setChartData] = useState(data.performanceChart.labels.map((label, index) => ({
    name: label,
    Scheduled: data.performanceChart.scheduled[index],
    Successful: data.performanceChart.successful[index]
  })));
  
  useEffect(() => {
    // This would typically fetch different data based on the selected timeframe
    // For now we'll simulate this by adding some randomness to the existing data
    if (chartTimeFrame !== 'Weekly') {
      const randomFactor = chartTimeFrame === 'Monthly' ? 1.5 : 
                          chartTimeFrame === 'Quarterly' ? 3 : 5;
      
      const newData = data.performanceChart.labels.map((label, index) => ({
        name: label,
        Scheduled: Math.floor(data.performanceChart.scheduled[index] * (0.8 + Math.random() * 0.4) * randomFactor),
        Successful: Math.floor(data.performanceChart.successful[index] * (0.8 + Math.random() * 0.4) * randomFactor)
      }));
      
      setChartData(newData);
    } else {
      setChartData(data.performanceChart.labels.map((label, index) => ({
        name: label,
        Scheduled: data.performanceChart.scheduled[index],
        Successful: data.performanceChart.successful[index]
      })));
    }
  }, [chartTimeFrame, data.performanceChart]);
  
  // Time frame options for the chart
  const timeFrameOptions: ChartTimeFrame[] = ['Weekly', 'Monthly', 'Quarterly', 'Yearly'];

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-4 bg-white shadow-md rounded-lg border border-gray-100">
          <p className="font-medium text-gray-600 mb-2">{label}</p>
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
  const avgScheduled = chartData.reduce((sum, item) => sum + item.Scheduled, 0) / chartData.length;
  const avgSuccessful = chartData.reduce((sum, item) => sum + item.Successful, 0) / chartData.length;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className={cn(
        "h-full transition-all duration-500 enhanced-card",
        isAnimating ? 'opacity-0' : 'opacity-100'
      )}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-poppins text-dashboard-blue">Performance Comparison</CardTitle>
          
          <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
            {timeFrameOptions.map((option) => (
              <Button
                key={option}
                variant={chartTimeFrame === option ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartTimeFrame(option)}
                className={cn(
                  "text-xs px-3 py-1 h-7 transition-all duration-300 rounded-lg",
                  chartTimeFrame === option
                    ? "bg-white shadow-sm text-dashboard-blue"
                    : "hover:bg-gray-200 text-gray-600"
                )}
              >
                {option}
              </Button>
            ))}
          </div>
        </CardHeader>
        
        <CardContent className="pt-2">
          <AnimatePresence mode="wait">
            <motion.div 
              key={chartTimeFrame}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
                  barCategoryGap="20%"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F1F1" vertical={false} />
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
                    cursor={{ fill: 'rgba(236, 242, 255, 0.4)' }}
                  />
                  <Legend 
                    verticalAlign="top" 
                    height={40} 
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ paddingTop: '10px' }}
                  />
                  <ReferenceLine 
                    y={avgScheduled} 
                    stroke="#3B82F6" 
                    strokeDasharray="3 3"
                    strokeWidth={1}
                    label={{ 
                      value: 'Avg Scheduled', 
                      position: 'insideTopRight',
                      fill: '#3B82F6',
                      fontSize: 10
                    }}
                  />
                  <ReferenceLine 
                    y={avgSuccessful} 
                    stroke="#10B981" 
                    strokeDasharray="3 3"
                    strokeWidth={1}
                    label={{ 
                      value: 'Avg Successful', 
                      position: 'insideBottomRight',
                      fill: '#10B981',
                      fontSize: 10
                    }}
                  />
                  <Bar 
                    dataKey="Scheduled" 
                    fill="#3B82F6" 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1000}
                    animationEasing="ease-out"
                  />
                  <Bar 
                    dataKey="Successful" 
                    fill="#10B981" 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1000}
                    animationEasing="ease-out"
                    animationBegin={300}
                  />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PerformanceChart;
