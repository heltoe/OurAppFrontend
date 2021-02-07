import React from 'react'
import styled from 'styled-components'
import Avatar from '@/components/ui/Avatar'
import Icon from '@/components/ui/Icon'
import { OverlayStyled, WrapperImageStyled } from '@/components/pages/profile/content/photo-block/PhotoBlock'

type HeadProfileType = {
  image: string
  name: string
  isFriend?: boolean
  closeWidget(): void
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
const WrapperIconStyled = styled.div<{ color: string }>`
  z-index: 10;
  cursor: pointer;
  &:hover {
    use {
      fill: ${(props) => props.theme.rgb(props.theme.colors[props.color])};
    }
  }
`
const ControllerStyled = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  position: relative;
  z-index: 10;
  & ${WrapperIconStyled} {
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
`
const CloseWidgetStyled = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  z-index: 100;
`
export const HeadProfile: React.FC<HeadProfileType> = ({
  image = '',
  name = '',
  isFriend = false,
  closeWidget
}) => {
  const color = '#fff'
  return (
    <WidgetStyled backgroundImage={image}>
      <CloseWidgetStyled onClick={() => closeWidget()}>
        <Icon type="close" color={color} size="30px" />
      </CloseWidgetStyled>
      <OverlayStyled />
      <WrapperImageStyled>
        <Avatar id={8} image={image} size="150px" isRound />
      </WrapperImageStyled>
      <NameStyled className="middle">{name}</NameStyled>
      <ControllerStyled>
        <WrapperIconStyled color={isFriend ? 'red' : 'green1'}>
          <Icon
            type={isFriend ? 'remove-user' : 'add-user'}
            color={color}
            size="30px"
          />
        </WrapperIconStyled>
        <WrapperIconStyled color="purple1">
          <Icon type="write" color={color} size="25px" />
        </WrapperIconStyled>
      </ControllerStyled>
    </WidgetStyled>
  )
}

export default HeadProfile
