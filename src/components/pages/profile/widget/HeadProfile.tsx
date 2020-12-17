import React from 'react'
import styled from 'styled-components'
import Avatar from '@/components/ui/Avatar'
import Icon, { IconStyled } from '@/components/ui/Icon'
import { OverlayStyled, WrapperImageStyled } from '@/components/pages/profile/content/PhotoBlock'

type HeadProfileType = {
  image: string
  name: string
}

const WidgetStyled = styled.div<{ backgroundImage: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: ${(props) => `url(${props.backgroundImage})`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 20px;
  padding-top: 60px;
  position: relative;
`
const NameStyled = styled.p`
  margin-top: 15px;
  font-size: 16px;
  color: ${(props) => props.theme.rgb(props.theme.colors.white)};
  z-index: 10;
`
const ControllerStyled = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  position: relative;
  z-index: 10;
  & ${IconStyled} {
    z-index: 10;
    cursor: pointer;
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
`
export const HeadProfile: React.FC<HeadProfileType> = ({
  image = '',
  name = '',
}) => {
  const color = '#fff'
  return (
    <WidgetStyled backgroundImage={image}>
      <OverlayStyled />
      <WrapperImageStyled>
        <Avatar image={image} size="150px" isRound />
      </WrapperImageStyled>
      <NameStyled className="middle">{name}</NameStyled>
      <ControllerStyled>
        <Icon type="add-user" color={color} size="30px" />
        <Icon type="remove-user" color={color} size="30px" />
        <Icon type="write" color={color} size="25px" />
      </ControllerStyled>
    </WidgetStyled>
  )
}

export default HeadProfile
