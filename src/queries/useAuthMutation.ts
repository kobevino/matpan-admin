import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { authApi, type LoginRequest } from '@/api/auth';
import { userAtom } from '@/store/auth';

export function useLoginMutation() {
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response, variables) => {
      localStorage.setItem('accessToken', response.data.access_token);
      setUser({ adminId: variables.admin_id });
      navigate('/');
    },
  });
}
