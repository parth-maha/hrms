import { useState, useMemo, useEffect } from "react";
import { Typography, Autocomplete, TextField, Button, Paper } from "@mui/material";
import { Search, RestartAlt } from "@mui/icons-material";
import type { OrgChartNode } from "../../types/employee.types";
import OrgNode from "./OrgChartNode";
import {useEmployeeOptions } from "../../services/queries/job.queries"
import Loader from "../../components/ui/RequestLoaders";
import useAuthStore from "../../store/auth.store";
import { useOrgChart } from "../../services/queries/employee.queries";
 
const OrgChart = () => {
  const { empId } = useAuthStore();
  const { data: fullChartData, isLoading: isChartLoading } = useOrgChart();
  const { data: employeeList = [] } = useEmployeeOptions(); 
  const [focusId, setFocusId] = useState<string | null>(null);
 
  useEffect(() => {
    if (empId && !focusId) {
      setFocusId(empId);
    }
  }, [empId, focusId]);
 
  const findPathToNode = (nodes: OrgChartNode[], targetId: string): OrgChartNode[] | null => {
    for (const node of nodes) {
      if (node.id === targetId) return [node];
      if (node.directReports) {
        const path = findPathToNode(node.directReports, targetId);
        if (path) return [node, ...path];
      }
    }
    return null;
  };

  const displayTree = useMemo(() => {
    if (!fullChartData || !focusId) return fullChartData;
 
    const path = findPathToNode(fullChartData, focusId);
    
    if (!path) return fullChartData;

    const newRoot = { ...path[0], directReports: [] as OrgChartNode[] };
    let current = newRoot;
 
    for (let i = 1; i < path.length; i++) {
        const nextOriginal = path[i];
        const nextClone = { ...nextOriginal, directReports: [] as OrgChartNode[] };
        
        current.directReports = [nextClone];
        current = nextClone; 
    }
    const originalTarget = path[path.length - 1];
    current.directReports = originalTarget.directReports ? [...originalTarget.directReports] : [];
 
    return [newRoot];
  }, [fullChartData, focusId]);
 
  if (isChartLoading) return <Loader />;

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] overflow-hidde">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 rounded-xl">
        <div className="flex items-center gap-2 w-full md:w-auto">
            <Autocomplete
                options={employeeList}
                getOptionLabel={(option) => option.name}
                className="w-full md:w-72"
                size="small"
                onChange={(_, newValue) => {
                    if (newValue?.id) setFocusId(newValue.id);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search Employee"
                        variant="outlined"
                    />
                )}
            />
            <Button
                variant="outlined"
                color="inherit"
                onClick={() => setFocusId(empId)}
                title="Reset to Me"
            >
                <RestartAlt />
            </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto rounded-lg p-8 relative">
        <div className="min-w-max flex justify-center pb-20">
          {displayTree?.map((rootNode) => (
            <OrgNode
                key={rootNode.id}
                node={rootNode}
                onNodeClick={(id) => setFocusId(id)}
                selectedId={focusId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
 
export default OrgChart;