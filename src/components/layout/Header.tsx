import { Button } from '@/components/ui/Button';
import type { User } from '@/store/auth';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

export function Header({ user, onLogout }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6">
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-gray-700">{user.adminId}</span>
          <Button onClick={onLogout} variant="secondary">
            로그아웃
          </Button>
        </div>
      )}
    </header>
  );
}
