import { useQuery } from "@tanstack/react-query";
import { scheduleApi } from "@/api";

export const useSchedule = (clientName: string) => {
  return useQuery({
    queryKey: ["schedule", clientName],
    queryFn: () => scheduleApi.getSchedule(clientName),
  });
};
