import React from 'react';
import SearchIcon from "../Icons/SearchIcon";
import Colors from "../../../global/styles/Colors";

import './index.scss';

const SearchField = () => {
    return (
        <div className="search-field"
             style={{
                 backgroundColor: Colors.NEUTRAL['white'],
                 border: `1px solid ${Colors.NEUTRAL['border']}`
             }}>
            <span className="search-field__icon">
                <SearchIcon width={16} height={16} color={Colors.SEMANTIC['blue']}/>
            </span>
            <input type="text" className="search-field__input" placeholder="Поиск сотрудника по ФИО"/>
        </div>
    );
};

export default SearchField;