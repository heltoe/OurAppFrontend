import React from 'react'
import styled from 'styled-components'
import { device } from '@/Theme'
import FooterLink, { FooterLinkStyled } from '@/components/common/footer/FooterLink'

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
const FooterContainerStyled = styled.div`
  & ${FooterLinkStyled} {
    &:not(:first-child) {
      margin-left: 40px;
    }
  }
  @media screen and ${device.tabletS} {
    display: flex;
    flex-direction: column;
    align-items: center;
    & ${FooterLinkStyled} {
      text-align: center;
      &:not(:first-child) {
        margin-left: 0;
        margin-top: 5px;
      }
    }
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
  return (
    <FooterStyled>
      <FooterContainerStyled>
        <FooterLink routeName="policy">Политика конфиденциальности</FooterLink>
        <FooterLink routeName="contacts">Контакты</FooterLink>
      </FooterContainerStyled>
      <CopyStyled>© 2019–2020 ООО «Человек»</CopyStyled>
    </FooterStyled>
  )
}

export default Footer
