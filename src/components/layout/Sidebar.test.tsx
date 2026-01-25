import { render, screen } from '@/test/test-utils';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  it('renders app title', () => {
    render(<Sidebar />);

    expect(screen.getByText('Matpan Admin')).toBeInTheDocument();
  });

  it('renders Dashboard navigation link', () => {
    render(<Sidebar />);

    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/');
  });

  it('renders Users navigation link', () => {
    render(<Sidebar />);

    expect(screen.getByRole('link', { name: 'Users' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Users' })).toHaveAttribute('href', '/users');
  });

  it('has correct sidebar styling', () => {
    render(<Sidebar />);

    const sidebar = screen.getByRole('navigation');
    expect(sidebar).toHaveClass('w-64', 'bg-gray-900', 'text-white');
  });
});
