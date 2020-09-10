import React from 'react'
import style from '@/components/pages/profile/profile.module.scss'
import HeadProfile from '@/components/pages/profile/widget/HeadProfile'
import BodyProfile from '@/components/pages/profile/widget/BodyProfile'
import { user } from '@/data/user'

export const ProfileWidget: React.FC = () => {
  return (
    <div className={style.widget}>
      <HeadProfile image={user.image} name={user.fullName} />
      <BodyProfile
        location={user.label}
        email={user.email}
        birthday={user.birthday}
        status={user.status}
      />
    </div>
  )
}

export default ProfileWidget
