// app/api/rides/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const rides = await prisma.rides.findMany({
      include: {
        driver: true,
        user: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    
    return NextResponse.json(rides);
  } catch (error) {
    console.error('Error fetching rides:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}