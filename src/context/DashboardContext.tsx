import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types for our dashboard data
export type Project = 'SS' | 'AngerBox' | 'LivingDSS' | 'Siri' | 'RatherUnique' | 'Sprockets' | 'All';
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
  project: Project;
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
  name: Project;
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

export interface DashboardData {
  kpis: KPIData;
  topPerformers: TopPerformer[];
  performanceChart: ChartData;
  projectPerformance: ProjectPerformance[];
  conversionFunnel: FunnelData[];
}

export interface DashboardFilters {
  timeFrame: TimeFrame;
  secondaryTimeFrame: SecondaryTimeFrame;
  project: Project;
  agent: Agent;
}

export interface DashboardContextType {
  data: DashboardData;
  filters: DashboardFilters;
  loading: boolean;
  setTimeFrame: (timeFrame: TimeFrame) => void;
  setSecondaryTimeFrame: (secondaryTimeFrame: SecondaryTimeFrame) => void;
  setProject: (project: Project) => void;
  setAgent: (agent: Agent) => void;
  isAnimating: boolean;
  agentsList: { id: string; name: string; project: Project }[];
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

// Create mock data generator functions
const generateMockKPIs = (): KPIData => ({
  totalDials: {
    current: Math.floor(Math.random() * 5000) + 5000,
    previous: Math.floor(Math.random() * 5000) + 5000,
    percentChange: 0, // Will be calculated
  },
  totalConnected: {
    current: Math.floor(Math.random() * 2000) + 2000,
    previous: Math.floor(Math.random() * 2000) + 2000,
    percentChange: 0,
  },
  totalTalkTime: {
    current: Math.floor(Math.random() * 3000) + 3000,
    previous: Math.floor(Math.random() * 3000) + 3000,
    percentChange: 0,
  },
  scheduledMeetings: {
    current: Math.floor(Math.random() * 500) + 300,
    previous: Math.floor(Math.random() * 500) + 300,
    percentChange: 0,
  },
  successfulMeetings: {
    current: Math.floor(Math.random() * 300) + 100,
    previous: Math.floor(Math.random() * 300) + 100,
    percentChange: 0,
  },
});

// Calculate percent changes
const calculatePercentChanges = (kpis: KPIData): KPIData => {
  const calculated = { ...kpis };
  for (const key of Object.keys(calculated) as Array<keyof KPIData>) {
    calculated[key].percentChange = 
      ((calculated[key].current - calculated[key].previous) / calculated[key].previous) * 100;
  }
  return calculated;
};

// Mock agents list
const mockAgents = [
  { id: '1', name: 'Harshit Kumar', project: 'SS' as Project },
  { id: '2', name: 'Priya Sharma', project: 'AngerBox' as Project },
  { id: '3', name: 'Raj Verma', project: 'LivingDSS' as Project },
  { id: '4', name: 'Ankit Patel', project: 'Siri' as Project },
  { id: '5', name: 'Neha Singh', project: 'RatherUnique' as Project },
  { id: '6', name: 'Vikram Chatterjee', project: 'Sprockets' as Project },
  { id: '7', name: 'Sunita Gupta', project: 'SS' as Project },
  { id: '8', name: 'Amit Kapoor', project: 'AngerBox' as Project },
];

// Top performers mock data
const generateTopPerformers = (): TopPerformer[] => mockAgents.map((agent, index) => ({
  ...agent,
  avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
  successRate: Math.floor(Math.random() * 30) + 70,
  meetings: Math.floor(Math.random() * 50) + 10,
  dials: Math.floor(Math.random() * 300) + 200,
})).sort((a, b) => b.successRate - a.successRate).slice(0, 5);

// Generate chart data based on time frame
const generateChartData = (timeFrame: TimeFrame): ChartData => {
  let labels: string[] = [];
  
  switch (timeFrame) {
    case 'Daily':
      labels = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];
      break;
    case 'Weekly':
      labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
      break;
    case 'Monthly':
      labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      break;
  }
  
  return {
    labels,
    scheduled: labels.map(() => Math.floor(Math.random() * 50) + 30),
    successful: labels.map(() => Math.floor(Math.random() * 30) + 10),
  };
};

// Project performance data
const generateProjectPerformance = (): ProjectPerformance[] => {
  const projects: Project[] = ['SS', 'AngerBox', 'LivingDSS', 'Siri', 'RatherUnique', 'Sprockets'];
  
  return projects.map((project, index) => {
    const dials = Math.floor(Math.random() * 2000) + 1000;
    const connected = Math.floor(dials * (Math.random() * 0.3 + 0.4)); // 40-70% connection rate
    const scheduledMeetings = Math.floor(connected * (Math.random() * 0.2 + 0.1)); // 10-30% schedule rate
    const successfulMeetings = Math.floor(scheduledMeetings * (Math.random() * 0.4 + 0.5)); // 50-90% success rate
    
    return {
      id: (index + 1).toString(),
      name: project,
      dials,
      connected,
      talkTime: Math.floor(connected * (Math.random() * 3 + 2)), // 2-5 minutes per connection
      scheduledMeetings,
      successfulMeetings,
      successRate: (successfulMeetings / scheduledMeetings) * 100,
    };
  });
};

// Conversion funnel data
const generateFunnelData = (): FunnelData[] => {
  const dials = Math.floor(Math.random() * 3000) + 7000;
  const answered = Math.floor(dials * (Math.random() * 0.3 + 0.4)); // 40-70%
  const qualified = Math.floor(answered * (Math.random() * 0.4 + 0.3)); // 30-70%
  const scheduled = Math.floor(qualified * (Math.random() * 0.5 + 0.3)); // 30-80%
  const successful = Math.floor(scheduled * (Math.random() * 0.4 + 0.5)); // 50-90%
  
  return [
    { stage: 'Dials', value: dials, color: '#3B82F6' },
    { stage: 'Answered', value: answered, color: '#60A5FA' },
    { stage: 'Qualified', value: qualified, color: '#93C5FD' },
    { stage: 'Scheduled', value: scheduled, color: '#BFDBFE' },
    { stage: 'Successful', value: successful, color: '#DBEAFE' },
  ];
};

// Create the context
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Provider component
export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<DashboardFilters>({
    timeFrame: 'Monthly',
    secondaryTimeFrame: 'August',
    project: 'All',
    agent: null,
  });
  
  const [data, setData] = useState<DashboardData>({
    kpis: calculatePercentChanges(generateMockKPIs()),
    topPerformers: generateTopPerformers(),
    performanceChart: generateChartData('Monthly'),
    projectPerformance: generateProjectPerformance(),
    conversionFunnel: generateFunnelData(),
  });
  
  const [loading, setLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Update data when filters change
  useEffect(() => {
    const updateData = async () => {
      setLoading(true);
      setIsAnimating(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newData: DashboardData = {
        kpis: calculatePercentChanges(generateMockKPIs()),
        topPerformers: generateTopPerformers(),
        performanceChart: generateChartData(filters.timeFrame),
        projectPerformance: generateProjectPerformance(),
        conversionFunnel: generateFunnelData(),
      };
      
      setData(newData);
      setLoading(false);
      
      // Keep animation state active for a bit longer to ensure transitions complete
      setTimeout(() => setIsAnimating(false), 300);
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
  
  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };
  
  return (
    <DashboardContext.Provider
      value={{
        data,
        filters,
        loading,
        setTimeFrame,
        setSecondaryTimeFrame,
        setProject,
        setAgent,
        isAnimating,
        agentsList: mockAgents,
        sidebarCollapsed,
        toggleSidebar,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Hook to use the dashboard context
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
