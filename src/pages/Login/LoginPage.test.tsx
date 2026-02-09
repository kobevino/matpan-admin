import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@/test/test-utils';
import { LoginPage } from './LoginPage';

// Mock the auth API
vi.mock('@/api/auth', () => ({
  authApi: {
    login: vi.fn(),
  },
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import { authApi } from '@/api/auth';

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login heading', () => {
    render(<LoginPage />);
    expect(screen.getByRole('heading', { name: '로그인', level: 1 })).toBeInTheDocument();
  });

  it('renders admin id input', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText('아이디')).toBeInTheDocument();
  });

  it('renders password input', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText('비밀번호')).toBeInTheDocument();
  });

  it('renders login button', () => {
    render(<LoginPage />);
    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
  });

  it('login button is disabled when fields are empty', () => {
    render(<LoginPage />);
    expect(screen.getByRole('button', { name: '로그인' })).toBeDisabled();
  });

  it('login button is enabled when fields are filled', async () => {
    const { user } = render(<LoginPage />);

    await user.type(screen.getByLabelText('아이디'), 'testadmin');
    await user.type(screen.getByLabelText('비밀번호'), 'password');

    expect(screen.getByRole('button', { name: '로그인' })).toBeEnabled();
  });

  it('shows error for invalid credentials', async () => {
    vi.mocked(authApi.login).mockRejectedValue(new Error('Invalid credentials'));

    const { user } = render(<LoginPage />);

    await user.type(screen.getByLabelText('아이디'), 'wrongadmin');
    await user.type(screen.getByLabelText('비밀번호'), 'wrongpassword');
    await user.click(screen.getByRole('button', { name: '로그인' }));

    await waitFor(() => {
      expect(screen.getByText('아이디 또는 비밀번호가 올바르지 않습니다.')).toBeInTheDocument();
    });
  });

  it('shows loading state during login', async () => {
    vi.mocked(authApi.login).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                data: { access_token: 'token' },
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {} as never,
              }),
            100,
          ),
        ),
    );

    const { user } = render(<LoginPage />);

    await user.type(screen.getByLabelText('아이디'), 'testadmin');
    await user.type(screen.getByLabelText('비밀번호'), 'password');
    await user.click(screen.getByRole('button', { name: '로그인' }));

    expect(screen.getByRole('button', { name: '로그인 중...' })).toBeDisabled();
  });
});
