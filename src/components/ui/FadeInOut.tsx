import React from 'react'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`
const FadeInOutStyled = styled.div`
  transition: ${(props) => props.theme.transition};
  animation: ${fadeIn} 0.3s ease-in-out;
  animation-fill-mode: backwards;
`
const FadeInOut: React.FC = ({ children }) => {
  return <FadeInOutStyled>{children}</FadeInOutStyled>
}

export default FadeInOut
