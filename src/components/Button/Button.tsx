import React, { useCallback } from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary'
  paddingX?: number,
  paddingY?: number
  padding?: number
}

const buttonsVariants: { [key: string]: string } = {
  primary: 'bg-blue-700 rounded-full text-white hover:bg-blue-500 disabled:bg-blue-300',
  secondary: 'rounded-lg border-black border-2',
  tertiary: 'border-none'
}

function Button({ children, variant = 'primary', paddingX, padding, paddingY, className, ...otherProps }: Props) {
  const buttonPadding = useCallback(() => {
    if (paddingX && paddingY) {
      return `px-${paddingX} py-${paddingY}`
    }

    if (paddingX) {
      return `px-${paddingX}`
    }

    if (paddingY) {
      return `py-${paddingY}`
    }

    if (padding !== undefined) {
      return `p-${padding}`
    }

    return 'py-2 px-4'

  }, [padding, paddingX, paddingY])

  return (
    <button {...otherProps} className={`${buttonPadding()} ${className} cursor-pointer inline-flex items-center justify-center text-sm font-semibold tracking-wide ${buttonsVariants[variant]}`} >{children}</button>
  )
}

export default Button