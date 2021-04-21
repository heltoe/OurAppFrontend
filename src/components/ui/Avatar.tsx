import React, { useState, useEffect } from 'react'
import styled, { css, keyframes } from 'styled-components'

type AvatarType = {
  id: number
  isRound?: boolean
  size?: string
  image?: string
  color?: string
  fullName?: string
  isPulse?: boolean
}

const pulseBuilder = (color: string) => {
  const pulse = keyframes`
    0% {
      box-shadow: 0 0 0 0 rgba(${color}, 0.4);
    }
    70% {
      box-shadow: 0 0 0 20px rgba(${color}, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(${color}, 0);
    }
  `
  return pulse;
}

export const AvatarStyled = styled.div<{ size: string, image: string, isRound: boolean, color: string, isPulse: boolean }>`
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
  background-color: ${(props) => props.theme.rgb(props.color)};
  border-radius: ${(props) => (props.isRound ? '50%' : '0')};
  transition: ${(props) => props.theme.transition};
  animation: ${(props) => props.isPulse ? css`${pulseBuilder(props.color)} 2s ease-in-out infinite` : 'none'};
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
  `127, 200, 232`,
  `253, 193, 108`,
  `253, 108, 109`,
  `122, 188, 122`,
  `174, 105, 191`,
  `127, 162, 232`,
  `213, 201, 184`,
  `152, 152, 152`,
  `255, 184, 232`,
  `93, 65, 77`,
  `203, 233, 171`,
  `192, 204, 226`,
  `245, 133, 105`,
  `58, 154, 249`,
  `96, 129, 144`,
  `254, 154, 154`,
  `173, 125, 125`,
  `148, 194, 198`,
  `162, 180, 100`
]
export const getColorById = (id: number) => colors[id % colors.length] || '#000'

export const Avatar: React.FC<AvatarType> = ({
  id = 1,
  image = '',
  size = '30px',
  isRound = false,
  fullName = '',
  isPulse = false
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
      isPulse={isPulse}
    >
      {!image.length && <InitialsStyled size={size} className="no-select">{initials}</InitialsStyled>}
    </AvatarStyled>
  )
}

export default Avatar
