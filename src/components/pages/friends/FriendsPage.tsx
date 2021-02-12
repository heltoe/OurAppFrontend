import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useStore } from 'effector-react'
import {
  loadLists,
  $typePage,
  typePageChanged, 
  $canLoadMore
} from '@/components/pages/friends/Friends.Page.models'
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
  const loadListUsers = () => {
    if (canLoadMore) {
      switch(typePage) {
        case 'friends': 
          loadLists.friends()
          break
        case 'online':
          loadLists.online()
          break
        case 'friendship':
          loadLists.friendShip()
          break
        case 'find-friend':
          loadLists.users()
          break
        default: loadLists.friends()
      }
    }
  }
  const handlerChangeStateField = (count: number) => {
    if (count > 87 && !isShowShadow) setIsShowShadow(true)
    if (count < 88 && isShowShadow) setIsShowShadow(false)
  }
  useEffect(() => {
    loadListUsers()
  }, [typePage])
  return (
    <PageInfiniteScrolling callBack={handlerChangeStateField} callBackToLoadMore={loadListUsers}>
      <WrapperContentStyled>
        <TogglerBlock
          activeTab={typePage}
          setActiveTab={(type) => typePageChanged(type)}
        />
        <SearchField isShadow={isShowShadow} />
        { typePage !== 'find-friend' ? <FriendsList /> : <FindNewFriendList /> }
      </WrapperContentStyled>
    </PageInfiniteScrolling>
  )
}

export default FriendsPage
