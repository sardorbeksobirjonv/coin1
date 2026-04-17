import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, ShoppingCart, Info, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function AdminNotifications() {
  const { notifications, markNotificationRead, darkMode } = useApp();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Hozir';
    if (diffInMinutes < 60) return `${diffInMinutes} daqiqa oldin`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} soat oldin`;
    return `${Math.floor(diffInMinutes / 1440)} kun oldin`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}
        >
          Bildirishnomalar
        </motion.h1>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-12 rounded-2xl backdrop-blur-xl text-center ${
              darkMode ? 'bg-white/10' : 'bg-white/70'
            }`}
          >
            <Bell className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              Bildirishnomalar yo'q
            </p>
          </motion.div>
        ) : (
          notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => !notification.read && markNotificationRead(notification.id)}
              className={`p-6 rounded-2xl backdrop-blur-xl cursor-pointer transition-all duration-300 ${
                notification.read
                  ? darkMode
                    ? 'bg-white/5 opacity-60'
                    : 'bg-white/40 opacity-70'
                  : darkMode
                  ? 'bg-white/10 hover:bg-white/15 shadow-lg'
                  : 'bg-white/70 hover:bg-white/80 shadow-lg hover:shadow-xl'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  notification.type === 'order'
                    ? 'bg-gradient-to-br from-blue-500 to-purple-500'
                    : 'bg-gradient-to-br from-green-500 to-emerald-500'
                }`}>
                  {notification.type === 'order' ? (
                    <ShoppingCart className="w-6 h-6 text-white" />
                  ) : (
                    <Info className="w-6 h-6 text-white" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {notification.message}
                    </p>
                    {!notification.read && (
                      <span className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0 mt-1"></span>
                    )}
                  </div>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {formatDate(notification.date)}
                  </p>
                </div>

                {notification.read && (
                  <CheckCircle className={`w-5 h-5 flex-shrink-0 ${
                    darkMode ? 'text-gray-600' : 'text-gray-400'
                  }`} />
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
