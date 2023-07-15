const { Router } = require('express');
const genresRouter = require('./genresRoutes.js');
const gamesRouter = require('./gamesRoutes.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', gamesRouter );
router.use('/genres', genresRouter);



module.exports = router;
