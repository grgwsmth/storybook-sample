import React from 'react';

export const NeutralIcon: React.FC<{size?: number}> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <circle cx="12" cy="12" r="10" fill="#D1D5DB" />
    <path d="M9 11h6v2H9z" fill="#374151" />
  </svg>
);

export default NeutralIcon;
