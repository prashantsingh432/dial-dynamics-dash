
import React, { useState } from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type ChartTimeFrame = 'Weekly' | 'Monthly' | 'Quarterly' | 'Yearly';

const PerformanceChart: React.FC = () => {
  const { data, isAnimating } = useDashboard();
  const [chartTimeFrame, setChartTimeFrame] = useState<ChartTimeFrame>('Weekly');
  
  // Transform data for chart
  const chartData = data.performanceChart.labels.map((label, index) => ({
    name: label,
    Scheduled: data.performanceChart.scheduled[index],
    Successful: data.performanceChart.successful[index]
  }));
  
  // Time frame options for the chart
  const timeFrameOptions: ChartTimeFrame[] = ['Weekly', 'Monthly', 'Quarterly', 'Yearly'];
  
  return (
    <Card className={cn(
      "h-full transition-opacity duration-500",
      isAnimating ? 'opacity-0' : 'opacity-100'
    )}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Performance Comparison</CardTitle>
        
        <div className="flex space-x-1 bg-gray-100 rounded-md p-1">
          {timeFrameOptions.map((option) => (
            <Button
              key={option}
              variant={chartTimeFrame === option ? "default" : "ghost"}
              size="sm"
              onClick={() => setChartTimeFrame(option)}
              className={cn(
                "text-xs px-2 py-1 h-7 transition-all duration-300",
                chartTimeFrame === option
                  ? "bg-white shadow-sm"
                  : "hover:bg-gray-200"
              )}
            >
              {option}
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="pt-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Scheduled" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Successful" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
