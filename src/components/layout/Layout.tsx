import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();
  
  // Determine if we're in the room designer, which needs more space
  const isRoomDesigner = location.pathname.includes('/room-designer');

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          isRoomDesigner={isRoomDesigner}
        />
        
        <main className={`flex-1 overflow-y-auto transition-all duration-200 ease-in-out ${isRoomDesigner ? 'p-0' : 'p-4 sm:p-6 md:p-8'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;