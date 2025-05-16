
import React from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const ConversionFunnel: React.FC = () => {
  const { data, isAnimating } = useDashboard();
  const { conversionFunnel } = data;
  
  // Create data for the pie chart (donut)
  const chartData = conversionFunnel.map(item => ({
    name: item.stage,
    value: item.value,
    color: item.color
  }));
  
  // Calculate conversion rates
  const getTotalDials = () => conversionFunnel[0]?.value || 0;
  const getConversionRate = (stage: number) => {
    const totalDials = getTotalDials();
    if (totalDials === 0 || !conversionFunnel[stage]) return 0;
    return ((conversionFunnel[stage].value / totalDials) * 100).toFixed(1);
  };
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
          <p className="font-semibold">{data.name}</p>
          <p className="text-dashboard-blue">{data.value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className={cn(
      "h-full transition-opacity duration-500",
      isAnimating ? 'opacity-0' : 'opacity-100'
    )}>
      <CardHeader>
        <CardTitle className="text-lg">Conversion Funnel</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="h-[250px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-3 mt-4 gap-2 text-center">
          <div className="bg-blue-50 p-2 rounded-md">
            <div className="text-xs text-gray-500">Answer Rate</div>
            <div className="font-semibold text-dashboard-blue">{getConversionRate(1)}%</div>
          </div>
          <div className="bg-blue-50 p-2 rounded-md">
            <div className="text-xs text-gray-500">Schedule Rate</div>
            <div className="font-semibold text-dashboard-blue">{getConversionRate(3)}%</div>
          </div>
          <div className="bg-blue-50 p-2 rounded-md">
            <div className="text-xs text-gray-500">Success Rate</div>
            <div className="font-semibold text-dashboard-blue">{getConversionRate(4)}%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionFunnel;
