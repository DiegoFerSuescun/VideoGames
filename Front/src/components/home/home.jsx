import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getAllGames, getAllGenres, ordenCreation, ordenGenres, ordenName, ordenRating } from "../../redux/actions";
import Card from "../cardGames/Card.jsx";
import Paginado from "../paginado/Paginado";
import NavBar from "../navBar/NavBar";
import styles from "./home.module.css";
import { Spinner } from "../spinner/Spinner";



export default function Home(props){
    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.games);
    

    const [pagAct, setPagAct] = useState(1);
    const [cardPag, setCardPag] = useState(15);
    const [inPut, setInput] = useState(1);
    const [order, setOrder ] = useState('');
    const [aux, setAux] =useState(false);

    
    const viewGame = allGames.slice((pagAct -1) * cardPag, (pagAct - 1)* cardPag + cardPag);
    const total = Math.ceil (allGames.length / cardPag);


    useEffect(() => {
        if(!allGames.length){
            dispatch(getAllGames());
        }
        dispatch(getAllGenres());
    },[dispatch, allGames]);

    const handleByname = (event) =>{
        event.preventDefault();
        const { value } =  event.target;
        dispatch(ordenName(value))
        aux? setAux(false):setAux(true);
        setPagAct(1);
        setInput(1);
        setOrder("By: ", value)

    };

    const handleByRating = (event) => {
        event.preventDefault();
        const { value } = event.target;
        console.log(value);
        aux? setAux(false):setAux(true);
        dispatch(ordenRating(value));
        setPagAct(1);
        setInput(1);
        setOrder("By: ", value)
    };
    
    const handleByCreation = (event) => {
        event.preventDefault();
        const { value } = event.target;
        dispatch(ordenCreation(value));
        setPagAct(1);
        setInput(1);
    };
    
    const handleByGenres = (event) =>{
        event.preventDefault();
        const { value } =event.target;
        dispatch(ordenGenres(value));
        setPagAct(1);
        setInput(1);
    }

    return(
        <div>
            <NavBar setPagAct ={setPagAct} setInput={setInput} setCardPag={setCardPag} handleByname={handleByname} handleByRating={handleByRating} handleByCreation={handleByCreation} handleByGenres={handleByGenres} order={order} aux={setAux} />
            <Paginado total={total} pagAct={pagAct} setPagAct={setPagAct} inPut={inPut} setInput={setInput} />
            <div className={styles.container}>
          {
            viewGame.length?
            viewGame.map((game) => {
                return(
                    <div className={styles.marginCard}>
                        <Card 
                            id= { game.id}
                            key = { game.id}
                            name = { game.name}
                            genres= {game.genres.join(', ')}
                            rating= {game.rating}
                            background_image= {game.background_image}
                            platforms={game.platforms}
                        />
                    </div>
                )
            }) : < Spinner />
          }
            </div>
        </div>
    )
}