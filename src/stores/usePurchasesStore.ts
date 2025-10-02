import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { purchase } from "../types";

export type UserPurchasesStore = {
  purchases: purchase[] | [];
  setUserPurchases: (val: purchase[]) => void;
  addUserPurchase: (val: purchase) => void;
  resetUserPurchases: () => void;
};

export const useUserPurchasesStore = create<UserPurchasesStore>()(
  persist(
    (set, get) => ({
      purchases: [],
      setUserPurchases: (val) => set({ purchases: val }),
      resetUserPurchases: () => set({ purchases: [] }),
      addUserPurchase: (val) => {
        const { purchases } = get();
      },
    }),
    {
      name: "user-purchases-storage",
      partialize: (state) => ({ purchases: state.purchases }),
    }
  )
);
