const express = require("express");
const router = express.Router();

const {
  createQuestion,
  getAllQuestions,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

// Get All Questions
router.route("/").get(authenticateUser, getAllQuestions);

// Get Single Question
router.route("/:id").get(authenticateUser, getSingleQuestion);

// Create a Question
router
  .route("/")
  .post(authenticateUser, authorizePermissions("admin"), createQuestion);

// Update a Question
router
  .route("/:id")
  .patch(authenticateUser, authorizePermissions("admin"), updateQuestion);

// Delete a Question
router
  .route("/:id")
  .delete(authenticateUser, authorizePermissions("admin"), deleteQuestion);

module.exports = router;
