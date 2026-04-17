import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';

export function AdminStudents() {
  const { students, teachers, darkMode } = useApp();
  const [search, setSearch] = useState('');
  const [filterTeacher, setFilterTeacher] = useState<number | 'all'>('all');

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(search.toLowerCase()) ||
      student.lastName.toLowerCase().includes(search.toLowerCase()) ||
      student.phone.includes(search);
    
    const matchesFilter = filterTeacher === 'all' || student.teacherId === filterTeacher;
    
    return matchesSearch && matchesFilter;
  });

  const getTeacherName = (teacherId: number) => {
    return teachers.find(t => t.id === teacherId)?.name || 'Noma\'lum';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}
        >
          O'quvchilar
        </motion.h1>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-2xl backdrop-blur-xl ${
          darkMode ? 'bg-white/10' : 'bg-white/70'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <select
            value={filterTeacher}
            onChange={(e) => setFilterTeacher(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className={`px-4 py-3 rounded-xl backdrop-blur-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              darkMode
                ? 'bg-white/10 border-white/20 text-white'
                : 'bg-white/80 border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">Barcha o'qituvchilar</option>
            {teachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
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
                  O'qituvchi
                </th>
                <th className={`px-6 py-4 text-left font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Coin
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
                  <td className={`px-6 py-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {getTeacherName(student.teacherId)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold">
                      {student.coins} 🪙
                    </span>
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
    </div>
  );
}
