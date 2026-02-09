import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('http', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_API_URL', 'https://api.example.com');
    localStorage.clear();
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    localStorage.clear();
  });

  it('should create axios instance with correct baseURL', async () => {
    const { default: http } = await import('./http');

    expect(http.defaults.baseURL).toBe('https://api.example.com');
  });

  it('should set default Content-Type header', async () => {
    const { default: http } = await import('./http');

    expect(http.defaults.headers['Content-Type']).toBe('application/json');
  });

  it('should set timeout', async () => {
    const { default: http } = await import('./http');

    expect(http.defaults.timeout).toBe(10000);
  });

  describe('request interceptor', () => {
    it('should attach Authorization header when token exists', async () => {
      localStorage.setItem('accessToken', 'test-token-123');
      const { default: http } = await import('./http');

      // biome-ignore lint/suspicious/noExplicitAny: accessing internal axios handlers for testing
      const handlers = (http.interceptors.request as any).handlers;
      const config = await handlers[0].fulfilled({
        headers: {},
      });

      expect(config.headers.Authorization).toBe('Bearer test-token-123');
    });

    it('should not attach Authorization header when token does not exist', async () => {
      const { default: http } = await import('./http');

      // biome-ignore lint/suspicious/noExplicitAny: accessing internal axios handlers for testing
      const handlers = (http.interceptors.request as any).handlers;
      const config = await handlers[0].fulfilled({
        headers: {},
      });

      expect(config.headers.Authorization).toBeUndefined();
    });
  });

  describe('response interceptor', () => {
    it('should pass through successful responses', async () => {
      const { default: http } = await import('./http');
      const response = { data: { success: true }, status: 200 };

      // biome-ignore lint/suspicious/noExplicitAny: accessing internal axios handlers for testing
      const handlers = (http.interceptors.response as any).handlers;
      const result = await handlers[0].fulfilled(response);

      expect(result).toEqual(response);
    });

    it('should remove token and redirect on 401 error', async () => {
      localStorage.setItem('accessToken', 'test-token');
      const originalLocation = window.location.href;

      // Mock window.location
      const locationMock = { href: originalLocation };
      Object.defineProperty(window, 'location', {
        value: locationMock,
        writable: true,
      });

      const { default: http } = await import('./http');
      const error = { response: { status: 401 } };

      // biome-ignore lint/suspicious/noExplicitAny: accessing internal axios handlers for testing
      const handlers = (http.interceptors.response as any).handlers;
      await expect(handlers[0].rejected(error)).rejects.toEqual(error);

      expect(localStorage.getItem('accessToken')).toBeNull();
      expect(window.location.href).toBe('/login');
    });

    it('should reject other errors without redirect', async () => {
      const { default: http } = await import('./http');
      const error = { response: { status: 500 } };

      // biome-ignore lint/suspicious/noExplicitAny: accessing internal axios handlers for testing
      const handlers = (http.interceptors.response as any).handlers;
      await expect(handlers[0].rejected(error)).rejects.toEqual(error);
    });
  });
});
