import React, { InputHTMLAttributes, useCallback, useState } from 'react'

import { InputWrapper } from './styles'

type InputProps = {
  label: string
  name: string
  initialValue?: string
  onInputChange?: (value: string) => void
} & InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = 'text',
  initialValue,
  onInputChange,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState(initialValue)

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.currentTarget.value
      setValue(newValue)

      !!onInputChange && onInputChange(newValue)
    },
    [onInputChange]
  )

  return (
    <InputWrapper $isFocused={isFocused}>
      <label htmlFor={name}>{label}</label>
      <input
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        type={type}
        id={name}
        value={value}
        onChange={onChange}
        {...props}
      />
    </InputWrapper>
  )
}

export default Input
