import { atom } from 'jotai';

export interface User {
  email: string;
  name: string;
}

export const userAtom = atom<User | null>(null);
export const isAuthenticatedAtom = atom((get) => get(userAtom) !== null);
