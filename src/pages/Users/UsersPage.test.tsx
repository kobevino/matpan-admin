import { render, screen } from '@/test/test-utils';
import { UsersPage } from './UsersPage';

describe('UsersPage', () => {
  it('renders page title', () => {
    render(<UsersPage />);

    expect(screen.getByRole('heading', { name: 'Users', level: 1 })).toBeInTheDocument();
  });

  it('renders empty state message', () => {
    render(<UsersPage />);

    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('renders empty state description', () => {
    render(<UsersPage />);

    expect(screen.getByText('Get started by adding a new user.')).toBeInTheDocument();
  });
});
