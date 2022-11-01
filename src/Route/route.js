const express = require('express')
const router = express.Router()

const userControler = require('../Controller/userController');
const topicController = require('../Controller/topicController')
const rankController = require('../Controller/rankController')
const Auth = require('../Auth/authorization')



router.post('/api/user/reg', userControler.userReg);

router.post('/login', userControler.loginUser)

router.put('/api/user/:userid', Auth.authorization, userControler.userUpdate);

router.delete('/api/user/:userid', Auth.authorization, userControler.delUser);




router.post('/api/topic/reg/:userid',Auth.authorization, topicController.createTopic)

router.delete('/api/topic/:topicid/:userid', topicController.deleTopic)


router.post('/api/giverank', Auth.authorization, rankController.createRank)

router.get('/api/rank/getRank/:userid', Auth.authorization, rankController.getUser)

module.exports = router