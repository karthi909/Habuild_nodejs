const rankModel = require('../Model/rankModel');

const createRank = async (req, res)=>{
    try{
        const data = req.body

        const {user, topic, rank}=data


        if (!validation.isValidObjectId(user)) { return res.status(400).send({ status: false, message: "userId  is not valid" }) }

        if (!validation.isValidObjectId(topic)) { return res.status(400).send({ status: false, message: "topicId  is not valid" }) }

        
        if(!rank) return res.status(400).send({status: false, msg:"please provode rank"})
        if( typeof rank !== "number") return res.status(400).send({status: false, msg:"please provode rank as a Number"})
        if(rank < 1 || rank > 100)return res.status(400).send({ status: false, message: "Rank whould be in range 1-100" })

        let tokenId = req.userId
    // console.log(tokenId)
     if (!(user == tokenId)) return res.status(401).send({ status: false, message: `Unauthorized access! Owner info doesn't match` });
    
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

        if (!validation.isValidObjectId(user)) { return res.status(400).send({ status: false, message: "userId  is not valid" }) }

        let tokenId = req.userId
        //console.log(tokenId)
        if (!(userid == tokenId)) return res.status(401).send({ status: false, message: `Unauthorized access! Owner info doesn't match` });



        let allData = await rankModel.find({user:userid, isDeleted:false}).populate("user",'-password').select({__v:0}).populate('topic')
        if (allData == null) return res.status(404).send({ status: false, message: `no data found with this userId-${userid}` })

        return res.status(201).send({status: true, data: allData})
    } catch(err){
        console.log(err)
        res.status(501).send({ status: false, Error: err})
    }

}

module.exports = {createRank, getUser}