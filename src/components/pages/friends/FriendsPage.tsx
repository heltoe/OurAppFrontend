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
  const [countAll, setCountAll] = useState(0)
  const [countOnline, setCountOnline] = useState(0)
  const [typePage, setTypePage] = useState('all')
  return (
    <FriendsPageStyled className="wrapper">
      <WrapperContentStyled>
        <TogglerBlock
          activeTab={typePage}
          countAll={countAll}
          countOnline={countOnline}
          setActiveTab={(type) => setTypePage(type)}
        />
        <SearchField />
        { typePage !== 'find-friend' ? <FriendsList /> : <FindNewFriendList /> }
      </WrapperContentStyled>
    </FriendsPageStyled>
  )
}

export default FriendsPage
