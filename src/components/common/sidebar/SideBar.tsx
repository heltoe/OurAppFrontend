import React from 'react'
import styled from 'styled-components'
import { device } from '@/Theme'
import Simple from '@/components/ui/SimpleBar'
import TopMenu, { ToggleSideBarType } from '@/components/common/sidebar/TopMenu'
import ContainerMessages from '@/components/common/sidebar/body/ContainerMessages'

const SideBarStyled = styled.div<{ isOpen: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 290px;
  box-shadow: ${(props) => props.theme.shadow.shadow2};
  background-color: ${(props) => props.theme.rgb(props.theme.colors.white)};
  transition: ${(props) => `transform ${props.theme.transition}`};
  transform: ${(props) => `translateX(${props.isOpen ? 0 : -200}px)`};
  @media ${device.mobileL} {
    width: 100%;
    transform: ${(props) => `translateX(${props.isOpen ? '0px' : '-100%'})`};
    z-index: 9999;
  }
`
const SideBarBodyStyled = styled.div`
  height: 100%;
  & > div {
    height: 100%;
  }
`
export const SideBar: React.FC<ToggleSideBarType> = ({
  isOpen,
  setIsOpenSideBar,
}) => {
  return (
    <SideBarStyled isOpen={isOpen}>
      <TopMenu
        isOpen={isOpen}
        setIsOpenSideBar={(value) => setIsOpenSideBar(value)}
      />
      <SideBarBodyStyled>
        <Simple maxHeight="calc(100vh - 70px)">
          <ContainerMessages isOpen={isOpen} />
        </Simple>
      </SideBarBodyStyled>
    </SideBarStyled>
  )
}

export default SideBar
