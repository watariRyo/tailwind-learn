import { client } from '@/lib/api-client';
import useSWR from 'swr';
import { ApiError } from '../models/api-error';
import { ClientFetchResponse, ClientSWRResponse } from '@/types';
import { GETHouseholdHistoryResponse } from '../models/householdHistory-response';
import { API_ENDPOINT } from '@/constants/api-endpoint';

async function getFetcher(key: string) {
  return await client<
    ClientFetchResponse<GETHouseholdHistoryResponse[], ApiError>
  >(key).then((res) => {
    return res;
  });
}

export function useGetHouseholdHistories(
  dateYM: string
): ClientSWRResponse<GETHouseholdHistoryResponse[], ApiError, boolean> {
  // json-serverの仕様上、妙なクエリになる
  const { data, error, isLoading, mutate } = useSWR(
    `/api/${API_ENDPOINT.HOUSEHOLD_HISTORIES}?date_lte=${dateYM}`,
    getFetcher
  );
  if (data instanceof ApiError) {
    return {
      data: [],
      error: error,
      isLoading: isLoading,
      mutate: mutate,
    };
  } else {
    return {
      data: data?.response,
      error: undefined,
      isLoading: isLoading,
      mutate: mutate,
    };
  }
}
