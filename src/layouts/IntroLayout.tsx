import React from 'react'
import styled from 'styled-components'
import Footer from '@/components/common/footer/Footer'

const MainLayoutStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-image: url('~@/assets/images/intro/bg-dot.svg');
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 20px 0 80px;
  @media screen and (max-width: 600px) {
    padding-bottom: 115px;
  }
`
export const IntroLayout: React.FC = ({ children }) => {
  return (
    <MainLayoutStyled>
      {children}
      <Footer />
    </MainLayoutStyled>
  )
}

export default IntroLayout
