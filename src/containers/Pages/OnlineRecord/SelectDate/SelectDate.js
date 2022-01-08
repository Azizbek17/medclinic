import React from 'react'
import GeneralButton from '../../../../components/kit/GeneralButton/GeneralButton'
import ServiceDatePicker from '../../../../components/kit/ServiceDatePicker/ServiceDatePicker'
import ChooseTime from '../../../../components/kit/TimeButton/ChooseTime'
import { checkEmptyField } from '../../../../global/Helpers/checkEmptyField'
import '../index.scss'
import LoadingComponent from '../LoadingComponent/LoadingComponent'
import HomePageBtn from '../../../../components/kit/HomePageBtn/HomePageBtn'

const SelectDate = ({
  selectedTime,
  onSelectTime,
  handleClickNext,
  onSelectDate,
  selectedDate,
  calendarHandleNextClick,
  calendarHandlePrevClick,
  times,
  timesBtnsLoading,
  busyDays,
  handleClickPrev,
}) => {
  const disabled = !checkEmptyField(selectedTime)
  setTimeout(() => {
    document.addEventListener('click', (e) => {
      e.target.classList.add('active')
    })
  }, 1)
  return (
    <div className="select-date-root">
      <div className="select-date-root__date">
        {!busyDays ? (
          <LoadingComponent />
        ) : (
          <>
            <h3 className="select-date-root__title title">Выберите дату</h3>
            <ServiceDatePicker
              onChange={onSelectDate}
              selectedDate={selectedDate}
              calendarHandleNextClick={calendarHandleNextClick}
              calendarHandlePrevClick={calendarHandlePrevClick}
              busyDays={busyDays}
            />
          </>
        )}
      </div>
      <div
        className={`select-date-root__time ${
          times.length === 0 ? 'd-none' : ''
        }`}
      >
        <ChooseTime
          selectedTime={selectedTime}
          onSelectTime={onSelectTime}
          times={times}
          timesBtnsLoading={timesBtnsLoading}
        />
      </div>
      <div className="d-flex">
        <HomePageBtn
          onClick={handleClickPrev}
        />
        <GeneralButton
          title="Далее"
          disabled={disabled}
          onClick={handleClickNext}
        />
      </div>
    </div>
  )
}

export default SelectDate
