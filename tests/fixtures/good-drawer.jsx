import React from 'react';

/**
 * 120 FPS Compositor Contract Compliant:
 * - Mutates transform and opacity only (Zero Reflow)
 * - Uses will-change for GPU promotion
 * - Employs emphasized easing curves
 */
export function GoodDrawer({ isOpen }) {
  return (
    <div
      style={{
        transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100%, 0)',
        opacity: isOpen ? 1 : 0,
        transition: 'transform 240ms cubic-bezier(0.16, 1, 0.3, 1), opacity 180ms ease',
        willChange: 'transform, opacity'
      }}
    >
      <p>Compositor safe 120 FPS drawer.</p>
    </div>
  );
}
