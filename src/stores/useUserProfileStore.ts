import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  userProfile,
  userBalanceActionType,
  onBoardedType,
} from "../types";

export type UserProfileStore = {
  userProfile: userProfile | null;
  setUserProfile: (val: userProfile) => void;
  resetUser: () => void;
  setBalance: (val: number, action: userBalanceActionType) => void;
  setOnBoardingStatus: (val: onBoardedType) => void;
};

export const useUserProfileStore = create<UserProfileStore>()(
  persist(
    (set, get) => ({
      userProfile: null,
      setUserProfile: (val) => set({ userProfile: val }),
      resetUser: () => set({ userProfile: null }),
      setBalance: async (val, action) => {
        set((state) => {
          if (!state.userProfile) return state;

          const balanceChange = action === "increase" ? val : -val;

          return {
            userProfile: {
              ...state.userProfile,
              balance: state.userProfile.balance + balanceChange,
            },
          };
        });
      },
      setOnBoardingStatus: (val) => {
        const userProfile = get().userProfile as userProfile;
        const updated = {
          ...userProfile,
          onboardingComplete: val,
        };
        set({ userProfile: updated });
      },
    }),
    {
      name: "user-profile-storage",
      partialize: (state) => ({ userProfile: state.userProfile }),
    }
  )
);
