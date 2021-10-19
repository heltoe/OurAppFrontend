import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import useClickOutside from '@/directives/ClickOutside'
import { BlockStyled } from '@/components/ui/Block'
import RadioButton, { LabelRadioStyled } from '@/components/ui/RadioButton'

const ParamsStyled = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;
  margin-left: 10px;
  z-index: 100;
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
const WrapperGenderBlock = styled.div`
  display: flex;
  flex-direction: column;
  & ${LabelRadioStyled} {
    margin-top: 10px;
  }
`
const TooltipParams: React.FC = () => {
  const ref = useRef(null)
  const [isShowParams, setIsShowParams] = useState(false)
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
