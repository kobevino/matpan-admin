import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { Header } from './Header';

describe('Header', () => {
  it('renders header element', () => {
    render(<Header user={null} onLogout={() => {}} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('displays admin id when logged in', () => {
    const user = { adminId: 'testadmin' };
    render(<Header user={user} onLogout={() => {}} />);
    expect(screen.getByText('testadmin')).toBeInTheDocument();
  });

  it('displays logout button when logged in', () => {
    const user = { adminId: 'testadmin' };
    render(<Header user={user} onLogout={() => {}} />);
    expect(screen.getByRole('button', { name: '로그아웃' })).toBeInTheDocument();
  });

  it('calls onLogout when logout button clicked', async () => {
    const handleLogout = vi.fn();
    const user = { adminId: 'testadmin' };
    const { user: userEvent } = render(<Header user={user} onLogout={handleLogout} />);

    await userEvent.click(screen.getByRole('button', { name: '로그아웃' }));
    expect(handleLogout).toHaveBeenCalledTimes(1);
  });

  it('does not display user info when not logged in', () => {
    render(<Header user={null} onLogout={() => {}} />);
    expect(screen.queryByRole('button', { name: '로그아웃' })).not.toBeInTheDocument();
  });
});
