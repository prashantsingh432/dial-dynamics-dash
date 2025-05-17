
import React, { useState } from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';
import { motion } from 'framer-motion';

const ConversionFunnel: React.FC = () => {
  const { data, isAnimating } = useDashboard();
  const { conversionFunnel } = data;
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  
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
          <p className="text-xs text-gray-500 mt-1">
            {((data.value / getTotalDials()) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  // Active shape for hover effect
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.8}
        />
      </g>
    );
  };
  
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const onPieLeave = () => {
    setActiveIndex(undefined);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className={cn(
        "h-full transition-all duration-500 bg-white border-0 shadow-sm hover:shadow-md",
        isAnimating ? 'opacity-0' : 'opacity-100'
      )}>
        <CardHeader className="border-b pb-3">
          <CardTitle className="text-lg font-semibold text-gray-800">Conversion Funnel</CardTitle>
        </CardHeader>
        
        <CardContent className="pt-5">
          <div className="h-[220px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  animationBegin={200}
                  animationDuration={800}
                  animationEasing="ease-out"
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      stroke="white" 
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-3 mt-4 gap-2">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <div className="text-xs font-medium text-gray-500">Answer Rate</div>
              <div className="font-semibold text-blue-700 text-lg">{getConversionRate(1)}%</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
              <div className="text-xs font-medium text-gray-500">Schedule Rate</div>
              <div className="font-semibold text-purple-700 text-lg">{getConversionRate(3)}%</div>
            </div>
            <div className="bg-cyan-50 p-3 rounded-lg border border-cyan-100">
              <div className="text-xs font-medium text-gray-500">Success Rate</div>
              <div className="font-semibold text-cyan-700 text-lg">{getConversionRate(4)}%</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ConversionFunnel;
