const express = require('express');
const router = express.Router();
const controller = require('../controller/community-controller')

router.post('/communities', controller.addCommunity);
router.get('/communities', controller.show);
router.get('/communities/:name', controller.showCommunities);
router.put('/communities/:id',controller.updateCommunity)
router.delete('/communities/:id',controller.deleteCommunity)



module.exports=router;