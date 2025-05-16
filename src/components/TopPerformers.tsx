import React from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Star, ChevronRight, Award, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TopPerformers: React.FC = () => {
  const { data, isAnimating } = useDashboard();
  const { topPerformers } = data;
  
  // Get top performer (first in the array)
  const starPerformer = topPerformers[0];
  
  // Regular performers (rest of the array)
  const regularPerformers = topPerformers.slice(1);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card className={cn(
        "h-full transition-all duration-500 enhanced-card",
        isAnimating ? 'opacity-0' : 'opacity-100'
      )}>
        <CardHeader>
          <CardTitle className="text-lg font-poppins text-dashboard-blue flex items-center">
            <Award className="mr-2 h-5 w-5 text-dashboard-amber" />
            Top Performers
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-5">
          {/* Star performer */}
          <AnimatePresence>
            {starPerformer && (
              <motion.div 
                className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-5 relative overflow-hidden border border-blue-200"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: 0.2
                }}
              >
                {/* Star badge */}
                <div className="absolute top-0 right-0 bg-yellow-400 text-white py-1 px-3 flex items-center rounded-bl-lg shadow-md">
                  <Star className="h-4 w-4 mr-1 text-white fill-yellow-400" />
                  <span className="text-xs font-semibold">Star Performer</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-dashboard-blue shadow-inner">
                    <img 
                      src={starPerformer.avatar} 
                      alt={starPerformer.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">{starPerformer.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center">
                      {starPerformer.project}
                      <TrendingUp className="ml-2 h-4 w-4 text-dashboard-green" />
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="bg-white rounded-lg p-2 shadow-sm">
                    <p className="text-xs text-gray-500">Success Rate</p>
                    <p className="font-semibold text-dashboard-blue text-lg">{starPerformer.successRate.toFixed(1)}%</p>
                  </div>
                  <div className="bg-white rounded-lg p-2 shadow-sm">
                    <p className="text-xs text-gray-500">Meetings</p>
                    <p className="font-semibold text-dashboard-blue text-lg">{starPerformer.meetings}</p>
                  </div>
                  <div className="bg-white rounded-lg p-2 shadow-sm">
                    <p className="text-xs text-gray-500">Dials</p>
                    <p className="font-semibold text-dashboard-blue text-lg">{starPerformer.dials}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Other top performers */}
          <div className="space-y-3">
            {regularPerformers.map((performer, index) => (
              <motion.div 
                key={performer.id} 
                className={cn(
                  "flex items-center p-4 rounded-xl hover:bg-gray-50 transition-all",
                  "border border-transparent hover:border-gray-200"
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.3,
                  delay: 0.3 + (index * 0.1)
                }}
                whileHover={{ x: 5 }}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-blue-200">
                  <img 
                    src={performer.avatar} 
                    alt={performer.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-grow">
                  <h4 className="font-medium">{performer.name}</h4>
                  <p className="text-xs text-gray-500">{performer.project}</p>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-semibold text-dashboard-blue">{performer.successRate.toFixed(1)}%</p>
                  <p className="text-xs text-gray-500">{performer.meetings} meetings</p>
                </div>
                
                <ChevronRight className="ml-2 h-4 w-4 text-gray-400" />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TopPerformers;
