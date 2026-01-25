import { render, screen } from '@/test/test-utils';
import { DashboardPage } from './DashboardPage';

describe('DashboardPage', () => {
  it('renders page title', () => {
    render(<DashboardPage />);

    expect(screen.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeInTheDocument();
  });

  it('renders three stat cards', () => {
    render(<DashboardPage />);

    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('Active Users')).toBeInTheDocument();
    expect(screen.getByText('New Users')).toBeInTheDocument();
  });

  it('renders stat values', () => {
    render(<DashboardPage />);

    expect(screen.getByText('1,234')).toBeInTheDocument();
    expect(screen.getByText('987')).toBeInTheDocument();
    expect(screen.getByText('56')).toBeInTheDocument();
  });

  it('stat cards have correct styling', () => {
    render(<DashboardPage />);

    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(3);
    for (const card of cards) {
      expect(card).toHaveClass('bg-white', 'rounded-lg', 'shadow', 'p-6');
    }
  });
});
