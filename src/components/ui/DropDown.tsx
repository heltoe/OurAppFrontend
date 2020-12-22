import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import useClickOutside from '@/directives/ClickOutside'
import { BlockStyled } from '@/components/ui/Block'
import Simple from '@/components/ui/SimpleBar'
import EmptyPlaceholder from '@/components/common/EmptyPlaceholder'

type OptionItem = {
  id: number
  name: string
}
export interface IDropDown {
  value: number
  placeholder?: string
  options: OptionItem[]
  selected(id: number): void
}

const DropDownStyled = styled.div`
  display: flex;
  position: relative;
`
const ActivatorStyled = styled(BlockStyled)`
  padding: 10px;
  border: ${(props) => `1px solid ${props.theme.rgb(props.theme.colors.grey1)}`};
`
const DropDownItem = styled.div`
  display: flex;
  padding: 10px;
  transition: ${(props) => `background-color ${props.theme.transition}`};
  &:hover {
    background-color: ${(props) => props.theme.rgb(props.theme.colors.grey2)};
  }
`
const WrapperDropDownItems = styled(BlockStyled)<{ specialPadding: boolean }>`
  min-width: ${(props) => props.specialPadding ? '200px' : '70px' };
  position: absolute;
  left: 0;
  bottom: -10px;
  transform: translateY(100%);
  overflow: hidden;
  box-shadow: ${(props) => props.theme.shadow.shadow1};
  padding: ${(props) => props.specialPadding ? '10px' : '0' };
  z-index: 100;
  ${DropDownItem}:not(:last-child) {
    border-bottom: ${(props) => `1px solid ${props.theme.rgb(props.theme.colors.grey2)}`};
  }
`
const DropDown: React.FC<IDropDown> = ({ value, placeholder = '', options = [], selected }) => {
  const ref = useRef(null)
  const [isShowParams, setIsShowParams] = useState(false)
  const [currentValue, setCurrentValue] = useState(0)
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholder)
  const handleSelect = (id: number) => {
    setValue(id)
    selected(id)
    setIsShowParams(false)
  }
  const setValue = (value: number) => {
    const element = options.find((item) => item.id === value)
    setCurrentValue(element ? element.id : value)
    setCurrentPlaceholder(element ? element.name : '')
  }
  const handleClickOutside = () => {
    if (isShowParams) setIsShowParams(false)
  }
  useClickOutside(ref, handleClickOutside)
  useEffect(() => {
    if (currentValue !== value) setValue(value)
  }, [value])
  return (
    <DropDownStyled ref={ref}>
      <ActivatorStyled className="no-select" onClick={() => {setIsShowParams(!isShowParams)}}>
        {currentPlaceholder || placeholder}
      </ActivatorStyled>
        { isShowParams && <WrapperDropDownItems specialPadding={!options.length}>
          <Simple maxHeight="200px">
          {
            options.length ? [{ id: 0, name: placeholder }, ...options].map((item) => (
              <DropDownItem key={item.id} className="no-select" onClick={() => handleSelect(item.id)}>
                {item.name}
              </DropDownItem>
            )) : <EmptyPlaceholder>Список пуст</EmptyPlaceholder>
          }
          </Simple>
        </WrapperDropDownItems>}
    </DropDownStyled>
  )
}

export default DropDown
