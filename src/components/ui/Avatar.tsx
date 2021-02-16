import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

type AvatarType = {
  id: number
  isRound?: boolean
  size?: string
  image?: string
  color?: string
  fullName?: string
}
export const AvatarStyled = styled.div<{ size: string, image: string, isRound: boolean, color: string }>`
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
  transition: ${(props) => props.theme.transition};
`
const InitialsStyled = styled.p<{ size: string }>`
  position: relative;
  z-index: 10;
  color: ${(props) => props.theme.rgb(props.theme.colors.white)};
  text-align: center;
  text-transform: uppercase;
  font-size: ${(props) => `calc(${props.size} / 4)`};
`

const colors = [
  `#7fc8e8`,
  `#fdc16c`,
  `#fd6c6d`,
  `#7abc7a`,
  `#ae69bf`,
  `#7fa2e8`,
  `#d5c9b8`,
  `#989898`,
  `#ffb8e8`,
  `#5d414d`,
  `#cbe9ab`,
  `#c0cce2`,
  `#c0cce2`,
  `#f58569`,
  `#3a9af9`,
  `#3a9af9`,
  `#608190`,
  `#fe9a9a`,
  `#ad7d7d`,
  `#94c2c6`,
  `#a2b464`
]
export const getColorById = (id: number) => colors[id % colors.length] || '#000'

export const Avatar: React.FC<AvatarType> = ({
  id = 1,
  image = '',
  size = '30px',
  isRound = false,
  fullName = ''
}) => {
  const [initials, setInitials] = useState('')
  useEffect(() => {
    const str = (fullName || '').split(' ').map((n) => n[0]).join(' ')
    setInitials(str.length > 2 ? str.slice(0, 3) : str)
  }, [fullName])
  return (
    <AvatarStyled
      size={size}
      image={image}
      color={getColorById(id)}
      isRound={isRound}
    >
      {!image.length && <InitialsStyled size={size} className="no-select">{initials}</InitialsStyled>}
    </AvatarStyled>
  )
}

export default Avatar
