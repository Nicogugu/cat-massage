import { Icon } from './Icon';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactNode;
  icon?: string;
  onClick?: () => void;
  className?: string;
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-primary text-on-primary hover:opacity-90 active:scale-95 shadow-sm',
  secondary:
    'bg-secondary-container text-on-secondary-container hover:brightness-95 active:scale-95',
  tertiary:
    'bg-surface-container-high text-on-surface hover:bg-surface-container-highest active:scale-95',
};

export function Button({
  variant = 'primary',
  children,
  icon,
  onClick,
  className = '',
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-pill font-semibold text-sm transition-all duration-200 ${variantClasses[variant]} ${className}`}
    >
      {icon && <Icon name={icon} size="sm" />}
      {children}
    </button>
  );
}
