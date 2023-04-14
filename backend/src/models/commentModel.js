const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId

const commentSchema = new mongoose.Schema({
    task: {
        type: objectId,
       ref:"task",
       required:true
    },
    userId: {
        type: objectId,
        required: true,
        ref:"user"

    },
    
    isDeleted:{
        type:Boolean,
        default:false
    }

}, { timestamps: true })

module.exports = mongoose.model("comment", commentSchema)