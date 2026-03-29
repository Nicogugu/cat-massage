interface ProgressBarProps {
  value: number;
  className?: string;
}

export function ProgressBar({ value, className = '' }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={`w-full bg-outline-variant/20 h-1.5 rounded-full overflow-hidden ${className}`}>
      <div
        className="bg-primary h-full rounded-full transition-all duration-500"
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}
