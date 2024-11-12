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
  boolean
> {
  const { data, error, isLoading } = useSWRImmutable(
    `/api/${API_ENDPOINT.BALANCE}`,
    fetcher
  );

  if (!data) {
    return {
      data: undefined,
      error: error,
      isLoading: isLoading,
      mutate: undefined,
    };
  } else {
    const balanceSelectPair: SelectPair[] = [];
    const dataArray = data.response as unknown as GETBalanceResponse[];
    dataArray.forEach((item) => {
      balanceSelectPair.push({
        label: item.name,
        value: item.id.toString(),
      });
    });

    return {
      data: balanceSelectPair,
      error: undefined,
      isLoading: isLoading,
      mutate: undefined,
    };
  }
}
