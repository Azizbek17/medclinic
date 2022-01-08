import React from 'react'
import Colors from '../../../global/styles/Colors'
import './index.scss'

const TimeButton = ({ time, disabled, selected, onClick, isBusy }) => {
  const textColor = selected ? Colors.NEUTRAL.green : Colors.NEUTRAL.darkBlue
  const bgColor = selected ? Colors.NEUTRAL.lightGreen : Colors.NEUTRAL.white

  if (isBusy) {
    return (
      <button
        className="time-button-root1"
        disabled={disabled}
        style={{ backgroundColor: bgColor }}
      >
        <span className="time-button-root__time" style={{ color: textColor }}>
          {time}
        </span>
      </button>
    )
  } else {
    return (
      <button
        className="time-button-root"
        disabled={disabled}
        onClick={() => onClick(time)}
        style={{ backgroundColor: bgColor }}
      >
        <span className="time-button-root__time" style={{ color: textColor }}>
          {time}
        </span>
      </button>
    )
  }
}

export default TimeButton
