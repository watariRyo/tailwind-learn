import { API_ENDPOINT } from '@/constants/api-endpoint';
import { HTTP_STATUS_200, HTTP_STATUS_500 } from '@/constants/http-status';
import { client } from '@/lib/api-client';
import { auth } from '@/lib/auth';
import { ApiError } from '@/repository/models/api-error';
import { GETBalanceResponse } from '@/repository/models/balance-response';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await auth()
    const response = await client<GETBalanceResponse>(
      `${process.env.BACKEND_ENDPOINT}${API_ENDPOINT.BALANCE}`, {
        headers: {
          'Authorization': session!.accessToken,
          'OAuth-Provider': session!.provider
        }
      }
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
