"use server"
import { NextResponse } from 'next/server';
import { getServerAuthSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      return NextResponse.json({ user: null });
    }
    return NextResponse.json({ user: session.user });
  } catch (error) {
    console.error("Error fetching session:", error);
    return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 });
  }
}