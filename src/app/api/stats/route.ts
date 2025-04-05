// app/api/stats/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const [
      totalRides,
      totalDrivers,
      totalUsers,
      completedRides,
      pendingRides,
      recentRides,
      totalRevenue
    ] = await Promise.all([
      prisma.rides.count(),
      prisma.drivers.count(),
      prisma.users.count(),
      prisma.rides.count({
        where: { status: true }
      }),
      prisma.rides.count({
        where: { status: false }
      }),
      prisma.rides.findMany({
        take: 5,
        orderBy: { created_at: 'desc' },
        include: {
          driver: true,
          user: true
        }
      }),
      prisma.rides.aggregate({
        where: { payment_status: 'COMPLETED' },
        _sum: {
          fare_price: true
        }
      })
    ]);

    return NextResponse.json({
      totalRides,
      totalDrivers,
      totalUsers,
      completedRides: completedRides || 0,
      pendingRides: pendingRides || 0,
      totalRevenue: totalRevenue._sum.fare_price || 0,
      recentRides
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}