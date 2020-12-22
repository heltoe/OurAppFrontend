import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import useClickOutside from '@/directives/ClickOutside'
import { BlockStyled } from '@/components/ui/Block'
import RadioButton, { LabelRadioStyled } from '@/components/ui/RadioButton'
import DropDown from '@/components/ui/DropDown'

const ParamsStyled = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;
  margin-left: 10px;
`
const BlockContentTooltipStyled = styled(BlockStyled)`
  position: absolute;
  width: 200px !important;
  bottom: -10px;
  right: 0;
  transform: translateY(100%);
  width: auto;
  box-shadow: ${(props) => props.theme.shadow.shadow1};
`
const WrapperYearBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 10px;
  & span {
    display: flex;
    flex-shrink: 0;
    width: 10px;
    height: 1px;
    background-color: ${(props) => props.theme.rgb(props.theme.colors.black)};
    margin: 0 5px;
    border-radius: 8px;
  }
`
const WrapperGenderBlock = styled.div`
  display: flex;
  flex-direction: column;
  & ${LabelRadioStyled} {
    margin-top: 10px;
  }
`
const ages = Array.from({ length: 81 }, (v, k) => k).filter(item => item > 13).map(item => ({ id: item, name: `${item}` })); 
const TooltipParams: React.FC = () => {
  const ref = useRef(null)
  const [isShowParams, setIsShowParams] = useState(false)
  const [minYear, setMinYear] = useState(0)
  const [maxYear, setMaxYear] = useState(0)
  const [gender, setGender] = useState('all')
  const handleClickOutside = () => {
    if (isShowParams) setIsShowParams(false)
  }
  useClickOutside(ref, handleClickOutside)
  return (
    <ParamsStyled ref={ref}>
      <p className="light no-select" onClick={() => setIsShowParams(!isShowParams)}>Параметры</p>
      {isShowParams && <BlockContentTooltipStyled>
        <WrapperGenderBlock>
          <p>Возраст:</p>
          <WrapperYearBlock>
            <DropDown
              value={minYear}
              placeholder="От"
              options={maxYear ? ages.filter(item => item.id < maxYear) : ages}
              selected={(year => setMinYear(year))}
            />
            <span>-</span>
            <DropDown
              value={maxYear}
              placeholder="До"
              options={ages.filter(item => item.id > minYear)}
              selected={(year => setMaxYear(year))}
            />
          </WrapperYearBlock>
          <p>Пол:</p>
          <RadioButton
            name="gender"
            value="man"
            isChecked={gender === 'man'}
            onChange={(e) => setGender(e)}
          >
            Мужской
          </RadioButton>
          <RadioButton
            name="gender"
            value="woman"
            isChecked={gender === 'woman'}
            onChange={(e) => setGender(e)}
          >
            Женский
          </RadioButton>
          <RadioButton
            name="gender"
            value="all"
            isChecked={gender === 'all'}
            onChange={(e) => setGender(e)}
          >
            Любой
          </RadioButton>
        </WrapperGenderBlock>
      </BlockContentTooltipStyled>}
    </ParamsStyled>
  )
}

export default TooltipParams
