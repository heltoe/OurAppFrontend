import React, { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import Avatar from 'react-avatar-edit'
import styled from 'styled-components'
import BaseButton, { BaseButtonStyled } from '@/components/ui/BaseButton'
import Icon, { IconStyled } from '@/components/ui/Icon'
import { b64toBlob } from '@/helpers/utils'
import {
  $originalPhoto,
  originalFileChanged,
  cropedFileChanged,
  changeAvatar
} from '@/components/pages/profile/content/photo-block/PhotoBlock.model'
import { $idUser } from '@/App.module'

const WrapperCropPhoto = styled.div`
  display: flex;
  flex-direction: column;
  & ${BaseButtonStyled} {
    display: flex;
    justify-content: center;
    margin-top: 10px;
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
  label {
    width: 100%;
  }
`
const TitleStyled = styled.p`
  font-size: 20px;
  font-weight: ${(props) => props.theme.fontWeight.middle};
  margin-bottom: 10px;
`
const CropPhoto: React.FC = () => {
  const originalPhoto = useStore($originalPhoto)
  const idUser = useStore($idUser)
  const [preview, setPreview] = useState('')
  const [test, setTest] = useState('')
  const onBeforeFileLoad = (elem: any) => {
    if(elem.target.files[0].size > 2097152) {
      alert('File is too big!')
      return elem.target.value = ''
    }
    originalFileChanged(elem.target.files[0])
  }
  const updateAvatar = () => {
    const photo = new File(
      [b64toBlob(preview.split(';')[1].split(',')[1], 'image/png')],
      `avatar-photo${idUser}.png`,
      { type: 'image/png' },
    )
    cropedFileChanged(photo)
    changeAvatar()
  }
  const onClose = () => {
    setPreview('')
    originalFileChanged(null)
    cropedFileChanged(null)
  }
  const testov = (image: string) => {
    console.log(image)
    setPreview(image)
  }
  const loadImage = () => {
    fetch(originalPhoto, {
      method: 'GET'
    })
    //   .then(res => res)
    //   .then(res => {
    //     console.log(res)
    //     // let objectURL = URL.createObjectURL(blob);
    //     // console.log(objectURL)
    //     // setTest(objectURL)
    // });
  }
  useEffect(() => {
    loadImage()
  }, [])
  return (
    <WrapperCropPhoto>
      <TitleStyled>Настройте миниатюру</TitleStyled>
      <WrapperAvataStyled>
        <Avatar
          width={360}
          height={360}
          imageWidth={360}
          onCrop={testov}
          onClose={onClose}
          onBeforeFileLoad={onBeforeFileLoad}
          src={originalPhoto}
        />
      </WrapperAvataStyled>
      <img src={preview} alt=""/>
      <BaseButton disabled={!preview.length} onClick={() => updateAvatar()}>
        Сменить аватар
        <Icon type="upload" size="18px" />
      </BaseButton>
    </WrapperCropPhoto>
  )
}

export default CropPhoto
