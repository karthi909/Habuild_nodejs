const topicModel = require("../Model/topicModel")
const userModel =require('../Model/userModel')

const createTopic = async (req, res)=>{
    try{
        let userid = req.params.userid
    let topicName = req.body;

    let admin = await userModel.findById({_id:userid})
    //let {topicModel} = data
    console.log(admin)
    
    let tokenId = req.userId
   if (!(userid == tokenId)) return res.status(401).send({ status: false, message: `Unauthorized access! Owner info doesn't match` });
   if (admin.isAdmin  === false) return res.status(401).send({ status: false, message: `Unauthorized access! Owner info doesn't match` });

    let newData = await topicModel.create(topicName)

    return res.status(201).send({status: true, data: newData})

    } catch(err){
        console.log(err)
        res.status(501).send({ status: false, Error: err})
    }
}

const deleTopic = async (req,res)=>{
    try{
        let topicId = req.params.topicid

    await topicModel.findOneAndUpdate({_id:topicId, isDeleted: false},{isDeleted: true})

    return res.status(200).send({status: true, msg:"Deleted successfull"})
    } catch(err){
        res.status(501).send({ status: false, Error: err})
    }
    
}

module.exports = {createTopic, deleTopic}