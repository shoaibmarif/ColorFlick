import React from 'react';

interface ColorSwatchProps {
  color: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBorder?: boolean;
  accessiblePattern?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  size = 'md',
  className = '',
  showBorder = true,
  accessiblePattern = false,
  children,
  onClick,
  ariaLabel,
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10 rounded-lg',
    md: 'w-16 h-16 rounded-xl',
    lg: 'w-24 h-24 rounded-2xl',
    xl: 'w-full h-36 sm:h-48 rounded-2xl',
  };

  const patternStyle = accessiblePattern
    ? {
        backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 0)`,
        backgroundSize: '8px 8px',
      }
    : {};

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel || `Color swatch ${color}`}
      style={{
        backgroundColor: color,
        ...patternStyle,
      }}
      className={`relative flex items-center justify-center transition-all duration-200 ${
        sizeClasses[size]
      } ${
        showBorder ? 'ring-1 ring-black/10 dark:ring-white/10' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
