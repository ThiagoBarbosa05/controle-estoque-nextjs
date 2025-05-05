export type CustomerSummary = {
  customerId: string;
  customer: string;
  totalTypes: number;
  totalBalance: number;
};

export interface ListCustomerSummaryResponse {
  summary: CustomerSummary[];
}
