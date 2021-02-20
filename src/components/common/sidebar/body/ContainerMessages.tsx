import React from 'react'
import { Link } from 'react-router-dom'
import { useStore } from 'effector-react'
import styled from 'styled-components'
import { $listChat } from '@/components/common/sidebar/SideBar.model'
import { getRouterByName } from '@/routes'
import Card, { CardStyled } from '@/components/common/sidebar/body/Card'
import EmptyPlaceholder from '@/components/common/EmptyPlaceholder'

type WrapperCardsType = {
  isOpen: boolean
}

const WrapperCardsStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  & > ${CardStyled} {
    border-bottom: ${(props) => `1px solid ${props.theme.rgb(props.theme.colors.grey2)}`};
  }
`
export const ContainerMessages: React.FC<WrapperCardsType> = ({ isOpen }) => {
  const messages = useStore($listChat)
  return (
    <WrapperCardsStyled>
      {
        messages.length ? messages.map((item) => (
          <Link to={`${getRouterByName('chat-page').path}`} key={item.id}>
            <Card
              id={item.id}
              image={item.photo}
              status={item.status}
              time={item.time}
              fullName={`${item.first_name} ${item.last_name}`}
              message={item.message}
              isOpen={isOpen}
            />
          </Link>
        )) : <EmptyPlaceholder>Список сообщений пуст</EmptyPlaceholder>
      }
    </WrapperCardsStyled>
  )
}

export default ContainerMessages
