import { AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react'; // lucide-react 아이콘 활용
import { type FormEvent, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useLoginMutation } from '@/queries/useAuthMutation';

export function LoginPage() {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* p-4: 모바일에서 화면 끝에 박스가 붙지 않도록 여백 추가 */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-10">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Login</h1>
          <p className="text-gray-500 mt-2 text-sm">시스템 관리를 위해 로그인</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <Input
            label="아이디"
            id="adminId"
            placeholder="아이디를 입력하세요"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
          />

          <div className="relative">
            <Input
              label="비밀번호"
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* 비밀번호 토글 버튼 */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-600 text-sm animate-in fade-in slide-in-from-top-1">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={!isFormValid || mutation.isPending}
            className={`
              w-full h-12 text-lg font-semibold shadow-md transition-all duration-200
              /* 커스텀 테마 적용 */
              bg-brand hover:bg-brand-hover text-white
              /* 클릭 및 포커스 상태 */
              active:scale-[0.98] focus:ring-4 focus:ring-brand/30 outline-none
              /* 비활성화 상태 (로딩 중이거나 입력값이 없을 때) */
              disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none
            `}
          >
            {mutation.isPending ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" size={20} strokeWidth={3} />
                <span>인증 확인 중...</span>
              </div>
            ) : (
              '로그인'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
