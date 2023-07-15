const { apiGenresGet, dbGenresGet } = require("../../utils/utilsGenre");

const genresGet = async() =>{
    const dataBase = await dbGenresGet();
    if(!dataBase.length){
        const apiGen = await apiGenresGet();
        return apiGen
    }else{
        return dataBase;
    }
};

module.exports = { genresGet };

//! dataBase = almacena info de la base de datos referente a los generos guardados
//! apiGen = los genres traidos desde la api