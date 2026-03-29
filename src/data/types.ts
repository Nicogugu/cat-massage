export interface Appointment {
  id: string;
  clientName: string;
  service: string;
  therapistName: string;
  date: string;
  startTime: string;
  duration: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  color: string;
}

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  lastVisit: string;
  totalVisits: number;
  preferredServices: string[];
  loyaltyStatus: 'gold' | 'silver' | 'bronze' | 'new';
  notes: string;
}

export interface Therapist {
  id: string;
  name: string;
  title: string;
  specializations: string[];
  avatarUrl: string;
  rating: number;
  reviewCount: number;
  availability: 'available' | 'busy' | 'off';
  certifications: string[];
  bio: string;
}

export interface Service {
  id: string;
  name: string;
  category: 'Rituels Signature' | 'Wellness Experiences' | 'Express';
  description: string;
  duration: number;
  price: number;
  imageUrl: string;
  benefits: string[];
  featured: boolean;
}

export interface KpiData {
  dailyRevenue: number;
  revenueChange: number;
  confirmedAppointments: number;
  totalSlots: number;
  occupancyRate: number;
  totalClients: number;
  newClientsMonth: number;
  loyaltyRate: number;
}

export interface NavItem {
  label: string;
  icon: string;
  path: string;
  activeIconFill?: boolean;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  forecast?: number;
}
