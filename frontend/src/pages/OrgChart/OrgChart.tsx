import Typography from "@mui/material/Typography";
import type { OrgChartNode } from "../../types/employee.types";
import OrgNode from "./OrgChartNode";
import { useOrgChart } from "../../services/queries/employee.queries";
import Loader from "../../components/ui/RequestLoaders";

const OrgChart = () => {
  const {data, isLoading} = useOrgChart();

  if(isLoading) return <Loader/>
  return (
    <div className="overflow-auto">
      <h1 className="text-2xl font-bold  mb-6 text-gray-800">
        <Typography variant="h4" className="font-bold text-gray-900">
          Org Chart
        </Typography>
      </h1>
      <div className="flex justify-center min-w-max">
        {data?.map((rootNode: OrgChartNode) => (
          <OrgNode key={rootNode.id} node={rootNode} />
        ))}
      </div>
    </div>
  );
};

export default OrgChart;
