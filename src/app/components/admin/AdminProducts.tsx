import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct, darkMode } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.price && formData.image) {
      if (editingProduct) {
        updateProduct(editingProduct, {
          name: formData.name,
          price: Number(formData.price),
          image: formData.image,
        });
      } else {
        addProduct({
          name: formData.name,
          price: Number(formData.price),
          image: formData.image,
        });
      }
      setFormData({ name: '', price: '', image: '' });
      setShowModal(false);
      setEditingProduct(null);
    }
  };

  const handleEdit = (product: typeof products[0]) => {
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
    });
    setEditingProduct(product.id);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Rostdan ham o'chirmoqchimisiz?")) {
      deleteProduct(id);
    }
  };

  const openAddModal = () => {
    setFormData({ name: '', price: '', image: '' });
    setEditingProduct(null);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}
        >
          Sovg'alar
        </motion.h1>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openAddModal}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          Sovg'a qo'shish
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
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
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            
            <div className="p-6">
              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {product.name}
              </h3>
              
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold">
                  {product.price} 🪙
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    darkMode
                      ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                >
                  <Edit2 className="w-4 h-4" />
                  O'zgartirish
                </button>
                
                <button
                  onClick={() => handleDelete(product.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    darkMode
                      ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                      : 'bg-red-100 text-red-600 hover:bg-red-200'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                  O'chirish
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Product Modal */}
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
                  {editingProduct ? "Sovg'ani o'zgartirish" : "Yangi sovg'a qo'shish"}
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
                    Nomi
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
                    placeholder="Masalan: Bluetooth Quloqchin"
                    required
                  />
                </div>

                <div>
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Narxi (coin)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl backdrop-blur-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      darkMode
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400'
                        : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="500"
                    required
                  />
                </div>

                <div>
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Rasm URL
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl backdrop-blur-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      darkMode
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400'
                        : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="https://..."
                    required
                  />
                </div>

                {formData.image && (
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}

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
                    {editingProduct ? "O'zgartirish" : "Qo'shish"}
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
