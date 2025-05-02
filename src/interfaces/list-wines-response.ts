export type Wine = {
  id: string;
  name: string;
  harvest: number;
  type: string;
  price: number;
  producer: string;
  country: string;
  size: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export interface ListWinesResponse {
  wines: Wine[];
}
