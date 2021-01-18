import React from 'react'
import styled from 'styled-components'

export const PageStyled = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 70px);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 30px 34px;
`
const Page: React.FC = ({ children }) => {
  return <PageStyled>{children}</PageStyled>
}

export default Page
