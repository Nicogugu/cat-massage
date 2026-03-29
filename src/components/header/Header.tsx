import { Icon } from '../ui/Icon';
import { Avatar } from '../ui/Avatar';

interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 glass-header border-b border-outline-variant/10 flex justify-between items-center px-10 py-3">
      <div className="flex items-center gap-4">
        {children}
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-colors active:scale-95 duration-200 relative">
          <Icon name="notifications" size="md" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-surface" />
        </button>
        <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-colors active:scale-95 duration-200">
          <Icon name="settings" size="md" />
        </button>
        <div className="flex items-center gap-3 pl-4 ml-1 border-l border-outline-variant/20">
          <div className="text-right">
            <p className="text-sm font-bold text-on-surface">Cattaliya</p>
            <p className="text-[10px] text-on-surface-variant">
              Manager
            </p>
          </div>
          <Avatar
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4D0HTeoBCQRQBGvUswFUxsA_iFNSINeIpwxehSLo96Lv47l7w7O2mXcxVzp3XysXdiXmY8K3roaETRzQma91qOJjUycYW73dMH0xdrgT8uOhZmqxb5ZJHQg0dxkj5a5mVSsKcms6-1TVvgVvXCBQqgwDHxgOmCbQvfyPZkoUuH351yK4Zxu8b0jSBUeqyX76WUuYfiNxL87XbBzzIzvjFipp1sIueRTJXBeDG6adix40jiNC8Q55IHHuVQXx3A6thp2Bh22KcG0s"
            alt="Cattaliya profile"
            size="md"
            className="ring-2 ring-primary/15"
          />
        </div>
      </div>
    </header>
  );
}
