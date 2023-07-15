import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import NavBar from "../navBar/NavBar";
import style from './detail.module.css'
import { clear, gameDetail } from "../../redux/actions";


export default function Detail(props){
    const { idvideogame } = useParams();
    const game = useSelector((state) => state.detail);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(gameDetail(idvideogame));

        return () => {
            dispatch(clear());
        }
    }, [dispatch, idvideogame])
    
    return(
        <div className={style.contendor}>
            <NavBar/>
           {
            game.name?
            <div className={style.contenedorDetail}>
                    <div>
                    <img src={game.background_image} alt={game.name}  className={style.imagecontents}/>
                    <h1>{game.name}</h1>
                    <p dangerouslySetInnerHTML={{ __html: game.description}}/>
                    </div>
                    <h2>{game.platforms.join(' , ')}</h2>
                    <h2>{game.genres.join(', ')}</h2>
                    <h2>{game.rating}</h2>
                    <h2>{game.released}</h2>
            </div> : null
           }
        </div>
    )
}