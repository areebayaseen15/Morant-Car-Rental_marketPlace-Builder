
import React from 'react'

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large'
  color?: string
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'medium', color = 'text-red-900' }) => {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-4',
    large: 'w-12 h-12 border-4 text-red-900'
  }

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} ${color} border-t-transparent rounded-full animate-spin`}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default Spinner

