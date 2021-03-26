import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useStore } from 'effector-react'
import { getRouterByName } from '@/routes'
import { User } from '@/api/types'
import Avatar from '@/components/ui/Avatar'
import { $profileUser } from '@/components/pages/profile/EditProfile.model'
import { changeActiveUser } from '@/App.module'

type CardType = {
  author: number
  recipment: User
  time: string
  text: string
  photos: string[]
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
export const CardStyled = styled(Link)<{ shortType: boolean }>`
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
  author,
  recipment,
  time,
  text,
  photos,
  isOpen
}) => {
  const prifileInfo = useStore($profileUser)
  const authorInfo = author === prifileInfo.user_id ? prifileInfo : recipment
  const setActiveUser = () => {
    changeActiveUser({
      user_id: recipment.user_id,
      first_name: recipment.first_name,
      last_name: recipment.last_name,
      gender: recipment.gender,
      birth_date: recipment.birth_date,
      phone: recipment.phone,
      original_photo: recipment.original_photo,
      croped_photo: recipment.croped_photo
    })
  }
  return (
    <CardStyled
      to={`${getRouterByName('chat-page').path}?recipment=${recipment.user_id}`}
      shortType={isOpen}
      onClick={() => setActiveUser()}
    >
      <AvatarOvarlay shortType={isOpen}>
        <Avatar id={authorInfo.user_id} fullName={`${authorInfo.first_name} ${authorInfo.last_name}`} size="70px" isRound image={authorInfo.croped_photo || ''} />
      </AvatarOvarlay>
      {isOpen && <BlockColumnStyled>
        <BlockStyled>
          <FullNameStyled className="middle">{`${authorInfo.first_name} ${authorInfo.last_name}`}</FullNameStyled>
          <p>{time}</p>
        </BlockStyled>
        <MessageStyled dangerouslySetInnerHTML={{__html: text }} />
      </BlockColumnStyled>}
    </CardStyled>
  )
}

export default Card
