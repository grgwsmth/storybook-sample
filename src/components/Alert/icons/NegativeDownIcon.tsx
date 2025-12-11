import React from 'react';

export const NegativeDownIcon: React.FC<{ size?: number; color?: string }> = ({ size = 28, color = '#EF4444' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect width="24" height="24" rx="4" fill="transparent" />
    <path d="M12 16l-4-4h3V8h2v4h3l-4 4z" fill={color} />
  </svg>
);

export default NegativeDownIcon;
