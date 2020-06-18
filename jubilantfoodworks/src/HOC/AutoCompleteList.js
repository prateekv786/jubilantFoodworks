import React from 'react';
import '../assets/css/autoCompleteList.css';

const AutoCompleteList = (props) => {
    return(
        <ul className="autoCompleteListing">
            {props.children}
        </ul>
    )
}

export default AutoCompleteList;