import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Colors from '../../../global/styles/Colors'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import './index.scss'

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${Colors.NEUTRAL['border']}`,
    borderRadius: '6px',
    color: Colors.NEUTRAL['black'],
  },
}))

const SelectInput = ({
  id,
  name,
  onChange,
  className,
  label,
  value,
  inputProps,
  children,
}) => {
  const classes = useStyles()
  return (
    <>
      <FormControl
        className={[classes.root, 'select-form', className].join(' ')}
      >
        <InputLabel variant="outlined" id={id + 'InputLabel'}>
          {label}
        </InputLabel>
        <Select
          label={label}
          variant="outlined"
          className={className}
          name={name}
          labelId={id + 'label'}
          id={id}
          value={value}
          onChange={onChange}
          inputProps={inputProps}
        >
          {children}
        </Select>
      </FormControl>
    </>
  )
}

export default SelectInput
