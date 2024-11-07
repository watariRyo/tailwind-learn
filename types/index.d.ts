import { ApiError } from '@/repository/models/api-error';

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
  };
};

export type SelectPair = {
  value: string;
  label: string;
};

export type ErrorResponseSchema = {
  stauts: number;
  code?: string;
  message: string;
};

export type Household = {
  id: number;
  userId: number;
  amount: number;
  date: string;
  balance: 'income' | 'expenditure';
  category: string;
  content: string;
};

export interface ClientResponse<Data = any, Error = ApiError, Config = any> {
  data: BlockingData<Data, Config> extends true ? Data : Data | undefined;
  error: ApiError | undefined;
  isLoading: IsLoadingResponse<Data, Config>;
}
