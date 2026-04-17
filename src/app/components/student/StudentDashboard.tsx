import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { LogOut, Moon, Sun, Coins, ShoppingBag, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';

export function StudentDashboard() {
  const navigate = useNavigate();
  const { students, products, createOrder, currentUser, logout, darkMode, toggleDarkMode } = useApp();
  const [purchasingId, setPurchasingId] = useState<number | null>(null);
  
  const student = students.find(s => s.id === currentUser?.id);

  const handlePurchase = (product: typeof products[0]) => {
    if (!student || !currentUser) return;

    if (student.coins < product.price) {
      alert("Coin yetarli emas!");
      return;
    }

    setPurchasingId(product.id);

    createOrder({
      studentId: student.id,
      studentName: `${student.firstName} ${student.lastName}`,
      studentPhone: student.phone,
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      productPrice: product.price,
    });

    // Success animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setPurchasingId(null);
      alert("Buyurtma muvaffaqiyatli yuborildi! Admin tasdiqlashini kuting.");
    }, 500);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!student) return null;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      {/* Header */}
      <header className={`backdrop-blur-xl border-b transition-colors duration-300 ${
        darkMode ? 'bg-white/10 border-white/10' : 'bg-white/70 border-gray-200/50'
      }`}>
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {student.firstName} {student.lastName}
                </h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  O'quvchi Panel
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  darkMode
                    ? 'hover:bg-white/10 text-gray-300'
                    : 'hover:bg-gray-100/50 text-gray-700'
                }`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={handleLogout}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                  darkMode
                    ? 'hover:bg-red-500/20 text-red-400'
                    : 'hover:bg-red-50 text-red-600'
                }`}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Chiqish</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Coin Balance */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-12 p-8 rounded-2xl backdrop-blur-xl ${
            darkMode ? 'bg-white/10' : 'bg-white/70'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Sizning balansingiz
              </p>
              <div className="flex items-center gap-3">
                <Coins className="w-8 h-8 text-yellow-500" />
                <span className={`text-5xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent`}>
                  {student.coins}
                </span>
                <span className="text-3xl">🪙</span>
              </div>
            </div>
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Products */}
        <div className="mb-6">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}
          >
            Sovg'alar
          </motion.h2>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Coinlaringizni sarflang va o'zingizga yoqqan sovg'ani oling!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => {
            const canAfford = student.coins >= product.price;
            const isPurchasing = purchasingId === product.id;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`rounded-2xl backdrop-blur-xl overflow-hidden transition-all duration-300 ${
                  darkMode 
                    ? 'bg-white/10 hover:bg-white/15 shadow-lg' 
                    : 'bg-white/70 hover:bg-white/80 shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover"
                  />
                  {!canAfford && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="px-4 py-2 rounded-full bg-red-500/90 text-white font-semibold">
                        Coin yetarli emas
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold">
                      {product.price} 🪙
                    </span>
                  </div>

                  <motion.button
                    whileHover={canAfford ? { scale: 1.02 } : {}}
                    whileTap={canAfford ? { scale: 0.98 } : {}}
                    onClick={() => handlePurchase(product)}
                    disabled={!canAfford || isPurchasing}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                      canAfford && !isPurchasing
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
                        : darkMode
                        ? 'bg-white/10 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isPurchasing ? "Yuklanmoqda..." : "Sotib olish"}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
