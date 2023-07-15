import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../redux/actions";
import styles from "./SearchBar.module.css";


export default function SearchBar(props){
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    
    const handleChange = event => {
        const { value } = event.target;
        setInput(value);
        console.log(input);
    }

    const onSearch = event =>{
        event.preventDefault();
        dispatch(searchByName(input));
    }


    return(
        <div>
            <input type="search"
            name="search"
            id="search"
            value={input}
            onChange={handleChange}
            placeholder="Search..."
            />
            <button type="submit" onClick={(event)=>onSearch(event)} className={styles.botonSearch}>SEARCH</button>
        </div>
    )
}