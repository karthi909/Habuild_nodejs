const userModel = require('../Model/userModel')
const validation = require('../Validator/validation')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv").config();



const userReg = async (req,res)=>{
    try{
        let data = req.body

        let {name, email, password} = data;


        const saltRounds = 10
        const hash = bcrypt.hashSync(password, saltRounds)
        data.password = hash
        console.log(password)
        let newData = await userModel.create(data)

        res.status(201).send({status: true, data: newData})

    } catch(err){
        res.status(501).send({ status: false, Error: err})
    }
    
}

const loginUser = async (req, res) => {
    try {
        let data = req.body


        let { email, password } = data
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Email and password is required to login" })

        if (!validation.isValid(email)) return res.status(400).send({ status: false, message: "email is required or not valid" })

        if (!validation.isValidEmail(email)) return res.status(400).send({ status: false, message: "email is not valid" })

        if (!validation.isValid(password)) return res.status(400).send({ status: false, message: "password is required or not valid" })

        if (!validation.isValidPassword(password)) return res.status(400).send({ status: false, message: "Password length should be 8 to 15 digits and enter atleast one uppercase or lowercase" })




        let getUserData = await userModel.findOne({ email: data.email })

        console.log(getUserData.isAdmin)

        if (!getUserData) return res.status(401).send({ status: false, msg: "Invalid credentials" })
        let ps = bcrypt.compareSync(password, getUserData.password)  //Sync
        //console.log(ps)
        if (!ps) return res.status(401).send({ status: false, msg: "ps wrong" })

        let token = jwt.sign({
            userID: getUserData._id
        }, `${dotenv.parsed.SERECT}`, { expiresIn: '10d' })



        res.status(200).send({ status: true, message: "User Login succesfully", data: { userId: getUserData._id, token: token } },)
    } catch (err) {
        res.status(500).send({ status: true, Error: err.message })
    }
}

const userUpdate = async (req, res)=>{
    try{
        let userId = req.params.userid

        let tokenId = req.userId
         //console.log(tokenId)
        if (!(userId == tokenId)) return res.status(401).send({ status: false, message: `Unauthorized access! Owner info doesn't match` });

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

    let tokenId = req.userId
     console.log(tokenId)
     if (!(userId == tokenId)) return res.status(401).send({ status: false, message: `Unauthorized access! Owner info doesn't match` });

    await userModel.findOneAndUpdate({_id: userId, isDeleted: false},{isDeleted: true})

    return res.status(200).send({status: true, msg:'Deleted successfulll'})
    } catch(err){
        res.status(501).send({ status: false, Error: err})
    }
}


module.exports = {userReg, loginUser, userUpdate, delUser}