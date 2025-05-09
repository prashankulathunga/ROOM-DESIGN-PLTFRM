import { useNavigate } from 'react-router-dom';
import { Menu, User, LogOut, AlignJustify } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 p-2"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Toggle sidebar</span>
              <AlignJustify className="h-6 w-6" />
            </button>
            
            <div className="ml-4 flex items-center">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center"
              >
                <span className="text-2xl font-display font-bold text-primary-600">FurnVision</span>
              </button>
            </div>
          </div>

          <div className="flex items-center">
            {user && (
              <div className="flex items-center">
                <span className="hidden md:block text-sm font-medium text-gray-700 mr-4">
                  {user.name} {user.role === 'admin' && <span className="ml-1 text-xs text-primary-600 font-semibold">(Admin)</span>}
                </span>
                
                <div className="relative ml-3">
                  <div className="flex items-center space-x-3">
                    <button
                      className="flex max-w-xs items-center rounded-full bg-gray-100 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <span className="sr-only">Open user menu</span>
                      <User className="h-5 w-5 text-gray-600" />
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex items-center p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <LogOut className="h-5 w-5 text-gray-600" />
                      <span className="ml-2 hidden md:block text-sm font-medium">Log out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;