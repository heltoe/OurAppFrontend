import React from 'react'
import styled from 'styled-components'
import Card, { CardStyled } from '@/components/common/sidebar/body/Card'
import EmptyPlaceholder from '@/components/common/EmptyPlaceholder'

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
      id: 1,
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
          <Card
            key={item.id}
            image={item.image}
            status={item.status}
            time={item.time}
            fullName={item.fullName}
            message={item.message}
          />
        )) : <EmptyPlaceholder>Список сообщений пуст</EmptyPlaceholder>
      }
    </WrapperCardsStyled>
  )
}

export default ContainerMessages
