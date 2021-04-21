import React from 'react'
import { useStore } from 'effector-react'
import styled, { keyframes } from 'styled-components'
import { ModalWindowStyled } from '@/components/common/modal/Modal'
import ModalBox, { ModalBoxStyled } from '@/components/common/modal/ModalBox'
import { BaseButtonStyled } from '@/components/ui/BaseButton'
import Icon, { IconStyled } from '@/components/ui/Icon'
import Avatar, { AvatarStyled } from '@/components/ui/Avatar'
import { changeIsShowModal, $typeCall } from '@/components/common/modal/offer-call/OfferToCall.model'
import { $callUser, setCallUser } from '@/App.module'

const fade = keyframes`
  0% { opacity: 0.2 }
  100% { opacity: 1 }
`

const ModalReStyled = styled(ModalWindowStyled)`
  & ${ModalBoxStyled} {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    background-color: ${(props) => props.theme.rgb(props.theme.colors.grey9)};
  }
  ${BaseButtonStyled} {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 10px;
    ${IconStyled} {
      margin-right: 10px;
    }
  }
  ${AvatarStyled} {
    margin-top: 20px;
  }
  use {
    fill: ${(props) => props.theme.rgb(props.theme.colors.white)};
  }
  &:hover {
    use {
      fill: ${(props) => props.theme.rgb(props.theme.colors.white)};
    }
  }
`
const NameUserStyled = styled.p`
  font-size: 24px;
  color: ${(props) => props.theme.rgb(props.theme.colors.white)};
  margin-top: 20px;
`
const DescriptionStyled = styled.p`
  font-size: 20px;
  color: ${(props) => props.theme.rgb(props.theme.colors.grey1)};
  margin-top: 10px;
  margin-bottom: 10px;
`
const AnumatedDotStyled = styled.span`
  font-size: 20px;
  color: ${(props) => props.theme.rgb(props.theme.colors.grey1)};
  transition: ${(props) => `opacity ${props.theme.transition}`};
  opacity: 1;
  margin-left: 2px;
  animation-fill-mode: backwards;
  &:nth-child(1) {
    animation: ${fade} 1.2s ease-in-out infinite;
  }
  &:nth-child(2) {
    animation: ${fade} 1.2s ease-in-out 0.2s infinite;
  }
  &:nth-child(3) {
    animation: ${fade} 1.2s ease-in-out 0.4s infinite;
  }
`
const AnswerBtn = styled(BaseButtonStyled)`
  background-color: ${(props) => props.theme.rgb(props.theme.colors.green1)};
`
const DeclineBtn = styled(BaseButtonStyled)`
  background-color: ${(props) => props.theme.rgb(props.theme.colors.red)};
`
const OfferToCall: React.FC = () => {
  const typeCall = useStore($typeCall)
  const callUser = useStore($callUser)
  const answer = () => {
    console.log('answer')
    changeIsShowModal(false)
  }
  const decline = () => {
    changeIsShowModal(false)
    setCallUser(null)
  }
  return (
    <ModalReStyled>
      <ModalBox closeModal={() => decline()}>
        <Avatar
          id={callUser ? callUser.user_id || 1 : 1}
          image={callUser ? callUser.croped_photo || '' : ''}
          fullName={callUser ? `${callUser.first_name || ''} ${callUser.last_name || ''}` : ''}
          isRound
          isPulse
          size="150px"
        />
        <NameUserStyled>{callUser ? `${callUser.first_name || ''} ${callUser.last_name || ''}` : ''}</NameUserStyled>
        <DescriptionStyled>
          {typeCall === 'incomming' ? 'Входящий' : 'Исходящий'} звонок
          <AnumatedDotStyled>.</AnumatedDotStyled>
          <AnumatedDotStyled>.</AnumatedDotStyled>
          <AnumatedDotStyled>.</AnumatedDotStyled>
        </DescriptionStyled>
        {typeCall === 'incomming' && <AnswerBtn onClick={() => answer()}>
          <Icon type="phone-2" color="#fff" size="18px" />
          Ответить на звонок
        </AnswerBtn>}
        <DeclineBtn onClick={() => decline()}>
          Отклонить
        </DeclineBtn>
      </ModalBox>
    </ModalReStyled>
  )
}

export default OfferToCall
