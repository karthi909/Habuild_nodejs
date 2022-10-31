const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const rankSchema = new mongoose.Schema({
    user: [{
        type: ObjectId,
        ref: "user",
      
    }
    ],
    topic:{
        type: ObjectId,
        ref: "topic",
       
    },
    rank:{
        type:Number,
        required:true,
        min:1,
        max:100
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

}, { timestamps: true })



module.exports = mongoose.model('rank', rankSchema)