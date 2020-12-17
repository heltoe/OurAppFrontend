import React from 'react'
import styled from 'styled-components'
import TogglerBlock from '@/components/pages/friends/TogglerBlock'
import FriendsList from '@/components/pages/friends/FriendsList'

const FriendsPageStyled = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 30px;
`
const WrapperContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 760px;
`
export const FriendsPage: React.FC = () => {
  return (
    <FriendsPageStyled className="wrapper">
      <WrapperContentStyled>
        <TogglerBlock />
        <FriendsList />
      </WrapperContentStyled>
    </FriendsPageStyled>
  )
}

export default FriendsPage
