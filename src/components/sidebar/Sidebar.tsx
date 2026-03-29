import { NavLink } from 'react-router-dom';
import { Icon } from '../ui/Icon';
import { sidebarNavItems } from '../../data/navigation';

export function Sidebar() {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 z-50 bg-sidebar flex flex-col py-6">
      {/* Logo */}
      <div className="px-6 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-sidebar-surface flex items-center justify-center ring-1 ring-white/10">
            <span className="material-symbols-outlined text-accent-gold text-[22px]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}>spa</span>
          </div>
          <div>
            <h1 className="font-display text-[30px] text-accent-gold leading-none">
              Cattaliya
            </h1>
            <p className="text-[9px] uppercase tracking-[0.25em] text-sidebar-muted font-medium mt-0.5">
              Thaï Massage · Lyon
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {sidebarNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-3 px-4 py-2.5 bg-primary-fixed-dim text-on-primary-fixed rounded-xl font-semibold transition-all ease-in-out text-[13px]'
                : 'flex items-center gap-3 px-4 py-2.5 text-sidebar-muted hover:text-sidebar-text hover:bg-sidebar-hover duration-200 transition-all ease-in-out rounded-xl font-medium text-[13px]'
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  name={item.icon}
                  size="md"
                  filled={isActive && !!item.activeIconFill}
                />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* CTA Button */}
      <div className="px-4 mb-3">
        <button className="w-full bg-accent-gold text-white py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-[0.98] text-[13px] shadow-lg shadow-accent-gold/20">
          <Icon name="add" size="sm" />
          <span>Nouvelle Réservation</span>
        </button>
      </div>

      {/* Footer */}
      <div className="px-3 border-t border-white/8 pt-3 space-y-0.5">
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2 text-sidebar-muted hover:text-sidebar-text hover:bg-sidebar-hover rounded-xl transition-all text-[13px]"
        >
          <Icon name="help_outline" size="md" />
          <span>Support</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2 text-red-300/70 hover:text-red-300 hover:bg-red-900/20 rounded-xl transition-all text-[13px]"
        >
          <Icon name="logout" size="md" />
          <span>Déconnexion</span>
        </a>
      </div>
    </aside>
  );
}
