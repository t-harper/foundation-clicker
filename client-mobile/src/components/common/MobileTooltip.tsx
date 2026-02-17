import React, { useState, useRef, useCallback, useEffect } from 'react';

interface MobileTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

export function MobileTooltip({ content, children }: MobileTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleTap = useCallback(() => {
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      let left = rect.left;
      if (left + 200 > viewportWidth) {
        left = viewportWidth - 210;
      }
      if (left < 10) left = 10;

      setPosition({
        top: rect.bottom + 4,
        left,
      });
    }
    setIsOpen(!isOpen);
  }, [isOpen]);

  // Auto-dismiss after 3 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsOpen(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <>
      <div ref={triggerRef} onClick={handleTap} className="touch-action-manipulation">
        {children}
      </div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div
            className="fixed z-50 bg-[var(--era-bg)] border border-[var(--era-accent)]/30 rounded-md p-2.5 shadow-lg max-w-[200px] text-xs"
            style={{ top: position.top, left: position.left }}
          >
            {content}
          </div>
        </>
      )}
    </>
  );
}
