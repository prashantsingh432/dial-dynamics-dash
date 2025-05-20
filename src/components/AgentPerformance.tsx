
import React from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, PhoneCall, Clock, Calendar, CalendarCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatMinutes } from '@/lib/formatters';

const AgentPerformance: React.FC = () => {
  const { data, filters } = useDashboard();
  const { agentsList } = useDashboard();
  
  // Find the selected agent
  const selectedAgent = agentsList.find(agent => agent.id === filters.agent);
  
  if (!selectedAgent) {
    return null;
  }
  
  // Prepare agent data
  const agentPerformance = data.agentPerformance || {
    totalDials: 0,
    totalConnected: 0,
    talkTime: 0,
    scheduledMeetings: 0,
    successfulMeetings: 0,
    dailyStats: []
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-dashboard-blue/10 text-dashboard-blue flex items-center justify-center text-xl font-semibold">
          {selectedAgent.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{selectedAgent.name}</h2>
          <p className="text-gray-500">Project: {selectedAgent.project}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              Total Dials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{agentPerformance.totalDials.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <PhoneCall className="w-4 h-4 mr-2" />
              Total Connected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{agentPerformance.totalConnected.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Talk Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatMinutes(agentPerformance.talkTime)}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Scheduled Meetings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{agentPerformance.scheduledMeetings}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <CalendarCheck className="w-4 h-4 mr-2" />
              Successful Meetings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{agentPerformance.successfulMeetings}</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Daily Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={agentPerformance.dailyStats}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="dials" fill="#1D4ED8" name="Dials" />
                <Bar dataKey="connects" fill="#3B82F6" name="Connects" />
                <Bar dataKey="meetings" fill="#10B981" name="Meetings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentPerformance;
