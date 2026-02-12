import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import {
  DashboardOutlined,
  ModeOfTravel,
  ContentCopy,
  ShowChart,
} from "@mui/icons-material";
import WorkIcon from "@mui/icons-material/Work";
import GamesIcon from "@mui/icons-material/Games";
import { theme } from "../../utilities/theme";
import icon from "../../assets/favicon.ico";
import type { SidebarNavItem } from "../../types/ui.types";
import useAuthStore from "../../store/auth.store";

interface SidebarProps {
  user: {
    name: string;
    email: string;
  };
  company: string;
}

export function Sidebar({
  user,
}: SidebarProps) {
  const {roles} = useAuthStore();
  
  const navigation = useMemo(() => {
		const items: SidebarNavItem[] = [
			{ name: "Dashboard", icon: DashboardOutlined, path: "/" },
      {
        name: "Travel & Expense",
        icon: ModeOfTravel,
        path: "/travel",
      },
      {
        name: "Games",
        icon: GamesIcon,
        path: "/games",
      },
      {
        name: "Jobs",
        icon: WorkIcon,
        path: "/jobs",
      },
      {
        name: "Org Chart",
        icon: ShowChart,
        path: "/chart",
      },
      {
        name: "Policies",
        icon: ContentCopy,
        path: "/policies",
      },
		];
      
    if(roles === 'MANAGER' || roles=== "HR"){
      items.push({
        name: "System Config",
        icon: ModeOfTravel,
        path: "/config",
      })
    }
		return items;
	}, [roles]);

  const location = useLocation();
  const pathname = location.pathname;
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Show full sidebar on dashboard or when hovered
  const isDashboardActive = pathname === "/";
  const isExpanded = isDashboardActive || isHovered;

  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const DefaultIcon = RiBarChartHorizontalLine;

  return (
    <aside
      className={`fixed left-0 top-0 ${
        isExpanded ? "w-64" : "w-15 max-w-15"
      } min-h-screen border-r border-solid flex flex-col transition-all duration-200 ${
        isHovered && !isDashboardActive ? "z-30" : "z-10"
      }`}
      style={{
        backgroundColor: "#3E9f34",
        borderColor: theme.palette.divider,
      }}
      onMouseEnter={() => !isDashboardActive && setIsHovered(true)}
      onMouseLeave={() => !isDashboardActive && setIsHovered(false)}
    >
      {/* Logo Section */}
      <div className={`flex items-center gap-3 pt-6 pb-2 pl-4`}>
        <img src={icon} alt="Company Logo" className="w-8 h-8" />

        {isExpanded && (
          <span className="font-semibold text-white text-lg">Roima</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3">
        <div className="space-y-1">
          {navigation.map((item) => {
            const IconComponent = item.icon ?? DefaultIcon;
            const isActive =
              pathname === item.path || pathname.startsWith(item.path + "/");
            const hasSubItems = item.subItems && item.subItems.length > 0;

            return (
              <div key={item.name} className="cursor-pointer">
                <button
                  onClick={() => {
                    if (!item.disabled) {
                      if (hasSubItems && isExpanded) {
                        setOpenDropdown(
                          openDropdown === item.name ? null : item.name,
                        );
                      } else {
                        handleNavigation(item.path);
                      }
                    }
                  }}
                  disabled={item.disabled}
                  className={`cursor-pointer w-full flex items-center ${
                    isExpanded ? "gap-3 px-3 py-3" : "justify-center py-3"
                  } rounded-lg text-left transition-all duration-200 group ${
                    item.disabled
                      ? "opacity-50 cursor-not-allowed"
                      : isActive
                        ? " text-white  bg-blend-lighten"
                        : "text-white hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <IconComponent
                    fontSize="small"
                    className={`w-5 h-5 ${
                      item.disabled
                        ? "text-gray-400"
                        : isActive
                          ? "text-white"
                          : "text-white group-hover:text-gray-600"
                    }`}
                  />
                  {isExpanded && (
                    <span className="text-sm font-medium flex-1">
                      {item.name}
                    </span>
                  )}
                </button>

                {hasSubItems && isExpanded && openDropdown === item.name && (
                  <div className="ml-8 space-y-1 mt-1">
                    {item.subItems?.map((subItem) => {
                      const isSubActive = pathname === subItem.path;
                      return (
                        <button
                          key={subItem.name}
                          onClick={() => handleNavigation(subItem.path)}
                          className={`cursor-pointer w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                            isSubActive
                              ? "text-white"
                              : "text-white group-hover:text-gray-600"
                          }`}
                        >
                          <span className="text-sm">{subItem.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
