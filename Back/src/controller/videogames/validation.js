
const validationPost = (req, res, next) => {
    const {name, description, platforms, background_image, released, rating, genres} = req.body;
    if(!name){
        return res.status(500).json({error: "Please this field cannot be empty"})
    }else if( !description){
        return res.status(500).json({error: "Please this field cannot be empty"})
    }else if( platforms.length === 0){
        return res.status(500).json({error: "Please this field cannot be empty"})
    }else if( !background_image){
        return res.status(500).json({error: "Please this field cannot be empty"})
    }else if(!released){
        return res.status(500).json({error: "Please this field cannot be empty"})
    }else if(!rating || rating > 5){
        return res.status(500).json({error: "Please this field cannot be empty or the number is greater than 5"})
    }else if(!genres || genres.length === 0){
        return res.status(500).json({error: "Please this field cannot be empty or the number is lees than 0"})
    }
}

module.exports = { validationPost}