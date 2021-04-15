import React, { useState, useEffect } from 'react'
import { useStore } from 'effector-react'
import { loadPersonalInfo } from '@/components/pages/profile/EditProfile.model'
import { fetchListChat } from '@/components/common/sidebar/SideBar.model'
import { $userId } from '@/App.module'
import styled from 'styled-components'
import Header from '@/components/common/Header'
import SideBar from '@/components/common/sidebar/SideBar'
import socket from '@/api/socket'

const MainLayoutStyled = styled.div<{ isOpen: boolean }>`
  width: ${(props) => `calc(100% - ${props.isOpen ? 290 : 90}px);`};
  height: 100vh;
  margin-left: auto;
  transition: ${(props) => `width ${props.theme.transition}`};
`
const ContentContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-width: 630px;
  background-color: ${(props) => props.theme.rgb(props.theme.colors.grey5)};
`
const ContentStyled = styled.div`
  flex-grow: 1;
  overflow: hidden;
  position: relative;
`
export const MainLayout: React.FC = ({ children }) => {
  const idProfile = useStore($userId)
  const [isOpenSideBar, setIsOpenSideBar] = useState(true)
  useEffect(() => {
    loadPersonalInfo()
  }, [])
  useEffect(() => {
    if (idProfile) {
      fetchListChat()
      socket.init(idProfile)
      socket.enterToApp(idProfile)
    }
  }, [idProfile])
  return (
    <MainLayoutStyled isOpen={isOpenSideBar}>
      <SideBar isOpen={isOpenSideBar} setIsOpenSideBar={(value) => setIsOpenSideBar(value)}/>
      <ContentContainerStyled>
        <Header />
        <ContentStyled>
          {children}
        </ContentStyled>
      </ContentContainerStyled>
    </MainLayoutStyled>
  )
}
export default MainLayout
