import React from 'react'
import style from '@/components/pages/profile/profile.module.scss'
import Avatar from '@/components/ui/avatar/Avatar'
import Icon from '@/components/ui/icon/Icon'

type HeadProfileType = {
  image: string
  name: string
}

export const HeadProfile: React.FC<HeadProfileType> = ({
  image = '',
  name = '',
}) => {
  const styleheadProfile = {
    backgroundImage: `url(${image})`,
  }
  return (
    <div className={style.head} style={styleheadProfile}>
      <div className={style.overlay} />
      <div className={style['wrapper-image']}>
        <Avatar image={image} size="150px" isRound />
      </div>
      <p className={`middle ${style.name}`}>{name}</p>
      <div className={style.controller}>
        <div className={style['wrapper-icon']}>
          <Icon type="add-user" color="#fff" size="30px" />
        </div>
        <div className={style['wrapper-icon']}>
          <Icon type="remove-user" color="#fff" size="30px" />
        </div>
        <div className={style['wrapper-icon']}>
          <Icon type="write" color="#fff" size="25px" />
        </div>
      </div>
    </div>
  )
}

export default HeadProfile
