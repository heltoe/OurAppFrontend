import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'

type InputBoxType = {
  value: string
  onChange(value: string): void
}

const InputBoxStyled = styled.div`
  width: 100%;
  cursor: text;
  position: relative;
  overflow: hidden;
  max-height: 220px;
  min-height: 37px;
`
const InputBoxPlaceholderStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  width: calc(100% - 10px);
  pointer-events: none; // пользователь никак не должен взаимодействовать с этим элементом напрямую
`
const InputBoxFieldStyled = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  resize: none;
  padding: 10px;
  padding-right: 55px;
  // отображение или скрытие элемента placeholder
  &:not(:empty) ~ ${InputBoxPlaceholderStyled} { display: none; }
  // скрытие лишних элементов внутри поля, которые могут в него попасть из-за особенностей браузеров
  /* br, p { display: none; } */
`
const InputBox: React.FC<InputBoxType> = ({ value, onChange }) => {
  const ref = useRef(null)
  const handleInput = (e: any) => {
    // const el: any = ref?.current
    // if ((!value && e.keyCode === 13) || e.keyCode === 13) return e.preventDefault()
    // // onChange(e.target.innerHTML)
    // // console.log(ref)
    return e.preventDefault()
  }
  return (
    <InputBoxStyled>
      <InputBoxFieldStyled
        ref={ref}
        role="textbox"
        contentEditable={true}
        aria-multiline={true}
        // onInput={(e) => handleInput(e)}
        onKeyUp={(e) => handleInput(e)}
        // dangerouslySetInnerHTML={{__html: value}}
      />
      <InputBoxPlaceholderStyled>Написать сообщение</InputBoxPlaceholderStyled>
    </InputBoxStyled>
  )
}

export default InputBox
