import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getRouterByName } from '@/routes'
import AvatarStatus from '@/components/common/header/AvatarStatus'
import Icon from '@/components/ui/Icon'
import { user } from '@/data/user'

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  height: ${(props) => props.theme.Hheader};
  padding: 15px 34px;
  position: relative;
  background: rgb(146,129,255);
  background: linear-gradient(45deg, rgba(146,129,255,1) 0%, rgba(109,170,254,1) 100%);
`
const LogoStyled = styled(Link)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: ${(props) => props.theme.rgb(props.theme.colors.white)};
  font-weight: 600;
  text-transform: uppercase;
  margin: 0 10px;
`
const PersonInfoStyled = styled(Link)`
  transition: ${(props) => `box-shadow ${props.theme.transition}`};
  border-radius: 50%;
  &:hover {
    box-shadow: ${(props) => props.theme.shadow.shadow2};
  }
`
const WrapperIconStyled = styled.div`
  cursor: pointer;
`
export const Header: React.FC = () => {
  return (
    <HeaderStyled>
      <LogoStyled to={getRouterByName('profile-page').path} className="no-select">
        Chat
      </LogoStyled>
      <PersonInfoStyled to={getRouterByName('profile-page').path}>
        <AvatarStatus image={user.image} />
      </PersonInfoStyled>
    </HeaderStyled>
  )
}

export default Header
