import React from 'react'
import styled from 'styled-components'
import { BlockStyled } from '@/components/ui/Block'
import Icon, { IconStyled } from '@/components/ui/Icon'

export type ModalBoxType = {
  closeModal?(): void
}
export const ModalBoxStyled = styled(BlockStyled)`
  display: flex;
  width: 400px;
  margin: 0 auto;
  position: relative;
  & ${IconStyled} {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    transition: ${(props) => `opacity ${props.theme.transition}`};
    use {
      fill: ${(props) => props.theme.rgb(props.theme.colors.grey1)};
    }
    &:hover {
      use {
        fill: ${(props) => props.theme.rgb(props.theme.colors.purple1)};
      }
    }
  }
`
const ModalBox: React.FC<ModalBoxType> = ({ children, closeModal = () => {} }) => {
  return (
    <ModalBoxStyled>
      {children}
      <Icon type="close" size="24px" onClick={() => closeModal()}/>
    </ModalBoxStyled>
  )
}

export default ModalBox
