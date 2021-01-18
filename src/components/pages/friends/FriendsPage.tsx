import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { PageStyled } from '@/components/common/Page'
import TogglerBlock from '@/components/pages/friends/TogglerBlock'
import FriendsList from '@/components/pages/friends/FriendsList'
import FindNewFriendList from '@/components/pages/friends/FindNewFriendList'
import SearchField from '@/components/pages/friends/SearchField'

const WrapperContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 560px;
  margin: 0 auto;
`
export const FriendsPage: React.FC = () => {
  const friendsPage = useRef(null)
  const [isShowShadow, setIsShowShadow] = useState(false)
  const [countAll, setCountAll] = useState(0)
  const [countOnline, setCountOnline] = useState(0)
  const [typePage, setTypePage] = useState('all')
  const handlerScrolling = (e: any) => {
    const wrapperContent = friendsPage?.current as HTMLDivElement | null
    if (wrapperContent) {
      if (wrapperContent.scrollTop > 87 && !isShowShadow) setIsShowShadow(true)
      if (wrapperContent.scrollTop < 88 && isShowShadow) setIsShowShadow(false)
    }
  }
  useEffect(() => {
    const page = friendsPage?.current as HTMLDivElement | null
    if (page) page.addEventListener('scroll', handlerScrolling)
    return () => {
      if (page) page.removeEventListener('scroll', handlerScrolling)
    }
  })
  return (
    <PageStyled ref={friendsPage}>
      <WrapperContentStyled>
        <TogglerBlock
          activeTab={typePage}
          countAll={countAll}
          countOnline={countOnline}
          setActiveTab={(type) => setTypePage(type)}
        />
        <SearchField isShadow={isShowShadow} />
        { typePage !== 'find-friend' ? <FriendsList /> : <FindNewFriendList /> }
      </WrapperContentStyled>
    </PageStyled>
  )
}

export default FriendsPage
