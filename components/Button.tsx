import React from 'react'

interface ButtonProps {
  primary?: boolean
  size?: 'small' | 'medium' | 'large'
  label: string
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  primary = false,
  size = 'medium',
  label,
  ...props
}) => {
  const baseStyles = 'font-bold rounded-full'
  const sizeStyles = {
    small: 'py-1 px-2 text-sm',
    medium: 'py-2 px-4 text-md',
    large: 'py-3 px-6 text-lg',
  }
  const colorStyles = primary
    ? 'bg-blue-500 text-white hover:bg-blue-600'
    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'

  return (
    <button
      type="button"
      className={`${baseStyles} ${sizeStyles[size]} ${colorStyles}`}
      {...props}
    >
      {label}
    </button>
  )
}

