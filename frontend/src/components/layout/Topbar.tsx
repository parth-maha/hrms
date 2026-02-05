import { FaRegUserCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';

interface TopBarProps {
  user: {
    name: string;
    email: string;
  };
  company: string
  onLogout: () => void;
}

export function TopBar({ onLogout }: TopBarProps) {

  const location = useLocation();
  const isDashboard = location.pathname === "/";
  const navigate = useNavigate()
  
  const handleLogout = async () => {
    try {
        localStorage.clear();
        onLogout();
        navigate('/login')
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <header className={`fixed top-0 ${isDashboard ? 'left-64' : 'left-16'} right-0 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-20  transition-all duration-200`}>
      {/* Left side - Company logo and progress */}
      <div className={`flex items-center ${isDashboard ? 'gap-6' : 'gap-4'}`}>
        {/* Progress indicator */}
      </div>

      {/* Right side - User profile and actions */}
      <div className="flex items-center gap-4">
          
        {/* User profile */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <FaRegUserCircle className="w-4 h-4 text-gray-600" />
          </div>
        </div>

        {/* Logout button */}
        <button 
          onClick={handleLogout}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Logout"
        >
          <IoIosLogOut className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </header>
  );
}

export default TopBar;