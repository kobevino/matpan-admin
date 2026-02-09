import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { LoginPage } from './pages/Login/LoginPage';
import { UsersPage } from './pages/Users/UsersPage';

const routes = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <AdminLayout />,
    children: [
      { path: '/', element: <DashboardPage /> },
      { path: '/users', element: <UsersPage /> },
    ],
  },
];

function renderWithRouter(initialEntries = ['/']) {
  const router = createMemoryRouter(routes, { initialEntries });
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

describe('App routing', () => {
  beforeEach(() => {
    localStorage.setItem('accessToken', 'test-token');
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('redirects to /login when no accessToken', () => {
    localStorage.removeItem('accessToken');
    renderWithRouter();
    expect(screen.getByRole('heading', { name: '로그인', level: 1 })).toBeInTheDocument();
  });

  it('renders the app title in sidebar', () => {
    renderWithRouter();
    expect(screen.getByText('Matpan Admin')).toBeInTheDocument();
  });

  it('renders Dashboard page by default', () => {
    renderWithRouter();
    expect(screen.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeInTheDocument();
  });

  it('renders Users page when navigating to /users', () => {
    renderWithRouter(['/users']);
    expect(screen.getByRole('heading', { name: 'Users', level: 1 })).toBeInTheDocument();
  });
});
