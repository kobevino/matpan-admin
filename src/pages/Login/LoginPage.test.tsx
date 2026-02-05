import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@/test/test-utils';
import { LoginPage } from './LoginPage';

describe('LoginPage', () => {
  it('renders login heading', () => {
    render(<LoginPage />);
    expect(screen.getByRole('heading', { name: '로그인', level: 1 })).toBeInTheDocument();
  });

  it('renders email input', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText('이메일')).toBeInTheDocument();
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

    await user.type(screen.getByLabelText('이메일'), 'test@test.com');
    await user.type(screen.getByLabelText('비밀번호'), 'password');

    expect(screen.getByRole('button', { name: '로그인' })).toBeEnabled();
  });

  it('shows error for invalid email format', async () => {
    const { user } = render(<LoginPage />);

    await user.type(screen.getByLabelText('이메일'), 'invalid-email');
    await user.type(screen.getByLabelText('비밀번호'), 'password');
    await user.click(screen.getByRole('button', { name: '로그인' }));

    await waitFor(() => {
      expect(screen.getByText('올바른 이메일 형식이 아닙니다.')).toBeInTheDocument();
    });
  });

  it('shows error for invalid credentials', async () => {
    const { user } = render(<LoginPage />);

    await user.type(screen.getByLabelText('이메일'), 'wrong@test.com');
    await user.type(screen.getByLabelText('비밀번호'), 'wrongpassword');
    await user.click(screen.getByRole('button', { name: '로그인' }));

    await waitFor(() => {
      expect(screen.getByText('이메일 또는 비밀번호가 올바르지 않습니다.')).toBeInTheDocument();
    });
  });
});
