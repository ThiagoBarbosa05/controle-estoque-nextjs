export type ConsignedHistory = {
  id: string;
  createdAt: Date | string;
  completedIn: Date;
  status: string;
  winesOnConsigned: {
    balance: number;
    count: number;
    wines: {
      id: string;
      name: string;
      price: number;
      type: string;
      country: string;
      size: string;
    };
  }[];
};

export interface GetConsignedHistoryResponse {
  consignedByCustomerId: ConsignedHistory[];
}
