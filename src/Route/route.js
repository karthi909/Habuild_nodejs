const express = require('express')
const router = express.Router()

const userControler = require('../Controller/userController');
const topicController = require('../Controller/topicController')
const rankController = require('../Controller/rankController')



router.post('/api/user/reg', userControler.userReg);

router.put('/api/user/:userid', userControler.userUpdate);

router.delete('/api/user/:userid', userControler.delUser);




router.post('/api/topic/reg', topicController.createTopic)

router.delete('/api/topic/:topicid', topicController.deleTopic)


router.post('/api/giverank', rankController.createRank)

router.get('/api/rank/getRank/:userid', rankController.getUser)

module.exports = router