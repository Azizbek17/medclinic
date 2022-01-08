import React, { useState } from 'react'
import Input from '@material-ui/core/Input'
import { makeStyles } from '@material-ui/core/styles'
import InputMask from 'react-input-mask'
import FormControl from '@material-ui/core/FormControl'
import Colors from '../../../global/styles/Colors'
import { phoneMask } from '../../../constants.json'

const useStyles = makeStyles((theme) => ({
  root: {
    border: '1px solid #b6b5b5', // TODO need to make color like figma
    borderRadius: '6px',
    color: Colors.NEUTRAL['black'],
    padding: '11px 16px',
    position: 'relative',
  },
  placeHolder: {
    position: 'absolute',
    top: '18px',
    left: '16px',
    color: Colors.NEUTRAL['black'],
  },
}))

function TextMaskCustom(props) {
  const { inputRef, ...other } = props
  return (
    <InputMask
      mask={phoneMask}
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null)
      }}
    />
  )
}

const InputPhoneMask = ({ value, propertyName, onChange, className }) => {
  const [isActive, setValue] = useState(true)
  const classes = useStyles()
  return (
    <FormControl className={[classes.root, className].join(' ')}>
      <Input
        value={value}
        name={propertyName}
        onChange={onChange}
        isActive={isActive}
        onFocus={() => setValue((prevValue) => !prevValue)}
        onBlur={() => setValue((prevValue) => !prevValue)}
        inputComponent={TextMaskCustom}
        placeholder={'Номер телефона'}
        disableUnderline
      />
    </FormControl>
  )
}

export default InputPhoneMask
