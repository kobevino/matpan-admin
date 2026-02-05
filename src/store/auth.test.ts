import { createStore } from 'jotai';
import { describe, expect, it } from 'vitest';
import { isAuthenticatedAtom, userAtom } from './auth';

describe('auth store', () => {
  it('userAtom should have null as initial value', () => {
    const store = createStore();
    expect(store.get(userAtom)).toBeNull();
  });

  it('isAuthenticatedAtom should be false when user is null', () => {
    const store = createStore();
    expect(store.get(isAuthenticatedAtom)).toBe(false);
  });

  it('isAuthenticatedAtom should be true when user exists', () => {
    const store = createStore();
    store.set(userAtom, { email: 'test@test.com', name: 'Test User' });
    expect(store.get(isAuthenticatedAtom)).toBe(true);
  });
});
