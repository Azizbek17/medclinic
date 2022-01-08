import React from 'react'
import './index.scss'
import TimeButton from './TimeButton'

const ChooseTime = ({
  selectedTime,
  onSelectTime,
  times,
  isBusy,
  timesBtnsLoading,
}) => {
  return (
    <>
      <h3 className={`select-date-root__title title`}>Выберите время</h3>
      <div className="select-date-root__times-btns">
        {times.map((item, ndx) => (
          <TimeButton
            key={ndx}
            time={item}
            selected={item === selectedTime}
            onClick={onSelectTime}
            isBusy={isBusy}
          />
        ))}
      </div>
    </>
  )
}

export default ChooseTime
