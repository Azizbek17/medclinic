import ru from 'date-fns/locale/ru'
import React from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { registerLocale } from 'react-datepicker'
import { showMonthName } from '../../../global/Helpers/showMonthForDatePicker'
import ArrowIcon from '../Icons/ArrowIcon'
import './index.scss'
import PrevButton from './PrevButton'

registerLocale('ru', ru)
const ServiceDatePicker = ({
  onChange,
  selectedDate,
  calendarHandleNextClick,
  calendarHandlePrevClick,
  busyDays,
}) => {
  const month = selectedDate.getMonth()
  const year = selectedDate.getFullYear()
  const today = new Date()
  let disabledDates = []
  if (busyDays) {
    busyDays.forEach((day) => {
      disabledDates.push(new Date(year, month, day))
    })
  }
  return (
    <div className="date-picker-root">
      <div className="date-picker-root__date">
        <div>
          <PrevButton
            selectedDate={selectedDate}
            calendarHandlePrevClick={calendarHandlePrevClick}
          />
        </div>
        <p>{`${showMonthName(month)}, ${year}`}</p>
        <div>
          <span
            className="date-picker-root__right-arrow"
            onClick={calendarHandleNextClick}
          >
            <ArrowIcon width={8} height={9} />
          </span>
        </div>
      </div>
      <Calendar
        minDate={today}
        onChange={onChange}
        //!
        value={selectedDate}
        next2Label={false}
        prev2Label={false}
        locale="ru-RU"
        showNeighboringMonth={false}
        onClickDay={onChange}
        tileDisabled={({ date, view }) =>
          disabledDates.some(
            (disabledDate) =>
              date.getFullYear() === disabledDate.getFullYear() &&
              date.getMonth() === disabledDate.getMonth() &&
              date.getDate() === disabledDate.getDate()
          )
        }
      />
    </div>
  )
}

export default ServiceDatePicker
