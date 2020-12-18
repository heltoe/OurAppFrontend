import React, { useState } from 'react'
import styled from 'styled-components'
import { BlockStyled } from '@/components/ui/Block'
import Icon, { IconStyled } from '@/components/ui/Icon'
import BaseInput from '@/components/ui/BaseInput'
import TooltipParams from '@/components/pages/friends/filter/TooltipParams'

const SearchFieldStyled = styled(BlockStyled)`
  display: flex;
  border-radius: 0 0 8px 8px;
  & ${IconStyled} {
    margin-right: 10px;
  }
`
const SearchField: React.FC = () => {
  const [search, setSearch] = useState('')
  return (
    <SearchFieldStyled>
      <Icon type="search" color="grey" size="18px" />
      <BaseInput value={search} placeholder={'Поиск друзей'} onChange={(e) => setSearch(e)}/>
      <TooltipParams />
    </SearchFieldStyled>
  )
}

export default SearchField
