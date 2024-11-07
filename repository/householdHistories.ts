import { client } from '@/lib/api-client';
import useSWR from 'swr';
import { ApiError } from './models/api-error';
import { ClientResponse } from '@/types';
import { GETHouseholdHistoryResponse } from './models/householdHistory-response';

async function fetcher(key: string) {
  return await client<GETHouseholdHistoryResponse[] | ApiError>(key).then(
    (res) => {
      return res;
    }
  );
}

export default function useGetHouseholdHistories(
  dateYM: string
): ClientResponse<GETHouseholdHistoryResponse[], ApiError, Boolean> {
  // json-serverの仕様上、妙なクエリになる
  const res = useSWR('/api/householdHistories?date_lte=202302', fetcher);
  if (res.data instanceof ApiError) {
    return {
      data: [],
      error: res.data,
      isLoading: res.isLoading,
    };
  } else {
    return {
      data: res.data,
      error: undefined,
      isLoading: res.isLoading,
    };
  }
}
