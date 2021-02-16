import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useStore } from 'effector-react'
import { typePages, $typePage, $canLoadMore, $page, pageChanged, typePageChanged } from '@/App.module'
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
    typePageChanged(typePages.friends)
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
        { typePage !== typePages.findFriend ? <FriendsList /> : <FindNewFriendList /> }
      </WrapperContentStyled>
    </PageInfiniteScrolling>
  )
}

export default FriendsPage
