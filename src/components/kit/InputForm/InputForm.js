import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import React from 'react'

const InputForm = ({ propertyName, onChange, className, label, ...props }) => {
  return (
    <FormControl className={['input-form', className].join(' ')}>
      <TextField
        label={label}
        variant="outlined"
        name={propertyName}
        onChange={onChange}
        {...props}
      />
    </FormControl>
  )
}

export default InputForm
