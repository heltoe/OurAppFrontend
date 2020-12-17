import React from 'react'
import styled from 'styled-components'
import Card, { CardStyled } from '@/components/common/sidebar/body/Card'

const EmptyListStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
const WrapperCardsStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  & > ${CardStyled} {
    border-bottom: ${(props) => `1px solid ${props.theme.rgb(props.theme.colors.grey2)}`};
  }
`
export const ContainerMessages: React.FC = () => {
  const messages: any[] = [
    {
      image: 'https://st.depositphotos.com/2000885/1902/i/450/depositphotos_19021343-stock-photo-red-heart.jpg',
      status: 'online',
      time: '24.05.1995',
      fullName: 'Влад Жулинскийsads asdsada asdasdas dasdsads',
      message: 'Какое то сообщение ыфвфывфывфывфывфывфвы'
    },
    {
      image: 'https://st.depositphotos.com/2000885/1902/i/450/depositphotos_19021343-stock-photo-red-heart.jpg',
      status: 'online',
      time: '24.05.1995',
      fullName: 'Влад Жулинский',
      message: 'Какое то сообщение ыфвфывфывфывфывфывфвы'
    },
    {
      image: 'https://st.depositphotos.com/2000885/1902/i/450/depositphotos_19021343-stock-photo-red-heart.jpg',
      status: 'online',
      time: '24.05.1995',
      fullName: 'Влад Жулинский',
      message: 'Какое то сообщение ыфвфывфывфывфывфывфвы'
    },
    {
      image: 'https://st.depositphotos.com/2000885/1902/i/450/depositphotos_19021343-stock-photo-red-heart.jpg',
      status: 'online',
      time: '24.05.1995',
      fullName: 'Влад Жулинский',
      message: 'Какое то сообщение ыфвфывфывфывфывфывфвы'
    },
    {
      image: 'https://st.depositphotos.com/2000885/1902/i/450/depositphotos_19021343-stock-photo-red-heart.jpg',
      status: 'online',
      time: '24.05.1995',
      fullName: 'Влад Жулинский',
      message: 'Какое то сообщение ыфвфывфывфывфывфывфвы'
    },
    {
      image: 'https://st.depositphotos.com/2000885/1902/i/450/depositphotos_19021343-stock-photo-red-heart.jpg',
      status: 'online',
      time: '24.05.1995',
      fullName: 'Влад Жулинский',
      message: 'Какое то сообщение ыфвфывфывфывфывфывфвы'
    },
    {
      image: 'https://st.depositphotos.com/2000885/1902/i/450/depositphotos_19021343-stock-photo-red-heart.jpg',
      status: 'online',
      time: '24.05.1995',
      fullName: 'Влад Жулинский',
      message: 'Какое то сообщение ыфвфывфывфывфывфывфвы'
    }
  ]
  return (
    <WrapperCardsStyled>
      {
        messages.length ? messages.map((item) => (
          <Card
            image={item.image}
            status={item.status}
            time={item.time}
            fullName={item.fullName}
            message={item.message}
          />
        )) : <EmptyListStyled>
          <p className="light">Список сообщений пуст</p>
        </EmptyListStyled>
      }
    </WrapperCardsStyled>
  )
}

export default ContainerMessages
