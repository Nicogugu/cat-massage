import { Icon } from './Icon';

interface KpiCardProps {
  label: string;
  value: string;
  change?: string;
  changeDirection?: 'up' | 'down';
  icon?: string;
  className?: string;
}

export function KpiCard({
  label,
  value,
  change,
  changeDirection,
  icon,
  className = '',
}: KpiCardProps) {
  return (
    <div
      className={`bg-surface-container-lowest p-6 rounded-2xl shadow-card space-y-4 ${className}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-widest">
            {label}
          </p>
          <p className="text-3xl font-bold text-on-surface mt-2 tracking-tight">{value}</p>
        </div>
        {icon && (
          <div className="bg-accent-gold-light p-3 rounded-xl">
            <Icon name={icon} size="md" className="text-accent-gold-dark" />
          </div>
        )}
      </div>
      {change && (
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
          changeDirection === 'up'
            ? 'bg-success-light text-success'
            : 'bg-error-container text-error'
        }`}>
          <Icon
            name={changeDirection === 'up' ? 'trending_up' : 'trending_down'}
            size="sm"
          />
          <span>{change}</span>
        </div>
      )}
    </div>
  );
}
