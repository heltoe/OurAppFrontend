import React, { useState } from 'react'
import styled from 'styled-components'
import { BlockStyled } from '@/components/ui/Block'
import Icon, { IconStyled } from '@/components/ui/Icon'
import BaseInput from '@/components/ui/BaseInput'
import TooltipParams from '@/components/pages/friends/filter/TooltipParams'

type SearchFieldType = {
  isShadow: boolean
}

const SearchFieldStyled = styled(BlockStyled)<{ isShadow: boolean }>`
  display: flex;
  border-radius: 0 0 8px 8px;
  position: sticky;
  top: -30px;
  z-index: 100;
  box-shadow: ${(prop) => prop.isShadow ? prop.theme.shadow.shadow1 : 'none'};
  transition: ${(prop) => `box-shadow ${prop.theme.transition}`};
  & ${IconStyled} {
    margin-right: 10px;
  }
`
const SearchField: React.FC<SearchFieldType> = ({ isShadow = false }) => {
  const [search, setSearch] = useState('')
  return (
    <SearchFieldStyled isShadow={isShadow}>
      <Icon type="search" color="grey" size="18px" />
      <BaseInput value={search} placeholder={'Поиск друзей'} onChange={(e) => setSearch(e)}/>
      <TooltipParams />
    </SearchFieldStyled>
  )
}

export default SearchField
