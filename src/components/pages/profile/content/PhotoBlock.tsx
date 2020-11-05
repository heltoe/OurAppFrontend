import React from 'react'
import Avatar from '@/components/ui/Avatar'
import BaseButton from '@/components/ui/BaseButton'
import style from '@/components/pages/profile/profile.module.scss'
import Icon from '@/components/ui/Icon'

type PhotoBlockType = {
  image: string
}

export const PhotoBlock: React.FC<PhotoBlockType> = ({ image = '' }) => {
  const styleheadProfile = {
    backgroundImage: `url(${image})`,
  }
  return (
    <div className={style['block-photo']}>
      <div className={style.overlay} />
      <div className={style['overlay-photo']} style={styleheadProfile} />
      <p className="middle">Фото профиля</p>
      <div className={style['wrapper-image']}>
        <Avatar image={image} isRound size="180px" />
      </div>
      <div className={style['controller-box']}>
        <BaseButton>
          Загрузить фото
          <Icon type="upload" color="#fff" size="18px" />
        </BaseButton>
        <BaseButton>
          Выйти
          <Icon type="exit" color="#fff" size="18px" />
        </BaseButton>
        <BaseButton>
          Удалить аккаунт
          <Icon type="remove-user" color="#fff" size="18px" />
        </BaseButton>
      </div>
    </div>
  )
}

export default PhotoBlock
