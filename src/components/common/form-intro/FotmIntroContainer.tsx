import React from 'react'
import styled from 'styled-components'
import { device } from '@/Theme'

export const FormContainerStyled = styled.div`
  width: 400px;
  border-radius: 10px;
  margin: 0 auto;
  box-shadow: ${(props) => props.theme.shadow.shadow1};
  background-color: $white;
  @media screen and ${device.mobileL} {
    width: calc(100% - 68px);
  }
`
export const FormIntroContainer: React.FC = ({ children }) => {
  return <FormContainerStyled>{children}</FormContainerStyled>
}

export default FormIntroContainer
