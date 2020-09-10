import React, { useState } from 'react'
import BaseButton from '@/components/ui/button/BaseButton'
import FormInput from '@/components/ui/input/FormInput'
import Loader from '@/components/ui/loader/Loader'
import style from '@/components/pages/profile/profile.module.scss'

export const LocationMap: React.FC = () => {
  const [location, setLocation] = useState('')
  const isLoading = false

  return (
    <div className={style.form}>
      <p className="middle">Местоположение</p>
      <FormInput
        value={location}
        placeholder="Введите адрес"
        onChange={(e) => setLocation(e)}
      />
      {/* Map */}
      {isLoading ? <Loader /> : ''}
      <BaseButton>Сохранить</BaseButton>
    </div>
  )
}

export default LocationMap
