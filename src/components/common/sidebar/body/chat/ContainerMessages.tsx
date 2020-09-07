import React from 'react'
import Card from '@/components/common/sidebar/body/card/Card'
import style from '@/components/common/sidebar/sidebar.module.scss'

export const ContainerMessages: React.FC = () => {
  const messages: any[] = []
  return (
    <div>
      {messages.map((item) => (
        <Card
          image={item.image}
          status={item.status}
          time={item.time}
          fullName={item.fullName}
          message={item.message}
        />
      ))}
      <div className={style['empty-list']}>
        <p className="light">Список сообщений пуст</p>
      </div>
    </div>
  )
}

export default ContainerMessages
