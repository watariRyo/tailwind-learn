import { client } from '@/lib/api-client';
import { ApiError } from '@/repository/models/api-error';
import { GETBalanceResponse } from '@/repository/models/balance-response';
import { NextRequest } from 'next/server';

const getDateLteParam = 'date_lte';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const dateLteQuery = params.get(getDateLteParam);
  const response = await client<GETBalanceResponse>(
    `http://localhost:4000/householdHistories?${getDateLteParam}=${dateLteQuery}`
  );

  return Response.json(response);
}
