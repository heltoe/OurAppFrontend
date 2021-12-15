import React from 'react'
import { useStore } from 'effector-react'
import styled from 'styled-components'
import { logout } from '@/api/common/AuthorizedRequest'
import { $originalPhoto, $cropedPhoto, $isShowModal, changeIsShowModal } from '@/components/pages/profile/content/photo-block/PhotoBlock.model'
import { $mainInfoForm } from '@/components/pages/profile/content/main-info-form/MainInfoForm.model'
import { $userId } from '@/App.module'
import { device } from '@/Theme'
import Avatar from '@/components/ui/Avatar'
import BaseButton, { BaseButtonStyled } from '@/components/ui/BaseButton'
import Icon, { IconStyled } from '@/components/ui/Icon'
import Modal from '@/components/common/modal/Modal'
import ModalBox from '@/components/common/modal/ModalBox'
import CropPhoto from '@/components/pages/profile/content/photo-block/CropPhoto'

const OverlayPhotoStyled = styled.div<{ backgroundImage: string }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: ${(props) => `url(${props.backgroundImage})`};
  background-position: top left;
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
  @media ${device.tabletL} {
    opacity: 0;
  }
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
    position: relative;
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
  @media ${device.tabletL} {
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
    & .label {
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
export const PhotoBlock: React.FC = () => {
  const originalPhoto = useStore($originalPhoto)
  const cropedPhoto = useStore($cropedPhoto)
  const idProfile = useStore($userId)
  const mainInfoForm = useStore($mainInfoForm)
  const isShowModal = useStore($isShowModal)
  const color = '#fff'
  return (
    <BlockPhotoStyled>
      <OverlayStyled />
      <OverlayPhotoStyled backgroundImage={cropedPhoto} />
      <p className="label middle">Фото профиля</p>
      <WrapperImageStyled>
        <Avatar id={idProfile} image={cropedPhoto} fullName={mainInfoForm.full_name} isRound size="180px" />
      </WrapperImageStyled>
      <ControllerBoxStyled>
        <BaseButton onClick={() => changeIsShowModal(true)}>
          Сменить аватар
          <Icon type="upload" color={color} size="18px" />
        </BaseButton>
        <RedButtonStyled onClick={() => logout()}>
          Выйти
          <Icon type="exit" color={color} size="18px" />
        </RedButtonStyled>
      </ControllerBoxStyled>
      {isShowModal && <Modal>
        <ModalBox closeModal={() => changeIsShowModal(false)}>
          <CropPhoto />
        </ModalBox>
      </Modal>}
    </BlockPhotoStyled>
  )
}

export default PhotoBlock
