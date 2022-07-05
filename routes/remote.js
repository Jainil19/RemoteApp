var express = require('express');
var router = express.Router();
const remoteController = require('../controllers/remoteController')
// GET /
router.get('/', remoteController.getRemote);

//  POST /
router.post('/', remoteController.postRemote);


module.exports = router;
