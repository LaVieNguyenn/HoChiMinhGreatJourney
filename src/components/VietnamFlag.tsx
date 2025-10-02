import React from 'react';

interface VietnamFlagProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const VietnamFlag: React.FC<VietnamFlagProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-6',
    md: 'w-12 h-8', 
    lg: 'w-16 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} relative overflow-hidden rounded shadow-md ${className}`}>
      {/* Red background */}
      <div className="absolute inset-0 bg-red-600" />
      
      {/* Yellow star */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className="w-1/2 h-1/2 fill-yellow-400"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
    </div>
  );
};