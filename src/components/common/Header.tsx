import React from 'react'
import { useStore } from 'effector-react'
import { useLocation, Link } from 'react-router-dom'
import styled from 'styled-components'
import { getRouterByPath, getRouterByName } from '@/routes'
import { $cropedPhoto } from '@/components/pages/profile/content/photo-block/PhotoBlock.model'
import { $mainInfoForm } from '@/components/pages/profile/content/main-info-form/MainInfoForm.model'
import { $profileUser } from '@/components/pages/profile/EditProfile.model'
import {
  $activeUser,
  changeRecipientCallUser,
  changeSendlerCallUser,
} from '@/App.module'
import Avatar from '@/components/ui/Avatar'
import Icon, { IconStyled } from '@/components/ui/Icon'
import { User } from '@/api/types'
import socket from '@/api/socket'

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: ${(props) => props.theme.Hheader};
  min-height: ${(props) => props.theme.Hheader};
  padding: 15px 34px;
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgb(146,129,255);
  background: linear-gradient(45deg, rgba(146,129,255,1) 0%, rgba(109,170,254,1) 100%);
  & ${IconStyled} {
    margin-right: 15px;
    cursor: pointer;
  }
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

  const activeUser = useStore($activeUser)
  const profileUser = useStore($profileUser)

  const location = useLocation()

  const callToUser = (data: { sendler: User, recipient: User }) => {
    changeSendlerCallUser(data.sendler)
    changeRecipientCallUser(data.recipient)
    socket.callToUser(data)
  }
  return (
    <HeaderStyled>
      <LogoStyled
        to={getRouterByName('profile-page').path}
        className="no-select"
      >
        Chat
      </LogoStyled>
      {getRouterByPath(location.pathname).name === 'chat-page' && (
        <Icon
          type="phone-2"
          size="24px"
          color="#fff"
          onClick={() =>
            callToUser({ sendler: profileUser, recipient: activeUser })
          }
        />
      )}
      {getRouterByPath(location.pathname).name === 'chat-page' && (
        <Icon
          type="video"
          size="24px"
          color="#fff"
          onClick={() =>
            callToUser({ sendler: profileUser, recipient: activeUser })
          }
        />
      )}
      {getRouterByPath(location.pathname).name !== 'profile-page' && (
        <PersonInfoStyled to={getRouterByName('profile-page').path}>
          <Avatar
            id={profileUser.user_id}
            image={photo}
            fullName={mainInfoForm.full_name}
            isRound
            size="40px"
          />
        </PersonInfoStyled>
      )}
    </HeaderStyled>
  )
}

export default Header
