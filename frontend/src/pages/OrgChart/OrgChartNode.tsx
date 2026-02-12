import { Person } from "@mui/icons-material";
import type { OrgChartNode } from "../../types/employee.types";
 
interface OrgNodeProps {
  node: OrgChartNode;
  onNodeClick: (id: string) => void;
  selectedId: string | null;
}
 
const OrgNode = ({ node, onNodeClick, selectedId }: OrgNodeProps) => {
  const isSelected = node.id === selectedId;
 
  return (
    <div className="flex flex-col items-center">
      <div
        onClick={(e) => {
          e.stopPropagation();
          onNodeClick(node.id);
        }}
        className={`p-3 border rounded-lg shadow-sm w-48 text-center z-10 relative transition-all cursor-pointer
          ${
            isSelected
              ? "bg-blue-50 border-blue-500 shadow-md ring-2 ring-blue-200"
              : "bg-white border-gray-200 hover:shadow-md hover:border-blue-300"
          }
        `}
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2
            ${isSelected ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"}
          `}
        >
          <Person />
        </div>
        <h3
          className="font-semibold text-gray-800 text-sm truncate"
          title={node.name}
        >
          {node.name}
        </h3>
        <p className="text-xs text-gray-500 truncate">{node.position}</p>
      </div>
      {node.directReports && node.directReports.length > 0 && (
        <div className="flex flex-col items-center">
          <div className="h-6 w-px bg-gray-300"></div>
          <div className="flex gap-4">
            {node.directReports.map((child) => (
              <div key={child.id} className="flex flex-col items-center">
                <OrgNode
                    node={child}
                    onNodeClick={onNodeClick}
                    selectedId={selectedId}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
 
export default OrgNode;