import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { device } from '@/Theme'
import { useStore } from 'effector-react'
import {
  typePages,
  $typePage,
  $canLoadMore,
  $page,
  pageChanged,
  typePageChanged,
  loadAllFriends,
  resetFriendShip,
  resetAllFriends,
} from '@/App.module'
import { fetchCountFriends } from '@/components/pages/friends/models/Friends'
import { fetchCountFriendShip } from '@/components/pages/friends/models/FriendShip'
import PageInfiniteScrolling from '@/components/ui/PageInfiniteScrolling'
import TogglerBlock from '@/components/pages/friends/TogglerBlock'
import FriendsList from '@/components/pages/friends/FriendsList'
import FindNewFriendList from '@/components/pages/friends/FindNewFriendList'
import SearchField from '@/components/pages/friends/SearchField/SearchField'

const WrapperContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  padding: 30px 0;
  @media ${device.laptop} {
    padding: 30px 20px;
  }
`
export const FriendsPage: React.FC = () => {
  const page = useStore($page)
  const typePage = useStore($typePage)
  const canLoadMore = useStore($canLoadMore)
  const [isShowShadow, setIsShowShadow] = useState(false)
  const handlerChangeStateField = (count: number) => {
    if (count > 87 && !isShowShadow) setIsShowShadow(true)
    if (count < 88 && isShowShadow) setIsShowShadow(false)
  }
  const loadMore = () => {
    pageChanged(page + 1)
  }
  useEffect(() => {
    resetAllFriends()
    resetFriendShip()
    loadAllFriends()
    fetchCountFriendShip()
  }, [])
  return (
    <PageInfiniteScrolling
      callBack={handlerChangeStateField}
      callBackToLoadMore={loadMore}
      canLoadMore={canLoadMore}
    >
      <WrapperContentStyled>
        <TogglerBlock />
        <SearchField isShadow={isShowShadow} />
        {typePage !== typePages.findFriend ? (
          <FriendsList />
        ) : (
          <FindNewFriendList />
        )}
      </WrapperContentStyled>
    </PageInfiniteScrolling>
  )
}

export default FriendsPage
