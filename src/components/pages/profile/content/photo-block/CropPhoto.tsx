import React, { useState } from 'react'
import Avatar from 'react-avatar-edit'
import styled from 'styled-components'
import BaseButton, { BaseButtonStyled } from '@/components/ui/BaseButton'
import Icon, { IconStyled } from '@/components/ui/Icon'

type CropType = {
  image: string
}

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
`
const TitleStyled = styled.p`
  font-size: 20px;
  font-weight: ${(props) => props.theme.fontWeight.middle};
  margin-bottom: 10px;
`
const CropPhoto: React.FC<CropType> = ({ image }) => {
  const [preview, setPreview] = useState('')
  const onCrop = (preview: string) => {
    setPreview(preview)
  }
  const onClose = () => setPreview('')
  return (
    <WrapperCropPhoto>
      <TitleStyled>Настройте миниатюру</TitleStyled>
      <WrapperAvataStyled>
        <Avatar
          width={360}
          height={360}
          imageWidth={360}
          imageHeight={360}
          onCrop={onCrop}
          onClose={onClose}
          src={image}
        />
      </WrapperAvataStyled>
      <BaseButton disabled={!preview.length}>
        Сменить аватар
        <Icon type="upload" size="18px" />
      </BaseButton>
    </WrapperCropPhoto>
  )
}

export default CropPhoto
