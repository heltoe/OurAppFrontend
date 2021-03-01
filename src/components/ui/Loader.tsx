import React from 'react'
import styled, { keyframes } from 'styled-components'

// const ldsRing = keyframes`
//   0% { color: transparent; }
//   100% { color: rgb(116, 129, 235); }
// `
const ldsRing = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`
const BaseButtonStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: ${(props) => props.theme.rgba(props.theme.colors.grey4, 0.4)};
  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 4px;
    border: ${(props) =>
      `4px solid ${props.theme.rgb(props.theme.colors.grey4)}`};
    border-radius: 50%;
    animation: ${ldsRing} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${(props) =>
      `${props.theme.rgb(
        props.theme.colors.purple1,
      )} transparent transparent transparent`};
    &:nth-child(1) {
      animation-delay: -0.45s;
    }
    &:nth-child(2) {
      animation-delay: -0.3s;
    }
    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
`
export const Loader: React.FC = () => {
  return (
    <BaseButtonStyled>
      <div />
      <div />
      <div />
      <div />
    </BaseButtonStyled>
  )
}

export default Loader
