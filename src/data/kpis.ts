import type { KpiData, MonthlyRevenue } from './types';

export const kpiData: KpiData = {
  dailyRevenue: 1240,
  revenueChange: 12,
  confirmedAppointments: 14,
  totalSlots: 18,
  occupancyRate: 88,
  totalClients: 1284,
  newClientsMonth: 42,
  loyaltyRate: 88,
};

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: 'Jan', revenue: 18400, forecast: 14200 },
  { month: 'Fev', revenue: 21200, forecast: 16800 },
  { month: 'Mar', revenue: 19800, forecast: 17500 },
  { month: 'Avr', revenue: 24600, forecast: 19200 },
  { month: 'Mai', revenue: 26100, forecast: 21000 },
  { month: 'Jun', revenue: 28900, forecast: 23400 },
  { month: 'Jul', revenue: 32400, forecast: 26800 },
  { month: 'Aou', revenue: 30800, forecast: 28100 },
  { month: 'Sep', revenue: 27500, forecast: 24600 },
  { month: 'Oct', revenue: 29300, forecast: 25900 },
  { month: 'Nov', revenue: 31200, forecast: 27300 },
  { month: 'Dec', revenue: 34800, forecast: 30100 },
];
