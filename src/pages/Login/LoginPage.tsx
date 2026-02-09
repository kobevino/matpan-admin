import { type FormEvent, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useLoginMutation } from '@/queries/useAuthMutation';

export function LoginPage() {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const mutation = useLoginMutation();

  const isFormValid = adminId.length > 0 && password.length > 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    mutation.mutate(
      { admin_id: adminId, password },
      {
        onError: () => {
          setError('아이디 또는 비밀번호가 올바르지 않습니다.');
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold text-center mb-6">로그인</h1>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input
            label="아이디"
            id="adminId"
            type="text"
            placeholder="아이디를 입력하세요"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            required
          />
          <Input
            label="비밀번호"
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" disabled={!isFormValid || mutation.isPending} className="w-full">
            {mutation.isPending ? '로그인 중...' : '로그인'}
          </Button>
        </form>
      </div>
    </div>
  );
}
