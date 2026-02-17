import React, { useEffect } from 'react';

interface MobileModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function MobileModal({ isOpen, onClose, title, children, className = '' }: MobileModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[var(--era-bg)] animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--era-surface)] safe-top">
        {title && (
          <h2 className="text-base font-display font-semibold text-[var(--era-primary)]">
            {title}
          </h2>
        )}
        <button
          type="button"
          onClick={onClose}
          className="ml-auto p-2 -mr-2 text-[var(--era-text)]/50 active:text-[var(--era-text)] transition-colors touch-action-manipulation"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className={`flex-1 overflow-y-auto scroll-momentum px-4 py-3 safe-bottom ${className}`}>
        {children}
      </div>
    </div>
  );
}
