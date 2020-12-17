import React from 'react'
import styled from 'styled-components'
import Icon from '@/components/ui/Icon'

type LocationType = {
  link: string
  label: string
}
type BodyProfileType = {
  location: LocationType | null
  email: string
  birthday: string
  status: string
}

const BodyStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`
const StatusTextStyled = styled.p<{ status: string }>`
  color: ${(props) => props.theme.rgba(props.theme.colors[props.status === 'online' ? 'green1' : 'grey1'])};
`
const LineStyled = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  & p {
    margin-left: 10px;
  }
`
const LinkLineStyled = styled.a`
  display: flex;
  align-items: center;
  padding: 10px 0;
  & p {
    margin-left: 10px;
  }
`
export const BodyProfile: React.FC<BodyProfileType> = ({
  location = null,
  email = '',
  birthday = '',
  status = 'offline',
}) => {
  const greyColor = '#9f9f9f'
  return (
    <BodyStyled>
      {location ? (
        <LinkLineStyled
          href={location.link}
          target="_blank"
          rel="noreferrer"
        >
          <Icon type="pin" color={greyColor} />
          <p>{location.label}</p>
        </LinkLineStyled>
      ) : (
        ''
      )}
      <LinkLineStyled href={`mailto:${email}`}>
        <Icon type="letter" color={greyColor} />
        <p>{email}</p>
      </LinkLineStyled>
      <LineStyled>
        <Icon type="birthday" color={greyColor} />
        <p>{birthday}</p>
      </LineStyled>
      <LineStyled>
        <Icon type="phone" color={greyColor} />
        <StatusTextStyled status={status}>{status === 'online' ? 'Online' : 'Offline'}</StatusTextStyled>
      </LineStyled>
    </BodyStyled>
  )
}

export default BodyProfile
