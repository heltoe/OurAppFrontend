import React, { useState, useEffect } from 'react'
import { useStore } from 'effector-react'
import { device } from '@/Theme'
import {
  loadPersonalInfo,
  resetProfile,
} from '@/components/pages/profile/EditProfile.model'
import { resetFields } from '@/components/pages/profile/content/main-info-form/MainInfoForm.model'
import {
  fetchListChat,
  listChatChanged,
} from '@/components/common/sidebar/SideBar.model'
import { $isShowCommonModal } from '@/components/common/modal/common-call-modal/CommonCallModal.model'
import { $userId } from '@/App.module'
import styled from 'styled-components'
import CommonCallModal from '@/components/common/modal/common-call-modal/CommonCallModal'
import Header from '@/components/common/Header'
import SideBar from '@/components/common/sidebar/SideBar'
import socket from '@/api/socket'

const MainLayoutStyled = styled.div<{ isOpen: boolean }>`
  width: ${(props) => `calc(100% - ${props.isOpen ? 290 : 90}px);`};
  margin-left: auto;
  transition: ${(props) => `width ${props.theme.transition}`};
  @media ${device.mobileL} {
    width: 100%;
  }
`
const ContentContainerStyled = styled.div`
  width: 100%;
  /* min-width: 630px; */
`
export const MainLayout: React.FC = ({ children }) => {
  const idProfile = useStore($userId)
  const isShowModal = useStore($isShowCommonModal)
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
      <SideBar
        isOpen={isOpenSideBar}
        setIsOpenSideBar={(value) => setIsOpenSideBar(value)}
      />
      <ContentContainerStyled>
        <Header
          isOpen={isOpenSideBar}
          setIsOpenSideBar={(value) => setIsOpenSideBar(value)}
        />
        {children}
        {isShowModal && <CommonCallModal />}
      </ContentContainerStyled>
    </MainLayoutStyled>
  )
}
export default MainLayout
