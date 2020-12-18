import React from 'react'
import styled from 'styled-components'
import Simple from '@/components/ui/SimpleBar'
import TopMenu from '@/components/common/sidebar/TopMenu'
import ContainerMessages from '@/components/common/sidebar/body/ContainerMessages'

const SideBarStyled = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 290px;
  box-shadow: ${(props) => props.theme.shadow.shadow2};
  // background-color: $grey6;
  // background-color: #25294a;
  background-color: ${(props) => props.theme.rgb(props.theme.colors.white)};
`
const SideBarBodyStyled = styled.div`
  height: 100%;
  & > div {
    height: 100%;
  }
`
export const SideBar: React.FC = () => {
  return (
    <SideBarStyled>
      <TopMenu />
      <SideBarBodyStyled>
        <Simple maxHeight="calc(100vh - 70px)">
          <ContainerMessages />
        </Simple>
      </SideBarBodyStyled>
    </SideBarStyled>
  )
}

export default SideBar
