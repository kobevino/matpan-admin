import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
}
