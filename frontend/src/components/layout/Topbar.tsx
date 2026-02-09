import { Notifications } from "@mui/icons-material";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';
import { logoutUser } from "../../services/auth.service";

interface TopBarProps {
  user: {
    name: string;
    email: string;
  };
  company: string
  // onLogout: () => void;
}

export function TopBar({  }: TopBarProps) {

  const location = useLocation();
  const isDashboard = location.pathname === "/";
  const navigate = useNavigate()
  
  const handleLogout = async () => {
    try {
        localStorage.clear();
        logoutUser();
        navigate('/login')
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <header className={`fixed top-0 ${isDashboard ? 'left-64' : 'left-15'} right-0 h-14 bg-[#3E9f34] border-b border-gray-200 flex items-center justify-end px-6 z-20  transition-all duration-200`}>
    
      <div className="flex items-center gap-4">

        <div className="flex items-center gap-2">
            <Notifications className="w-5 h-5 text-white" />
        </div>  
        <div className="flex items-center gap-2">
            <FaRegUserCircle className="w-5 h-5 text-white" />
        </div>

        <button 
          onClick={handleLogout}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Logout"
        >
          <IoIosLogOut className="w-5 h-5 text-white" />
        </button>
      </div>
    </header>
  );
}

export default TopBar;