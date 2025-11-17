import { UtensilsCrossed } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizes = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12',
  };

  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 36,
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center justify-center">
        <div className="absolute rounded-lg bg-primary/10 p-2">
          <UtensilsCrossed
            size={iconSizes[size]}
            className="text-primary"
            strokeWidth={2.5}
          />
        </div>
        <div className={`${sizes[size]} aspect-square`} />
      </div>
      <div className="flex flex-col">
        <span className={`font-bold leading-tight text-foreground ${textSizes[size]}`}>
          Next Meals
        </span>
        <span className="text-xs font-medium text-muted-foreground -mt-1">
          Planificateur de repas
        </span>
      </div>
    </div>
  );
}
