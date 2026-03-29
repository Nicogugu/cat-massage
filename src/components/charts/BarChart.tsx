interface BarChartDataItem {
  label: string;
  value: number;
  highlight?: boolean;
}

interface BarChartProps {
  data: BarChartDataItem[];
  maxValue?: number;
  className?: string;
}

export function BarChart({ data, maxValue, className = '' }: BarChartProps) {
  const computedMax = maxValue ?? Math.max(...data.map((d) => d.value));

  return (
    <div className={`flex items-end gap-1.5 h-36 ${className}`}>
      {data.map((item) => {
        const heightPercent = computedMax > 0 ? (item.value / computedMax) * 100 : 0;
        return (
          <div key={item.label} className="flex-1 flex flex-col items-center gap-1.5 group">
            <div className="w-full flex flex-col items-center justify-end h-28">
              <div
                className={`w-full rounded-md transition-all duration-300 group-hover:brightness-110 ${
                  item.highlight
                    ? 'bg-primary shadow-sm shadow-primary/20'
                    : 'bg-accent-gold/25'
                }`}
                style={{ height: `${heightPercent}%`, minHeight: heightPercent > 0 ? '4px' : '0' }}
              />
            </div>
            <span className={`text-[9px] font-bold uppercase tracking-tight ${
              item.highlight ? 'text-primary' : 'text-on-surface-variant/60'
            }`}>
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
