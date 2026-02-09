import http from '@/utils/http';

export interface LoginRequest {
  admin_id: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export const authApi = {
  login: (data: LoginRequest) => http.post<LoginResponse>('/admins/login', data),
};
