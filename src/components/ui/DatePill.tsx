import { Icon } from './Icon';

interface DatePillProps {
  date: string;
  className?: string;
}

export function DatePill({ date, className = '' }: DatePillProps) {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-lg text-sm font-medium ${className}`}
    >
      <Icon name="calendar_today" size="sm" />
      <span>{date}</span>
    </div>
  );
}
