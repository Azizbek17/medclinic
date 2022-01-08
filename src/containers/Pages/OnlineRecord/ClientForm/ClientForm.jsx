import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'
import GeneralButton from '../../../../components/kit/GeneralButton/GeneralButton'
import InputForm from '../../../../components/kit/InputForm/InputForm'
import InputPhoneMask from '../../../../components/kit/InputPhoneMask/InputPhoneMask'
import SelectInput from '../../../../components/kit/SelectInput/SelectInput'
import { checkEmptyField } from '../../../../global/Helpers/checkEmptyField'
import '../index.scss'

const ClientForm = ({
  handleClickNext,
  name,
  lastname,
  gender,
  phone,
  inputChangeHandler,
  handleClickPrev,
}) => {
  const disabled =
    !checkEmptyField(name) ||
    !checkEmptyField(lastname) ||
    gender === -1 ||
    !checkEmptyField(phone)
  return (
    <div className="client-data-root">
      <h3 className="client-data-root__title title">Ваши контакты</h3>
      <form className="client-data-root__form">
        <InputForm
          className="client-data-root__field"
          type="text"
          value={name}
          propertyName="name"
          onChange={inputChangeHandler}
          label="Имя"
        />
        <InputForm
          className="client-data-root__field"
          type="text"
          value={lastname}
          propertyName="lastname"
          onChange={inputChangeHandler}
          label="Фамилия"
        />

        <SelectInput
          className="client-data-root__field"
          value={gender}
          name="gender"
          onChange={inputChangeHandler}
          label=""
        >
          <MenuItem value={-1}>Не выбран</MenuItem>
          <MenuItem value={1}>Мужской</MenuItem>
          <MenuItem value={0}>Женский</MenuItem>
        </SelectInput>
        <InputPhoneMask
          className="client-data-root__field "
          value={phone}
          propertyName="phone"
          onChange={inputChangeHandler}
        />
      </form>
      <div className="d-flex mt-30">
        <GeneralButton
          className="mr-10"
          title="Назад"
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

export default ClientForm
