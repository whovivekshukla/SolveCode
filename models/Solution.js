const mongoose = require("mongoose");

const SolutionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  solutionId: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    enum: ["accepted", "failed", "compilation error"],
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Solution", SolutionSchema);
