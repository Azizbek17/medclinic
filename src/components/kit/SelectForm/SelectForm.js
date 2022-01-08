import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";
import Colors from "../../../global/styles/Colors";

import './index.scss';

const useStyles = makeStyles(theme => ({
    root: {
        border: `1px solid ${Colors.NEUTRAL['border']}`,
        borderRadius: '6px',
        color: Colors.NEUTRAL['black'],
        width: '100%',
        backgroundColor: '#ffffff',
        padding: '12px 0',
    },
    option: {
        padding: '0 16px'
    }
}));
const SelectForm = ({value, handleChange, options, defaultValue, className, propertyName}) => {
    const classes = useStyles();
    return (
        <FormControl className={[classes.root, "input-form-select", className].join(' ')}>
            <TextField
                select
                value={value}
                onChange={handleChange}
                name={propertyName}
            >
                {defaultValue &&
                <MenuItem className="input-form-select__option" key={defaultValue.id} value={defaultValue.id}>
                    {defaultValue.label}
                </MenuItem>
                }
                {options &&
                options.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.label}
                    </MenuItem>
                ))
                }
            </TextField>
        </FormControl>
    );
};

export default SelectForm;