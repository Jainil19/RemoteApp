var express = require('express');
var router = express.Router();
const remoteController = require('../controllers/remoteController')
const isAuth = require('../middleware/isAuth');
// GET /remote
router.get('/', isAuth,remoteController.getAllRemotes);

// POST /remote
router.post('/', isAuth, remoteController.createRemote);

// GET /remote/:id
router.get('/:id',isAuth,remoteController.getRemote);

// PATCH /remote/:id
router.patch('/:id',isAuth,remoteController.updateRemote);

// DELETE /remote/:id
router.delete('/:id',isAuth,remoteController.deleteRemote);
module.exports = router;
