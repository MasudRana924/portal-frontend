import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, PlusCircle, List, X } from 'lucide-react';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="md:hidden bg-white p-4 flex items-center justify-between shadow-sm">
        <button onClick={toggleSidebar} className="text-gray-600">
          <List className="w-6 h-6" />
        </button>
        <span className="font-semibold">Dashboard</span>
      </div>

      <div className="flex h-[calc(100vh-64px)] md:h-screen">
        {/* Sidebar - Fixed for desktop, overlay for mobile */}
        <aside 
          className={`
            fixed md:static inset-y-0 left-0 
            transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0 transition-transform duration-300 ease-in-out
            z-30 bg-white shadow-sm w-64 md:h-screen
          `}
        >
          {/* Mobile Close Button */}
          <div className="md:hidden p-4 flex justify-end">
            <button onClick={toggleSidebar} className="text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/"
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ${
                      isActive ? 'bg-gray-100' : ''
                    }`
                  }
                >
                  <Home className="w-6 h-6 mr-2" />
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/create"
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ${
                      isActive ? 'bg-gray-100' : ''
                    }`
                  }
                >
                  <PlusCircle className="w-6 h-6 mr-2" />
                  <span>Create</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ${
                      isActive ? 'bg-gray-100' : ''
                    }`
                  }
                >
                  <List className="w-6 h-6 mr-2" />
                  <span>Products List</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Main Content Area - Scrollable */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;