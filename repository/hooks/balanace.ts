import { client } from '@/lib/api-client';
import { GETBalanceResponse } from '../models/balance-response';
import useSWRImmutable from 'swr/immutable';
import { ApiError } from '../models/api-error';
import { ClientFetchResponse, ClientSWRResponse, SelectPair } from '@/types';
import { API_ENDPOINT } from '@/constants/api-endpoint';

async function fetcher(key: string) {
  return await client<ClientFetchResponse<GETBalanceResponse[], ApiError>>(
    key
  ).then((res) => {
    return res;
  });
}

export function useGetBalance(): ClientSWRResponse<
  SelectPair[],
  ApiError,
  Boolean
> {
  const res = useSWRImmutable(`/api/${API_ENDPOINT.BALANCE}`, fetcher);

  if (!res.data) {
    return {
      data: undefined,
      error: res.error,
      isLoading: res.isLoading,
    };
  } else {
    const balanceSelectPair: SelectPair[] = [];
    const dataArray = res.data.response as unknown as GETBalanceResponse[];
    dataArray.forEach((item) => {
      balanceSelectPair.push({
        label: item.name,
        value: item.id.toString(),
      });
    });

    return {
      data: balanceSelectPair,
      error: undefined,
      isLoading: res.isLoading,
    };
  }
}
