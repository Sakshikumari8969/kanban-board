const mongoose = require("mongoose");
const Board = require("../models/boardModel");
const userModel = require("../models/userModel");
const taskModel = require("../models/taskModel");
const {
  boardCreateDatavalidator,
  boardUpdateJoi,
} = require("../validation/joiValidation");

// ------------------------BOARD CREATE----------------------------------

exports.createBoard = async function (req, res) {
  try {
    let data = req.body;

    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ message: "Data to create board is missing" });
    if (data.user == req.user.id) {
      let board = await Board.create(data);
      return res.json({ board });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// -----------------------GET BOARD-----------------------------------

exports.getBoards = async function (req, res) {
  try {
    let boards = await Board.find().populate("user");
    if (!boards) {
      return res.status(404).json({ message: "Board not found" });
    } else {
      return res.json({ boards });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// -----------------------GET BOARD BY ID-----------------------------------

exports.getAllBoardByUserId = async function (req, res) {
  try {
    let user = req.user;
    let userId = user.id;

    const boards = await Board.find({
      user: userId,
      isDeleted: false,
    });
    const response = {
      user: user,
      boards: boards,
    };
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// -----------------------GET TASK BY BOARD  ID-----------------------------------

exports.getTaskByBoardId = async (req, res) => {
  const tasks = await taskModel.find({
    board: req.params.boardId,
  });
  return res.json({ tasks });
};

// --------------------------UPDATE BOARD--------------------------------

exports.updateBoard = async function (req, res) {
  try {
    let boardId = req.params.boardId;

    let data = req.body;

    let { user, boardName } = data;

    if (Object.keys(data).length == 0)
      return res.status(400).json({ msg: "please provide data to update" });
    if (!mongoose.Types.ObjectId.isValid(boardId))
      return res.status(400).json({ message: "Board Id is not valid" });

    let boards = await Board.findByIdAndUpdate(
      { _id: boardId, isDeleted: false },
      { $set: { boardName: boardName, user: user } },
      { new: true }
    );
    
    if (!boards) {
      return res
        .status(400)
        .json({ message: `This Creator ${user} does not exist` });
    }
    return res.json({ message: "Data updated successfully", data: boards });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ----------------------------------------------------------
