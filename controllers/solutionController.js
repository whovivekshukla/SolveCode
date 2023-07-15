const Question = require("../models/Question");
const Solution = require("../models/Solution");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { submitCode, getResponse, getStringFromLink } = require("../utils");

//Submit Solution function will submit the code to Sphere-Engine API and get the ID.
const submitSolution = async (req, res) => {
  const { questionId, solutionCode, language, compileId } = req.body;
  if (!questionId || !solutionCode || !language || !compileId) {
    throw new CustomError.BadRequestError("Please provide all the details");
  }

  const question = await Question.findOne({ _id: questionId });

  if (!question) {
    throw new CustomError.NotFoundError("Question not found");
  }

  const solutionId = await submitCode(solutionCode, question.testCases.input);

  const solution = await Solution.create({
    userId: req.user.userId,
    questionId,
    solutionId,
  });

  res.status(StatusCodes.OK).json({ solutionId });
};

// Get My Solutions function will list down all the submissions made by a single user.
const getMySolutions = async (req, res) => {
  const solutions = await Solution.find({ userId: req.user.userId });
  res.status(StatusCodes.OK).json({ solutions });
};

// Check my Solution will use the ID and get the response from Sphere Engine and check if it was accepted or not.
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
    solution.result = "compilation error";
    solution.save();
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
      solution.result = "accepted";
      solution.save();
    } else {
      solution.result = "failed";
      solution.save();
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
