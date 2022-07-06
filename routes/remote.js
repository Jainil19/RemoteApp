var express = require('express');
var router = express.Router();
const remoteController = require('../controllers/remoteController')
const isAuth = require('../middleware/isAuth');
// GET /
router.get('/', isAuth,remoteController.getRemote);

//  POST /
router.post('/', isAuth, remoteController.postRemote);


module.exports = router;
