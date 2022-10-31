const topicModel = require("../Model/topicModel")

const createTopic = async (req, res)=>{
    try{
    let topicName = req.body;

    //let {topicModel} = data

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