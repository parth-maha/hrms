import { Person } from "@mui/icons-material";
import type { OrgChartNode } from "../../types/employee.types";

interface OrgNodeProps {
  node: OrgChartNode;
  onNodeClick: (id: string) => void;
  selectedId: string | null;
}

const OrgNode = ({ node, onNodeClick, selectedId }: OrgNodeProps) => {
  const isSelected = node.id === selectedId;
  const hasChildren = node.directReports && node.directReports.length > 0;
  const childCount = node.directReports?.length ?? 0;

  return (
    <div className="flex flex-col items-center">
      <div
        onClick={(e) => {
          e.stopPropagation();
          onNodeClick(node.id);
        }}
        className={`p-2 border rounded-lg shadow-sm w-36 text-center z-10 relative transition-all cursor-pointer
          ${
            isSelected
              ? "bg-blue-50 border-blue-500 shadow-md ring-2 ring-blue-200"
              : "bg-white border-gray-200 hover:shadow-md hover:border-blue-300"
          }
        `}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1
            ${isSelected ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"}
          `}
        >
          <Person fontSize="small" />
        </div>
        <h3 className="font-semibold text-gray-800 text-xs truncate" title={node.name}>
          {node.name}
        </h3>
        <p className="text-xs text-gray-400 truncate leading-tight">{node.position}</p>
      </div>

      {hasChildren && (
        <div className="flex flex-col items-center w-full">
          <div className="w-px bg-gray-300" style={{ height: 20 }} />

          {childCount === 1 ? (
            <div className="flex flex-col items-center">
              <div className="w-px bg-gray-300" style={{ height: 20 }} />
              <OrgNode
                node={node.directReports![0]}
                onNodeClick={onNodeClick}
                selectedId={selectedId}
              />
            </div>
          ) : (
            <div className="relative flex flex-col items-center w-full">
              <div className="relative flex flex-row items-start justify-center gap-4 w-full">
                {node.directReports!.map((child, index) => (
                  <div key={child.id} className="relative flex flex-col items-center">
                    <div className="w-px bg-gray-300" style={{ height: 20 }} />
                    <OrgNode
                      node={child}
                      onNodeClick={onNodeClick}
                      selectedId={selectedId}
                    />
                  </div>
                ))}
                <HorizontalConnector childCount={childCount} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const HorizontalConnector = ({ childCount }: { childCount: number }) => {
  const childWidth = 144;
  const gap = 16; 
  const colWidth = childWidth + gap;
  const totalWidth = colWidth * childCount - gap;
  const barLeft = childWidth / 2; 
  const barRight = childWidth / 2; 

  return (
    <div
      className="absolute top-0 bg-gray-300"
      style={{
        height: 1,
        left: barLeft,
        right: barRight,
        width: `calc(100% - ${childWidth}px)`,
      }}
    />
  );
};

export default OrgNode;