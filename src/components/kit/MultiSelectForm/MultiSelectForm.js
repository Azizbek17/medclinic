import React from 'react';
import Select, {components} from 'react-select';
import './index.scss';
import Colors from "../../../global/styles/Colors";

const SelectIndicatorIcon = () => {
    return (
        <svg className="MuiSvgIcon-root MuiSelect-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"
             role="presentation">
            <path d="M7 10l5 5 5-5z"/>
        </svg>
    )
};

const DropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <SelectIndicatorIcon/>
        </components.DropdownIndicator>
    );
};

const MultiSelectForm = ({options, defaultValue = null, onChange, propertyName, value}) => {
    return (
        <Select
            isMulti
            name={propertyName}
            options={options}
            components={{DropdownIndicator}}
            className="multi-select-root"
            placeholder="Выбрать услугу"
            closeMenuOnSelect={false}
            getOptionValue={opt => opt.id}
            onChange={onChange}
            style={{backgroundColor: Colors.NEUTRAL['white'], border: `1px solid ${Colors.NEUTRAL['border']}`}}
            classNamePrefix="select"
        />
    );
};

export default MultiSelectForm;