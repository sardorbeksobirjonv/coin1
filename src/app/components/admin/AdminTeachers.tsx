import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserPlus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AdminTeachers() {
  const { teachers, addTeacher, darkMode } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    login: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.login && formData.password) {
      addTeacher(formData);
      setFormData({ name: '', login: '', password: '' });
      setShowModal(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}
        >
          Hodimlar (O'qituvchilar)
        </motion.h1>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <UserPlus className="w-5 h-5" />
          Hodim qo'shish
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher, index) => (
          <motion.div
            key={teacher.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className={`p-6 rounded-2xl backdrop-blur-xl transition-all duration-300 ${
              darkMode 
                ? 'bg-white/10 hover:bg-white/15 shadow-lg' 
                : 'bg-white/70 hover:bg-white/80 shadow-lg hover:shadow-xl'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-white">
                  {teacher.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h3 className={`text-xl font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {teacher.name}
                </h3>
                <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Login: {teacher.login}
                </p>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    O'quvchilar:
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold">
                    {teacher.studentCount}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Teacher Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowModal(false)}
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
                  Yangi hodim qo'shish
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                  }`}
                >
                  <X className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Ism-familiya
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl backdrop-blur-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      darkMode
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400'
                        : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Masalan: Aziza Yusupova"
                    required
                  />
                </div>

                <div>
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Login
                  </label>
                  <input
                    type="text"
                    value={formData.login}
                    onChange={(e) => setFormData({ ...formData, login: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl backdrop-blur-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      darkMode
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400'
                        : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="teacher123"
                    required
                  />
                </div>

                <div>
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Parol
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl backdrop-blur-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      darkMode
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400'
                        : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
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
    </div>
  );
}
