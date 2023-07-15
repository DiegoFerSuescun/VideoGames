const Router = require('express');
const { saveGames } = require('../controller/videogames/getallgames');
const { getGameName } = require('../controller/videogames/getByName');
const { getById } = require('../controller/videogames/getById');
const { postGames } = require('../controller/videogames/postGame');



const gamesRouter = Router();

//?--------------------------------Por Nombre---------------------------------------
gamesRouter.get('/', async(req, res) => {
    const { name } = req.query;
    const games = await saveGames();
    try {
        if(name){
            const game = await getGameName(name.toLocaleLowerCase());
            res.status(200).json(game)
        } else {
            res.status(200).json(games);
        }
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

//?------------------------------por id----------------------------------------------
gamesRouter.get('/:idVideoGame', async(req, res) => {
    const { idVideoGame } = req.params;
    // console.log(idVideoGame);
    const games = await saveGames();
    
    try {
        const game = await getById(idVideoGame, games);
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

//?-----------------------------post game----------------------------------------------
gamesRouter.post('/', async(req, res) => {
    const { name, description, platforms, background_image, released, rating, genres, createdInDb }  = req.body;
    try {
        const newGame = await postGames(name, description, platforms, background_image, released, rating, genres, createdInDb);
        res.status(200).json(newGame)
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
})


module.exports = gamesRouter;