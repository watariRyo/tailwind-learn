import { client } from '@/lib/api-client';
import { GETBalanceResponse } from './models/balance-response';
import useSWR from 'swr';
import { ApiError } from './models/api-error';
import { ClientResponse, SelectPair } from '@/types';

async function fetcher(key: string) {
  return await client<GETBalanceResponse[] | ApiError>(key).then((res) => {
    return res;
  });
}

export default function useGetBalance(): ClientResponse<
  SelectPair[],
  ApiError,
  Boolean
> {
  const res = useSWR('/api/balance', fetcher);
  if (res.data instanceof ApiError) {
    return {
      data: [],
      error: res.data,
      isLoading: res.isLoading,
    };
  } else {
    const balanceSelectPair: SelectPair[] = [];
    res.data
      ? res.data.forEach((item) => {
          balanceSelectPair.push({
            label: item.name,
            value: item.id.toString(),
          });
        })
      : [];
    return {
      data: balanceSelectPair,
      error: undefined,
      isLoading: res.isLoading,
    };
  }
}
