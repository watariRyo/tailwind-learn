import { client } from '@/lib/api-client';
import useSWR from 'swr';
import { ApiError } from './models/api-error';
import { ClientResponse } from '@/types';
import { GETCategoryResponse } from './models/category-response';

async function fetcher(key: string) {
  return await client<GETCategoryResponse[] | ApiError>(key).then((res) => {
    return res;
  });
}

export default function useGetCategories(): ClientResponse<
  GETCategoryResponse[],
  ApiError,
  Boolean
> {
  const res = useSWR('/api/categories', fetcher);
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
