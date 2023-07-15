import React from "react";
import SearchBar from "../searchBar/SearchBar";
import styles from './NavBar.module.css';
import Filter from "../filter/Filter";
import { useDispatch } from "react-redux";
import { getAllGames } from "../../redux/actions";
import { NavLink, useNavigate } from "react-router-dom";


export default function NavBar({setPagAct, setInput, handleByname, handleByRating, handleByCreation, handleByGenres, allGenres, setAux}){
    const dispatch = useDispatch();
    const local = useNavigate();

    const onClick = (event)=>{
        event.preventDefault();
        dispatch(getAllGames());
        local('/home');
    }
    return(
        <div>
            <div className={styles.barra}>
            <button className={styles.homeBoton} onClick={(event) => onClick(event)}>Home</button>
            <SearchBar className = {styles.containerSerach}/>
            <NavLink to= '/postGame'>
            <button className={styles.createBoton}>Create New Game</button>
            </NavLink>
            </div>
            <div className={styles.containerFilter}>
             <Filter handleByname={handleByname} handleByRating={handleByRating} handleByCreation={handleByCreation} handleByGenres={handleByGenres} allGenres={allGenres} />
            </div>
        </div>
    )
}