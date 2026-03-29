interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-14 h-14',
  xl: 'w-24 h-24',
};

export function Avatar({ src, alt, size = 'md', className = '' }: AvatarProps) {
  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-surface-container-high shrink-0 ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
