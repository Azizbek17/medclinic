import moment from 'moment'
import 'moment/locale/ru'
import React from 'react'
import GeneralButton from '../../../../components/kit/GeneralButton/GeneralButton'
import CalendarIcon from '../../../../components/kit/Icons/CalendarIcon.jsx'
import ClockIcon from '../../../../components/kit/Icons/ClockIcon.jsx'
import WalletIcon from '../../../../components/kit/Icons/WalletIcon.jsx'
import Colors from '../../../../global/styles/Colors'
import '../index.scss'
import SelectFormOption from '../SelectService/SelectServiceOption'
import { currency_symbol } from './../../../../constants.json'
const Payment = ({
  selectedOptions,
  selectedTime,
  onSubmit,
  master,
  selectedDate,
  handleClickPrev,
  doctorSpecialities,
}) => {
  let date = moment(selectedDate)
  date.locale('ru')
  let totalSum = 0
  selectedOptions.forEach((el) => (totalSum += el.Price))
  return (
    <div className="payment-form-root">
      <h3 className="payment-form-root__title">Подтвердите запись</h3>
      {master && (
        <div className="d-flex choose-master-root__master justify-content-start align-items-center">
          <div className="choose-master-root__avatar">
            {master.charAt().toUpperCase()}
          </div>
          <div className="d-flex flex-column">
            <div className="choose-master-root__master-name">
              {master.toLowerCase()}
            </div>
            <p className="choose-master-root__speciality">
              {doctorSpecialities[0].Name}
            </p>
          </div>
        </div>
      )}
      <div className="d-flex justify-content-between">
        <div className="payment-form-root__time">
          <CalendarIcon
            mainColor={Colors.ICON['main']}
            secColor={Colors.ICON['secondary']}
            className="payment-form-root__icon"
          />
          <div>
            <p>Дата</p>
            <p>{date.format('D MMMM YYYY') || ''} г.</p>
          </div>
        </div>
        <div className="payment-form-root__time">
          <ClockIcon
            mainColor={Colors.ICON['main']}
            secColor={Colors.ICON['secondary']}
            className="payment-form-root__icon"
          />
          <div>
            <p>Время</p>
            <p>{selectedTime || ''}</p>
          </div>
        </div>
      </div>
      <div className="payment-form-root__services">
        {selectedOptions &&
          selectedOptions.map((el, ndx) => (
            <SelectFormOption
              key={ndx}
              item={el}
              isChecked={true}
              onSelect={() => null}
            />
          ))}
      </div>
      <div className="payment-form-root__total-amount">
        <WalletIcon
          mainColor={Colors.ICON['main']}
          secColor={Colors.ICON['secondary']}
          className="payment-form-root__icon"
        />
        <p>Итого к оплате: </p>
        <p>
          {totalSum} {currency_symbol}
        </p>
      </div>
      <div className="d-flex">
        <GeneralButton
          className="mr-10"
          title="Назад"
          onClick={handleClickPrev}
        />
        <GeneralButton title="Записаться" onClick={onSubmit} />
      </div>
    </div>
  )
}

export default Payment
