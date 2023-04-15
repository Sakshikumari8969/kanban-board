const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId

const commentSchema = new mongoose.Schema({
    board: {
        type: objectId,
       ref:"board",
       required:true
    },
    userId: {
        type: objectId,
        required: true,
        ref:"user"
    },
    task:{
        type:objectId,
        required:true
    },
    comment:{
        type:String,

    },
    
    isDeleted:{
        type:Boolean,
        default:false
    }

}, { timestamps: true })

module.exports = mongoose.model("comment", commentSchema)