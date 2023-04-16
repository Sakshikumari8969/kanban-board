const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const taskController = require("../controller/taskController");
const boardController = require("../controller/boardController");
const commentController = require("../controller/commentController");

const {
  authenticationMiddleware,
  authorisationMiddleware,
} = require("../middleware/middle");

//--------------------------USER ROUTER:

router.post("/api/accounts/register", userController.createUser);
router.post("/api/accounts/login", userController.loginUser);
router.get("/api/users", userController.getAllUsers);

//--------------------------BOARD ROUTER:

router.post(
  "/api/boards",
  authenticationMiddleware,
  boardController.createBoard
);
router.get(
  "/api/boards/:id",
  authenticationMiddleware,
  boardController.getBoardById
);
router.get("/api/boards", boardController.getBoards);
router.get(
  "/api/users/boards",
  authenticationMiddleware,
  boardController.getAllBoardByUserId
);
router.get(
  "/api/boards/:boardId/tasks",
  authenticationMiddleware,
  boardController.getTaskByBoardId
);
router.put(
  "/api/users/board/:boardId",
  authenticationMiddleware,
  boardController.updateBoard
);

//--------------------------TASK ROUTER:

router.post("/api/tasks", authenticationMiddleware, taskController.taskCreate);
router.post(
  "/api/tasks/assign",
  authenticationMiddleware,
  taskController.assignTask
);
router.get(
  "/api/tasks/:taskId",
  authenticationMiddleware,
  taskController.getTaskBytaskId
);
router.patch(
  "/api/tasks/:taskId",
  authenticationMiddleware,
  taskController.taskUpdate
);
router.delete(
  "/api/users/task/:taskId",
  authenticationMiddleware,
  taskController.taskDelete
);

router.all("*", (req, res) => {
  return res.status(404).json({ message: "Invalid path" });
});

//--------------------------COMMENT ROUTER:
router.post(
  "/api/users/comment",
  authenticationMiddleware,
  commentController.commentCreate
);
router.put(
  "/api/users/comment/:commentId",
  authenticationMiddleware,
  commentController.commentUpdate
);
router.delete(
  "/api/users/comment/:commentId",
  authenticationMiddleware,
  commentController.commentDelete
);

module.exports = router;
