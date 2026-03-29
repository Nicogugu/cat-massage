import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/sidebar/Sidebar';
import { Header } from '../components/header/Header';
import { BottomNav } from '../components/bottom-nav/BottomNav';

export function AppLayout() {
  return (
    <div className="bg-surface text-on-surface min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        {/* Desktop Header */}
        <div className="hidden lg:block">
          <Header />
        </div>

        {/* Mobile Header */}
        <header className="lg:hidden bg-sidebar sticky top-0 z-40 flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-sidebar-muted cursor-pointer">menu</span>
            <h1 className="font-display text-[26px] text-accent-gold leading-none">
              Cattaliya
            </h1>
          </div>
          <button className="bg-primary text-on-primary px-4 py-2 rounded-pill text-xs font-bold uppercase tracking-wider transition-all hover:brightness-110 active:scale-95">
            Réserver
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
