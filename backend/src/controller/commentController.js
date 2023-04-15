const mongoose=require("mongoose")
const Comment = require("../models/commentModel");
const Task = require("../models/taskModel");

// -----------------COMMENT CREATE-----------------------------------------

exports.commentCreate = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length == 0)
      return res.status(400).json({ message: "Data is missing" });
      
    let comments= await Comment.create(data);
    return res.status(201).send({ message: "Comment created successfully",comments });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ---------------------COMMENT UPDATE-------------------------------------

exports.commentUpdate = async function (req, res) {
  try {
    let commentId = req.params.commentId;
    let data = req.body;
    let {userId,comment,board,task}=data
    if (Object.keys(data).length == 0) return res.status(400).json({ msg: "please provide data to update" });
    if (!mongoose.isValidObjectId(commentId))
      return res.status(400).json({ message: "Comment Id is not valid" });
    
    let comments = await Comment.findByIdAndUpdate(
       {_id:commentId ,isDeleted:false},
      { $set: {userId:userId,comment:comment,task:task,board:board } },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Comment updated successfully", comments });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// --------------------------COMMENT DELETE--------------------------------

exports.commentDelete = async function (req, res) {
  try {
    let commentId = req.params.commentId;
    if (!mongoose.isValidObjectId(commentId))
      return res.status(400).json({ message: "Comment Id is not valid" });
   
    await Comment.findByIdAndUpdate(
       commentId ,
      { $set: { isDeleted: true } },
      { new: true }
    );
    return res.status(200).json({ message: "Comments deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ----------------------------------------------------------
