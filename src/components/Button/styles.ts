import styled from 'styled-components'

type ButtonWrapperProps = {
  $isLink: boolean
}

export const ButtonWrapper = styled.button<ButtonWrapperProps>`
  background: ${({ $isLink }) => ($isLink ? 'transparent' : '#000')};
  border: none;
  height: 32px;
  color: ${({ $isLink }) => ($isLink ? '#4d6edb' : '#fff')};
  font-size: 14px;
  font-family: 'Barlow', sans-serif;
  font-weight: 700;
  padding: 0 12px;
`
