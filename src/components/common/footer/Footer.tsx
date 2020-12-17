import React from 'react'
import styled from 'styled-components'
import { device } from '@/Theme'

const FooterStyled = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding-top: 30px;
  padding-bottom: 30px;
  margin-top: auto;
  @media screen and ${device.tabletS} {
    flex-direction: column;
    align-items: center;
  }
`
const CopyStyled = styled.p`
  font-size: 13px;
  line-height: 1.38;
  color: ${(props) => props.theme.rgb(props.theme.colors.white)};
  @media screen and ${device.tabletS} {
    margin-top: 5px;
    text-align: center;
  }
`
export const Footer: React.FC = () => {
  const currentDate = new Date().getFullYear()
  return (
    <FooterStyled>
      <CopyStyled>© {currentDate} ООО «Chat»</CopyStyled>
    </FooterStyled>
  )
}

export default Footer
