const { Router } = require('express');
const router = Router();

// Cadastro de Dev's
router.get('/devs/findall', require('./controllers/devController').index);
router.post('/devs', require('./controllers/devController').store);

// Busca de dev's
router.get('/search', require('./controllers/SearchController').index);
router.post('/destroy', require('./controllers/SearchController').destroy)

module.exports = router;