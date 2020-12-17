import React from 'react'
import styled from 'styled-components'

export const BlockStyled = styled.div`
    width: 100%;
    padding: 20px;
    border-radius: 8px;
    background-color: ${(props) => props.theme.rgb(props.theme.colors.white)};
`
const Block: React.FC = ({ children }) => {
    return (<BlockStyled>{children}</BlockStyled>)
}

export default Block;