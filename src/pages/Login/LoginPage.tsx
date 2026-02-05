import { useSetAtom } from 'jotai';
import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { userAtom } from '@/store/auth';

const MOCK_CREDENTIALS = {
  email: 'admin@matpan.com',
  password: 'admin123',
};

const MOCK_USER = {
  email: 'admin@matpan.com',
  name: '관리자',
};

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  const isFormValid = email.length > 0 && password.length > 0;

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isValidEmail(email)) {
      setError('올바른 이메일 형식이 아닙니다.');
      return;
    }

    if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
      setUser(MOCK_USER);
      navigate('/');
    } else {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold text-center mb-6">로그인</h1>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input
            label="이메일"
            id="email"
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <Button type="submit" disabled={!isFormValid} className="w-full">
            로그인
          </Button>
        </form>
      </div>
    </div>
  );
}
