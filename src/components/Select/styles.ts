import styled from 'styled-components'

type SelectWrapperProps = {
  $isFocused: boolean
}

export const SelectWrapper = styled.div<SelectWrapperProps>`
  display: flex;
  flex-direction: column;

  > label {
    margin-top: 8px;
    color: ${({ $isFocused }) => ($isFocused ? '#000' : '#b9bcc1')};
    width: max-content;
  }

  > select {
    margin-top: 4px;
    height: 32px;
    border: 1px solid ${({ $isFocused }) => ($isFocused ? '#000' : '#b9bcc1')};
    padding-left: 16px;
  }
`
