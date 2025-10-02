import type { TagType } from "./tag";

export type currencyType = "xp" | "gem";

export type purchase = {
  id: string;
  timestamp: string;
  itemId: string;
  itemName: string;
  quantity: number;
  purchasePrice: number;
  currency: currencyType;
  totalPrice: number;
  tags: TagType[];
};
