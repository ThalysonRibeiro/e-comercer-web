"use server"
import { NextResponse } from 'next/server';
import { getServerAuthSession } from '@/lib/auth';

export async function GET() {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user: session.user });
}