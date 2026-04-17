import { createBrowserRouter, Navigate } from 'react-router';
import { Login } from './components/Login';
import { DashboardLayout } from './components/DashboardLayout';
import { AdminStudents } from './components/admin/AdminStudents';
import { AdminTeachers } from './components/admin/AdminTeachers';
import { AdminOrders } from './components/admin/AdminOrders';
import { AdminProducts } from './components/admin/AdminProducts';
import { AdminNotifications } from './components/admin/AdminNotifications';
import { TeacherStudents } from './components/teacher/TeacherStudents';
import { StudentDashboard } from './components/student/StudentDashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <Navigate to="/admin/students" replace />,
  },
  {
    path: '/admin/students',
    element: (
      <DashboardLayout role="admin">
        <AdminStudents />
      </DashboardLayout>
    ),
  },
  {
    path: '/admin/teachers',
    element: (
      <DashboardLayout role="admin">
        <AdminTeachers />
      </DashboardLayout>
    ),
  },
  {
    path: '/admin/orders',
    element: (
      <DashboardLayout role="admin">
        <AdminOrders />
      </DashboardLayout>
    ),
  },
  {
    path: '/admin/products',
    element: (
      <DashboardLayout role="admin">
        <AdminProducts />
      </DashboardLayout>
    ),
  },
  {
    path: '/admin/notifications',
    element: (
      <DashboardLayout role="admin">
        <AdminNotifications />
      </DashboardLayout>
    ),
  },
  {
    path: '/teacher',
    element: <Navigate to="/teacher/students" replace />,
  },
  {
    path: '/teacher/students',
    element: (
      <DashboardLayout role="teacher">
        <TeacherStudents />
      </DashboardLayout>
    ),
  },
  {
    path: '/student',
    element: <StudentDashboard />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
