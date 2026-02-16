import React from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: [
    'text-[var(--era-bg)] font-semibold',
    'bg-[var(--era-accent)]',
    'hover:brightness-110',
    'active:brightness-90',
    'border border-[var(--era-accent)]',
    'btn-neon-glow',
  ].join(' '),
  secondary: [
    'text-[var(--era-text)]',
    'bg-[var(--era-surface)]',
    'hover:bg-[var(--era-primary)]/20',
    'active:bg-[var(--era-primary)]/30',
    'border border-[var(--era-primary)]/40',
  ].join(' '),
  danger: [
    'text-white font-semibold',
    'bg-red-700',
    'hover:bg-red-600',
    'active:bg-red-800',
    'border border-red-600',
  ].join(' '),
  ghost: [
    'text-[var(--era-text)]',
    'bg-transparent',
    'hover:bg-[var(--era-surface)]',
    'active:bg-[var(--era-surface)]/80',
    'border border-transparent',
  ].join(' '),
};

function Spinner({ size }: { size: NonNullable<ButtonProps['size']> }) {
  const spinnerSize = size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';
  return (
    <svg
      className={`${spinnerSize} animate-spin`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  children,
  className = '',
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-md',
        'transition-all duration-150 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-[var(--era-accent)] focus:ring-offset-1 focus:ring-offset-[var(--era-bg)]',
        'select-none cursor-pointer',
        sizeClasses[size],
        variantClasses[variant],
        isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {loading && <Spinner size={size} />}
      {children}
    </button>
  );
}
