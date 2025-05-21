
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

interface AgentDataFormProps {
  agentId: string;
  agentName: string;
  projectId: string;
  onClose: () => void;
  onSuccess: () => void;
}

interface AgentPerformanceData {
  totalDials: number;
  totalConnected: number;
  meetingsScheduled: number;
  meetingsSuccessful: number;
  date: Date;
  recordId?: string;
}

const AgentDataForm: React.FC<AgentDataFormProps> = ({ 
  agentId, 
  agentName, 
  projectId,
  onClose,
  onSuccess
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [formData, setFormData] = useState<AgentPerformanceData>({
    totalDials: 0,
    totalConnected: 0,
    meetingsScheduled: 0,
    meetingsSuccessful: 0,
    date: new Date(),
  });

  // Fetch existing data for the selected date and agent
  const fetchExistingData = async (selectedDate: Date) => {
    try {
      setIsLoading(true);
      
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      
      const { data, error } = await supabase
        .from('daily_performance')
        .select('*')
        .eq('agent_id', agentId)
        .eq('date', formattedDate)
        .single();
      
      if (error && error.code !== 'PGRST116') { // Code for no rows returned
        throw error;
      }
      
      if (data) {
        setFormData({
          totalDials: data.total_dials || 0,
          totalConnected: data.total_connects || 0,
          meetingsScheduled: data.meetings_scheduled || 0,
          meetingsSuccessful: data.meetings_successful || 0,
          date: selectedDate,
          recordId: data.record_id
        });
        
        toast({
          title: "Existing data loaded",
          description: `Showing data for ${agentName} on ${format(selectedDate, 'MMMM d, yyyy')}`,
        });
      } else {
        // Reset form for new data entry
        setFormData({
          totalDials: 0,
          totalConnected: 0,
          meetingsScheduled: 0,
          meetingsSuccessful: 0,
          date: selectedDate,
        });
      }
    } catch (error) {
      console.error('Error fetching existing data:', error);
      toast({
        title: "Error",
        description: "Failed to load existing data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      fetchExistingData(selectedDate);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      
      const formattedDate = format(date, 'yyyy-MM-dd');
      
      // Use the upsert_daily_performance function we created
      const { data, error } = await supabase.rpc('upsert_daily_performance', {
        p_agent_id: agentId,
        p_date: formattedDate,
        p_total_dials: formData.totalDials,
        p_total_connects: formData.totalConnected,
        p_meetings_scheduled: formData.meetingsScheduled,
        p_meetings_successful: formData.meetingsSuccessful,
        p_project_id: projectId
      });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Performance data for ${agentName} on ${format(date, 'MMMM d, yyyy')} has been saved.`,
      });
      
      onSuccess();
      
    } catch (error) {
      console.error('Error saving agent data:', error);
      toast({
        title: "Error",
        description: "Failed to save agent performance data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {formData.recordId ? 'Edit' : 'Add'} Performance Data
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{agentName}</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col">
          <label htmlFor="totalDials" className="mb-1 text-sm font-medium text-gray-700">
            Total Dials
          </label>
          <input
            type="number"
            id="totalDials"
            name="totalDials"
            value={formData.totalDials}
            onChange={handleInputChange}
            min="0"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dashboard-blue"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="totalConnected" className="mb-1 text-sm font-medium text-gray-700">
            Total Connected
          </label>
          <input
            type="number"
            id="totalConnected"
            name="totalConnected"
            value={formData.totalConnected}
            onChange={handleInputChange}
            min="0"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dashboard-blue"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="meetingsScheduled" className="mb-1 text-sm font-medium text-gray-700">
            Scheduled Meetings
          </label>
          <input
            type="number"
            id="meetingsScheduled"
            name="meetingsScheduled"
            value={formData.meetingsScheduled}
            onChange={handleInputChange}
            min="0"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dashboard-blue"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="meetingsSuccessful" className="mb-1 text-sm font-medium text-gray-700">
            Successful Meetings
          </label>
          <input
            type="number"
            id="meetingsSuccessful"
            name="meetingsSuccessful"
            value={formData.meetingsSuccessful}
            onChange={handleInputChange}
            min="0"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dashboard-blue"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : (formData.recordId ? 'Update' : 'Submit')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AgentDataForm;
