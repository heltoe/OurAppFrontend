import React from 'react'
import { Link } from 'react-router-dom'
import { useStore } from 'effector-react'
import styled from 'styled-components'
import { $listChat } from '@/components/common/sidebar/SideBar.model'
import Card from '@/components/common/sidebar/body/Card'
import EmptyPlaceholder from '@/components/common/EmptyPlaceholder'

type WrapperCardsType = {
  isOpen: boolean
}

const WrapperCardsStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
export const ContainerMessages: React.FC<WrapperCardsType> = ({ isOpen }) => {
  const chats = useStore($listChat)
  return (
    <WrapperCardsStyled>
      {
        chats.length ? chats.map((item) => (
          <Card
            author={item.last_message.author}
            recipient={item.recipient_info}
            time={item.last_message.date}
            text={item.last_message.message}
            photos={item.last_message.files}
            card_chat_id={item.chat_id}
            isOpen={isOpen}
            key={item.chat_id}
          />
        )) : <EmptyPlaceholder isShort={!isOpen}>Список чатов пуст</EmptyPlaceholder>
      }
    </WrapperCardsStyled>
  )
}

export default ContainerMessages
