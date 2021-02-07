import React from 'react'
import styled from 'styled-components'
import { device } from '@/Theme'
import { PageStyled } from '@/components/common/Page'
import MainInfoForm from '@/components/pages/profile/content/main-info-form/MainInfoForm'
import LocationMap from '@/components/pages/profile/content/location-map/LocationMap'
import ChangePass from '@/components/pages/profile/content/change-pass/ChangePass'
import PhotoBlock from '@/components/pages/profile/content/photo-block/PhotoBlock'

const ProfilePageStyled = styled(PageStyled)`
  @media ${device.tabletL} {
    padding: 0;
  }
`
const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1440px;
  color: ${(props) => props.theme.rgb(props.theme.colors.white)};
  @media ${device.tabletL} {
    flex-direction: column;
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
          <LocationMap />
          <ChangePass />
        </BlockInfoStyled>
        <PhotoBlock />
      </WrapperStyled>
    </ProfilePageStyled>
  )
}

export default EditProfilePage
