import type { NavItem } from './types';

export const sidebarNavItems: NavItem[] = [
  { label: 'Tableau de Bord', icon: 'dashboard', path: '/' },
  { label: 'Calendrier', icon: 'calendar_today', path: '/calendar' },
  { label: 'Clients', icon: 'group', path: '/clients' },
  { label: 'Équipe', icon: 'self_care', path: '/team', activeIconFill: true },
  { label: 'Services', icon: 'self_improvement', path: '/services', activeIconFill: true },
  { label: 'Analyses', icon: 'analytics', path: '/analytics' },
];

export const bottomNavItems: NavItem[] = [
  { label: 'Accueil', icon: 'home', path: '/', activeIconFill: true },
  { label: 'Agenda', icon: 'calendar_today', path: '/calendar' },
  { label: 'Clients', icon: 'group', path: '/clients' },
  { label: 'Services', icon: 'self_improvement', path: '/services' },
  { label: 'Plus', icon: 'menu', path: '/analytics' },
];
