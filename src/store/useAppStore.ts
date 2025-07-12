//  src/store/useAppStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './mmkvStorage';   // ← our safe wrapper ✅

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
export type User = {
  id?:    string;
  name?:  string;
  email?: string;
  walletAddress?: string;
};

type AppState = {
  user?: User;
  _hasHydrated: boolean;

  /* setters -------------------------------------------------------- */
  setUser   : (u: Partial<User> | ((prev?: User) => User)) => void;
  resetUser : () => void;
};

/* ------------------------------------------------------------------ */
/* Store                                                               */
/* ------------------------------------------------------------------ */
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: undefined,
      _hasHydrated: false,

      /* merge-patch or functional update */
      setUser: (patch) =>
        set((state) => ({
          user:
            typeof patch === 'function'
              ? patch(state.user)
              : { ...state.user, ...patch },
        })),

      resetUser: () => set({ user: undefined }),
    }),
    {
      name: 'trev-mobile',                                // storage key
      storage: createJSONStorage(() => mmkvStorage),      // ← MMKV backend
      partialize: (s) => ({ user: s.user }),              // persist only `user`
      onRehydrateStorage: () => (s) => {
        /* signal to UI that hydration finished */
        if (s) s._hasHydrated = true;
      },
    },
  ),
);
