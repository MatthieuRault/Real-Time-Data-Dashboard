export interface Dashboard {
  _id: string;
  name: string;
  code: string;
}

export interface Widget {
  _id: string;
  category: "weather" | "crypto";
  positionX: number;
  positionY: number;
  dashboard_id: string;
  parameters: {
    apiUrl: string;
    city?: string;
    type?: "top" | "single";
    name?: string;
  };
}

export interface DashboardData {
  dashboard: Dashboard;
  widgets: Widget[];
}
