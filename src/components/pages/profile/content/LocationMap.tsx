import React, { useState } from 'react'
import BaseButton from '@/components/ui/BaseButton'
import FormInput from '@/components/ui/FormInput'
import Loader from '@/components/ui/Loader'
import { FormStyled } from '@/components/pages/profile/content/MainInfoForm'

export const LocationMap: React.FC = () => {
  const [location, setLocation] = useState('')
  const isLoading = false

  return (
    <FormStyled>
      <p className="middle">Местоположение</p>
      <FormInput
        value={location}
        placeholder="Введите адрес"
        onChange={(e) => setLocation(e)}
      />
      {/* Map */}
      {isLoading ? <Loader /> : ''}
      <BaseButton>Сохранить</BaseButton>
    </FormStyled>
  )
}

export default LocationMap
