const rankModel = require('../Model/rankModel');

const createRank = async (req, res)=>{
    try{
        const data = req.body

        const {user, topic, rank}=data
    
        let newData = await rankModel.create(data)
    
        return res.status(201).send({status: true, data: newData})
    } catch(err){
        console.log(err)
        res.status(501).send({ status: false, Error: err})
    }
}

const getUser = async(req,res)=>{
    try{
        const userid = req.params.userid

        let allData = await rankModel.find({user:userid, isDeleted:false}).populate("user").populate('topic')
        return res.status(201).send({status: true, data: allData})
    } catch(err){
        console.log(err)
        res.status(501).send({ status: false, Error: err})
    }

}

module.exports = {createRank, getUser}