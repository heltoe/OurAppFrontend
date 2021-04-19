import React from 'react'
import styled from 'styled-components'

export const PageStyled = styled.div`
  width: 100%;
  height: 100%;
`
const Page: React.FC = ({ children }) => {
  return <PageStyled>{children}</PageStyled>
}

export default Page
