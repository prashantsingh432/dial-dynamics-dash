import React from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

const TopPerformers: React.FC = () => {
  const { data, isAnimating } = useDashboard();
  const { topPerformers } = data;
  
  // Get top performer (first in the array)
  const starPerformer = topPerformers[0];
  
  // Regular performers (rest of the array)
  const regularPerformers = topPerformers.slice(1);
  
  return (
    <Card className={cn(
      "h-full transition-opacity duration-500",
      isAnimating ? 'opacity-0' : 'opacity-100'
    )}>
      <CardHeader>
        <CardTitle className="text-lg">Top Performers</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Star performer */}
        {starPerformer && (
          <div className="bg-blue-50 rounded-lg p-4 relative overflow-hidden animate-scale-in">
            {/* Star badge */}
            <div className="absolute top-0 right-0 bg-yellow-400 text-white py-1 px-3 flex items-center rounded-bl-lg">
              <Star className="h-4 w-4 mr-1 text-white fill-yellow-400" />
              <span className="text-xs font-semibold">Star Performer</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-dashboard-blue">
                <img 
                  src={starPerformer.avatar} 
                  alt={starPerformer.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="ml-4">
                <h3 className="font-semibold text-lg">{starPerformer.name}</h3>
                <p className="text-sm text-gray-500">{starPerformer.project}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500">Success Rate</p>
                <p className="font-semibold text-dashboard-blue">{starPerformer.successRate.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Meetings</p>
                <p className="font-semibold text-dashboard-blue">{starPerformer.meetings}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Dials</p>
                <p className="font-semibold text-dashboard-blue">{starPerformer.dials}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Other top performers */}
        <div className="space-y-3">
          {regularPerformers.map((performer, index) => (
            <div 
              key={performer.id} 
              className={cn(
                "flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
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
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopPerformers;
