import { client } from '@/lib/api-client';
import { ClientFetchResponse } from '@/types';
import { ApiError } from './models/api-error';
import { API_ENDPOINT } from '@/constants/api-endpoint';

async function deleteFetcher(key: string) {
  return await client<any>(key, {
    method: 'DELETE',
  }).then((res) => res);
}

export async function deleteHouseholdHistories(
  id: number
): Promise<ClientFetchResponse<any, ApiError>> {
  try {
    await deleteFetcher(`/api/${API_ENDPOINT.HOUSEHOLD_HISTORIES}/${id}`);
    return {
      response: {},
      error: undefined,
    };
  } catch (error) {
    return {
      response: {},
      error: error as ApiError,
    };
  }
}
