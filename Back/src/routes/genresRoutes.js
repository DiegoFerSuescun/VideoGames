const { Router } = require('express');
const { genresGet } = require('../controller/genres/genresget.js');

const genresRouter = Router();

//!---------------Obtener genres de la db y de la api primero------------------------

genresRouter.get('/', async(req, res) =>{
    try {
        const genres = await genresGet();
        res.status(200).json(genres)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = genresRouter;