import React from 'react'
import styled from 'styled-components'
import Avatar from '@/components/ui/Avatar'
import { User } from '@/api/types'

type LastMessageType = {
  author: User
  text: string
  photos: string[]
}

const WrapperLastMessage = styled.div<{ isShort?: boolean }>`
  display: flex;
  align-items: center;
`
const MessageStyled = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 10px;
`
export const AvatarOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 20px;
  height: 20px;
  transition: ${(props) => props.theme.transition};
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) =>
      props.theme.rgba(props.theme.colors.purple2, 0)};
    transition: ${(props) => props.theme.transition};
    z-index: 10;
  }
`
export const LastMessage: React.FC<LastMessageType> = ({
  text,
  photos,
  author,
}) => {
  return (
    <WrapperLastMessage>
      <AvatarOverlay>
        <Avatar
          id={author.user_id}
          fullName={`${author.first_name} ${author.last_name}`}
          size="20px"
          isRound
          image={author.croped_photo || ''}
        />
      </AvatarOverlay>
      <MessageStyled
        dangerouslySetInnerHTML={{
          __html:
            text.length === 18 && photos.length
              ? '<div>Изображение</div>'
              : text,
        }}
      />
    </WrapperLastMessage>
  )
}

export default LastMessage
