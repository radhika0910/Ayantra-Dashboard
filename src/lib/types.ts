// lib/types.ts
export interface Driver {
  id: number;
  first_name: string;
  last_name: string;
  profile_image_url: string | null;
  car_image_url: string | null;
  car_seats: number;
  rating: number | null;
  rides?: Ride[];
}

export interface Ride {
  ride_id: number;
  origin_address: string;
  destination_address: string;
  origin_latitude: number;
  origin_longitude: number;
  destination_latitude: number;
  destination_longitude: number;
  ride_time: number;
  fare_price: number;
  payment_status: string;
  driver_id: number | null;
  user_id: string;
  status: boolean | null;
  created_at: string;
  driver?: Driver;
  user?: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  clerk_id: string;
  role: string;
  verified: boolean | null;
  rides?: Ride[];
}

export interface DashboardStats {
  totalRides: number;
  totalDrivers: number;
  totalUsers: number;
  totalRevenue: number;
  completedRides: number;
  pendingRides: number;
  recentRides: Ride[];
}