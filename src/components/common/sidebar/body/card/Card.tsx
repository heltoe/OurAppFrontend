import React from 'react'
import Avatar from '@/components/ui/Avatar'
import style from '@/components/common/sidebar/body/card/card.module.scss'

type CardType = {
  image: string
  status: string
  time: string
  fullName: string
  message: string
}

export const Card: React.FC<CardType> = ({
  image = '',
  status = '',
  time = '',
  fullName = '',
  message = '',
}) => {
  return (
    <div className={`${style.card} ${style.block}`}>
      <div className={style['avatar-ovarlay']}>
        <Avatar size="80px" image={image} />
      </div>
      <div className={style['block-column']}>
        <div className={`${style.block} ${style['top-line']}`}>
          <p className={`light ${style.status}`}>{status}</p>
          <p className="light">{time}</p>
        </div>
        <p className={`middle ${style.fullname}`}>{fullName}</p>
        <p className={style.message}>{message}</p>
      </div>
    </div>
  )
}

export default Card
