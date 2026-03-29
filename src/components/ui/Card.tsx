interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`bg-surface-container-lowest rounded-2xl p-6 custom-shadow ${
        hover ? 'hover:shadow-md hover:scale-[1.01] transition-all duration-200' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
