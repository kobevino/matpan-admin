import { render, screen } from '@/test/test-utils';
import { NavItem } from './NavItem';

describe('NavItem', () => {
  it('renders link with correct text', () => {
    render(<NavItem to="/dashboard" label="Dashboard" />);

    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
  });

  it('renders link with correct href', () => {
    render(<NavItem to="/users" label="Users" />);

    expect(screen.getByRole('link', { name: 'Users' })).toHaveAttribute('href', '/users');
  });

  it('applies active styles when route matches', () => {
    render(<NavItem to="/" label="Dashboard" />, { initialEntries: ['/'] });

    const link = screen.getByRole('link', { name: 'Dashboard' });
    expect(link).toHaveClass('bg-gray-700', 'text-white');
  });

  it('applies inactive styles when route does not match', () => {
    render(<NavItem to="/users" label="Users" />, { initialEntries: ['/'] });

    const link = screen.getByRole('link', { name: 'Users' });
    expect(link).toHaveClass('text-gray-300');
    expect(link).not.toHaveClass('bg-gray-700');
  });
});
