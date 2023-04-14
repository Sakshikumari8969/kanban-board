const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const taskController = require("../controller/taskController");
const boardController = require("../controller/boardController");
const commentController = require("../controller/commentController");

const { authenticationMiddleware, authorisationMiddleware} = require("../middleware/middle");

//User router:

router.post("/api/accounts/register", userController.createUser);
router.post("/api/accounts/login", userController.loginUser);

//Board router:

router.post("/api/boards",authenticationMiddleware, boardController.createBoard);
router.get("/api/boards",boardController.getBoards)
router.get(
  "/api/users/:userId/boards",
  authenticationMiddleware,
  boardController.getAllBoardByUserId
);
router.get("/api/boards/:boardId/tasks",authenticationMiddleware, boardController.getTaskByBoardId);

//Todo: This is not working:
router.put("/api/users/board/:boardId",authenticationMiddleware,boardController.updateBoard);
 
//
// router.post("/api/users/comment",authenticationMiddleware, commentController.commentCreate);
// router.put("/api/users/comment/:commentId",authenticationMiddleware, commentController.commentUpdate);
// router.delete("/api/users/comment/:commentId", authenticationMiddleware,commentController.commentDelete);

//Task router:
//Todo:
router.post("/api/tasks",authenticationMiddleware, taskController.taskCreate);
router.put("/api/users/task/:taskId",authenticationMiddleware, taskController.taskUpdate);
router.delete("/api/users/task/:taskId",authenticationMiddleware, taskController.taskDelete);



router.all("*", (req, res) => {
  return res.status(404).json({ message: "Invalid path" });
});

module.exports = router;
