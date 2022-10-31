const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const topicSchema = new mongoose.Schema({
    topicName:{
        type:String,
        required:true,
        unique:true
    }, 
    isDeleted:{
        type:Boolean,
        default:false
    }

}, { timestamps: true })



module.exports = mongoose.model('topic', topicSchema)