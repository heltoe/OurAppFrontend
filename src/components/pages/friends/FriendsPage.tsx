import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useStore } from 'effector-react'
import { $typePage, typePageChanged, $canLoadMore, $page, pageChanged } from '@/App.module'
import { loadListFriendShip, resetFriendShip } from '@/components/pages/friends/models/FriendShip'
import { loadAllFriends, loadOnlineFriends, resetAllFriends, resetOnlineFriends } from '@/components/pages/friends/models/Friends'
import { loadListUsers, resetUsers } from '@/components/pages/friends/models/Users'
import PageInfiniteScrolling from '@/components/ui/PageInfiniteScrolling'
import TogglerBlock from '@/components/pages/friends/TogglerBlock'
import FriendsList from '@/components/pages/friends/FriendsList'
import FindNewFriendList from '@/components/pages/friends/FindNewFriendList'
import SearchField from '@/components/pages/friends/SearchField/SearchField'

const WrapperContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 560px;
  margin: 0 auto;
`
export const FriendsPage: React.FC = () => {
  const [isShowShadow, setIsShowShadow] = useState(false)
  const typePage = useStore($typePage)
  const canLoadMore = useStore($canLoadMore)
  const page = useStore($page)
  const handlerChangeStateField = (count: number) => {
    if (count > 87 && !isShowShadow) setIsShowShadow(true)
    if (count < 88 && isShowShadow) setIsShowShadow(false)
  }
  const loadLists = (type: string) => {
    switch (type) {
      case 'friends':
        loadAllFriends()
        break
      case 'online':
        loadOnlineFriends()
        break
      case 'friendship':
        loadListFriendShip()
        break
      case 'findFriend':
        loadListUsers()
        break
      default:
        loadAllFriends()
    }
  }
  const loadMore = () => {
    pageChanged(page + 1)
    loadLists(typePage)
  }
  const callRestFields = (type: string) => {
    const resetMethods = {
      friends: resetAllFriends,
      online: resetOnlineFriends,
      friendship: resetFriendShip,
      findFriend: resetUsers
    }
    Object.keys(resetMethods).forEach((item) => {
      // @ts-ignore
      if (item !== type) resetMethods[item]()
    })
    pageChanged(1)
  }
  const setTypePage = (type: string) => {
    callRestFields(type)
    typePageChanged(type)
    loadLists(type)
  }
  useEffect(() => {
    loadLists(typePage)
  }, [])
  return (
    <PageInfiniteScrolling
      callBack={handlerChangeStateField}
      callBackToLoadMore={loadMore}
      canLoadMore={canLoadMore}
    >
      <WrapperContentStyled>
        <TogglerBlock
          activeTab={typePage}
          setActiveTab={(type) => setTypePage(type)}
        />
        <SearchField isShadow={isShowShadow} />
        { typePage !== 'findFriend' ? <FriendsList /> : <FindNewFriendList /> }
      </WrapperContentStyled>
    </PageInfiniteScrolling>
  )
}

export default FriendsPage
