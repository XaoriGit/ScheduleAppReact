import { api }  from "@/api";
import type { ClientsResponse, ScheduleDataResponse } from "@/api";

const baseUrl = "https://app.omsktec.ru/api/schedule";

export const scheduleApi = {
  async getSchedule(clientName: string): Promise<ScheduleDataResponse> {
    const res = await api.get<ScheduleDataResponse>(baseUrl, {
      params: {
        client_name: clientName,
      },
      headers: {
        "X-CLIENT-TIME": new Date().toISOString(),
      },
    });
    return res.data;
  },

  async getClients(): Promise<ClientsResponse> {
    const res = await api.post<ClientsResponse>(baseUrl + "/clients");
    return res.data;
  },
};
