import styled from 'styled-components'
import media from 'styled-media-query'

export const ThirdColumnsWrapper = styled.div`
  display: grid;
  grid-gap: 8px;

  ${media.greaterThan('medium')`
    grid-template-columns: repeat(3, 1fr);
  `}
`

export const TwoColumnsWrapper = styled.div`
  display: grid;
  grid-gap: 8px;

  ${media.greaterThan('medium')`
    grid-template-columns: repeat(2, 1fr);
  `}
`
