import React from 'react'
import styled from 'styled-components'
import { BlockStyled } from '@/components/ui/Block'

const FriendsListStyled = styled(BlockStyled)`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`
const FriendsList: React.FC = () => {
    return (
        <FriendsListStyled>123</FriendsListStyled>
    )
}

export default FriendsList
