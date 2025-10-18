import React from 'react';
import { colors, spacing, typography, borderRadius, shadows } from '../../styles/design-tokens';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  className = '',
}) => {
  const baseStyles: React.CSSProperties = {
    fontFamily: typography.fontFamily.sans.join(', '),
    fontWeight: typography.fontWeight.medium,
    borderRadius: borderRadius.md,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease-in-out',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      padding: `${spacing.sm} ${spacing.md}`,
      fontSize: typography.fontSize.sm,
    },
    md: {
      padding: `${spacing.md} ${spacing.lg}`,
      fontSize: typography.fontSize.base,
    },
    lg: {
      padding: `${spacing.lg} ${spacing.xl}`,
      fontSize: typography.fontSize.lg,
    },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: colors.primary,
      color: 'white',
      boxShadow: shadows.sm,
    },
    secondary: {
      backgroundColor: colors.secondary,
      color: 'white',
      boxShadow: shadows.sm,
    },
    outline: {
      backgroundColor: 'transparent',
      color: colors.primary,
      border: `1px solid ${colors.primary}`,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colors.primary,
    },
  };

  const disabledStyles: React.CSSProperties = {
    opacity: 0.5,
    cursor: 'not-allowed',
  };

  const combinedStyles: React.CSSProperties = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...(disabled ? disabledStyles : {}),
  };

  return (
    <button
      style={combinedStyles}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
};
