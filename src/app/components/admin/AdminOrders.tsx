import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export function AdminOrders() {
  const { orders, confirmOrder, darkMode } = useApp();

  const handleConfirm = (orderId: number) => {
    confirmOrder(orderId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}
      >
        Buyurtmalar
      </motion.h1>

      <div className="grid gap-6">
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-12 rounded-2xl backdrop-blur-xl text-center ${
              darkMode ? 'bg-white/10' : 'bg-white/70'
            }`}
          >
            <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              Hozircha buyurtmalar yo'q
            </p>
          </motion.div>
        ) : (
          orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-2xl backdrop-blur-xl ${
                darkMode ? 'bg-white/10' : 'bg-white/70'
              }`}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={order.productImage}
                  alt={order.productName}
                  className="w-32 h-32 object-cover rounded-xl"
                />

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {order.productName}
                      </h3>
                      <div className={`space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <p>O'quvchi: <span className="font-medium">{order.studentName}</span></p>
                        <p>Telefon: <span className="font-medium">{order.studentPhone}</span></p>
                        <p>Sana: <span className="font-medium">{formatDate(order.date)}</span></p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold mb-3">
                        {order.productPrice} 🪙
                      </div>
                      
                      {order.status === 'pending' ? (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-500">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">Kutilmoqda</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-500">
                          <CheckCircle className="w-4 h-4" />
                          <span className="font-medium">Tasdiqlangan</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {order.status === 'pending' && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleConfirm(order.id)}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Tasdiqlash
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
