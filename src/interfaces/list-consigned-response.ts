export type Consigned = {
  id: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  customer: {
    id: string;
    name: string;
  };
  totalBalance: number;
};

export interface ListConsignedResponse {
  consigned: Consigned[];
}
