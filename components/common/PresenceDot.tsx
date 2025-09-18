import React from 'react';

type Status = 'Online' | 'Away' | 'Offline';

interface PresenceDotProps {
  status: Status;
  size?: 'sm' | 'md';
}

const statusClasses: Record<Status, string> = {
  Online: 'bg-green-500',
  Away: 'bg-yellow-500',
  Offline: 'bg-gray-400',
};

const sizeClasses = {
  sm: 'h-2 w-2',
  md: 'h-3 w-3',
};

const PresenceDot: React.FC<PresenceDotProps> = ({ status, size = 'md' }) => {
  return (
    <span
      className={`inline-block rounded-full ${sizeClasses[size]} ${statusClasses[status]}`}
      title={status}
    />
  );
};

export default PresenceDot;
