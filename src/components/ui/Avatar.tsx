import React, { useEffect } from 'react'
import styled from 'styled-components'

type AvatarType = {
  isRound?: boolean
  size?: string
  image?: string
  color?: string
  initials?: string
  fullName?: string
}
export const AvatarStyled = styled.div<AvatarType>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  min-width: 30px;
  min-height: 30px;
  padding: 3px;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  background-image: ${(props) => `url(${props.image})`};
  background-color: ${(props) => props.color};
  border-radius: ${(props) => (props.isRound ? '50%' : '0')};
`
const InitialsStyled = styled.p`
  color: ${(props) => props.theme.rgb(props.theme.colors.white)};
  text-align: center;
  text-transform: uppercase;
`
export const Avatar: React.FC<AvatarType> = ({
  image = '',
  size = '30px',
  isRound = false,
  color = '#9f9f9f',
  initials = '',
  fullName = ''
}) => {
  useEffect(() => {

  }, [fullName])
  return (
    <AvatarStyled size={size} image={image} color={color} isRound={isRound}>
      {!image.length && <InitialsStyled className="no-select">{initials}</InitialsStyled>}
    </AvatarStyled>
  )
}

export default Avatar
