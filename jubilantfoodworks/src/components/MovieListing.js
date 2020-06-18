import React, { useState } from 'react';
import axios from 'axios';
import AutoCompleteInput from '../HOC/AutoCompleteInput';
import AutoCompleteList from '../HOC/AutoCompleteList';
import '../assets/css/customSelect.css';

const MovieListing = (props) => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [text, setText] = useState('');
    const [showDropdown, setShowDropdown] = useState(props.showDropdown);

    const handleSelect = (id, name) => {
        setItems([...items, {id: id, title: name}]);
        setText('');
        setShowDropdown(false);
        setFilteredItems([]);

    }
    const handleChange = (e) => {
        e.stopPropagation()
        let currentVal = e.target.value;
        setText(currentVal);
        axios.get('http://www.omdbapi.com/?s='+currentVal+'&type=movie&apikey=d89e41f2')
        .then(res => {
            console.log(res.data);
            if(currentVal.length > 0) {
                setShowDropdown(true);
                 if(res.data && res.data.Response=='True') {
                    setFilteredItems(res.data.Search);
                    console.log(res.data);
                }
                else {
                    setFilteredItems([res.data.Error]);
                }
            }
            else {
                setShowDropdown(false);
                setFilteredItems([]);
            }
        })
    }

    const handleDelete = (id) => {
        let array = items;
        let newArray = array.filter( el => el.id !== id );
        setItems(newArray);
    }
    
    const closeDropdown = (e) => {
        e.preventDefault()
        setShowDropdown(false);
    }
    
    return(
        <div className="main-wrapper" onClick={(e) => closeDropdown(e)}>
            <h1>Search Movie</h1>
            <div className="selectBoxWrapper">
                
                <AutoCompleteInput text={text} handleChange={handleChange} maxLimitReached={items.length >= 5 ? true : false}>
                    {items.map(item => 
                        <li key={item.id}>{item.title} <span className="close" onClick={() => handleDelete(item.id)}></span></li>
                    )}
                </AutoCompleteInput>
                    
                {showDropdown ?
                    <AutoCompleteList overflow={filteredItems.length > 5 ? true : false}>
                        {filteredItems.map((arr, index) => 
                            arr.imdbID || arr.Title ?
                                <li class="listItem" key={arr.imdbID} onClick={() => handleSelect(arr.imdbID, arr.Title)}>{arr.Title}<span className="year">{arr.Year}</span></li>
                            :
                                <li key={index}>{arr}</li>
                        )}
                    </AutoCompleteList>
                :
                    null
                }
                
            </div>
        </div>
    )
}

export default MovieListing;