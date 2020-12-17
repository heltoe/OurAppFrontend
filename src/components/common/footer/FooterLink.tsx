import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getRouterByName } from '@/routes'

export interface IDataLink {
  routeName: string
}
export const FooterLinkStyled = styled(Link)`
  font-size: 14px;
  line-height: 0.93;
  color: ${(props) => props.theme.rgb(props.theme.colors.white)};
`
export const FooterLink: React.FC<IDataLink> = ({ children, routeName }) => {
  return (
    <FooterLinkStyled to={getRouterByName(routeName).path}>
      {children}
    </FooterLinkStyled>
  )
}

export default FooterLink
