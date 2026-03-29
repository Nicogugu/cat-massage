interface IconProps {
  name: string;
  filled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses: Record<NonNullable<IconProps['size']>, string> = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-3xl',
};

export function Icon({ name, filled = false, className = '', size = 'md' }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${sizeClasses[size]} ${className}`}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
    >
      {name}
    </span>
  );
}
