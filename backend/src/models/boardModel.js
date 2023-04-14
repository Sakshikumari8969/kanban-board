const mongoose = require("mongoose")
const objectId=mongoose.Schema.Types.ObjectId

const boardSchema = new mongoose.Schema({
    boardName: {
        type: String,
        required: true
    },
    
   user: {
        type: objectId,
        ref: "user",
        required:true
    },
    isdeleted:{
        type:Boolean,
        default:false
    }
}, { timestamps: true })

module.exports = mongoose.model("board", boardSchema)