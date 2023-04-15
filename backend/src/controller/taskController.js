const mongoose = require("mongoose");
const Task = require("../models/taskModel");
const Board = require("../models/boardModel");
const Comment = require("../models/commentModel");
const {
  taskCreateBodySchema,
  taskUpdateJoi,
} = require("../validation/joiValidation");

// ---------------------CREATE TASK -------------------------------------

exports.taskCreate = async (req, res) => {
  try {
    let data = req.body;
    const user = req.user;
    const { error, value } = taskCreateBodySchema.validate(data);
    if (error) {
      return res.status(400).json({ error });
    }
    const board = value.board;
    if (!mongoose.isValidObjectId(board)) {
      return res.status(400).json({
        error: "board is not valid",
      });
    }
    const boardObj = await Board.findById(board);

    if (!boardObj) {
      return res.status(400).json({
        error: "board is not valid",
      });
    }

    if (boardObj.user.toString() !== user.id) {
      return res.status(400).json({
        error: "board is not owned by the loggedIn user",
      });
    }

    const task = await Task.create({
      title: value.title,
      description: value.description,
      status: value.status,
      board: board,
    });
    return res.json({ task });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
// -----------------------UPDATE TASK-----------------------------------

exports.taskUpdate = async (req, res) => {
  try {
    let taskId = req.params.taskId;
    console.log(taskId);
    let data = req.body;
    let { title, status, description } = data;
    if (!mongoose.isValidObjectId(taskId))
      return res.status(400).send({ message: "Task Id is not valid" });

    const update = {};

    title && title.trim() && (update.title = title);
    description && description.trim() && (update.description = description);
    status && (update.status = status);

    let task = await Task.findByIdAndUpdate(
      taskId,
      {
        $set: update,
      },
      { new: true }
    );
    return res.json({ task });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// -----------------------GET TASK BY TASK ID-----------------------------------

exports.getTaskBytaskId = async function (req, res) {
  try {
    let taskId = req.params.taskId;
    if (!mongoose.isValidObjectId(taskId))
      return res.status(400).send({ message: "taskId is not valid" });

    let task = await Task.findById(taskId);
    return res.json({ task });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ----------------------DELETE TASK------------------------------------

exports.taskDelete = async function (req, res) {
  try {
    let taskId = req.params.taskId;
    if (!mongoose.Types.ObjectId.isValid(taskId))
      return res.status(400).json({ message: "Task Id is not valid" });
    await Task.findByIdAndUpdate(
      taskId,
      { $set: { isDeleted: true } },
      { new: true }
    );
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ----------------------------------------------------------
