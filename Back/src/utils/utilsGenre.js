const { Genre } = require('../db.js');
const axios = require('axios');
const { API_KEY } = process.env;

//?-----------------------------------------------------------------------------
//? Busqueda de los generos o 'Genres' en la base de datos
 
const dbGenresGet = async(req, res) =>{
    const genresDb = await Genre.findAll( {
        attributes : {
            exclude: ['createdAt', 'updateAt']
        },
    })
    return genresDb;
};
//?-------------------------------------------------------------------------------------

//? Busqueda de Genres o generos de los video juegos a la api con el uso de la 'API_KEY'
const apiGenresGet = async() =>{
    await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    .then(async(res)=>{
        const response = res.data.results;
        const genres= response.map((genre) => genre.name);
        genres.forEach(async (genre) => {
            await Genre.findOrCreate({ where: {name: genre}})
        })
    })
    .catch((error) => { return error.message});
};
//?--------------------------------------------------------------------------------------



module.exports = { apiGenresGet, dbGenresGet}
