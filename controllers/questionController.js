const Question = require("../models/Question");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createQuestion = async (req, res) => {
  const { title, difficulty, description, testCases } = req.body;
  if (!title || !difficulty || !description || !testCases) {
    throw new CustomError.BadRequestError("Please provide all fields.");
  }

  const question = await Question.create({
    title,
    difficulty,
    description,
    testCases,
  });
  res.status(StatusCodes.OK).json({ question });
};

const getAllQuestions = async (req, res) => {
  const questions = await Question.find({});
  res.status(StatusCodes.OK).json({ questions });
};
const getSingleQuestion = async (req, res) => {
  const { id } = req.params;
  const question = await Question.findOne({ _id: id });
  if (!question) {
    throw new CustomError.NotFoundError(`No Question found with id ${id}`);
  }

  res.status(StatusCodes.OK).json({ question });
};
const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { title, difficulty, description, test_cases } = req.body;
  if (!title || !difficulty || !description || !test_cases) {
    throw new CustomError.BadRequestError("Please provide all fields.");
  }

  const question = await Question.findOne({ _id: id });
  if (!question) {
    throw new CustomError.NotFoundError(`No Question found with id ${id}`);
  }

  question.title = title;
  question.difficulty = difficulty;
  question.description = description;
  question.test_cases = test_cases;
  await question.save();

  res.status(StatusCodes.OK).json({ question });
};
const deleteQuestion = async (req, res) => {
  const { id } = req.params;

  const question = await Question.findOne({ _id: id });
  if (!question) {
    throw new CustomError.NotFoundError(`No Question found with id ${id}`);
  }

  await question.delete();
  res.status(StatusCodes.OK).json({ msg: "Question Deleted" });
};

module.exports = {
  createQuestion,
  getAllQuestions,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
};
