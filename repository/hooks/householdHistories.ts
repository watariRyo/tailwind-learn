import { client } from '@/lib/api-client';
import useSWR, { mutate } from 'swr';
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
): ClientSWRResponse<GETHouseholdHistoryResponse[], ApiError, Boolean> {
  // json-serverの仕様上、妙なクエリになる
  const res = useSWR(
    `/api/${API_ENDPOINT.HOUSEHOLD_HISTORIES}?date_lte=${dateYM}`,
    getFetcher
  );
  if (res.data instanceof ApiError) {
    return {
      data: [],
      error: res.error,
      isLoading: res.isLoading,
    };
  } else {
    return {
      data: res.data?.response,
      error: undefined,
      isLoading: res.isLoading,
    };
  }
}

export function mutateHouseholdHistories(
  data: GETHouseholdHistoryResponse[],
  dateYM: string
) {
  mutate(
    `/api/${API_ENDPOINT.HOUSEHOLD_HISTORIES}?date_lte=${dateYM}`,
    data,
    false
  );
}
