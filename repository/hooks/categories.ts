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
  boolean
> {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/${API_ENDPOINT.CATEGORIES}`,
    fetcher
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
