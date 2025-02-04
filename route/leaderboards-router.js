const express = require('express');
const controller = require('../controller/leaderboard-controller');
const router = express.Router();

router.get('/leaderboards',controller.getLeaderboard ); 
router.delete('/leaderboards/:id', controller.deleteLeaderboard); 

module.exports = router;