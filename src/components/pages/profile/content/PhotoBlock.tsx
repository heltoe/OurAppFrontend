import React from 'react'
import styled from 'styled-components'
import { device } from '@/Theme'
import Avatar from '@/components/ui/Avatar'
import BaseButton, { BaseButtonStyled } from '@/components/ui/BaseButton'
import Icon, { IconStyled } from '@/components/ui/Icon'

type PhotoBlockType = {
  image: string
}

const OverlayPhotoStyled = styled.div<{ backgroundImage: string }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: ${(props) => `url(${props.backgroundImage})`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`
export const OverlayStyled = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.rgba(props.theme.colors.lightBlue, 0.25)};
  z-index: 10;
`
export const WrapperImageStyled = styled.div`
  border-radius: 50%;
  border: ${(props) => `2px solid ${props.theme.rgb(props.theme.colors.white)}`};
  z-index: 10;
`
const ControllerBoxStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  & ${BaseButtonStyled} {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    & ${IconStyled} {
      margin-left: 10px;
    }
  }
`
const BlockPhotoStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 30px;
  position: relative;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  & ${OverlayStyled},
  & ${OverlayPhotoStyled} {
    display: none;
  }
  & ${WrapperImageStyled} {
    cursor: pointer;
    margin-top: 20px;
    transition: ${(props) => `box-shadow ${props.theme.transition}`};
    &:hover {
      box-shadow: ${(props) => props.theme.shadow.shadow2};
    }
  }
  @media ${device.tablet} {
    order: 1;
    margin-left: 0;
    padding: 30px;
    & ${WrapperImageStyled} {
      margin-top: 0;
    }
    & ${OverlayStyled},
    & ${OverlayPhotoStyled} {
      display: flex;
    }
    & p {
      display: none;
    }
    & ${ControllerBoxStyled} {
      z-index: 10;
    }
  }
`
const RedButtonStyled = styled(BaseButtonStyled)`
  background-color: ${(props) => props.theme.rgb(props.theme.colors.red)};
`
export const PhotoBlock: React.FC<PhotoBlockType> = ({ image = '' }) => {
  const color = '#fff'
  return (
    <BlockPhotoStyled>
      <OverlayStyled />
      <OverlayPhotoStyled backgroundImage={image} />
      <p className="middle">Фото профиля</p>
      <WrapperImageStyled>
        <Avatar image={image} isRound size="180px" />
      </WrapperImageStyled>
      <ControllerBoxStyled>
        <BaseButton>
          Загрузить фото
          <Icon type="upload" color={color} size="18px" />
        </BaseButton>
        <RedButtonStyled>
          Выйти
          <Icon type="exit" color={color} size="18px" />
        </RedButtonStyled>
        <RedButtonStyled>
          Удалить аккаунт
          <Icon type="remove-user" color={color} size="18px" />
        </RedButtonStyled>
      </ControllerBoxStyled>
    </BlockPhotoStyled>
  )
}

export default PhotoBlock
