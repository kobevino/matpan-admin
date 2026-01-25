import { createBrowserRouter } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { UsersPage } from './pages/Users/UsersPage';

export const router = createBrowserRouter([
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
