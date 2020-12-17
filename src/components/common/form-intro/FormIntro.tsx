import React from 'react'
import styled from 'styled-components'
import { LabelStyled } from '@/components/ui/FormInput'
import { BaseButtonStyled } from '@/components/ui/BaseButton'
import { device } from '@/Theme'

// type FormType = {
//   onSubmit?(e): void
// }
const WrapperTogglePageStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px 50px;
  & ${LabelStyled} {
    width: 100%;
    &:not(:first-child) {
      margin-top: 10px;
    }
  }
  & ${BaseButtonStyled} {
    width: 100%;
    margin-top: 20px;
  }
  @media screen and ${device.mobileL} {
    padding: 20px;
  }
`
export const FormIntro: React.FC = ({ children }) => {
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
  }
  return (
    <WrapperTogglePageStyled onSubmit={submitHandler}>
      {children}
    </WrapperTogglePageStyled>
  )
}

export default FormIntro
