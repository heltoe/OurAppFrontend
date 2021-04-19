import React, { useState, useEffect } from 'react'
import { useStore } from 'effector-react'
import { loadPersonalInfo, resetProfile } from '@/components/pages/profile/EditProfile.model'
import { resetFields } from '@/components/pages/profile/content/main-info-form/MainInfoForm.model'
import { fetchListChat, listChatChanged } from '@/components/common/sidebar/SideBar.model'
import { $userId } from '@/App.module'
import styled from 'styled-components'
import Header from '@/components/common/Header'
import SideBar from '@/components/common/sidebar/SideBar'
import socket from '@/api/socket'
import CallModal from '@/components/common/modal/CallModal'
import { $isShowModal } from '@/components/common/modal/CallModal.model'

const MainLayoutStyled = styled.div<{ isOpen: boolean }>`
  width: ${(props) => `calc(100% - ${props.isOpen ? 290 : 90}px);`};
  margin-left: auto;
  transition: ${(props) => `width ${props.theme.transition}`};
`
const ContentContainerStyled = styled.div`
  width: 100%;
  min-width: 630px;
`
export const MainLayout: React.FC = ({ children }) => {
  const idProfile = useStore($userId)
  const isShowModal = useStore($isShowModal)
  const [isOpenSideBar, setIsOpenSideBar] = useState(true)
  useEffect(() => {
    loadPersonalInfo()
    return () => {
      listChatChanged([])
      resetProfile()
      resetFields()
    }
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
        {children}
        {isShowModal && <CallModal />}
      </ContentContainerStyled>
    </MainLayoutStyled>
  )
}
export default MainLayout
