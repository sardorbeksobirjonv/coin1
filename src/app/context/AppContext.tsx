import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  teacherId: number;
  coins: number;
}

export interface Teacher {
  id: number;
  name: string;
  login: string;
  password: string;
  studentCount: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface Order {
  id: number;
  studentId: number;
  studentName: string;
  studentPhone: string;
  productId: number;
  productName: string;
  productImage: string;
  productPrice: number;
  status: 'pending' | 'confirmed';
  date: string;
}

export interface Notification {
  id: number;
  message: string;
  type: 'order' | 'info';
  date: string;
  read: boolean;
}

interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  currentUser: { id: number; role: 'admin' | 'teacher' | 'student'; name: string } | null;
  login: (role: 'admin' | 'teacher' | 'student', username: string, password: string) => boolean;
  logout: () => void;
  students: Student[];
  addStudent: (student: Omit<Student, 'id' | 'coins'>) => void;
  addCoins: (studentId: number, amount: number) => void;
  teachers: Teacher[];
  addTeacher: (teacher: Omit<Teacher, 'id' | 'studentCount'>) => void;
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, updates: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  orders: Order[];
  createOrder: (order: Omit<Order, 'id' | 'status' | 'date'>) => void;
  confirmOrder: (id: number) => void;
  notifications: Notification[];
  markNotificationRead: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const mockStudents: Student[] = [
  { id: 1, firstName: 'Ali', lastName: 'Valiyev', phone: '+998901234567', teacherId: 1, coins: 150 },
  { id: 2, firstName: 'Dilnoza', lastName: 'Karimova', phone: '+998901234568', teacherId: 1, coins: 200 },
  { id: 3, firstName: 'Jasur', lastName: 'Toshmatov', phone: '+998901234569', teacherId: 2, coins: 100 },
  { id: 4, firstName: 'Madina', lastName: 'Rahimova', phone: '+998901234570', teacherId: 2, coins: 250 },
];

const mockTeachers: Teacher[] = [
  { id: 1, name: 'Aziza Yusupova', login: 'teacher1', password: '123', studentCount: 2 },
  { id: 2, name: 'Botir Aliyev', login: 'teacher2', password: '123', studentCount: 2 },
];

const mockProducts: Product[] = [
  { id: 1, name: 'Bluetooth Quloqchin', price: 500, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
  { id: 2, name: 'Sumka', price: 300, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop' },
  { id: 3, name: 'Soat', price: 700, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
  { id: 4, name: 'Kitob', price: 150, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop' },
  { id: 5, name: 'Powerbank', price: 400, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop' },
  { id: 6, name: 'Choy to\'plami', price: 200, image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400&h=400&fit=crop' },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<AppContextType['currentUser']>(null);
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const login = (role: 'admin' | 'teacher' | 'student', username: string, password: string) => {
    if (role === 'admin' && username === 'admin' && password === 'admin') {
      setCurrentUser({ id: 0, role: 'admin', name: 'Administrator' });
      return true;
    }
    
    if (role === 'teacher') {
      const teacher = teachers.find(t => t.login === username && t.password === password);
      if (teacher) {
        setCurrentUser({ id: teacher.id, role: 'teacher', name: teacher.name });
        return true;
      }
    }
    
    if (role === 'student') {
      const student = students.find(s => s.phone === username && password === '123');
      if (student) {
        setCurrentUser({ id: student.id, role: 'student', name: `${student.firstName} ${student.lastName}` });
        return true;
      }
    }
    
    return false;
  };

  const logout = () => setCurrentUser(null);

  const addStudent = (student: Omit<Student, 'id' | 'coins'>) => {
    const newStudent = { ...student, id: students.length + 1, coins: 0 };
    setStudents([...students, newStudent]);
    
    setTeachers(teachers.map(t => 
      t.id === student.teacherId 
        ? { ...t, studentCount: t.studentCount + 1 }
        : t
    ));
  };

  const addCoins = (studentId: number, amount: number) => {
    setStudents(students.map(s => 
      s.id === studentId 
        ? { ...s, coins: s.coins + amount }
        : s
    ));
  };

  const addTeacher = (teacher: Omit<Teacher, 'id' | 'studentCount'>) => {
    const newTeacher = { ...teacher, id: teachers.length + 1, studentCount: 0 };
    setTeachers([...teachers, newTeacher]);
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: products.length + 1 };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: number, updates: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const createOrder = (order: Omit<Order, 'id' | 'status' | 'date'>) => {
    const newOrder: Order = {
      ...order,
      id: orders.length + 1,
      status: 'pending',
      date: new Date().toISOString(),
    };
    setOrders([newOrder, ...orders]);
    
    const notification: Notification = {
      id: notifications.length + 1,
      message: `Yangi buyurtma: ${order.studentName} - ${order.productName}`,
      type: 'order',
      date: new Date().toISOString(),
      read: false,
    };
    setNotifications([notification, ...notifications]);
  };

  const confirmOrder = (id: number) => {
    const order = orders.find(o => o.id === id);
    if (!order) return;

    setOrders(orders.map(o => o.id === id ? { ...o, status: 'confirmed' } : o));
    
    setStudents(students.map(s => 
      s.id === order.studentId 
        ? { ...s, coins: s.coins - order.productPrice }
        : s
    ));
    
    const notification: Notification = {
      id: notifications.length + 1,
      message: `Buyurtmangiz tasdiqlandi: ${order.productName}`,
      type: 'info',
      date: new Date().toISOString(),
      read: false,
    };
    setNotifications([notification, ...notifications]);
  };

  const markNotificationRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  return (
    <AppContext.Provider value={{
      darkMode,
      toggleDarkMode,
      currentUser,
      login,
      logout,
      students,
      addStudent,
      addCoins,
      teachers,
      addTeacher,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      orders,
      createOrder,
      confirmOrder,
      notifications,
      markNotificationRead,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
