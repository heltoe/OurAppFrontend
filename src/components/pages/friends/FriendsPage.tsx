import React, { useState } from 'react'
import styled from 'styled-components'
import TogglerBlock from '@/components/pages/friends/TogglerBlock'
import FriendsList from '@/components/pages/friends/FriendsList'
import FindNewFriendList from '@/components/pages/friends/FindNewFriendList'
import SearchField from '@/components/pages/friends/SearchField'

const FriendsPageStyled = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 30px;
`
const WrapperContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 560px;
`
export const FriendsPage: React.FC = () => {
  const [typePage, setTypePage] = useState('friends-page')
  return (
    <FriendsPageStyled className="wrapper">
      <WrapperContentStyled>
        <TogglerBlock />
        <SearchField />
        { typePage === 'friends-page' ? <FriendsList /> : <FindNewFriendList /> }
      </WrapperContentStyled>
    </FriendsPageStyled>
  )
}

export default FriendsPage
