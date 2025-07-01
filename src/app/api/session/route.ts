import { NextResponse } from 'next/server';
import { getServerAuthSession } from '@/lib/auth';

interface SessionResponse {
  user: any | null;
}

interface ErrorResponse {
  error: string;
  details?: string;
}

export async function GET(): Promise<NextResponse<SessionResponse | ErrorResponse>> {
  try {
    const session = await getServerAuthSession();

    // Retorna sempre status 200 com user null ou com dados
    return NextResponse.json({
      user: session?.user || null
    }, {
      status: 200
    });

  } catch (error) {
    console.error("Error fetching session:", error);

    return NextResponse.json({
      error: "Failed to fetch session",
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined
    }, {
      status: 500
    });
  }
}