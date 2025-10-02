export type onBoardedType = false | true;
type themeType = "light" | "dark";

export type userProfile = {
  username: string;
  onBoarded: onBoardedType;
  createdAt: string;
  lastActive: string;
  theme: themeType;
  balance: number;
};

export type userBalanceActionType = "increase" | "decrease";
