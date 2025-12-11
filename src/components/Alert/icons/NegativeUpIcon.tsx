import React from 'react';

export const NegativeUpIcon: React.FC<{ size?: number; color?: string }> = ({ size = 28, color = '#EF4444' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect width="24" height="24" rx="4" fill="transparent" />
    <path d="M12 8l4 4h-3v4h-2v-4H8l4-4z" fill={color} />
  </svg>
);

export default NegativeUpIcon;
