const express = require('express');
const router = express.Router();
const controller = require('../controller/controller')

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/protected',controller.protected);

module.exports=router;