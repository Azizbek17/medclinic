import 'moment/locale/ru'
import React from 'react'
import 'react-calendar/dist/Calendar.css'
import ArrowIcon from '../Icons/ArrowIcon'
import './index.scss'

const PrevButton = ({ selectedDate, calendarHandlePrevClick }) => {
  const month = selectedDate.getMonth()
  const currentMonth = new Date().getMonth()
  if (month === currentMonth)
    return (
      <span className="date-picker-root__left-arrow no_cursor">
        <ArrowIcon />
      </span>
    )
  else
    return (
      <span
        className="date-picker-root__left-arrow"
        onClick={calendarHandlePrevClick}
      >
        <ArrowIcon />
      </span>
    )
}

export default PrevButton
