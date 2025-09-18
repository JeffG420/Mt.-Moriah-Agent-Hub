import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  // FIX: Update icon types to be more specific for React.cloneElement compatibility.
  leftIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  rightIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
}

const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-moriah-green-600 hover:bg-moriah-green-700 text-white focus:ring-moriah-green-500 shadow-sm',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 focus:ring-gray-500',
  danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  leftIcon, 
  rightIcon, 
  className,
  ...props 
}) => {
  const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {leftIcon && React.cloneElement(leftIcon, { className: `${iconSize} mr-2`})}
      {children}
      {rightIcon && React.cloneElement(rightIcon, { className: `${iconSize} ml-2`})}
    </button>
  );
};

export default Button;