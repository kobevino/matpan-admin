import { useAtom } from 'jotai';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { userAtom } from '@/store/auth';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function AdminLayout() {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    navigate('/login');
  };

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} onLogout={handleLogout} />
        <main className="flex-1 bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
