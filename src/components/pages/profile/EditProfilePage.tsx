import React from 'react'
import styled from 'styled-components'
import { device } from '@/Theme'
import MainInfoForm from '@/components/pages/profile/content/MainInfoForm'
import LocationMap from '@/components/pages/profile/content/LocationMap'
import ChangePass from '@/components/pages/profile/content/ChangePass'
import PhotoBlock from '@/components/pages/profile/content/PhotoBlock'
import { user } from '@/data/user'

const ProfilePageStyled = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.rgb(props.theme.colors.white)};
  padding-top: 30px;
  padding-bottom: 30px;
  @media ${device.tablet} {
    flex-direction: column;
    padding: 0;
  }
`
const BlockInfoStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  @media ${device.tablet} {
    order: 2;
    padding: 34px;
  }
`
export const EditProfilePage: React.FC = () => {
  return (
    <ProfilePageStyled className="wrapper">
      <BlockInfoStyled>
        <MainInfoForm />
        <LocationMap />
        <ChangePass />
      </BlockInfoStyled>
      <PhotoBlock image={user.image} />
    </ProfilePageStyled>
  )
}

export default EditProfilePage
