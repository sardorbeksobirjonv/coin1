import React, { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  GraduationCap, 
  ShoppingCart, 
  Bell, 
  LogOut, 
  Moon, 
  Sun,
  Gift
} from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardLayoutProps {
  children: ReactNode;
  role: 'admin' | 'teacher';
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, darkMode, toggleDarkMode, notifications } = useApp();

  const adminMenuItems = [
    { id: 'students', label: "O'quvchilar", icon: Users, path: '/admin/students' },
    { id: 'teachers', label: 'Hodimlar', icon: GraduationCap, path: '/admin/teachers' },
    { id: 'orders', label: 'Buyurtmalar', icon: ShoppingCart, path: '/admin/orders' },
    { id: 'products', label: "Sovg'alar", icon: Gift, path: '/admin/products' },
    { id: 'notifications', label: 'Bildirishnomalar', icon: Bell, path: '/admin/notifications' },
  ];

  const teacherMenuItems = [
    { id: 'students', label: "O'quvchilar", icon: Users, path: '/teacher/students' },
  ];

  const menuItems = role === 'admin' ? adminMenuItems : teacherMenuItems;
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`fixed left-0 top-0 h-full w-72 p-6 backdrop-blur-xl border-r transition-colors duration-300 ${
          darkMode 
            ? 'bg-white/10 border-white/10' 
            : 'bg-white/70 border-gray-200/50'
        }`}
      >
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Student MS
            </h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {role === 'admin' ? 'Admin Panel' : "O'qituvchi Panel"}
            </p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5 }}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? darkMode
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : darkMode
                    ? 'hover:bg-white/10 text-gray-300'
                    : 'hover:bg-gray-100/50 text-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {item.id === 'notifications' && unreadCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </motion.button>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <button
            onClick={toggleDarkMode}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              darkMode
                ? 'hover:bg-white/10 text-gray-300'
                : 'hover:bg-gray-100/50 text-gray-700'
            }`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span className="font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              darkMode
                ? 'hover:bg-red-500/20 text-red-400'
                : 'hover:bg-red-50 text-red-600'
            }`}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Chiqish</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="ml-72 p-8">
        {children}
      </main>
    </div>
  );
}
