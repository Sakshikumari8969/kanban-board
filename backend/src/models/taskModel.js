const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const taskStatus = require("../constants");
const { DOING, DONE, REVIEW, TESTING, TODO } = taskStatus;

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    board: {
      type: ObjectId,
      required: true,
      ref: "board",
    },
    status: {
      type: String,
      required: true,
      enum: [TODO, DOING, REVIEW, TESTING, DONE],
    },

    description: {
      type: String,
      trim: true,
    },
    members: {
      type: [ObjectId],
      ref: "user",
      default: [],
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("task", taskSchema);
