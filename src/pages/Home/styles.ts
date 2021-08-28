import styled from 'styled-components'
import media from 'styled-media-query'

export const HomeWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
`

export const GroupFooter = styled.div`
  display: block;
  padding-top: 16px;
`

export const GroupLocale = styled.div`
  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;

    > div {
      width: 100%;
    }

    ${media.greaterThan('medium')`
      flex-direction: row;
      align-items: flex-end;

      > div {
        flex: 1;
      }
    `}
  }

  > small {
    color: #e02b27;
    padding-top: 4px;
  }
`

export const TitleError = styled.strong`
  color: #e02b27;
  padding: 8px 0;
`

export const TitleSuccess = styled.strong`
  color: #006400;
  padding: 8px 0;
`
