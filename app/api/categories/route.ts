import { API_ENDPOINT } from '@/constants/api-endpoint';
import { HTTP_STATUS_200, HTTP_STATUS_500 } from '@/constants/http-status';
import { client } from '@/lib/api-client';
import { ApiError } from '@/repository/models/api-error';
import { GETBalanceResponse } from '@/repository/models/balance-response';
import { GETCategoryResponse } from '@/repository/models/category-response';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await client<GETCategoryResponse>(
      `http://localhost:4000/${API_ENDPOINT.CATEGORIES}`
    );

    return NextResponse.json(
      {
        response,
      },
      {
        status: HTTP_STATUS_200.OK,
      }
    );
  } catch (error) {
    if (error instanceof ApiError) {
      const err = error as ApiError;
      return NextResponse.json(
        {
          err,
        },
        {
          status: err.status,
        }
      );
    } else {
      return NextResponse.json(
        {
          error,
        },
        {
          status: HTTP_STATUS_500.INTERNAL_SERVER_ERROR,
        }
      );
    }
  }
}
