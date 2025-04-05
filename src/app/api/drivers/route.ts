import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 🟢 Handle GET requests - Fetch all drivers
export async function GET() {
  try {
    const existingDrivers = await prisma.drivers.findMany();
    const driverUsers = await prisma.users.findMany({
      where: { role: 'driver' },
    });

    return NextResponse.json({ existingDrivers, driverUsers });
  } catch (error) {
    console.error('Error fetching drivers:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// 🟢 Handle POST requests - Verify driver and add to drivers table
export async function POST(req: NextRequest) {
  try {
    const { userId, verified } = await req.json();

    // Update user's verification status
    await prisma.users.update({
      where: { id: userId },
      data: { verified },
    });

    // If verified, ensure driver is added to `drivers` table
    if (verified) {
      const user = await prisma.users.findUnique({ where: { id: userId } });

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      // Use `upsert` to avoid duplicates
      await prisma.drivers.upsert({
        where: { id: userId },
        update: {},
        create: {
          id: userId,
          first_name: user.name.split(' ')[0] || 'Unknown',
          last_name: user.name.split(' ')[1] || '',
          profile_image_url: 'https://example.com/default-profile.png', // Replace with actual default
          car_image_url: null,
          car_seats: 4,
          rating: 0.0,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error verifying driver:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
