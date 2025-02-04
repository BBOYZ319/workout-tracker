const express = require('express');
const router = express.Router();
const controller = require('../controller/profile-controller')

router.put('/profile/:id', controller.upProfile);
router.get('/profile/:PIN', controller.show);
router.delete('/profile/:id', controller.deleteProfile);


module.exports=router;