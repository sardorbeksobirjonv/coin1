import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Shield, GraduationCap, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

const roles = [
  { id: 'admin' as const, name: 'Admin', icon: Shield, color: 'from-purple-500 to-pink-500' },
  { id: 'teacher' as const, name: "O'qituvchi", icon: GraduationCap, color: 'from-blue-500 to-cyan-500' },
  { id: 'student' as const, name: "O'quvchi", icon: User, color: 'from-indigo-500 to-purple-500' },
];

export function Login() {
  const navigate = useNavigate();
  const { login, darkMode } = useApp();
  const [selectedRole, setSelectedRole] = useState<'admin' | 'teacher' | 'student' | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedRole) {
      setError('Iltimos, rolni tanlang');
      return;
    }

    if (!username.trim()) {
      setError('Login maydonini to\'ldiring');
      return;
    }

    if (!password.trim()) {
      setError('Parol maydonini to\'ldiring');
      return;
    }

    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = login(selectedRole, username, password);
    
    if (success) {
      if (selectedRole === 'admin') navigate('/admin/students');
      else if (selectedRole === 'teacher') navigate('/teacher/students');
      else navigate('/student');
    } else {
      setError('Login yoki parol noto\'g\'ri');
    }
    
    setLoading(false);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl"
      >
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${
              darkMode ? 'opacity-90' : ''
            }`}
          >
            Student Management
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={darkMode ? 'text-gray-300' : 'text-gray-600'}
          >
            Tizimga kirish uchun rolni tanlang
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {roles.map((role, index) => (
            <motion.button
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedRole(role.id)}
              className={`relative p-8 rounded-2xl backdrop-blur-xl transition-all duration-300 ${
                selectedRole === role.id
                  ? darkMode
                    ? 'bg-white/20 shadow-2xl ring-2 ring-white/50'
                    : 'bg-white/80 shadow-2xl ring-2 ring-purple-300'
                  : darkMode
                  ? 'bg-white/10 hover:bg-white/15 shadow-lg'
                  : 'bg-white/60 hover:bg-white/70 shadow-lg'
              }`}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${role.color} flex items-center justify-center`}>
                <role.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {role.name}
              </h3>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`max-w-md mx-auto p-8 rounded-2xl backdrop-blur-xl ${
            darkMode ? 'bg-white/10 shadow-2xl' : 'bg-white/70 shadow-2xl'
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Login
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl backdrop-blur-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  darkMode
                    ? 'bg-white/10 border-white/20 text-white placeholder-gray-400'
                    : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Username yoki telefon"
              />
            </div>

            <div>
              <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Parol
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 pr-12 rounded-xl backdrop-blur-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    darkMode
                      ? 'bg-white/10 border-white/20 text-white placeholder-gray-400'
                      : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                    darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                  } transition-colors`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-500"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Yuklanmoqda...
                </>
              ) : (
                'Kirish'
              )}
            </motion.button>
          </form>

          <div className={`mt-6 p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-100/50'}`}>
            <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Test uchun:</p>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Admin: admin / admin<br />
              O'qituvchi: teacher1 / 123<br />
              O'quvchi: +998901234567 / 123
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
