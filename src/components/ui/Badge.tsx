interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'gold' | 'silver';
  className?: string;
}

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  primary: 'bg-primary-fixed text-on-primary-fixed-variant',
  secondary: 'bg-secondary-container text-on-secondary-container',
  tertiary: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
  gold: 'bg-secondary-fixed text-on-secondary-fixed-variant',
  silver: 'bg-surface-container-high text-on-surface-variant',
};

export function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
