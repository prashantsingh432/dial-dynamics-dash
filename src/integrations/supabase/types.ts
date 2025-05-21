export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agents: {
        Row: {
          agent_id: string
          agent_name: string
          created_at: string
          project_id: string
        }
        Insert: {
          agent_id?: string
          agent_name: string
          created_at?: string
          project_id: string
        }
        Update: {
          agent_id?: string
          agent_name?: string
          created_at?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agents_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_performance"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "agents_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
        ]
      }
      daily_performance: {
        Row: {
          agent_id: string
          date: string
          meetings_scheduled: number | null
          meetings_successful: number | null
          month: string
          project_id: string
          record_id: string
          total_connects: number | null
          total_dials: number | null
          total_pitches: number | null
          total_talktime: unknown | null
          week_number: number
        }
        Insert: {
          agent_id: string
          date: string
          meetings_scheduled?: number | null
          meetings_successful?: number | null
          month: string
          project_id: string
          record_id?: string
          total_connects?: number | null
          total_dials?: number | null
          total_pitches?: number | null
          total_talktime?: unknown | null
          week_number: number
        }
        Update: {
          agent_id?: string
          date?: string
          meetings_scheduled?: number | null
          meetings_successful?: number | null
          month?: string
          project_id?: string
          record_id?: string
          total_connects?: number | null
          total_dials?: number | null
          total_pitches?: number | null
          total_talktime?: unknown | null
          week_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "daily_performance_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "daily_performance_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "top_performers"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "daily_performance_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_performance"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "daily_performance_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          project_id: string
          project_name: string
        }
        Insert: {
          created_at?: string
          project_id?: string
          project_name: string
        }
        Update: {
          created_at?: string
          project_id?: string
          project_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      conversion_funnel: {
        Row: {
          color: string | null
          stage: string | null
          value: number | null
        }
        Relationships: []
      }
      dashboard_kpis: {
        Row: {
          connected_percent_change: number | null
          dials_percent_change: number | null
          meetings_scheduled: number | null
          meetings_successful: number | null
          scheduled_percent_change: number | null
          successful_percent_change: number | null
          talk_time_percent_change: number | null
          total_connected: number | null
          total_dials: number | null
          total_talk_time_hours: number | null
        }
        Relationships: []
      }
      project_performance: {
        Row: {
          meetings_scheduled: number | null
          meetings_successful: number | null
          project_id: string | null
          project_name: string | null
          success_rate: number | null
          total_connects: number | null
          total_dials: number | null
          total_talk_time_minutes: number | null
        }
        Relationships: []
      }
      top_performers: {
        Row: {
          agent_id: string | null
          agent_name: string | null
          project_name: string | null
          success_rate: number | null
          successful_meetings: number | null
          total_dials: number | null
        }
        Relationships: []
      }
      weekly_performance_chart: {
        Row: {
          scheduled_meetings: number | null
          successful_meetings: number | null
          week_number: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      upsert_daily_performance: {
        Args: {
          p_agent_id: string
          p_date: string
          p_total_dials: number
          p_total_connects: number
          p_meetings_scheduled: number
          p_meetings_successful: number
          p_project_id: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
