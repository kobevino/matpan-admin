import { NavLink } from 'react-router-dom';

interface NavItemProps {
  to: string;
  label: string;
}

export function NavItem({ to, label }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-2 rounded-md transition-colors ${
          isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800'
        }`
      }
    >
      {label}
    </NavLink>
  );
}
