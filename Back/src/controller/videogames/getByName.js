const axios = require('axios');
const { cardGame } = require('../../utils/cardGame');
const { getGameNameDb } = require('../../utils/utilsGames');
const { api_key } = process.env;

const getGameName = async(name) => {
    const gamesFromDb = await getGameNameDb(name);
    const gameForApi = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${api_key}`);
    // console.log(gameForApi); ?falla por no haber hecho el await antes del axios SOLUCIONADA
    const resApi = gameForApi.data.results.map((game) => cardGame(game));
    const games = gamesFromDb.concat(resApi);

    let allgames = [];

    for( let i = 0; i < 15; i++){
        allgames.push(games[i]);
    }

    if(allgames.length){
        return allgames
    }else{
        throw Error ('404');
    }
};

module.exports = { getGameName };

//?Extraemos usando nuestra funcion los juegos ralacionados con el name de la base de datos;
//?extraemos los juegos de la api con el axios.get
//?los organizamos en nuestra card para devolverlos;
//?concatenamos ambos en la variable games
//?organizamos todo con el allgames.push

