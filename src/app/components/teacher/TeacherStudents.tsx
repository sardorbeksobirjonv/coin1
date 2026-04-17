import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserPlus, Coins, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function TeacherStudents() {
  const { students, addStudent, addCoins, currentUser, darkMode } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCoinsModal, setShowCoinsModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const [coinAmount, setCoinAmount] = useState('');

  const myStudents = students.filter(s => s.teacherId === currentUser?.id);
  
  const filteredStudents = myStudents.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(search.toLowerCase()) ||
      student.lastName.toLowerCase().includes(search.toLowerCase()) ||
      student.phone.includes(search);
    
    return matchesSearch;
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.phone && currentUser) {
      addStudent({
        ...formData,
        teacherId: currentUser.id,
      });
      setFormData({ firstName: '', lastName: '', phone: '' });
      setShowAddModal(false);
    }
  };

  const handleAddCoins = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStudentId && coinAmount) {
      addCoins(selectedStudentId, Number(coinAmount));
      setCoinAmount('');
      setSelectedStudentId(null);
      setShowCoinsModal(false);
    }
  };

  const openCoinsModal = (studentId: number) => {
    setSelectedStudentId(studentId);
    setShowCoinsModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}
        >
          Mening o'quvchilarim
        </motion.h1>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <UserPlus className="w-5 h-5" />
          O'quvchi qo'shish
        </motion.button>
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-2xl backdrop-blur-xl ${
          darkMode ? 'bg-white/10' : 'bg-white/70'
        }`}
      >
        <div className="relative">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Qidirish..."
            className={`w-full pl-12 pr-4 py-3 rounded-xl backdrop-blur-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              darkMode
                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400'
                : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`rounded-2xl backdrop-blur-xl overflow-hidden ${
          darkMode ? 'bg-white/10' : 'bg-white/70'
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={darkMode ? 'bg-white/10' : 'bg-gray-100/50'}>
                <th className={`px-6 py-4 text-left font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  ID
                </th>
                <th className={`px-6 py-4 text-left font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Ism
                </th>
                <th className={`px-6 py-4 text-left font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Familiya
                </th>
                <th className={`px-6 py-4 text-left font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Telefon
                </th>
                <th className={`px-6 py-4 text-left font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Coin
                </th>
                <th className={`px-6 py-4 text-left font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-t transition-colors ${
                    darkMode 
                      ? 'border-white/10 hover:bg-white/5' 
                      : 'border-gray-200/50 hover:bg-gray-100/30'
                  }`}
                >
                  <td className={`px-6 py-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {student.id}
                  </td>
                  <td className={`px-6 py-4 font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {student.firstName}
                  </td>
                  <td className={`px-6 py-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {student.lastName}
                  </td>
                  <td className={`px-6 py-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {student.phone}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold">
                      {student.coins} 🪙
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openCoinsModal(student.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Coins className="w-4 h-4" />
                      Coin qo'shish
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            O'quvchilar topilmadi
          </div>
        )}
      </motion.div>

      {/* Add Student Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-md p-8 rounded-2xl backdrop-blur-xl ${
                darkMode ? 'bg-gray-800/90' : 'bg-white/90'
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Yangi o'quvchi qo'shish
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                  }`}
                >
                  <X className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
              </div>

              <form onSubmit={handleAddStudent} className="space-y-4">
                <div>
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Ism
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl backdrop-blur-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      darkMode
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400'
                        : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Ali"
                    required
                  />
                </div>

                <div>
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Familiya
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl backdrop-blur-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      darkMode
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400'
                        : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Valiyev"
                    required
                  />
                </div>

                <div>
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl backdrop-blur-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      darkMode
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400'
                        : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="+998901234567"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/10 text-white hover:bg-white/20'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Qo'shish
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Coins Modal */}
      <AnimatePresence>
        {showCoinsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowCoinsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-md p-8 rounded-2xl backdrop-blur-xl ${
                darkMode ? 'bg-gray-800/90' : 'bg-white/90'
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Coin qo'shish
                </h2>
                <button
                  onClick={() => setShowCoinsModal(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                  }`}
                >
                  <X className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
              </div>

              <form onSubmit={handleAddCoins} className="space-y-4">
                <div>
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Coin miqdori
                  </label>
                  <input
                    type="number"
                    value={coinAmount}
                    onChange={(e) => setCoinAmount(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl backdrop-blur-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      darkMode
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400'
                        : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="50"
                    min="1"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCoinsModal(false)}
                    className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/10 text-white hover:bg-white/20'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Qo'shish
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
