const axios = require('axios');
const { Videogame, Genre } = require('../db.js');
const { cardGame } = require('./cardGame.js');
const { Op } = require('sequelize');
const {api_key} = process.env;

//?-------------------Extraer juegos de la API------------------------
const gamesApi = async() => {
 
    let gamesOfApi = [];
    
    const responses = await Promise.all([
        axios.get(`https://api.rawg.io/api/games?key=${api_key}&page=1`),
        axios.get(`https://api.rawg.io/api/games?key=${api_key}&page=2`),
        axios.get(`https://api.rawg.io/api/games?key=${api_key}&page=3`),
        axios.get(`https://api.rawg.io/api/games?key=${api_key}&page=4`),
        axios.get(`https://api.rawg.io/api/games?key=${api_key}&page=5`)
    ]);
    responses.forEach((response) => {
        gamesOfApi = gamesOfApi.concat(response.data.results);
    });
    const videogames = gamesOfApi.map((game) => cardGame(game));
   
 
    return videogames;
};


//?---------------------Extraer juegos de la base de datos----------------------------
const gamesDb = async () =>{
    const dataBase = await Videogame.findAll({
        include:{
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            }    
        }    
    });    

    let games = dataBase.map((videogame) => {
        return{
            id: videogame.id,
            name: videogame.name,
            description: videogame.description? videogame.description : 'No hay descricion disponible',
            platforms: videogame.platforms.map((platform) => platform),
            background_image: videogame.background_image,
            released: videogame.released,
            rating: videogame.rating,
            genres: videogame.Genres.map((genre) => genre.name),
            createdInDb: videogame.createdInDb
        };    
    });    
    
    return games;
}

//?---------------Obtener juegos de la base de datos por name----------------------------------
const getGameNameDb = async(name) =>{
    const AllGames = await Videogame.findAll({
        where:{
            name: {
                [Op.iLike]: `%${name}%`
            }    
        },
        include: {
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: []
            } 
        }    
    }); 

    

    const found = AllGames.map((videogame) => {
        return{
            id: videogame.id,
            name: videogame.name,
            description: videogame.description? videogame.description : 'sin descripcion',
            platforms: videogame.platforms?.map((platform) => platform),
            background_image: videogame.background_image,
            released: videogame.released,
            rating: videogame.rating,
            genres: videogame.Genres?.map((genre) => genre.name),
            createdInDb: videogame.createdInDb
        }
    });
    
    
    return found;
};

//?---------------Obtener juegos de la base de datos por id----------------------------------

const getGameIdDb = async(idvideoGame) =>{
    const gameDb = await Videogame.findOne({
        where: {
            id: idvideoGame
        },
        include: {
            model: Genre,
            attributes: ["name"],
            trough: {
                attributes: []
            }
        }
    });
    const game = gameDb;

    const found = {
        id: game.id,
        name: game.name,
        description: game.description? game.description: 'No hay una descipción Disponible',
        platforms: game.platforms?.map((platform) => platform),
        background_image: game.background_image,
        rating: game.rating,
        genres: game.Genres?.map((genre) => genre.name),
        createdInDb: game.createdInDb
    }
    
    return found;
}




module.exports = { gamesApi, gamesDb, getGameNameDb, getGameIdDb }