
import React, { useState } from 'react';
import { useDashboard, TimeFrame } from '@/context/DashboardContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

const TimePeriodFilter: React.FC = () => {
  const { filters, setTimeFrame, setSecondaryTimeFrame } = useDashboard();
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Time period options
  const timePeriods: TimeFrame[] = ['Daily', 'Weekly', 'Monthly'];
  
  // Handle time period change
  const handleTimePeriodChange = (period: TimeFrame) => {
    setTimeFrame(period);
  };
  
  // Render the appropriate secondary filter based on the selected time period
  const renderSecondaryFilter = () => {
    switch (filters.timeFrame) {
      case 'Daily':
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className={cn(
                  "ml-4 w-[180px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  setDate(newDate);
                  if (newDate) {
                    setSecondaryTimeFrame(format(newDate, 'PPP'));
                  }
                }}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        );
        
      case 'Weekly':
        return (
          <div className="ml-4 flex space-x-2">
            {['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'].map((week) => (
              <Button
                key={week}
                variant={filters.secondaryTimeFrame === week ? "default" : "outline"}
                size="sm"
                onClick={() => setSecondaryTimeFrame(week)}
              >
                {week}
              </Button>
            ))}
          </div>
        );
        
      case 'Monthly':
        return (
          <div className="ml-4 flex space-x-2 overflow-auto pb-2" style={{ maxWidth: '500px' }}>
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
              <Button
                key={month}
                variant={filters.secondaryTimeFrame === month ? "default" : "outline"}
                size="sm"
                onClick={() => setSecondaryTimeFrame(month)}
              >
                {month}
              </Button>
            ))}
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="flex items-center">
      <div className="flex space-x-1 bg-gray-100 rounded-md p-1">
        {timePeriods.map((period) => (
          <Button
            key={period}
            variant={filters.timeFrame === period ? "default" : "ghost"}
            size="sm"
            onClick={() => handleTimePeriodChange(period)}
            className={cn(
              "transition-all duration-300",
              filters.timeFrame === period
                ? "bg-white shadow-sm"
                : "hover:bg-gray-200"
            )}
          >
            {period}
          </Button>
        ))}
      </div>
      
      {renderSecondaryFilter()}
    </div>
  );
};

export default TimePeriodFilter;
