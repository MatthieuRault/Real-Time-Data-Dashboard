import axios from "axios";
import { API_CONFIG } from "./api.config";

export const dashboardService = {
  createDashboard: async (name: string) => {
    try {
      const response = await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.DASHBOARDS}`,
        {
          name,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getDashboardByCode: async (code: string) => {
    try {
      const response = await axios.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.DASHBOARDS}/${code}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addWidgetToDashboard: async (dashboardId: string, widget: any) => {
    try {
      const response = await axios.post(`${API_CONFIG.BASE_URL}/widgets`, {
        ...widget,
        dashboard_id: dashboardId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
