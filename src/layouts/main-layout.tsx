import React, { useState, useEffect } from 'react'
import { useStore } from 'effector-react'
import { device } from '@/Theme'
import { loadPersonalInfo, resetProfile } from '@/components/pages/profile/EditProfile.model'
import { resetFields } from '@/components/pages/profile/content/main-info-form/MainInfoForm.model'
import { fetchListChat, listChatChanged } from '@/components/common/sidebar/SideBar.model'
import { $userId } from '@/App.module'
import styled from 'styled-components'
import Header from '@/components/common/Header'
import SideBar from '@/components/common/sidebar/SideBar'
import socket from '@/api/socket'
import CallModal from '@/components/common/modal/call-process/CallProcess'
import OfferToCall from '@/components/common/modal/offer-call/OfferToCall'
import { $isShowModal as $isShowModalCallProcess } from '@/components/common/modal/call-process/CallProcess.model'
import { $isShowModal as $isShowModalCallOffer } from '@/components/common/modal/offer-call/OfferToCall.model'

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
  const isShowModalCallOffer = useStore($isShowModalCallOffer)
  const isShowModalCallProcess = useStore($isShowModalCallProcess)
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
        <Header isOpen={isOpenSideBar} setIsOpenSideBar={(value) => setIsOpenSideBar(value)} />
        {children}
        {isShowModalCallOffer && <OfferToCall />}
        {isShowModalCallProcess && <CallModal />}
      </ContentContainerStyled>
    </MainLayoutStyled>
  )
}
export default MainLayout
