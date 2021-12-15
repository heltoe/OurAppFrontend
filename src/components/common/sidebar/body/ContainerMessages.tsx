import React from 'react'
import { useStore } from 'effector-react'
import styled from 'styled-components'
import { $listChat } from '@/components/common/sidebar/SideBar.model'
import Card from '@/components/common/sidebar/body/Card'
import EmptyPlaceholder, { EmptyListStyled } from '@/components/common/EmptyPlaceholder'

type WrapperCardsType = {
  isOpen: boolean
}

const WrapperCardsStyled = styled.div<{ isShort?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${EmptyListStyled} {
    max-width: ${(props) => (props.isShort ? '90px' : '100%')};
    margin-left: auto;
  }
`
export const ContainerMessages: React.FC<WrapperCardsType> = ({ isOpen }) => {
  const chats = useStore($listChat)
  return (
    <WrapperCardsStyled isShort={!isOpen}>
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
