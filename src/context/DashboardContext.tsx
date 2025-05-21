
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Define types for our dashboard data
export type Project = 'SIS NAG' | 'DTSS' | 'AngerBox' | 'LivingDSS' | 'Siri' | 'RatherUnique' | 'Sprockets' | 'All';
export type TimeFrame = 'Daily' | 'Weekly' | 'Monthly';
export type Agent = string | null;

export type SecondaryTimeFrame = string;

export interface KPI {
  current: number;
  previous: number;
  percentChange: number;
}

export interface KPIData {
  totalDials: KPI;
  totalConnected: KPI;
  totalTalkTime: KPI;
  scheduledMeetings: KPI;
  successfulMeetings: KPI;
}

export interface TopPerformer {
  id: string;
  name: string;
  avatar: string;
  project: string;
  successRate: number;
  meetings: number;
  dials: number;
}

export interface ChartData {
  labels: string[];
  scheduled: number[];
  successful: number[];
}

export interface ProjectPerformance {
  id: string;
  name: string;
  dials: number;
  connected: number;
  talkTime: number;
  scheduledMeetings: number;
  successfulMeetings: number;
  successRate: number;
}

export interface FunnelData {
  stage: string;
  value: number;
  color: string;
}

export interface AgentDailyStat {
  date: string;
  dials: number;
  connects: number;
  meetings: number;
}

export interface AgentPerformanceData {
  totalDials: number;
  totalConnected: number;
  talkTime: number;
  scheduledMeetings: number;
  successfulMeetings: number;
  dailyStats: AgentDailyStat[];
}

export interface DashboardData {
  kpis: KPIData;
  topPerformers: TopPerformer[];
  performanceChart: ChartData;
  projectPerformance: ProjectPerformance[];
  conversionFunnel: FunnelData[];
  agentPerformance?: AgentPerformanceData;
}

export interface DashboardFilters {
  timeFrame: TimeFrame;
  secondaryTimeFrame: SecondaryTimeFrame;
  project: Project;
  agent: Agent;
}

export interface DashboardContextType {
  data: DashboardData;
  filteredData: DashboardData;  // New field for project-filtered data
  filters: DashboardFilters;
  loading: boolean;
  dataAvailable: boolean;
  setTimeFrame: (timeFrame: TimeFrame) => void;
  setSecondaryTimeFrame: (secondaryTimeFrame: SecondaryTimeFrame) => void;
  setProject: (project: Project) => void;
  setAgent: (agent: Agent) => void;
  resetMonth: () => void;
  isAnimating: boolean;
  agentsList: { id: string; name: string; project: string }[];
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

// Provider component
export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<DashboardFilters>({
    timeFrame: 'Monthly',
    secondaryTimeFrame: 'May',
    project: 'All',
    agent: null,
  });
  
  const [data, setData] = useState<DashboardData>({
    kpis: {
      totalDials: { current: 0, previous: 0, percentChange: 0 },
      totalConnected: { current: 0, previous: 0, percentChange: 0 },
      totalTalkTime: { current: 0, previous: 0, percentChange: 0 },
      scheduledMeetings: { current: 0, previous: 0, percentChange: 0 },
      successfulMeetings: { current: 0, previous: 0, percentChange: 0 },
    },
    topPerformers: [],
    performanceChart: { labels: [], scheduled: [], successful: [] },
    projectPerformance: [],
    conversionFunnel: [],
  });
  
  const [loading, setLoading] = useState(true);
  const [dataAvailable, setDataAvailable] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [agentsList, setAgentsList] = useState<{ id: string; name: string; project: string }[]>([]);
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  
  // Filter data based on selected project
  const filteredData = useMemo(() => {
    if (filters.project === 'All') {
      return data;
    }
    
    // Find the selected project's performance data
    const selectedProject = data.projectPerformance.find(
      project => project.name === filters.project
    );
    
    if (!selectedProject) {
      return data;
    }
    
    // Filter top performers from the selected project
    const projectTopPerformers = data.topPerformers.filter(
      performer => performer.project === filters.project
    );
    
    // Create project-specific KPIs
    const projectKPIs: KPIData = {
      totalDials: {
        current: selectedProject.dials,
        previous: 0, // We don't have previous period data for individual projects
        percentChange: 0, // Placeholder - would need to calculate this properly
      },
      totalConnected: {
        current: selectedProject.connected,
        previous: 0,
        percentChange: 0,
      },
      totalTalkTime: {
        current: selectedProject.talkTime,
        previous: 0,
        percentChange: 0,
      },
      scheduledMeetings: {
        current: selectedProject.scheduledMeetings,
        previous: 0,
        percentChange: 0,
      },
      successfulMeetings: {
        current: selectedProject.successfulMeetings,
        previous: 0,
        percentChange: 0,
      },
    };
    
    // For the charts, ideally we'd have project-specific chart data
    // For now, just use the overall chart data as a placeholder
    
    return {
      ...data,
      kpis: projectKPIs,
      topPerformers: projectTopPerformers,
      projectPerformance: [selectedProject],
    };
  }, [data, filters.project]);
  
  // Fetch agents list from Supabase
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const { data: agentsData, error } = await supabase
          .from('agents')
          .select(`
            agent_id,
            agent_name,
            projects(project_name)
          `);
        
        if (error) throw error;
        
        const formattedAgents = agentsData.map(agent => ({
          id: agent.agent_id,
          name: agent.agent_name,
          project: agent.projects.project_name,
        }));
        
        setAgentsList(formattedAgents);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };
    
    fetchAgents();
  }, []);
  
  // Check if data is available for the selected month
  const checkDataAvailability = async (month: string) => {
    try {
      const { count, error } = await supabase
        .from('daily_performance')
        .select('*', { count: 'exact', head: true })
        .eq('month', month);
      
      if (error) throw error;
      
      return count && count > 0;
    } catch (error) {
      console.error('Error checking data availability:', error);
      return false;
    }
  };
  
  // Fetch KPIs from Supabase
  const fetchKPIs = async () => {
    try {
      const { data: kpisData, error } = await supabase
        .from('dashboard_kpis')
        .select('*')
        .single();
      
      if (error) {
        console.error('Error fetching KPIs:', error);
        return null;
      }
      
      return {
        totalDials: {
          current: kpisData.total_dials,
          previous: 9097,
          percentChange: kpisData.dials_percent_change,
        },
        totalConnected: {
          current: kpisData.total_connected,
          previous: 3560,
          percentChange: kpisData.connected_percent_change,
        },
        totalTalkTime: {
          current: kpisData.total_talk_time_hours,
          previous: 5199,
          percentChange: kpisData.talk_time_percent_change,
        },
        scheduledMeetings: {
          current: kpisData.meetings_scheduled,
          previous: 577,
          percentChange: kpisData.scheduled_percent_change,
        },
        successfulMeetings: {
          current: kpisData.meetings_successful,
          previous: 138,
          percentChange: kpisData.successful_percent_change,
        },
      };
    } catch (error) {
      console.error('Error in fetchKPIs:', error);
      return null;
    }
  };
  
  // Fetch agent performance data
  const fetchAgentPerformance = async (agentId: string) => {
    try {
      // Get agent's daily performance data
      const { data: agentDailyData, error: dailyError } = await supabase
        .from('daily_performance')
        .select(`
          date,
          total_dials,
          total_connects,
          total_talktime,
          meetings_scheduled,
          meetings_successful
        `)
        .eq('agent_id', agentId)
        .eq('month', filters.secondaryTimeFrame)
        .order('date');
      
      if (dailyError) throw dailyError;
      
      if (!agentDailyData || agentDailyData.length === 0) {
        return null;
      }
      
      // Calculate aggregated metrics
      const totalDials = agentDailyData.reduce((sum, day) => sum + (day.total_dials || 0), 0);
      const totalConnected = agentDailyData.reduce((sum, day) => sum + (day.total_connects || 0), 0);
      const totalTalkTimeMinutes = agentDailyData.reduce((sum, day) => {
        if (!day.total_talktime) return sum;
        const talkTimeString = String(day.total_talktime);
        const parts = talkTimeString.split(':');
        if (parts.length !== 3) return sum;
        const hours = parseInt(parts[0]) || 0;
        const minutes = parseInt(parts[1]) || 0;
        const seconds = parseInt(parts[2]) || 0;
        return sum + (hours * 60 + minutes + seconds / 60);
      }, 0);
      
      const talkTimeHours = Math.floor(totalTalkTimeMinutes / 60);
      const talkTimeMinutes = totalTalkTimeMinutes % 60;
      const scheduledMeetings = agentDailyData.reduce((sum, day) => sum + (day.meetings_scheduled || 0), 0);
      const successfulMeetings = agentDailyData.reduce((sum, day) => sum + (day.meetings_successful || 0), 0);
      
      // Format daily stats for chart
      const dailyStats = agentDailyData.map(day => ({
        date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        dials: day.total_dials || 0,
        connects: day.total_connects || 0,
        meetings: (day.meetings_scheduled || 0) + (day.meetings_successful || 0),
      }));
      
      return {
        totalDials,
        totalConnected,
        talkTime: talkTimeMinutes,
        scheduledMeetings,
        successfulMeetings,
        dailyStats,
      };
    } catch (error) {
      console.error('Error in fetchAgentPerformance:', error);
      return null;
    }
  };
  
  // Fetch weekly performance data for chart
  const fetchPerformanceChart = async () => {
    try {
      const { data: chartData, error } = await supabase
        .from('weekly_performance_chart')
        .select('*')
        .order('week_number');
      
      if (error) {
        console.error('Error fetching chart data:', error);
        return null;
      }
      
      const labels = chartData.map(item => `Week ${item.week_number}`);
      const scheduled = chartData.map(item => item.scheduled_meetings);
      const successful = chartData.map(item => item.successful_meetings);
      
      return { labels, scheduled, successful };
    } catch (error) {
      console.error('Error in fetchPerformanceChart:', error);
      return null;
    }
  };
  
  // Fetch project performance data
  const fetchProjectPerformance = async () => {
    try {
      const { data: projectData, error } = await supabase
        .from('project_performance')
        .select('*');
      
      if (error) {
        console.error('Error fetching project performance:', error);
        return null;
      }
      
      return projectData.map(project => ({
        id: project.project_id,
        name: project.project_name,
        dials: project.total_dials,
        connected: project.total_connects,
        talkTime: project.total_talk_time_minutes,
        scheduledMeetings: project.meetings_scheduled,
        successfulMeetings: project.meetings_successful,
        successRate: project.success_rate,
      }));
    } catch (error) {
      console.error('Error in fetchProjectPerformance:', error);
      return null;
    }
  };
  
  // Fetch conversion funnel data
  const fetchConversionFunnel = async () => {
    try {
      const { data: funnelData, error } = await supabase
        .from('conversion_funnel')
        .select('*');
      
      if (error) {
        console.error('Error fetching conversion funnel:', error);
        return null;
      }
      
      return funnelData.map(item => ({
        stage: item.stage,
        value: item.value,
        color: item.color,
      }));
    } catch (error) {
      console.error('Error in fetchConversionFunnel:', error);
      return null;
    }
  };
  
  // Fetch top performers data
  const fetchTopPerformers = async () => {
    try {
      const { data: performersData, error } = await supabase
        .from('top_performers')
        .select('*');
      
      if (error) {
        console.error('Error fetching top performers:', error);
        return null;
      }
      
      return performersData.map((performer, index) => ({
        id: performer.agent_id,
        name: performer.agent_name,
        avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
        project: performer.project_name,
        successRate: performer.success_rate,
        meetings: performer.successful_meetings,
        dials: performer.total_dials,
      }));
    } catch (error) {
      console.error('Error in fetchTopPerformers:', error);
      return null;
    }
  };
  
  // Update data when filters change
  useEffect(() => {
    const updateData = async () => {
      setLoading(true);
      setIsAnimating(true);
      
      try {
        // Check if data exists for the selected month
        const isDataAvailable = await checkDataAvailability(filters.secondaryTimeFrame);
        setDataAvailable(isDataAvailable);
        
        if (!isDataAvailable) {
          setLoading(false);
          setIsAnimating(false);
          return;
        }
        
        let agentPerformanceData = undefined;
        
        // Fetch agent performance if an agent is selected
        if (filters.agent) {
          agentPerformanceData = await fetchAgentPerformance(filters.agent);
        }
        
        const [kpis, performanceChart, projectPerformance, conversionFunnel, topPerformers] = await Promise.all([
          fetchKPIs(),
          fetchPerformanceChart(),
          fetchProjectPerformance(),
          fetchConversionFunnel(),
          fetchTopPerformers(),
        ]);
        
        setData({
          kpis: kpis || data.kpis,
          performanceChart: performanceChart || data.performanceChart,
          projectPerformance: projectPerformance || data.projectPerformance,
          conversionFunnel: conversionFunnel || data.conversionFunnel,
          topPerformers: topPerformers || data.topPerformers,
          agentPerformance: agentPerformanceData,
        });
      } catch (error) {
        console.error('Error updating dashboard data:', error);
      } finally {
        setLoading(false);
        
        // Keep animation state active for a bit longer to ensure transitions complete
        setTimeout(() => setIsAnimating(false), 300);
      }
    };
    
    updateData();
  }, [filters]);
  
  // Filter handlers
  const setTimeFrame = (timeFrame: TimeFrame) => {
    setFilters(prev => ({ ...prev, timeFrame }));
  };
  
  const setSecondaryTimeFrame = (secondaryTimeFrame: SecondaryTimeFrame) => {
    setFilters(prev => ({ ...prev, secondaryTimeFrame }));
  };
  
  const setProject = (project: Project) => {
    setFilters(prev => ({ ...prev, project, agent: null }));
  };
  
  const setAgent = (agent: Agent) => {
    setFilters(prev => ({ ...prev, agent }));
  };
  
  // Reset to default month (May)
  const resetMonth = () => {
    setFilters(prev => ({ ...prev, secondaryTimeFrame: 'May' }));
  };
  
  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };
  
  return (
    <DashboardContext.Provider
      value={{
        data,
        filteredData,
        filters,
        loading,
        dataAvailable,
        setTimeFrame,
        setSecondaryTimeFrame,
        setProject,
        setAgent,
        resetMonth,
        isAnimating,
        agentsList,
        sidebarCollapsed,
        toggleSidebar,
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Create the context
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Hook to use the dashboard context
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
