import { useAtom } from 'jotai';
import { Outlet } from 'react-router-dom';
import { userAtom } from '@/store/auth';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function AdminLayout() {
  const [user, setUser] = useAtom(userAtom);

  const handleLogout = () => {
    setUser(null);
  };

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
