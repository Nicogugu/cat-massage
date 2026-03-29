interface PageHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  eyebrow,
  action,
  className = '',
}: PageHeaderProps) {
  return (
    <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 ${className}`}>
      <div className="space-y-1">
        {eyebrow && (
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-2">
            {eyebrow}
          </p>
        )}
        <h1 className="font-headline text-3xl lg:text-4xl text-on-surface tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-on-surface-variant font-medium text-lg">{subtitle}</p>
        )}
      </div>
      {action && <div className="flex items-center gap-4">{action}</div>}
    </div>
  );
}
