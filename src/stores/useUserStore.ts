import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { StoreItem } from "../types";

export type UserStore = {
  store: StoreItem[] | [];
  setUserStore: (val: StoreItem[]) => void;
  addUserStoreItem: (val: StoreItem) => void;
  resetUserStore: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      store: [],
      setUserStore: (val) => set({ store: val }),
      addUserStoreItem: (val) => {
        const { store } = get();
      },
      resetUserStore: () => set({ store: [] }),
    }),
    {
      name: "user-store-storage",
      partialize: (state) => ({ store: state.store }),
    }
  )
);
