import React from 'react'
import FormIntroContainer from '@/components/common/form-intro/FotmIntroContainer'
import TogglePage from '@/components/common/form-intro/toggle-page/TogglePage'
import FormIntro from '@/components/common/form-intro/form/FormIntro'

export const PolicyPage: React.FC = () => {
  return (
    <FormIntroContainer>
      <FormIntro>123</FormIntro>
      <TogglePage routes={[{ routeName: 'login', content: 'Вход' }]} />
    </FormIntroContainer>
  )
}

export default PolicyPage
