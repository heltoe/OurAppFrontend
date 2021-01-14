import React, { useRef } from 'react'
import styled from 'styled-components'
import Icon from '@/components/ui/Icon'

type SettingsType = {
  multiple: boolean
  limit: number
  accept: string
}
export type ElementFileType = {
  id: number
  file: File
  preview: string | ArrayBuffer | null
}
type BindFileType = {
  settings: SettingsType
  callBack(arr: ElementFileType[]):void
}
const IconWrapperModifyStyled = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;
  margin-top: auto;
  margin-bottom: 5px;
  &:hover {
    use {
      fill: ${(props) => props.theme.rgb(props.theme.colors.purple1)};
    }
  }
`
const InputFileStyled = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0;
`
const BindFile: React.FC<BindFileType> = ({ settings, callBack }) => {
  const inputFile = useRef<HTMLInputElement>(null)
  const selectFiles = () => {
    const el = inputFile?.current
    if (el?.files) {
      const filesList = Object.values(el.files).map(file => ({ id: Math.random(), file, preview: URL.createObjectURL(file) }))
      const limit = settings.limit || 10
      callBack(filesList.length > limit ? filesList.slice(0, limit) : filesList)
      if (filesList.length > limit) alert(`Максимальное количество файлов не должно превышать ${limit} единиц`)
      el.blur()
    }
  }
  return (
    <IconWrapperModifyStyled>
      <Icon
        type="clip"
        color="grey"
        size="25px"
      />
      <InputFileStyled
        ref={inputFile}
        accept={settings.accept}
        multiple={settings.multiple || false}
        type="file"
        name="file"
        onChange={() => selectFiles()}
      />
    </IconWrapperModifyStyled>
  )
}

export default BindFile
