import React from 'react'
import { currency_symbol } from './../../../../constants.json'

const SelectFormOption = ({ item, onSelect, isChecked }) => {
  return (
    <div className="select-service-root__option" onClick={() => onSelect(item)}>
      <div
        className={`select-service-root__checkbox ${
          isChecked ? 'checked' : ''
        }`}
      ></div>
      <div className="select-service-root__divide">
        <div className="d-flex flex-column justify-content-center">
          <p className="select-service-root__name">{item.Name}</p>
          <p className="select-service-root__amount">
            {item.Price} {currency_symbol}
          </p>
        </div>
        <div className="select-service-root__time">
          <p>{item.TimeMin}</p>
          <p>мин</p>
        </div>
      </div>
    </div>
  )
}

export default SelectFormOption
