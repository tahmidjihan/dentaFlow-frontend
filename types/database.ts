/**
 * DentaWave Database Types
 * Aligned with Prisma schema definitions
 */

export type Role = 'USER' | 'ADMIN' | 'DOCTOR';
export type AppointStatus = 'BOOKED' | 'DONE' | 'CANCELLED';
export type PaymentStatus = 'pending' | 'paid' | 'failed';
export type ClinicStatus = 'open' | 'closed';

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
  clinicId: string | null;
}

export interface Clinic {
  id: string;
  name: string;
  status: ClinicStatus;
  email: string;
  phone: string;
  location: string;
  address?: string;
  createdAt: Date;
}

export interface Appointment {
  id: string;
  status: AppointStatus;
  date: Date;
  createdAt: Date;
  userId: string;
  doctorId: string;
  clinicId: string;
  user?: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
  doctor?: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
  clinic?: {
    id: string;
    name: string;
    address?: string;
  };
}

export interface Payment {
  id: string;
  stripeSessionId: string;
  amount: number; // Amount in cents
  currency: string;
  status: PaymentStatus;
  createdAt: Date;
  appointmentId: string;
}

export interface Session {
  id: string;
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress: string | null;
  userAgent: string | null;
  userId: string;
}

export interface Account {
  id: string;
  accountId: string;
  providerId: string;
  userId: string;
  accessToken: string | null;
  refreshToken: string | null;
  idToken: string | null;
  accessTokenExpiresAt: Date | null;
  refreshTokenExpiresAt: Date | null;
  scope: string | null;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Verification {
  id: string;
  identifier: string;
  value: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Extended types for UI components
export interface Doctor extends User {
  title: string;
  specialty: string;
  experience: number;
  rating: number;
  reviewCount: number;
  available: boolean;
  nextAvailability: string;
}

export interface AppointmentWithDetails extends Appointment {
  user: User;
  doctor: Doctor;
  clinic: Clinic;
  payment?: Payment | null;
}

export interface ClinicWithDetails extends Clinic {
  doctors: Doctor[];
  appointments: Appointment[];
}

// Clinic management types for doctor dashboard
export interface ClinicMembership {
  clinicId: string;
  doctorId: string;
  role: 'OWNER' | 'MEMBER';
  joinedAt: string;
}

export interface ClinicExtended extends Clinic {
  description?: string;
  address: string;
  addressLine2?: string;
  city: string;
  state?: string;
  country: string;
  postalCode: string;
  specialty: string;
  doctorCount: number;
  members?: ClinicMembership[];
}
