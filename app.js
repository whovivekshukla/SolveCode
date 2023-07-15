require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// rest of the packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// DB
const connectDB = require("./db/connect");

// routes
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const questionRouter = require("./routes/questionRoute");
const solutionRouter = require("./routes/solutionRoute");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req, res) => {
  res.send("SolveCode");
});

app.get("/api/v1", (req, res) => {
  console.log(req.signedCookies);
  res.send("SolveCode");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/question", questionRouter);
app.use("/api/v1/solution", solutionRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
