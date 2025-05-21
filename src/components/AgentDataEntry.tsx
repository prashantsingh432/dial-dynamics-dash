import React, { useState, useEffect } from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import AgentDataForm from '@/components/AgentDataForm';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Agent {
  id: string;
  name: string;
  projectId: string;
}

const AgentDataEntry: React.FC = () => {
  const { filters } = useDashboard();
  const { toast } = useToast();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (filters.project === 'All') {
      setAgents([]);
      setLoading(false);
      return;
    }

    const fetchAgents = async () => {
      try {
        setLoading(true);
        
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .select('project_id')
          .eq('project_name', filters.project)
          .single();
        
        if (projectError) throw projectError;
        
        const projectId = projectData.project_id;
        
        const { data: agentsData, error: agentsError } = await supabase
          .from('agents')
          .select(`
            agent_id,
            agent_name,
            project_id
          `)
          .eq('project_id', projectId);
        
        if (agentsError) throw agentsError;
        
        const formattedAgents = agentsData.map(agent => ({
          id: agent.agent_id,
          name: agent.agent_name,
          projectId: agent.project_id
        }));
        
        setAgents(formattedAgents);
      } catch (error) {
        console.error('Error fetching agents:', error);
        toast({
          title: "Error",
          description: "Failed to load agents for this project.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchAgents();
  }, [filters.project, toast]);

  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedAgent(null);
  };

  const handleDataSubmitSuccess = () => {
    // Keep the form open but show success message
    // The toast is shown in the form component itself
  };

  if (filters.project === 'All') {
    return (
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <p className="text-center text-gray-500">
          Please select a specific project to manage agent data.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {filters.project} Team Data Entry
        </h2>
        <Button 
          size="sm" 
          variant="outline"
          className="flex items-center"
          onClick={() => {
            if (agents.length > 0) {
              handleAgentSelect(agents[0]);
            } else {
              toast({
                title: "No agents available",
                description: "There are no agents assigned to this project.",
                variant: "destructive",
              });
            }
          }}
          disabled={agents.length === 0}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Data
        </Button>
      </div>
      
      {loading ? (
        <div className="text-center py-6">
          <p className="text-gray-500">Loading agents...</p>
        </div>
      ) : agents.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-500">No agents found for this project.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map(agent => (
            <div 
              key={agent.id}
              onClick={() => handleAgentSelect(agent)}
              className="p-4 border rounded-md cursor-pointer hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-dashboard-blue text-white flex items-center justify-center font-semibold">
                  {agent.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-800">{agent.name}</h3>
                  <p className="text-sm text-gray-500">Click to enter data</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
        <SheetContent className="overflow-y-auto">
          {selectedAgent && (
            <AgentDataForm
              agentId={selectedAgent.id}
              agentName={selectedAgent.name}
              projectId={selectedAgent.projectId}
              onClose={handleFormClose}
              onSuccess={handleDataSubmitSuccess}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AgentDataEntry;
