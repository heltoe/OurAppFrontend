import React from 'react'
import styled from 'styled-components'

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
  br, p, div { display: none; }
`
const InputBox: React.FC = () => {
  return (
    <InputBoxStyled>
      <InputBoxFieldStyled
        // autocomplete={false}
        // spellcheck={false}
        // autofocus={true}
        // typefocus={true}
        // pastecheck={true}
        // tabindex="-1"
        role="textbox"
        contentEditable={true}
        aria-multiline
      />
      <InputBoxPlaceholderStyled>Написать сообщение</InputBoxPlaceholderStyled>
    </InputBoxStyled>
  )
}

export default InputBox
