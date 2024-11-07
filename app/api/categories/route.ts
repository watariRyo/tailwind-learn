import { client } from '@/lib/api-client';
import { ApiError } from '@/repository/models/api-error';
import { GETBalanceResponse } from '@/repository/models/balance-response';

export async function GET() {
  const response = await client<GETBalanceResponse>(
    'http://localhost:4000/categories'
  );

  return Response.json(response);
}
