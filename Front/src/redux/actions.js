import axios from 'axios';
import { ERROR, GET_GAMES, GET_GAME_NAME, POST_GAME, GAME_DETAIL, GET_GENRES, CLEAR, ORDEN, RATING, CREATION, GENRES } from './types';
const URL = 'http://localhost:3001';

export const searchByName = (name) =>{
    return async (dispatch) =>{
        try {
            const { data } = await axios.get(`${URL}/videogames?name=${name}`)
            return dispatch({
                type: GET_GAME_NAME,
                payload: data
            })
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.message
            })
        }
    };
};

export const getAllGames =() =>{
    return async (dispatch) =>{
        try {
            await axios.get(`${URL}/videogames`)
            .then((response) => { 
                return dispatch({
                    type:GET_GAMES,
                    payload: response.data
                })
            })
        } catch (error) {
            return dispatch ({
                type: ERROR,
                payload: error.message
            })
        }
    }
};

export const gameDetail = (idVideogame) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${URL}/videogames/${idVideogame}`);
            const game = res.data;
            return dispatch({ type: GAME_DETAIL, payload: game})
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.message
            });
        }
    }
};

export const clear = () => {
    return { type: CLEAR}
};

export const postGame = (game) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${URL}/videogames`, game);
            window.alert('Fue Creado exitosamente su game')
            return dispatch({
                type: POST_GAME,
                payload: res
            })
        } catch (error) {
            window.alert('No pudo ser creado su juego', game);
            return dispatch({
                type: ERROR,
                payload: error.message
            });
        }
    }
}

export const getAllGenres = () =>{
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${URL}/genres`);
            return dispatch({
                 type: GET_GENRES,
                 payload: data
            })
        } catch (error) {
            return dispatch ({
                type: ERROR,
                payload: error.message
            })
        }
    }
};

export const ordenName = (ordenByName) =>{
    return {
         type: ORDEN,
         payload: ordenByName
    }
};

export const ordenRating = (ordenByRating) =>{
    return{
        type: RATING,
        payload: ordenByRating
    }
};

export const ordenCreation = (ordenCreation) =>{
    return{
        type:CREATION,
        payload: ordenCreation
    }
};


export const ordenGenres = (ordenGenre) => {
    return{
        type: GENRES,
        payload: ordenGenre
    }
}

