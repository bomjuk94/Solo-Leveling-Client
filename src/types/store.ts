import type { TagType } from "./tag";

export type StoreItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  stockCount: number | null;
  isRepeateable: true | false;
  tags: TagType;
  createdAt: string;
  updatedAt: string;
};
