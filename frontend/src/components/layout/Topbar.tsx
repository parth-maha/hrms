import { Notifications } from "@mui/icons-material";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { Link, useLocation} from 'react-router-dom';
import useAuthStore from "../../store/auth.store";

interface TopBarProps {
  user: {
    name: string;
    email: string;
  };
  company: string
}

export function TopBar({  }: TopBarProps) {

  const location = useLocation();
  const isDashboard = location.pathname === "/";
  const logout = useAuthStore((state:any) => state.logout)

  return (
    <header className={`fixed top-0 ${isDashboard ? 'left-64' : 'left-15'} right-0 h-14 bg-[#3E9f34] border-b border-gray-200 flex items-center justify-end px-6 z-20  transition-all duration-200`}>
    
      <div className="flex items-center gap-4">

        <div className="flex items-center gap-2">
            <Notifications className="w-5 h-5 text-white" />
        </div>  
        <div className="flex items-center gap-2">
          <Link to='/profile'>
            <FaRegUserCircle className="w-5 h-5 text-white" />
          </Link>
        </div>

        <button 
          onClick={logout}
          className="p-2 hover:cursor-pointer rounded-full transition-colors"
          title="Logout"
        >
          <IoIosLogOut className="w-5 h-5 text-white" />
        </button>
      </div>
    </header>
  );
}

export default TopBar;