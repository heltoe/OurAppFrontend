import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import FadeInOut from '@/components/ui/FadeInOut'
import dayjs from 'dayjs'
import 'react-datepicker/dist/react-datepicker.css'

export type DatePickerType = {
  value: Date | null,
  placeholder?: string
  error: string,
  onChange(value: Date | null): void
}

const LabelStyled = styled.label<{ error: string }>`
  width: 100%;
  position: relative;
  transition: ${(props) => props.theme.transition};
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) =>
    props.theme.rgba(props.theme.colors.red, props.error && props.error.length ? 1 : 0)};
  box-shadow: ${(props) =>
    props.error && props.error.length ? props.theme.shadow.shadow3 : 'none'};
  border-radius: 8px;
  margin-top: 20px;
  & .react-datepicker-wrapper {
    opacity: 0;
    left: 0;
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    & input {
      width: 100%;
      height: 100%;
    }
  }
`
const WrapperDatePickerStyled = styled.div<{ filled: boolean }>`
  border-radius: 8px;
  padding: 28px 15px 13px;
  border-width: 1px;
  border-style: solid;
  transition: ${(props) => props.theme.transition};
  background-color: ${(props) =>
    props.theme.rgb(props.theme.colors[props.filled ? 'white' : 'grey3'])};
  border-color: ${(props) =>
    props.theme.rgba(props.theme.colors.grey4, props.filled ? 1 : 0)};
  box-shadow: ${(props) =>
    props.filled ? props.theme.shadow.shadow2 : 'none'};
`
const PlaceholderStyled = styled.p<{ filled: boolean }>`
  font-size: 13px;
  font-weight: 300;
  color: ${(props) => props.theme.rgb(props.theme.colors.black)};
  position: absolute;
  top: ${(props) => (props.filled ? '15px' : '50%')};
  left: 15px;
  transform: translateY(-50%);
  transition: ${(props) => props.theme.transition};
`
const ValueDatePickerStyled = styled.p`
  font-size: 16px;
  min-height: 19px;
  color: rgb(0,0,0);
`
const ErrorMessageStyled = styled.div`
  max-width: 235px;
  font-size: 14px;
  line-height: 1.3;
  position: absolute;
  right: -15px;
  top: 50%;
  transform: translate(100%, -50%);
  background-color: ${(props) => props.theme.rgb(props.theme.colors.red)};
  color:${(props) => props.theme.rgb(props.theme.colors.white)};
  box-shadow: ${(props) => props.theme.shadow.shadow1};
  padding: 10px;
  border-radius: 8px;
  &:after {
    content: '';
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    border: 7px solid transparent;
    border-right: ${(props) => `15px solid ${props.theme.rgb(props.theme.colors.red)}`};
  }
`
const DatePickerUI: React.FC<DatePickerType> = ({ value, placeholder, error, onChange }) => {
  const [activeInput, setActiveInput] = useState(false)
  const handlerFocus = () => {
    if (!activeInput) setActiveInput(true)
  }
  const handlerBlur = () => {
    if (!value) setActiveInput(false)
  }
  useEffect(() => {
    if (value && !activeInput) setActiveInput(true)
  }, [value])
  return (
    <LabelStyled error={error}>
      {placeholder && <PlaceholderStyled filled={activeInput}>{placeholder}</PlaceholderStyled>}
      <DatePicker
        selected={value ? new Date(value) : null}
        maxDate={new Date()}
        showPopperArrow={false}
        onChange={date => onChange(Array.isArray(date) ? date[0] : date)}
        onCalendarClose={handlerBlur}
        onCalendarOpen={handlerFocus}
      />
      <WrapperDatePickerStyled filled={activeInput}>
        <ValueDatePickerStyled>{value ? dayjs(value).format('DD.MM.YYYY') : ''}</ValueDatePickerStyled>
      </WrapperDatePickerStyled>
      {error && error.length && <FadeInOut><ErrorMessageStyled>{error}</ErrorMessageStyled></FadeInOut>}
    </LabelStyled>
  );
};

export default DatePickerUI
