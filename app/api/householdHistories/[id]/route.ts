import { API_ENDPOINT } from '@/constants/api-endpoint';
import { HTTP_STATUS_200, HTTP_STATUS_500 } from '@/constants/http-status';
import { client } from '@/lib/api-client';
import { ApiError } from '@/repository/models/api-error';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = (await params).id;
    const response = await client<any>(
      `http://localhost:4000/${API_ENDPOINT.HOUSEHOLD_HISTORIES}/${id}`,
      {
        method: 'DELETE',
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
