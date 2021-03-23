import React from 'react'
import Avatar from '@/components/ui/Avatar'
import styled from 'styled-components'

type CardType = {
  id: number
  image: string
  time: string
  fullName: string
  message: string
  isOpen: boolean
}

export const AvatarOvarlay = styled.div<{ shortType?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 80px;
  height: 79px;
  transition: ${(props) => props.theme.transition};
  transform: ${(props) => `translateX(${props.shortType ? 0 : 200}px)`};
  background-color: #fff;
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.rgba(props.theme.colors.purple2, 0)};
    transition: ${(props) => props.theme.transition};
    z-index: 10;
  }
`
const BlockColumnStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 80px);
  padding: 10px;
  transition: ${(props) => `background-color ${props.theme.transition}`};
`
export const CardStyled = styled.div<{ shortType: boolean }>`
  display: flex;
  justify-content: space-between;
  height: 90px;
  width: 100%;
  padding: ${(props) => props.shortType ? '5px 0' : '5px'};
  cursor: pointer;
  transition: ${(props) => `box-shadow ${props.theme.transition}`};
  &:hover {
    box-shadow: ${(props) => props.theme.shadow.shadow2};
    z-index: 10;
    ${AvatarOvarlay} {
      &:after {
        background-color: ${(props) => props.theme.rgba(props.theme.colors.purple2, 0.1)};
      }
    }
  }
`
const BlockStyled = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 20px;
`
const FullNameStyled = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const MessageStyled = styled.div`
  margin-bottom: auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const Card: React.FC<CardType> = ({
  id,
  image,
  time,
  fullName,
  message,
  isOpen
}) => {
  return (
    <CardStyled shortType={isOpen}>
      <AvatarOvarlay shortType={isOpen}>
        <Avatar id={id} fullName={fullName} size="70px" isRound image={image} />
      </AvatarOvarlay>
      {isOpen && <BlockColumnStyled>
        <BlockStyled>
          <FullNameStyled className="middle">{fullName}</FullNameStyled>
          <p>{time}</p>
        </BlockStyled>
        <MessageStyled>{message}</MessageStyled>
      </BlockColumnStyled>}
    </CardStyled>
  )
}

export default Card
