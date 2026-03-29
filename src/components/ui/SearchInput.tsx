import { Icon } from './Icon';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function SearchInput({
  placeholder = 'Rechercher...',
  value,
  onChange,
  className = '',
}: SearchInputProps) {
  return (
    <div className={`relative group ${className}`}>
      <Icon
        name="search"
        size="sm"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="pl-12 pr-6 py-3 bg-surface-container-high border-none rounded-full w-full focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface placeholder:text-outline/60 text-sm"
      />
    </div>
  );
}
