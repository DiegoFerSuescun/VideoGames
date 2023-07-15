import React from "react";
import { Link } from "react-router-dom";
import style  from "./Card.module.css"


export default function Card({id, name, background_image, genres, rating, platforms}){
    return(
        <div>
        <div  className={style.container}>
            <b><h1 className={style.name}>{name}</h1></b>
            <h3 className={style.genres}>Genres: {genres}</h3>
            <h3 className={style.rating}>Rating: {rating}</h3>
            <Link to = {`/videogames/${id}`}>
                <img src={background_image} alt={name} className={style.image} />
            </Link>
            
        </div>
        </div>
    )
}