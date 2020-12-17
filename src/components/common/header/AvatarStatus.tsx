import React from 'react'
import Avatar from '@/components/ui/Avatar'
import styled from 'styled-components'
import style from '@/components/common/header/header.module.scss'

type AvatarStatusType = {
  isOnline?: boolean
  image: string
}

const AvatarStatusStyled = styled.div`
  position: relative;
  cursor: pointer;
`
const PointStatusStyled = styled.span`
  display: flex;
  width: 6px;
  height: 6px;
  position: absolute;
  right: 2px;
  top: 2px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.rgb(props.theme.colors.green1)};
`
export const AvatarStatus: React.FC<AvatarStatusType> = ({
  isOnline = false,
  image = '',
}) => {
  return (
    <AvatarStatusStyled>
      <Avatar image={image} isRound size="40px" />
      {isOnline ? <PointStatusStyled /> : ''}
    </AvatarStatusStyled>
  )
}

export default AvatarStatus
