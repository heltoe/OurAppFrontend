import React from 'react'
import style from '@/components/pages/profile/profile.module.scss'
import Icon from '@/components/ui/Icon'

type LocationType = {
  link: string
  label: string
}
type BodyProfileType = {
  location: LocationType | null
  email: string
  birthday: string
  status: string
}
export const BodyProfile: React.FC<BodyProfileType> = ({
  location = null,
  email = '',
  birthday = '',
  status = 'offline',
}) => {
  const classStaus =
    status === 'offline' ? `${style.offline}` : `${style.online}`
  const textStatus = status === 'offline' ? 'Offline' : 'Online'
  const greyColor = '#9f9f9f'
  return (
    <div className={style.body}>
      {location ? (
        <a
          href={location.link}
          target="_blank"
          rel="noreferrer"
          className={style.line}
        >
          <Icon type="pin" color={greyColor} />
          <p>{location.label}</p>
        </a>
      ) : (
        ''
      )}
      <a href={`mailto:${email}`} className={style.line}>
        <Icon type="letter" color={greyColor} />
        <p>{email}</p>
      </a>
      <div className={style.line}>
        <Icon type="birthday" color={greyColor} />
        <p>{birthday}</p>
      </div>
      <div className={style.line}>
        <Icon type="phone" color={greyColor} />
        <p className={classStaus}>{textStatus}</p>
      </div>
    </div>
  )
}

export default BodyProfile
