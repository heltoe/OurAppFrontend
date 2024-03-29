import React, { useEffect } from 'react'
import { useStore } from 'effector-react'
import styled from 'styled-components'
import Icon from '@/components/ui/Icon'
import Editor from '@/components/ui/Editor'
import BindFile, { ElementFileType } from '@/components/pages/chat/BindFile'
import {
  $textMessage,
  textMessageChanged,
  changeListFiles,
  $listFiles,
  $triggerClean,
  sendMessage
} from '@/components/pages/chat/ChatPage.model'

type MessageController = {
  sendMessageEmit(): void
}
export const IconWrapperStyled = styled.div`
  display: flex;
  cursor: pointer;
  margin-top: auto;
  &:hover {
    use {
      fill: ${(props) => props.theme.rgb(props.theme.colors.purple1)};
    }
  }
`
const MessageControllerStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 560px;
  border-radius: 0 0 8px 8px;
  margin-top: auto;
  background-color: ${(props) => props.theme.rgb(props.theme.colors.grey8)};
  border-top: ${(props) => `1px solid ${props.theme.rgb(props.theme.colors.grey7)}`};
  padding: 20px;
  position: sticky;
  position: -webkit-sticky;
  bottom: 30px;
  z-index: 100;
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 30px;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${(props) => props.theme.rgb(props.theme.colors.grey5)};
  }
  ${IconWrapperStyled} {
    margin-bottom: 5px;
  }
`
const MainLineStyled = styled.div`
  display: flex;
`
const PhotoLineStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`
const PhotoStyled = styled.div<{ preview: string | ArrayBuffer | null }>`
  display: flex;
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.rgb(props.theme.colors.black)};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: ${(props) => `url(${props.preview})`};
  margin-top: 10px;
  margin-right: 10px;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.rgba(props.theme.colors.black, 0.3)};
    border-radius: 8px;
  }
`
const WrapperRemoveIconStyled = styled.div`
  display: flex;
  position: absolute;
  right: 7px;
  top: 7px;
  z-index: 10;
  cursor: pointer;
  &:hover {
    use {
      fill: ${(props) => props.theme.rgb(props.theme.colors.red)};
    }
  }
`
const MessageWrapperStyled = styled.div`
  position: relative;
  display: flex;
  max-width: calc(100% - 70px);
  flex-grow: 1;
  border-radius: 8px;
  background-color: ${(props) => props.theme.rgb(props.theme.colors.white)};
  border: ${(props) => `1px solid ${props.theme.rgb(props.theme.colors.grey7)}`};
  margin: 0 10px;
  ${IconWrapperStyled} {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
`
const MessageController: React.FC<MessageController> = ({ children, sendMessageEmit }) => {
  const text = useStore($textMessage)
  const fileList = useStore($listFiles)
  const triggerClean = useStore($triggerClean)
  const settingsForUploadPhoto = {
    multiple: true,
    limit: 10,
    accept: 'image/png, image/jpeg',
  }
  const emitMessage = () => {
    if (text.length > 18 || fileList.length) {
      sendMessage()
      sendMessageEmit()
    }
  }
  const addPhoto = (arr: ElementFileType[]) => {
    const newFileList = [...fileList, ...arr]
    changeListFiles(newFileList.length > settingsForUploadPhoto.limit ? newFileList.slice(0, settingsForUploadPhoto.limit) : newFileList)
    if (newFileList.length > settingsForUploadPhoto.limit) alert(`Максимальное количество файлов не должно превышать ${settingsForUploadPhoto.limit} единиц`)
  }
  const removePhoto = (id: number) => {
    const newFileList = fileList.filter(element => {
      if (element.id === id) URL.revokeObjectURL(element.preview as string)
      return element.id !== id
    })
    changeListFiles(newFileList)
  }
  const handlerBtn = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.keyCode == 13) emitMessage()
  }
  useEffect(() => {
    window.addEventListener('keyup', handlerBtn)
    return () => window.removeEventListener('keyup', handlerBtn)
  })
  return (
    <MessageControllerStyled>
      {children}
      <MainLineStyled>
        <BindFile settings={settingsForUploadPhoto} callBack={(arr) => addPhoto(arr)}/>
        <MessageWrapperStyled>
          <Editor value={text} triggerClean={triggerClean} onChange={(msg) => textMessageChanged(msg)} />
          <IconWrapperStyled>
            <Icon
              type="smile"
              color="grey"
              size="25px"
            />
          </IconWrapperStyled>
        </MessageWrapperStyled>
        <IconWrapperStyled onClick={emitMessage}>
          <Icon
            type="send"
            color="grey"
            size="25px"
          />
        </IconWrapperStyled>
      </MainLineStyled>
      <PhotoLineStyled>
        {fileList && fileList.map((file, index) => <PhotoStyled key={index} preview={file.preview}>
          <WrapperRemoveIconStyled onClick={() => removePhoto(file.id)}>
            <Icon
              type="close"
              size="14px"
              color="white"
            />
          </WrapperRemoveIconStyled>
        </PhotoStyled>)}
      </PhotoLineStyled>
    </MessageControllerStyled>
  )
}

export default MessageController
