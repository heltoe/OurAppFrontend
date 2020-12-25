import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
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
  const messages: any[] = [
    {
      id: 1,
      image: 'https://st.depositphotos.com/2000885/1902/i/450/depositphotos_19021343-stock-photo-red-heart.jpg',
      status: 'online',
      time: '24.05.1995',
      fullName: 'Влад Жулинскийsads asdsada asdasdas dasdsads',
      message: 'Какое то сообщение ыфвфывфывфывфывфывфвы'
    },
    {
      id: 2,
      image: 'https://st.depositphotos.com/2000885/1902/i/450/depositphotos_19021343-stock-photo-red-heart.jpg',
      status: 'online',
      time: '24.05.1995',
      fullName: 'Влад Жулинскийsads asdsada asdasdas dasdsads',
      message: 'Какое то сообщение ыфвфывфывфывфывфывфвы'
    },
    {
      id: 3,
      image: 'https://st.depositphotos.com/2000885/1902/i/450/depositphotos_19021343-stock-photo-red-heart.jpg',
      status: 'online',
      time: '24.05.1995',
      fullName: 'Влад Жулинскийsads asdsada asdasdas dasdsads',
      message: 'Какое то сообщение ыфвфывфывфывфывфывфвы'
    },
    {
      id: 4,
      image: 'https://st.depositphotos.com/2000885/1902/i/450/depositphotos_19021343-stock-photo-red-heart.jpg',
      status: 'online',
      time: '24.05.1995',
      fullName: 'Влад Жулинскийsads asdsada asdasdas dasdsads',
      message: 'Какое то сообщение ыфвфывфывфывфывфывфвы'
    },
    {
      id: 5,
      image: 'https://st.depositphotos.com/2000885/1902/i/450/depositphotos_19021343-stock-photo-red-heart.jpg',
      status: 'online',
      time: '24.05.1995',
      fullName: 'Влад Жулинскийsads asdsada asdasdas dasdsads',
      message: 'Какое то сообщение ыфвфывфывфывфывфывфвы'
    },
    {
      id: 6,
      image: 'https://st.depositphotos.com/2000885/1902/i/450/depositphotos_19021343-stock-photo-red-heart.jpg',
      status: 'online',
      time: '24.05.1995',
      fullName: 'Влад Жулинскийsads asdsada asdasdas dasdsads',
      message: 'Какое то сообщение ыфвфывфывфывфывфывфвы'
    },
    {
      id: 7,
      image: 'https://st.depositphotos.com/2000885/1902/i/450/depositphotos_19021343-stock-photo-red-heart.jpg',
      status: 'online',
      time: '24.05.1995',
      fullName: 'Влад Жулинскийsads asdsada asdasdas dasdsads',
      message: 'Какое то сообщение ыфвфывфывфывфывфывфвы'
    },
    {
      id: 8,
      image: 'https://st.depositphotos.com/2000885/1902/i/450/depositphotos_19021343-stock-photo-red-heart.jpg',
      status: 'online',
      time: '24.05.1995',
      fullName: 'Влад Жулинскийsads asdsada asdasdas dasdsads',
      message: 'Какое то сообщение ыфвфывфывфывфывфывфвы'
    },
    {
      id: 9,
      image: 'https://st.depositphotos.com/2000885/1902/i/450/depositphotos_19021343-stock-photo-red-heart.jpg',
      status: 'online',
      time: '24.05.1995',
      fullName: 'Влад Жулинскийsads asdsada asdasdas dasdsads',
      message: 'Какое то сообщение ыфвфывфывфывфывфывфвы'
    },
    {
      id: 10,
      image: 'https://st.depositphotos.com/2000885/1902/i/450/depositphotos_19021343-stock-photo-red-heart.jpg',
      status: 'online',
      time: '24.05.1995',
      fullName: 'Влад Жулинскийsads asdsada asdasdas dasdsads',
      message: 'Какое то сообщение ыфвфывфывфывфывфывфвы'
    },
    {
      id: 11,
      image: 'https://st.depositphotos.com/2000885/1902/i/450/depositphotos_19021343-stock-photo-red-heart.jpg',
      status: 'online',
      time: '24.05.1995',
      fullName: 'Влад Жулинскийsads asdsada asdasdas dasdsads',
      message: 'Какое то сообщение ыфвфывфывфывфывфывфвы'
    },
    {
      id: 12,
      image: 'https://st.depositphotos.com/2000885/1902/i/450/depositphotos_19021343-stock-photo-red-heart.jpg',
      status: 'online',
      time: '24.05.1995',
      fullName: 'Влад Жулинскийsads asdsada asdasdas dasdsads',
      message: 'Какое то сообщение ыфвфывфывфывфывфывфвы'
    }
  ]
  return (
    <WrapperCardsStyled>
      {
        messages.length ? messages.map((item) => (
          <Link to={`${getRouterByName('chat-page').path}`} key={item.id}>
            <Card
              image={item.image}
              status={item.status}
              time={item.time}
              fullName={item.fullName}
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
