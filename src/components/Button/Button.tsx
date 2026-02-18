import React from 'react';
import s from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'm' | 's';
  iconOnly?: boolean;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'm',
  iconOnly = false,
  Icon,
  className = '',
  children,
  ...props
}) => {
  const buttonClasses = [
    s.button,
    s[variant],
    s[`size${size.toUpperCase()}`],
    iconOnly ? s.iconOnly : '',
    className,
  ].join(' ').trim();

  return (
    <button className={buttonClasses} {...props}>
      {Icon && <Icon />}
      {children}
    </button>
  );
};