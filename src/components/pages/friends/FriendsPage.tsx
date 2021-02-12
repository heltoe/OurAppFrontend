import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useStore } from 'effector-react'
import { $typePage, typePageChanged, $canLoadMore } from '@/App.module'
import { loadListFriendShip } from '@/components/pages/friends/models/FriendShip'
import { loadAllFriends, loadOnlineFriends } from '@/components/pages/friends/models/Friends'
import { loadListUsers } from '@/components/pages/friends/models/Users'
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
  const loadLists = () => {
    if (canLoadMore) {
      switch(typePage) {
        case 'friends': 
          loadAllFriends()
          break
        case 'online':
          loadOnlineFriends()
          break
        case 'friendship':
          loadListFriendShip()
          break
        case 'find-friend':
          loadListUsers()
          break
        default: loadAllFriends()
      }
    }
  }
  const handlerChangeStateField = (count: number) => {
    if (count > 87 && !isShowShadow) setIsShowShadow(true)
    if (count < 88 && isShowShadow) setIsShowShadow(false)
  }
  useEffect(() => {
    loadLists()
  }, [typePage])
  return (
    <PageInfiniteScrolling callBack={handlerChangeStateField} callBackToLoadMore={loadLists}>
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
