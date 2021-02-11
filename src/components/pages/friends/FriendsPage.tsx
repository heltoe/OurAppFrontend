import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import isVisible from '@/helpers/visible-element'
import { useStore } from 'effector-react'
import {
  usersChanged,
  loadLists,
  $typePage,
  typePageChanged,
  pageChanged,
  $canLoadMore
} from '@/components/pages/friends/FriendsPage.module'
import { PageStyled } from '@/components/common/Page'
import TogglerBlock from '@/components/pages/friends/TogglerBlock'
import FriendsList from '@/components/pages/friends/FriendsList'
import FindNewFriendList from '@/components/pages/friends/FindNewFriendList'
import SearchField from '@/components/pages/friends/SearchField/SearchField'
const debounce = (f: any, ms: number) => {
  let timer: any = null
  return function (...args: any) {
    const onComplete = () => {
      f.apply(args)
      timer = null
    }
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(onComplete, ms)
  }
}
const WrapperContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 560px;
  margin: 0 auto;
`
export const FriendsPage: React.FC = () => {
  const friendsPage = useRef(null)
  const scrollHelper = useRef(null)

  const [isShowShadow, setIsShowShadow] = useState(false)
  const typePage = useStore($typePage)
  const canLoadMore = useStore($canLoadMore)
  const changePageState = () => {
    const wrapperContent = friendsPage?.current as HTMLDivElement | null
    const test = scrollHelper?.current as HTMLDivElement | null
    if (wrapperContent) {
      if (wrapperContent.scrollTop > 87 && !isShowShadow) setIsShowShadow(true)
      if (wrapperContent.scrollTop < 88 && isShowShadow) setIsShowShadow(false)
    }
    if (test && isVisible(test) && canLoadMore) loadLists.users()
  }
  const handlerScrolling = debounce(() => {
    changePageState()
  }, 300)
  useEffect(() => {
    const page = friendsPage?.current as HTMLDivElement | null
    if (page) page.addEventListener('scroll', handlerScrolling)
    return () => {
      if (page) page.removeEventListener('scroll', handlerScrolling)
    }
  })
  useEffect(() => {
    usersChanged([])
    if (typePage === 'all') loadLists.all()
    if (typePage === 'online') loadLists.online()
    if (typePage === 'friendship') loadLists.friendShip()
    if (typePage === 'find-friend') loadLists.users()
  }, [typePage])
  return (
    <PageStyled ref={friendsPage}>
      <WrapperContentStyled>
        <TogglerBlock
          activeTab={typePage}
          setActiveTab={(type) => typePageChanged(type)}
        />
        <SearchField isShadow={isShowShadow} />
        { typePage !== 'find-friend' ? <FriendsList /> : <FindNewFriendList /> }
      </WrapperContentStyled>
      <div ref={scrollHelper} />
    </PageStyled>
  )
}

export default FriendsPage
