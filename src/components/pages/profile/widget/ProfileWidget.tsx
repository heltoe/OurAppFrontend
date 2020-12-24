import React from 'react'
import styled from 'styled-components'
import HeadProfile from '@/components/pages/profile/widget/HeadProfile'
import BodyProfile from '@/components/pages/profile/widget/BodyProfile'
import { user } from '@/data/user'

type ProfileWidgetType = {
  isOpen: boolean
  closeWidget(): void
}
const WidgetStyled = styled.div<{ isOpen: boolean }>`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 290px;
  box-shadow: ${(props) => props.theme.shadow.shadow2};
  background-color: ${(props) => props.theme.rgb(props.theme.colors.grey2)};
  background-color: ${(props) => props.theme.rgb(props.theme.colors.white)};
  transition: ${(props) => `transform ${props.theme.transition}`};
  transform: ${(props) => `translateX(${props.isOpen ? 0 : 100}%)`};
  z-index: 100;
`
export const ProfileWidget: React.FC<ProfileWidgetType> = ({ isOpen, closeWidget }) => {
  return (
    <WidgetStyled isOpen={isOpen}>
      <HeadProfile image={user.image} name={user.fullName} closeWidget={() => closeWidget()}/>
      <BodyProfile
        location={user.label}
        email={user.email}
        birthday={user.birthday}
        status={user.status}
      />
    </WidgetStyled>
  )
}

export default ProfileWidget
