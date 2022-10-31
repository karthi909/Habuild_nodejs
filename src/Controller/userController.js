const userModel = require('../Model/userModel')


const userReg = async (req,res)=>{
    try{
        let data = req.body

        let {name, email, password} = data;

        let newData = await userModel.create(data)

        res.status(201).send({status: true, data: newData})

    } catch(err){
        res.status(501).send({ status: false, Error: err})
    }
    
}

const userUpdate = async (req, res)=>{
    try{
        let userId = req.params.userid

        let data = req.body
        
        let {name, email, password } = data;

        let updatedData = await userModel.findOneAndUpdate({_id: userId, isDeleted: false},data,{new: true});

        return res.status(201).send({status: true, data: updatedData})

    } catch(err){
        res.status(501).send({ status: false, Error: err})
    }
}

const delUser = async (req, res)=>{
    try{
    let  userId = req.params.userid;

    await userModel.findOneAndUpdate({_id: userId, isDeleted: false},{isDeleted: true})

    return res.status(200).send({status: true, msg:'Deleted successfulll'})
    } catch(err){
        res.status(501).send({ status: false, Error: err})
    }
}


module.exports = {userReg, userUpdate, delUser}