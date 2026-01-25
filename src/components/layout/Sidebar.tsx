import { NavItem } from './NavItem';

export function Sidebar() {
  return (
    <nav className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-xl font-bold mb-8 px-4">Matpan Admin</h1>
      <ul className="space-y-2">
        <li>
          <NavItem to="/" label="Dashboard" />
        </li>
        <li>
          <NavItem to="/users" label="Users" />
        </li>
      </ul>
    </nav>
  );
}
