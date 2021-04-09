import React, { useEffect, useRef, useState } from 'react'
import { useStore } from 'effector-react'
import AvatarEditor from 'react-avatar-editor'
import styled from 'styled-components'
import BaseButton, { BaseButtonStyled } from '@/components/ui/BaseButton'
import Icon, { IconStyled } from '@/components/ui/Icon'
import {
  $originalPhoto,
  originalFileChanged,
  cropedFileChanged,
  changeAvatar,
  uploadAvatarFx
} from '@/components/pages/profile/content/photo-block/PhotoBlock.model'
import { $profileUser } from '@/components/pages/profile/EditProfile.model'
import { $userId } from '@/App.module'
import FemalePlaceholder from '@/assets/images/female-placeholder.jpg'
import MalePlaceholder from '@/assets/images/male-placeholder.jpg'

const WrapperCropPhoto = styled.div`
  display: flex;
  flex-direction: column;
  & ${BaseButtonStyled} {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  & ${IconStyled} {
    position: static;
    margin-left: 10px;
    use {
      fill: ${(props) => props.theme.rgb(props.theme.colors.white)};
    }
    &:hover {
      use {
        fill: ${(props) => props.theme.rgb(props.theme.colors.white)};
      }
    }
  }
`
const WrapperAvataStyled = styled.div`
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  label {
    width: 100%;
  }
  ${IconStyled} {
    position: absolute;
    left: 10px;
    top: 10px;
    margin-left: 0;
  }
`
const TitleStyled = styled.p`
  font-size: 20px;
  font-weight: ${(props) => props.theme.fontWeight.middle};
  margin-bottom: 10px;
`
const LabelStyled = styled.label`
  display: flex;
  align-items: center;
  margin-top: 20px;
`
const RangeStyled = styled.input`
  width: 35%;
  cursor: pointer;
  margin-left: 10px;
`
const WrapperFileInput = styled.div<{ backgroundImage: string}>`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-image: ${(props) => `url(${props.backgroundImage})`};
  &:hover {
    div {
      background-color: ${(props) => props.theme.rgba(props.theme.colors.black, 0.3)};
    }
  }
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #fff;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    background-color: ${(props) => props.theme.rgba(props.theme.colors.black, 0.1)};
    transition: ${(props) => props.theme.transition};
    border-radius: 5px;
  }
`
const StyledFileInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`
const CropPhoto: React.FC = () => {
  const editorRef = useRef(null)
  const inputFile = useRef<HTMLInputElement>(null)
  const originalPhoto = useStore($originalPhoto)
  const idUser = useStore($userId)
  const isPending = useStore(uploadAvatarFx.pending)
  const profile = useStore($profileUser)
  const [scale, setScale] = useState('1')
  const [localPhoto, setLocalPhoto] = useState('')
  const FileLoad = (e: any) => {
    fetch(originalPhoto)
      .then(res => res.blob())
      .then(blob => {
        const photo: File = new File([blob], `avatar-original-photo${idUser}.png`, { lastModified: Math.round(new Date().getTime()/1000) })
        originalFileChanged(photo)
      })
  }
  const changeImage = () => {
    const editor = editorRef?.current as any | null
    if (editor) {
      const canvas = editor.getImage().toDataURL()
      fetch(canvas)
        .then(res => res.blob())
        .then(blob => {
          const photo: File = new File([blob], `avatar-croped-photo${idUser}.png`, { lastModified: Math.round(new Date().getTime()/1000) })
          cropedFileChanged(photo)
          changeAvatar()
        })
    }
  }
  const selectFile = () => {
    const el = inputFile?.current
    if (el?.files) {
      const filesList = Object.values(el.files).map(file => ({ file, preview: URL.createObjectURL(file) }))
      originalFileChanged(filesList[0].file)
      setLocalPhoto(filesList[0].preview)
      el.value = ''
      el.blur()
    }
  }
  useEffect(() => {
    setLocalPhoto(originalPhoto)
  }, [])
  return (
    <WrapperCropPhoto>
      <TitleStyled>Настройте миниатюру</TitleStyled>
      <WrapperAvataStyled>
        <AvatarEditor
          ref={editorRef}
          image={localPhoto}
          width={360}
          height={360}
          border={0}
          borderRadius={5}
          color={[0, 0, 0, 0.4]}
          scale={Math.ceil(parseInt(scale) / 10)}
          crossOrigin="anonymous"
          onLoadSuccess={(e) => FileLoad(e)}
        />
        {localPhoto.length === 0 && <WrapperFileInput backgroundImage={profile.gender === 'male' ? MalePlaceholder : FemalePlaceholder}>
          <div>Выбрать фото</div>
          <StyledFileInput
            ref={inputFile}
            type="file"
            accept="image/png, image/jpeg"
            onChange={() => selectFile()}
          />
        </WrapperFileInput>}
        {localPhoto.length > 0 && <Icon
          type="close"
          size="18px"
          color="#fff"
          onClick={() => setLocalPhoto('')}
        />}
      </WrapperAvataStyled>
      {localPhoto.length > 0 && <LabelStyled>
        Масштаб:
        <RangeStyled
          type="range"
          min="1"
          max="60"
          className="range blue"
          value={scale} onChange={(e) => setScale(e.target.value)}
        />
      </LabelStyled>}
      <BaseButton disabled={isPending} onClick={() => changeImage()}>
        Сменить аватар
        <Icon type="upload" size="18px" />
      </BaseButton>
    </WrapperCropPhoto>
  )
}

export default CropPhoto
