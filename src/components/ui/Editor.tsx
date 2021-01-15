import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

type EditorType = {
  value: string
  onChange(value: string): void,
  triggerClean: boolean
}

const TextAreaStyled = styled.textarea`
  min-height: 40px;
  border: 0;
  width: 100%;
  word-wrap: break-word;
  border-radius: 8px;
  resize: none;
  padding: 10px;
  padding-right: 55px;
  font-size: 16px;
`
const WrapperCommentTextHiddenStyled = styled.div`
  position: relative;
`
const CommentTextHiddenStyled = styled.div`
  width: 100%;
  min-height: 40px;
  visibility:hidden;
  position: absolute;
  left: 0;
  top: 0;
  padding: 10px;
  padding-right: 71px;
  word-wrap: break-word;
  font-size: 16px;
`
const WrapperEditor = styled.div`
  width: 100%;
`
const MyInput: React.FC<EditorType> = ({ value, onChange, triggerClean }) => {
  const [editorValue, setEditorValue] = useState('')
  const refArea = useRef(null)
  const refAreaHidden = useRef(null)
  const minHeight = 40
  const maxHeight = 220
  const resizeArea = () => {
    const area = refArea?.current as HTMLInputElement | null
    const areaHidden = refAreaHidden?.current as HTMLDivElement | null
    if (area && areaHidden) {
      let text = ''
      area.value.replace(/[<>]/g, '_').split('\n').forEach((s: string) => {
        text = `${text}<div>${s.replace(/\s\s/g, ' &nbsp;')}&nbsp;</div>\n`
      })
      onChange(text)
      areaHidden.innerHTML = text
      const plusDevide = areaHidden.offsetHeight > minHeight ? 15 : 0
      let height = areaHidden.offsetHeight + plusDevide
      height = Math.max(minHeight, height)
      height = Math.min(maxHeight, height)
      area.style.height = `${height}px`
    }
  }
  const watchButtonTyped = (e: any) => {
    if (e.keyCode === 13 && !editorValue.length || e.keyCode === 13 && editorValue[editorValue.length - 2] && editorValue[editorValue.length - 2] === '\n') e.preventDefault()
  }
  useEffect(() => {
    resizeArea()
  }, [])
  useEffect(() => {
    setEditorValue('')
    resizeArea()
  }, [triggerClean])
  return (
    <WrapperEditor>
      <WrapperCommentTextHiddenStyled>
        <CommentTextHiddenStyled ref={refAreaHidden} />
      </WrapperCommentTextHiddenStyled>
      <TextAreaStyled
        ref={refArea}
        value={editorValue}
        onInput={resizeArea}
        onChange={(e) => setEditorValue(e.target.value)}
        onKeyDown={(e) => watchButtonTyped(e)}
      />
    </WrapperEditor>
  );
};

export default MyInput
