import create from "zustand";
import { persist } from "zustand/middleware";


export interface IRoleStore {
  isAdmin: boolean
  setIsAdmin: (_isAdmin: boolean) => void
}


export const useRoleStore = create<IRoleStore>((set) => ({
  isAdmin: false,
  setIsAdmin: (_isAdmin: boolean) =>
    set(() => {
      return { isAdmin: _isAdmin };
    }),
}));



