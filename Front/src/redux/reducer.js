import { GET_GAMES, GET_GAME_NAME, POST_GAME, ERROR, GET_GENRES, GAME_DETAIL, CLEAR, ORDEN, RATING, CREATION, GENRES } from "./types";

const initialState = {
    games: [],
    allGames: [],
    detail: [],
    genres: [],
    errors: {}
}

export default function reducer (state = initialState, { type, payload}){
    switch(type){

        case GET_GAME_NAME:
            return {
                ...state,
                games: payload
            }
        case GET_GAMES:
            return{
                ...state,
                games: payload,
                allGames: payload
            }
        case GET_GENRES:
            return{
                ...state,
                genres: payload
            }
        case ERROR:
            return{
                ...state,
                errors: payload
            }
        case GAME_DETAIL:
            return{
                ...state,
                detail: payload
            }
        case CLEAR:
            return{
                ...state,
                detail: []
            }
        case POST_GAME:
            return{
                ...state,
                games: [...state.games, payload]
            }
        case ORDEN:
            let index = payload === 'ASC'?
            state.games.sort((a,b) => {
                if(a.name > b.name)return 1;
                if(a.name < b.name)return -1;
                
                return 0;
            }): state.games.sort((a,b) => {
                if(a.name > b.name) return -1;
                if(a.name < b.name) return 1;

                return 0;
            })
            // console.log('Este es el state games ' ,state.games);
            // console.log('Este es el index ' ,index);
            return{
                ...state,
                games: index
            }
        case RATING:
            let indexRating = payload === 'ASC'?
            state.games.sort((a,b) => {
                if(a.rating > b.rating) return 1;
                if(a.rating < b.rating) return -1;

                return 0;
            }): state.games.sort((a,b) => {
                if(a.rating > b.rating) return -1;
                if(a.rating < b.rating) return 1;

                return 0;
            })
            return{
                ...state,
                games: indexRating
            }
        case CREATION:
            const games = state.allGames;
            const indexCreation = payload === 'Created'? games.filter((game) => game.createdInDb) : games;
            return{
                ...state,
                games: indexCreation
            }
        case GENRES:
            const gamesGenres = state.allGames;
            const indexGenres = gamesGenres.filter((game) => game.genres.includes(payload));
            return{
                ...state,
                games: indexGenres
            }
        default:
            return{
                ...state
            }
    }
}