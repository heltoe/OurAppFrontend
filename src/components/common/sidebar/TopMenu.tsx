import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getRouterByName } from '@/routes'
import Icon from '@/components/ui/Icon'

const TopMenuLinkStyled = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% / 3);
  height: 100%;
`
const TopMenuStyled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: ${(props) => props.theme.Hheader};
  background-color: #25294a;
`
export const TopMenu: React.FC = () => {
  const greyColor = '#f3f3f3'
  return (
    <TopMenuStyled>
      <TopMenuLinkStyled to={getRouterByName('profile-page').path}>
        <Icon type="profile" size="21px" color={greyColor} />
      </TopMenuLinkStyled>
      <TopMenuLinkStyled to={getRouterByName('messages-page').path}>
        <Icon type="letter" size="25px" color={greyColor} />
      </TopMenuLinkStyled>
      <TopMenuLinkStyled  to={getRouterByName('friends-page').path}>
        <Icon type="users" size="25px" color={greyColor} />
      </TopMenuLinkStyled>
    </TopMenuStyled>
  )
}

export default TopMenu
