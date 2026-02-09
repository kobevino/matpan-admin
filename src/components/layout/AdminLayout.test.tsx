import { useSetAtom } from 'jotai';
import { Route, Routes } from 'react-router-dom';
import { userAtom } from '@/store/auth';
import { render, screen } from '@/test/test-utils';
import { AdminLayout } from './AdminLayout';

function SetupUser({ adminId }: { adminId: string }) {
  const setUser = useSetAtom(userAtom);
  setUser({ adminId });
  return null;
}

describe('AdminLayout', () => {
  beforeEach(() => {
    localStorage.setItem('accessToken', 'test-token');
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('redirects to /login when no accessToken', () => {
    localStorage.removeItem('accessToken');
    render(
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
        <Route element={<AdminLayout />}>
          <Route path="/" element={<div>Dashboard Content</div>} />
        </Route>
      </Routes>,
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

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

  it('displays admin id in header when logged in', () => {
    render(
      <Routes>
        <Route element={<AdminLayout />}>
          <Route
            path="/"
            element={
              <>
                <SetupUser adminId="testadmin" />
                <div>Dashboard Content</div>
              </>
            }
          />
        </Route>
      </Routes>,
    );

    expect(screen.getByText('testadmin')).toBeInTheDocument();
  });

  it('displays logout button when logged in', () => {
    render(
      <Routes>
        <Route element={<AdminLayout />}>
          <Route
            path="/"
            element={
              <>
                <SetupUser adminId="testadmin" />
                <div>Dashboard Content</div>
              </>
            }
          />
        </Route>
      </Routes>,
    );

    expect(screen.getByRole('button', { name: '로그아웃' })).toBeInTheDocument();
  });

  it('redirects to /login when logout button clicked', async () => {
    const { user } = render(
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
        <Route element={<AdminLayout />}>
          <Route
            path="/"
            element={
              <>
                <SetupUser adminId="testadmin" />
                <div>Dashboard Content</div>
              </>
            }
          />
        </Route>
      </Routes>,
    );

    await user.click(screen.getByRole('button', { name: '로그아웃' }));
    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(localStorage.getItem('accessToken')).toBeNull();
  });
});
