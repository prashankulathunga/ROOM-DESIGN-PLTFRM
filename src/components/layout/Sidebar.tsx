import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { X, LayoutDashboard, Palette, PlusCircle, Settings } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useDesignStore } from '../../store/designStore';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isRoomDesigner: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  setIsOpen,
  isRoomDesigner
}) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { designs, createDesign, getUserDesigns, setCurrentDesign } = useDesignStore();
  const [userDesigns, setUserDesigns] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const userDesignsList = getUserDesigns(user.id);
      setUserDesigns(userDesignsList);
    }
  }, [user, designs, getUserDesigns]);

  const createNewDesign = () => {
    if (user) {
      const newDesign = createDesign(
        user.id,
        'New Design',
        {
          width: 15,
          length: 20,
          height: 9,
          wallColor: '#FFFFFF',
          floorColor: '#EEEEEE'
        }
      );
      
      setCurrentDesign(newDesign.id);
      navigate(`/room-designer/${newDesign.id}`);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-75 z-20 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:h-full md:w-64 ${isRoomDesigner ? 'md:w-72' : 'md:w-64'}`}
      >
        <div className="h-full flex flex-col overflow-y-auto">
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 md:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 p-2"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 py-6 px-4 space-y-1">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center px-2 py-2 text-sm font-medium rounded-md group transition-colors ${
                  isActive
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <LayoutDashboard className="mr-3 h-5 w-5 flex-shrink-0" />
              <span>Dashboard</span>
            </NavLink>

            <button
              onClick={createNewDesign}
              className="w-full flex items-center px-2 py-2 text-sm font-medium text-accent-700 hover:bg-gray-100 rounded-md group transition-colors"
            >
              <PlusCircle className="mr-3 h-5 w-5 flex-shrink-0" />
              <span>Create New Design</span>
            </button>

            {isRoomDesigner && (
              <div className="mt-6">
                <div className="px-2 flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Your Designs
                  </h3>
                </div>
                <div className="mt-1 space-y-1">
                  {userDesigns.map((design) => (
                    <NavLink
                      key={design.id}
                      to={`/room-designer/${design.id}`}
                      className={({ isActive }) =>
                        `block px-2 py-2 text-sm rounded-md ${
                          isActive
                            ? 'bg-gray-100 text-primary-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`
                      }
                      onClick={() => {
                        setCurrentDesign(design.id);
                        setIsOpen(false);
                      }}
                    >
                      {design.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center px-2 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 cursor-pointer">
              <Settings className="mr-3 h-5 w-5 flex-shrink-0" />
              <span>Settings</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;