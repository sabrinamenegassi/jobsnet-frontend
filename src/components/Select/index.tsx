import React, { SelectHTMLAttributes, useCallback, useState } from 'react'

import { SelectWrapper } from './styles'

type SelectProps = {
  label: string
  name: string
  options: string[]
  initialValue?: string
  onInputChange?: (value: string) => void
} & SelectHTMLAttributes<HTMLSelectElement>

const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  initialValue,
  onInputChange,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState(initialValue)

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.currentTarget.value
      setValue(newValue)

      !!onInputChange && onInputChange(newValue)
    },
    [onInputChange]
  )

  return (
    <SelectWrapper $isFocused={isFocused}>
      <label htmlFor={name}>{label}</label>
      <select
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        id={name}
        value={value}
        onChange={onChange}
        {...props}
      >
        <option value="">Selecione</option>
        {options.map((data) => (
          <option key={data} value={data}>
            {data}
          </option>
        ))}
      </select>
    </SelectWrapper>
  )
}

export default Select
