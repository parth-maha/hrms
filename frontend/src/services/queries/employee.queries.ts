import { useQuery } from "@tanstack/react-query";
import { getOrgChart } from "../employee.service";

export const useOrgChart = () => {
  return useQuery({
    queryKey: ["org-chart"],
    queryFn: getOrgChart,
    staleTime: 24 * 60 * 60 * 1000, //1 Day
  });
};
