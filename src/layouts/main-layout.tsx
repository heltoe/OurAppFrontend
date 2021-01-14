import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Header from '@/components/common/header/Header'
import SideBar from '@/components/common/sidebar/SideBar'
import SearchField from '@/components/pages/friends/SearchField'
import ProfileWidget from '@/components/pages/profile/widget/ProfileWidget'

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
  overflow: auto;
  position: relative;
`
const WrapperSearchField = styled.div`
  position: sticky;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: 560px;
  z-index: 100;
  margin: 0 auto;
`
export const MainLayout: React.FC = ({ children }) => {
  const ref = useRef(null)
  const [isOpenSideBar, setIsOpenSideBar] = useState(true)
  const [isShowWidget, setIsShowWidget] = useState(false)
  // const [offsetLeft, setOffsetLeft] = useState(0)
  const [scrollTop, setScrollTop] = useState(0)
  const listener = () => {
    const el = ref?.current
    if (el) {
      const { scrollTop } = el
      setScrollTop(scrollTop)
    }
  }
  // const handleResize = () => {
  //   if (document.body.clientWidth < 801 && isOpenSideBar) setIsOpenSideBar(false)
  //   if (document.body.clientWidth > 800 && !isOpenSideBar) setIsOpenSideBar(true)
  // }
  // useEffect(() => {
  //   handleResize()
  //   window.addEventListener('resize', handleResize)
  //   // const el = ref?.current
  //   // if (el) {
  //   //   // const { clientWidth, offsetWidth  } = el
  //   //   const { offsetWidth  } = el
  //   //   setOffsetLeft(offsetWidth)
  //   //   console.log(offsetWidth)
  //   // }
  //   return () => window.removeEventListener('resize', handleResize)
  // })
  return (
    <MainLayoutStyled isOpen={isOpenSideBar}>
      <SideBar isOpen={isOpenSideBar} setIsOpenSideBar={(value) => setIsOpenSideBar(value)}/>
      <ContentContainerStyled>
        <Header />
        <ContentStyled ref={ref} onScroll={() => listener()}>
          {scrollTop >= 90 && <WrapperSearchField>
            <SearchField />
          </WrapperSearchField>}
          {children}
        </ContentStyled>
      </ContentContainerStyled>
      <ProfileWidget isOpen={isShowWidget} closeWidget={() => setIsShowWidget(false)} />
    </MainLayoutStyled>
  )
}
export default MainLayout
