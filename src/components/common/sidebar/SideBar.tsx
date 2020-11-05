import React from 'react'
import Simple from '@/components/ui/SimpleBar'
import TopMenu from '@/components/common/sidebar/top/TopMenu'
import ContainerMessages from '@/components/common/sidebar/body/chat/ContainerMessages'
import style from '@/components/common/sidebar/sidebar.module.scss'

export const SideBar: React.FC = () => {
  return (
    <div className={style.sidebar}>
      <TopMenu />
      <div className={style['sidebar-body']}>
        <Simple maxHeight="calc(100vh - 70px)">
          <ContainerMessages />
        </Simple>
      </div>
    </div>
  )
}

export default SideBar
