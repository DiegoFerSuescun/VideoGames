const { gamesApi, gamesDb } = require("../../utils/utilsGames.js");



const saveGames = async() =>{
    const gamesOfApi = await gamesApi();
    const gamesOfDb = await gamesDb();
    const games = gamesOfApi.concat(gamesOfDb);
    return games;

};


module.exports = {
    saveGames
}

//? Hacemos peticion (gamesApi) para extraer los juegos de la API
//? Hacemos peticion (gamesdb) para extraer los juegos de la base de datos
//? Concatenamos todo en la variable games;