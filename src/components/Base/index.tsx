import React from 'react'

import { BaseWrapper, ChildrenWrapper, ContentWrapper } from './styles'

const Base: React.FC = ({ children }) => {
  return (
    <BaseWrapper>
      <ContentWrapper>
        <h1>JobsNET</h1>
      </ContentWrapper>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </BaseWrapper>
  )
}

export default Base
