const express = require('express');
const router = express.Router();
const controller = require('../controller/friend-controller')

router.post('/friends', controller.addFriend);
router.get('/friends', controller.showFriends);
router.get('/friends/:username', controller.searchFriendByUsername);
router.delete('/friends/:id',controller.deleteFriend)



module.exports=router;