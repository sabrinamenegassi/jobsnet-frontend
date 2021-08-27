import React, { ButtonHTMLAttributes } from 'react'

import { ButtonWrapper } from './styles'

type ButtonProps = {
  onClick?: () => void
  variant?: 'button' | 'link'
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({
  variant = 'button',
  onClick,
  children,
  type = 'button',
  ...props
}) => {
  return (
    <ButtonWrapper
      type={type}
      onClick={onClick}
      {...props}
      $isLink={variant === 'link'}
    >
      {children}
    </ButtonWrapper>
  )
}

export default Button
