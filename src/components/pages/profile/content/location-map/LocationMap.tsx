import React from 'react'
import { useStore } from 'effector-react'
import {
  $locationForm,
  locationFormChanged,
} from '@/components/pages/profile/content/location-map/LocationMap.model'
import BaseButton from '@/components/ui/BaseButton'
import FormInput from '@/components/ui/FormInput'
import Loader from '@/components/ui/Loader'
import { FormStyled } from '@/components/pages/profile/content/main-info-form/MainInfoForm'

export const LocationMap: React.FC = () => {
  const form = useStore($locationForm)
  return (
    <FormStyled>
      <p className="middle">Местоположение</p>
      <FormInput
        value={form.location}
        error={form.locationError}
        placeholder="Введите адрес"
        onChange={(e) => locationFormChanged.location(e)}
        onFocus={() => locationFormChanged.locationError('')}
      />
      {/* Map */}
      {false ? <Loader /> : ''}
      <BaseButton>Сохранить</BaseButton>
    </FormStyled>
  )
}

export default LocationMap
