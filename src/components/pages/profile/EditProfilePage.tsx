import React from 'react'
import styled from 'styled-components'
import { device } from '@/Theme'
import { PageStyled } from '@/components/common/Page'
import MainInfoForm from '@/components/pages/profile/content/main-info-form/MainInfoForm'
import ChangePass from '@/components/pages/profile/content/change-pass/ChangePass'
import PhotoBlock from '@/components/pages/profile/content/photo-block/PhotoBlock'

const ProfilePageStyled = styled(PageStyled)`
  padding: 0;
`
const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 700px;
  color: ${(props) => props.theme.rgb(props.theme.colors.white)};
  padding: 30px 34px;
  @media ${device.tabletL} {
    flex-direction: column;
    padding: 0;
  }
`
const BlockInfoStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  @media ${device.tabletL} {
    order: 2;
    padding: 34px;
  }
`
export const EditProfilePage: React.FC = () => {
  return (
    <ProfilePageStyled>
      <WrapperStyled className="wrapper">
        <BlockInfoStyled>
          <MainInfoForm />
          <ChangePass />
        </BlockInfoStyled>
        <PhotoBlock />
      </WrapperStyled>
    </ProfilePageStyled>
  )
}

export default EditProfilePage
