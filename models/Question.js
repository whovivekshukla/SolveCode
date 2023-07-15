const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  testCases: {
    input: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
