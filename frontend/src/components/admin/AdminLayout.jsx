import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, Package, Users, Calendar, Settings, LogOut } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

const AdminLayout = () => {
  const { logout } = useAuthStore();

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold tracking-wider">
            SANDEEP <span className="font-light text-silver text-sm block">ADMIN PANEL</span>
          </h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-8">
          <Link to="/admin/dashboard" className="flex items-center space-x-3 px-4 py-3 bg-secondary rounded-lg text-light">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/products" className="flex items-center space-x-3 px-4 py-3 hover:bg-secondary rounded-lg text-gray-300 hover:text-white transition">
            <Package size={20} />
            <span>Products</span>
          </Link>
          <Link to="/admin/orders" className="flex items-center space-x-3 px-4 py-3 hover:bg-secondary rounded-lg text-gray-300 hover:text-white transition">
            <Users size={20} />
            <span>Orders</span>
          </Link>
          <Link to="/admin/appointments" className="flex items-center space-x-3 px-4 py-3 hover:bg-secondary rounded-lg text-gray-300 hover:text-white transition">
            <Calendar size={20} />
            <span>Appointments</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-secondary/50 space-y-2">
          <Link to="/" className="flex items-center space-x-3 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition w-full font-semibold">
            <LayoutDashboard size={20} />
            <span>Return to Site</span>
          </Link>
          <button onClick={logout} className="flex items-center space-x-3 px-4 py-3 hover:bg-red-600 rounded-lg text-gray-300 hover:text-white transition w-full">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Overview</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Admin User</span>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">A</div>
          </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
