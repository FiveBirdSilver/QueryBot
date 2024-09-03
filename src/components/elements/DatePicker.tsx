import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { ko } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'
import { styled } from 'styled-components'
import dayjs from 'dayjs'

import Button from 'components/elements/Button'
import useOpen from 'hooks/useOpen'
import useDate from 'hooks/useDate'

interface DatePickerProps {
  selectCategory: string
}

const CustomDatePicker = (props: DatePickerProps) => {
  const { selectCategory } = props

  const { condition } = useOpen()
  const { setDate } = useDate()

  const [startDate, setStartDate] = useState<Date>(new Date('2020/11/01'))
  const [endDate, setEndDate] = useState<Date>(new Date('2021/10/31'))
  const [isView, setIsView] = useState<boolean>(true)
  const [isButtonView, setIsButtonView] = useState<boolean>(true)

  // 날짜 설정 함수
  const setChatData = () => {
    setDate(
      `데이터 조회 기간 : ${dayjs(startDate).format('YYYYMMDD')} - ${dayjs(endDate).format('YYYYMMDD')}`
    )
  }

  // 사용자 이벤트 없을 경우 날짜 기본으로 설정
  useEffect(() => {
    setChatData()
  }, [])

  const cancelDataPicker = () => {
    setDate('')
    setIsView(false)
  }

  const okDatePicker = () => {
    setIsButtonView(false)
    setChatData()
  }

  useEffect(() => {
    setIsView(true)
  }, [selectCategory])

  return (
    <>
      {isView && (
        <DatePickerView>
          <span>조회할 기간을 선택해 주세요.</span>
          <DatePickerContainer $condition={condition}>
            <DatePickerWrapper>
              <DatePicker
                locale={ko}
                popperPlacement='bottom-end'
                dateFormat='yyyy.MM.dd'
                selected={startDate}
                onChange={(date) => (date ? setStartDate(date) : null)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                disabled={!isButtonView}
              />
              <span>→</span>
              <DatePicker
                locale={ko}
                popperPlacement='bottom-end'
                dateFormat='yyyy.MM.dd'
                selected={endDate}
                onChange={(date) => (date ? setEndDate(date) : null)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                disabled={!isButtonView}
              />
            </DatePickerWrapper>
            {isButtonView && (
              <ButtonContainer>
                <Button
                  text={'건너뛰기'}
                  status={'cancel'}
                  onclick={() => cancelDataPicker()}
                />
                <Button
                  text={'완료'}
                  status={'primary'}
                  onclick={() => okDatePicker()}
                />
              </ButtonContainer>
            )}
          </DatePickerContainer>
        </DatePickerView>
      )}
    </>
  )
}
export default CustomDatePicker

const DatePickerView = styled.div`
  margin-top: 8px;
`

const DatePickerContainer = styled.div<{ $condition: 'basic' | 'wide' }>`
  position: relative;
  display: flex;
  flex-direction: ${(props) =>
    props.$condition === 'basic' ? 'column' : 'row'};
  gap: 10px;

  margin: 10px 0 5px 0;
`
const DatePickerWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`
