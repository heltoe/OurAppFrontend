import React from 'react'
import { useStore } from 'effector-react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getRouterByName } from '@/routes'
import { $cropedPhoto } from '@/components/pages/profile/content/photo-block/PhotoBlock.model'
import { $mainInfoForm } from '@/components/pages/profile/content/main-info-form/MainInfoForm.model'
import { $userId } from '@/App.module'
import { getRouterByPath } from '@/routes'
import Avatar from '@/components/ui/Avatar'

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  height: ${(props) => props.theme.Hheader};
  min-height: ${(props) => props.theme.Hheader};
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
export const Header: React.FC = () => {
  const photo = useStore($cropedPhoto)
  const mainInfoForm = useStore($mainInfoForm)
  const idProfile = useStore($userId)
  const location = useLocation()
  return (
    <HeaderStyled>
      <LogoStyled to={getRouterByName('profile-page').path} className="no-select">
        Chat
      </LogoStyled>
      {getRouterByPath(location.pathname).name !== 'profile-page' && <PersonInfoStyled to={getRouterByName('profile-page').path}>
        <Avatar
          id={idProfile}
          image={photo}
          fullName={mainInfoForm.full_name}
          isRound size="40px"
        />
      </PersonInfoStyled>}
    </HeaderStyled>
  )
}

export default Header
