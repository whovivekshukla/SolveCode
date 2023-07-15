const Question = require("../models/Question");
const Solution = require("../models/Solution");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { submitCode, getResponse, getStringFromLink } = require("../utils");

const submitSolution = async (req, res) => {
  const { userId, questionId, solutionCode, language, compileId } = req.body;
  if (!userId || !questionId || !solutionCode || !language || !compileId) {
    throw new CustomError.BadRequestError("Please provide all the details");
  }

  const question = await Question.findOne({ _id: questionId });

  const solutionId = await submitCode(solutionCode, question.testCases.input);

  const solution = await Solution.create({
    userId,
    questionId,
    solutionId,
  });

  res.status(StatusCodes.OK).json({ solutionId });
};

const getMySolutions = async (req, res) => {
  const solutions = await Solution.find({ userId: req.user.userId });
  res.status(StatusCodes.OK).json({ solutions });
};

const checkMySolutions = async (req, res) => {
  const { id } = req.params;
  const solution = await Solution.findOne({ solutionId: id });
  const question = await Question.findOne({ _id: solution.questionId });
  if (!solution) {
    throw new CustomError.NotFoundError(`No Solution Found with ID ${id}`);
  }
  const solutionResponse = await getResponse(id);

  if (solutionResponse.result.status.name == "compilation error") {
    const compilationErrorCodeLink =
      solutionResponse.result.streams.cmpinfo.uri;

    const compilationErrorInfo = await getStringFromLink(
      compilationErrorCodeLink
    );
    res.send(compilationErrorInfo);
  } else if (solutionResponse.result.status.name == "accepted") {
    // check if the output is equal to the test case output

    const solutionOutput = solutionResponse.result.streams.output.uri;

    const responseOutputString = await getStringFromLink(solutionOutput);
    const questionOutputString = question.testCases.output;

    const trimmedResponseString = responseOutputString.trim();
    const trimmedQuestionString = questionOutputString.trim();

    if (trimmedResponseString === trimmedQuestionString) {
      res.status(StatusCodes.OK).json({ msg: "Solution Accepted!!" });
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Test cases did not match" });
    }
  }
};

module.exports = {
  submitSolution,
  getMySolutions,
  checkMySolutions,
};
