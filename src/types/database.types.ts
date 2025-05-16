
export interface Project {
  project_id: string;
  project_name: string;
  created_at: string;
}

export interface Agent {
  agent_id: string;
  agent_name: string;
  project_id: string;
  created_at: string;
  projects?: Project;
}

export interface DailyPerformance {
  record_id: string;
  date: string;
  week_number: number;
  month: string;
  agent_id: string;
  total_dials: number;
  total_connects: number;
  total_pitches: number | null;
  total_talktime: string;
  meetings_scheduled: number;
  meetings_successful: number;
  project_id: string;
}

export interface DashboardKPI {
  total_dials: number;
  total_connected: number;
  total_talk_time_hours: number;
  meetings_scheduled: number;
  meetings_successful: number;
  dials_percent_change: number;
  connected_percent_change: number;
  talk_time_percent_change: number;
  scheduled_percent_change: number;
  successful_percent_change: number;
}

export interface WeeklyPerformance {
  week_number: number;
  scheduled_meetings: number;
  successful_meetings: number;
}

export interface ProjectPerformance {
  project_id: string;
  project_name: string;
  total_dials: number;
  total_connects: number;
  total_talk_time_minutes: number;
  meetings_scheduled: number;
  meetings_successful: number;
  success_rate: number;
}

export interface ConversionFunnel {
  stage: string;
  value: number;
  color: string;
}

export interface TopPerformer {
  agent_id: string;
  agent_name: string;
  project_name: string;
  total_dials: number;
  success_rate: number;
  successful_meetings: number;
}
