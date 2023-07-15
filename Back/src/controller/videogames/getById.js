const axios = require('axios');
const { cardGame } = require('../../utils/cardGame');
const { getGameIdDb } = require('../../utils/utilsGames');
const { api_key } = process.env;

const getById = async(idVideoGame)=>{
    if(Number(idVideoGame)){
        const petition = await axios.get(`https://api.rawg.io/api/games/${idVideoGame}?key=${api_key}`)
        const game = petition.data;
        const api = cardGame(game);
        return api;

    }else if(!Number(idVideoGame)){
        const gameOfDb = await getGameIdDb(idVideoGame);
        return gameOfDb;
    }else {
        throw  Error ('404');
    }
}

module.exports = { getById }

//? Hacemos peticion axios a la url de la api
//? extramos la data ( juegos)
//?los organizamos en la CARD que creamos 'cada juego'
//? en caso tal que no sea solo un numero si no una url compuesta como lo hicmos en el modelo la vamos a buscar en la base de datos
