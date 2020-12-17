import React from 'react'
import styled from 'styled-components'
import Header from '@/components/common/header/Header'
import SideBar from '@/components/common/sidebar/SideBar'
// import ProfileWidget from '@/components/pages/profile/widget/ProfileWidget'

const MainLayoutStyled = styled.div`
  width: calc(100% - 290px);
  // width: calc(100% - 580px);
  height: 100vh;
  margin-left: auto;
  // margin: 0 auto;
`
const ContentContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.rgb(props.theme.colors.grey5)};
`
const ContentStyled = styled.div`
  flex-grow: 1;
  overflow: auto;
`
export const MainLayout: React.FC = ({ children }) => {
  return (
    <MainLayoutStyled>
      <SideBar />
      <ContentContainerStyled>
        <Header />
        <ContentStyled>{children}</ContentStyled>
      </ContentContainerStyled>
      {/* <ProfileWidget /> */}
    </MainLayoutStyled>
  )
}
export default MainLayout
