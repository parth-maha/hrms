import { Person } from "@mui/icons-material";

const OrgNode = ({ node }: { node: any }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm w-48 text-center z-10 relative hover:shadow-md transition-shadow">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 text-blue-600">
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
            {node.directReports.map((child: any) => (
              <div key={child.id} className="flex flex-col items-center">
                <OrgNode node={child} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrgNode