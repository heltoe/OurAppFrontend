import React from 'react'
import styled from 'styled-components'
import { BlockStyled } from '@/components/ui/Block'
import Icon from '@/components/ui/Icon'

export type ModalBoxType = {
  showClose?: boolean
  closeModal?(): void
}
export const ModalBoxStyled = styled(BlockStyled)`
  display: flex;
  width: auto;
  margin: 0 auto;
  position: relative;
`
const WrapperIconStyled = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  use {
    fill: ${(props) => props.theme.rgb(props.theme.colors.grey1)};
  }
  &:hover {
    use {
      fill: ${(props) => props.theme.rgb(props.theme.colors.purple1)};
    }
  }
`
const ModalBox: React.FC<ModalBoxType> = ({ children, showClose = true, closeModal = () => {} }) => {
  return (
    <ModalBoxStyled>
      {children}
      <WrapperIconStyled>
        {showClose && <Icon type="close" size="24px" onClick={() => closeModal()}/>}
      </WrapperIconStyled>
    </ModalBoxStyled>
  )
}

export default ModalBox
