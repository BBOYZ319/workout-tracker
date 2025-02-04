const express = require('express');
const router = express.Router();
const controller = require('../controller/act-controller')

router.post('/activities', controller.addAct);
router.post('/leaderboards', controller.addToLeaderboard);
router.get('/activities', controller.show);
router.put('/activities/:id',controller.upAct)
router.delete('/activities/:id',controller.delAct)
router.delete('/activities',controller.delAct)



module.exports=router;