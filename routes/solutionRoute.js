const express = require("express");
const router = express.Router();

const {
  submitSolution,
  getMySolutions,
  checkMySolutions,
} = require("../controllers/solutionController");
const { authenticateUser } = require("../middleware/authentication");

router.route("/").post(authenticateUser, submitSolution);
router.route("/").get(authenticateUser, getMySolutions);
router.route("/:id").get(authenticateUser, checkMySolutions);

module.exports = router;
