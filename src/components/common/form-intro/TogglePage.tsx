import React from 'react'
import { Link } from 'react-router-dom'
import { getRouterByName } from '@/routes'
import styled from 'styled-components'

type LinkType = {
  routeName: string
  content: string
}
type TogglePageType = {
  routes: LinkType[]
}

const WrapperTogglePageStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: ${(props) => `1px solid ${props.theme.rgb(props.theme.colors.grey2)}`};
`
const TogglePageStyled = styled(Link)`
  font-size: 14px;
  color: ${(props) => props.theme.rgb(props.theme.colors.purple1)};
  padding: 20px;
  width: 100%;
  text-align: center;
  position: relative;
  &:not(:first-child) {
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      height: calc(100% - 40px);
      transform: translateY(-50%);
      width: 1px;
      background-color: ${(props) => props.theme.rgb(props.theme.colors.purple1)};
    }
  }
`
export const TogglePage: React.FC<TogglePageType> = ({ routes = [] }) => {
  return (
    <WrapperTogglePageStyled>
      {routes.map((item) => (
        <TogglePageStyled key={item.routeName} to={getRouterByName(item.routeName).path}>
          {item.content}
        </TogglePageStyled>
      ))}
    </WrapperTogglePageStyled>
  )
}

export default TogglePage
