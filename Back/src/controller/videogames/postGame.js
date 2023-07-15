const { Videogame, Genre} = require('../../db.js');

const postGames = async(name, description, platforms, background_image, released, rating, genres, createdInDb)=>{
    const newGame = await Videogame.create({
        name,
        description, 
        platforms, 
        background_image, 
        released, 
        rating, 
        genres, 
        createdInDb
    });

    genres.forEach(async (genre) =>{
        let genreDb = await Genre.findAll({
            where: {
                name: genre
            }
        });
        if(genreDb){
            newGame.addGenre(genreDb)
        } else {
            throw new Error ( 'not found genre');
        }
    })

    return newGame;
}

module.exports = { postGames }

//? Creamos nuestro nuevo juego linea 4
//? linea 15 busca los generos en la propiedad name de nuestra base de datos si existe se los agrega a la variable genre db
