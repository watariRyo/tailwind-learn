export type GETHouseholdHistoryResponse = {
  id: number;
  userId: number;
  amount: number;
  date: string;
  balance: 'income' | 'expenditure';
  category: string;
  content: string;
};
