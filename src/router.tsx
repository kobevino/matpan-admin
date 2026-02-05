import { createBrowserRouter } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { LoginPage } from './pages/Login/LoginPage';
import { UsersPage } from './pages/Users/UsersPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: '/',
        element: <DashboardPage />,
      },
      {
        path: '/users',
        element: <UsersPage />,
      },
    ],
  },
]);
