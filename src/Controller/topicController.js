const topicModel = require("../Model/topicModel")
const userModel =require('../Model/userModel')

const createTopic = async (req, res)=>{
    try{
        let userid = req.params.userid
    let topicName = req.body;

    if (!validation.isValid(topicName)) return res.status(400).send({ status: false, message: " topicName is required or not valid" });

    let admin = await userModel.findById({_id:userid})
    //let {topicModel} = data
    console.log(admin)
    
    let tokenId = req.userId
   if (!(userid == tokenId)) return res.status(401).send({ status: false, message: `Unauthorized access! Owner info doesn't match` });
   if (admin.isAdmin  === false) return res.status(401).send({ status: false, message: `Unauthorized access! Owner info doesn't match` });


   let dp = await topicModel.find({topicName: topicName})
   if(dp) return res.status(403).send({status: false, msg:`Topic with this titile already created TopicName-${dp.topicname} and ID-${dp._id}`})


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

    let dp = await topicModel.findOneAndUpdate({_id:topicId, isDeleted: false},{isDeleted: true})
    
    if (dp == null) return res.status(404).send({ status: false, message: "topic is not found, or deleted" })
    
    return res.status(200).send({status: true, msg:"Deleted successfull"})
    } catch(err){
        res.status(501).send({ status: false, Error: err})
    }
    
}

module.exports = {createTopic, deleTopic}