import { NavLink } from 'react-router-dom';
import { Icon } from '../ui/Icon';
import { bottomNavItems } from '../../data/navigation';

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pb-5 pt-2 bg-white/90 backdrop-blur-md border-t border-outline-variant/10 shadow-[0_-2px_16px_rgba(30,27,24,0.06)]">
      {bottomNavItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/'}
          className={({ isActive }) =>
            isActive
              ? 'flex flex-col items-center justify-center text-primary px-3 py-1.5 transition-all'
              : 'flex flex-col items-center justify-center text-on-surface-variant/40 px-3 py-1.5 transition-all'
          }
        >
          {({ isActive }) => (
            <>
              {isActive && <div className="w-8 h-1 bg-primary rounded-full mb-1" />}
              <Icon
                name={item.icon}
                size="md"
                filled={isActive && !!item.activeIconFill}
              />
              <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5">
                {item.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
