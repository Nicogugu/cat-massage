import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { AnalyticsPage } from './pages/analytics/AnalyticsPage';
import { ClientsPage } from './pages/clients/ClientsPage';
import { TeamPage } from './pages/team/TeamPage';
import { CalendarPage } from './pages/calendar/CalendarPage';
import { ServicesPage } from './pages/services/ServicesPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/services" element={<ServicesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
