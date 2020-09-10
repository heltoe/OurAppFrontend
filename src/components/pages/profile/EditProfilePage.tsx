import React from 'react'
import MainInfoForm from '@/components/pages/profile/content/MainInfoForm'
import LocationMap from '@/components/pages/profile/content/LocationMap'
import ChangePass from '@/components/pages/profile/content/ChangePass'
import PhotoBlock from '@/components/pages/profile/content/PhotoBlock'
import style from '@/components/pages/profile/profile.module.scss'
import { user } from '@/data/user'

export const EditProfilePage: React.FC = () => {
  return (
    <div className={`wrapper ${style['profile-page']}`}>
      <div className={style['block-info']}>
        <MainInfoForm />
        <LocationMap />
        <ChangePass />
      </div>
      <PhotoBlock image={user.image} />
    </div>
  )
}

export default EditProfilePage
