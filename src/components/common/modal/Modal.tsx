import React from 'react'
import styled from 'styled-components'

const ModalWindowSwtyled = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: ${(props) => props.theme.rgba(props.theme.colors.black, 0.4)};
  z-index: 999;
`
const ModalWindow: React.FC = ({ children }) => {
  return (
    <ModalWindowSwtyled>{children}</ModalWindowSwtyled>
  )
}

export default ModalWindow
