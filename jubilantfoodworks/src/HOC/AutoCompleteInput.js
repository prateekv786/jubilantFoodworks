import React from 'react';
import '../assets/css/autoCompleteInput.css';

const AutoCompleteInput = (props) => {
    const _handleChange = (e) => {
        e.stopPropagation();
        props.handleChange(e);
    }
    return(
        <>
            <div className="selectInputBox">
                <ul className="selectedListing">
                    {props.children}
                    {!props.maxLimitReached ?
                        <input type="text" name="textInput" value={props.text} className="inputBox" onChange={(e)=>_handleChange(e)} />
                    :
                        null
                    }
                    
                </ul>
            </div>
            {props.maxLimitReached ?
                <span className="error">Only 5 movies are allowed to select in the given box</span>
            :
                null
            }
        </>
    )
}

export default AutoCompleteInput;