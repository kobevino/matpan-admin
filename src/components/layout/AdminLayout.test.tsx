import { Route, Routes } from 'react-router-dom';
import { render, screen } from '@/test/test-utils';
import { AdminLayout } from './AdminLayout';

describe('AdminLayout', () => {
  it('renders sidebar', () => {
    render(
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<div>Dashboard Content</div>} />
        </Route>
      </Routes>,
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Matpan Admin')).toBeInTheDocument();
  });

  it('renders outlet content', () => {
    render(
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<div>Dashboard Content</div>} />
        </Route>
      </Routes>,
    );

    expect(screen.getByText('Dashboard Content')).toBeInTheDocument();
  });

  it('has correct layout structure', () => {
    render(
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<div>Dashboard Content</div>} />
        </Route>
      </Routes>,
    );

    const mainContent = screen.getByRole('main');
    expect(mainContent).toHaveClass('flex-1', 'bg-gray-100', 'p-6');
  });
});
