import { useSetAtom } from 'jotai';
import { Route, Routes } from 'react-router-dom';
import { userAtom } from '@/store/auth';
import { render, screen } from '@/test/test-utils';
import { AdminLayout } from './AdminLayout';

function SetupUser({ email, name }: { email: string; name: string }) {
  const setUser = useSetAtom(userAtom);
  setUser({ email, name });
  return null;
}

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

  it('renders header', () => {
    render(
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<div>Dashboard Content</div>} />
        </Route>
      </Routes>,
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('displays user name in header when logged in', () => {
    render(
      <Routes>
        <Route element={<AdminLayout />}>
          <Route
            path="/"
            element={
              <>
                <SetupUser email="test@test.com" name="Test User" />
                <div>Dashboard Content</div>
              </>
            }
          />
        </Route>
      </Routes>,
    );

    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('displays logout button when logged in', () => {
    render(
      <Routes>
        <Route element={<AdminLayout />}>
          <Route
            path="/"
            element={
              <>
                <SetupUser email="test@test.com" name="Test User" />
                <div>Dashboard Content</div>
              </>
            }
          />
        </Route>
      </Routes>,
    );

    expect(screen.getByRole('button', { name: '로그아웃' })).toBeInTheDocument();
  });

  it('clears user when logout button clicked', async () => {
    const { user } = render(
      <Routes>
        <Route element={<AdminLayout />}>
          <Route
            path="/"
            element={
              <>
                <SetupUser email="test@test.com" name="Test User" />
                <div>Dashboard Content</div>
              </>
            }
          />
        </Route>
      </Routes>,
    );

    await user.click(screen.getByRole('button', { name: '로그아웃' }));
    expect(screen.queryByRole('button', { name: '로그아웃' })).not.toBeInTheDocument();
  });
});
