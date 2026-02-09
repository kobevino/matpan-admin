import { atom } from 'jotai';

export interface User {
  adminId: string;
}

export const userAtom = atom<User | null>(null);
export const isAuthenticatedAtom = atom((get) => get(userAtom) !== null);
