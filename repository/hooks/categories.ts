import { client } from '@/lib/api-client';
import useSWR from 'swr';
import { ApiError } from '../models/api-error';
import { ClientFetchResponse, ClientSWRResponse } from '@/types';
import { GETCategoryResponse } from '../models/category-response';
import { API_ENDPOINT } from '@/constants/api-endpoint';

async function fetcher(key: string) {
  return await client<ClientFetchResponse<GETCategoryResponse[], ApiError>>(
    key
  ).then((res) => {
    return res;
  });
}

export function useGetCategories(): ClientSWRResponse<
  GETCategoryResponse[],
  ApiError,
  Boolean
> {
  const res = useSWR(`/api/${API_ENDPOINT.CATEGORIES}`, fetcher);
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
