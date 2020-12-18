import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Icon from '@/components/ui/Icon'
import Avatar, { AvatarStyled } from '@/components/ui/Avatar'

type CardUser = {
  id: number
  image: string
  fullName: string
}

export const CardUserStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
  border-radius: 8px;
  & ${AvatarStyled} {
    border-radius: 8px;
  }
`
const WrapperContentStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`
const ControllerStyled = styled.div`
  margin-left: auto;
  cursor: pointer;
  &:hover {
    use {
      fill: ${(props) => props.theme.rgb(props.theme.colors.purple1)};
    }
  }
`
const LinkStyled = styled(Link)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 30px);
  transition: ${(props) => `color ${props.theme.transition}`};
  &:hover {
    color: ${(props) => props.theme.rgb(props.theme.colors.purple1)};
  }
`
const CardUser: React.FC<CardUser> = ({ image, fullName }) => {
  return (
    <CardUserStyled>
      <Link to="/">
        <Avatar size="160px" image={image} />
      </Link>
      <WrapperContentStyled>
        <LinkStyled to="/" className="middle">{fullName}</LinkStyled>
        <ControllerStyled>
          <Icon type="add-user" color="grey" size="25px" />
        </ControllerStyled>
      </WrapperContentStyled>
    </CardUserStyled>
  )
}

export default CardUser
