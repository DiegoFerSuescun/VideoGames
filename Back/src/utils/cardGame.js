
const cardGame = (game) => {
    return {
        id: game.id,
        name: game.name,
        description: game.description? game.description: 'No hay una descipción Disponible',
        platforms: game.platforms.map((platform) => platform.platform.name),
        background_image: game.background_image,
        rating: game.rating,
        genres: game.genres.map((genre) => genre.name)
    };
};


module.exports = { cardGame };

//? Modelo para sacar cada card 