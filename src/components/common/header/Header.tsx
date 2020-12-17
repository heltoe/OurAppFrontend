import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getRouterByName } from '@/routes'
import AvatarStatus from '@/components/common/header/AvatarStatus'
import BackPage from '@/components/ui/back-page/Back'
import { user } from '@/data/user'

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${(props) => props.theme.Hheader};
  padding: 15px 34px;
  position: relative;
  background: rgb(146,129,255);
  background: linear-gradient(45deg, rgba(146,129,255,1) 0%, rgba(109,170,254,1) 100%);
`
const LogoStyled = styled.p`
  color: ${(props) => props.theme.rgb(props.theme.colors.white)};
  font-weight: 600;
  text-transform: uppercase;
  cursor: default;
  margin: 0 10px;
`
const PersonInfoStyled = styled(Link)`
  transition: ${(props) => `box-shadow ${props.theme.transition}`};
  border-radius: 50%;
  &:hover {
    box-shadow: ${(props) => props.theme.shadow.shadow2};
  }
`
export const Header: React.FC = () => {
  return (
    <HeaderStyled>
      <BackPage path="/" />
      <LogoStyled className="no-select">Chat</LogoStyled>
      <PersonInfoStyled to={getRouterByName('profile-page').path}>
        <AvatarStatus image={user.image} />
      </PersonInfoStyled>
    </HeaderStyled>
  )
}

export default Header
