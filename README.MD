
# SolveCode

Project SolveCode is a web application that provides a platform for users to practice coding by submitting and testing their code solutions. It includes features such as user authentication (login and signup) and integration with the Sphere Engine API for testing code submissions. The application also allows administrators to upload and manage coding questions for users to solve.

## Features

- User Authentication:
  - Users can create an account by signing up with their email and password.
  - Existing users can log in to access their account.
  - User authentication ensures secure access to the application's features.

- Coding Questions:
  - Administrators can upload coding questions to the application.
  - Users can view and attempt the coding questions.
  - The application provides a code editor for users to write their solutions.
  - Users can submit their code solutions for testing.

- Code Testing:
  - The application integrates with the Sphere Engine API to test code submissions.
  - User-submitted code solutions are sent to the Sphere Engine API for execution.
  - The API returns the results of code execution, including information about the code's correctness, runtime errors, or compilation errors.
  - Users can view the test results and feedback for their code submissions.

## Technologies Used

- Front-end:
  - HTML, CSS, JavaScript
  - React.js (JavaScript library for building user interfaces)
  - CodeMirror (JavaScript library for code editing)

- Back-end:
  - Node.js (JavaScript runtime environment)
  - Express.js (Web application framework for Node.js)
  - MongoDB (NoSQL database for storing user and question data)
  - Mongoose (Object Data Modeling library for MongoDB)

- Authentication:
  - JSON Web Tokens (JWT) for user authentication and authorization
  - bcrypt.js for password hashing and verification

- API Integration:
  - Sphere Engine API for code execution and testing

## Getting Started

To set up and run the Project SolveCode application locally, follow these steps:

1. Clone the repository from GitHub: `git clone https://github.com/your-username/solvecode.git`
2. Install the necessary dependencies: `npm install`
3. Set up the MongoDB database connection and configure the Sphere Engine API credentials.
4. Start the application: `npm start`
5. Access the application in your web browser at `http://localhost:3000`

## Configuration

Before running the application, make sure to configure the following:

- MongoDB Connection: Set up a MongoDB database and provide the connection string in the application's configuration file.

- Sphere Engine API Credentials: Obtain API credentials from the Sphere Engine platform and configure them in the application's settings. This includes the access token and endpoint for making API requests.

## Usage

1. Sign up for a new account or log in to your existing account.
2. Browse the available coding questions and select one to attempt.
3. Use the provided code editor to write your solution for the selected question.
4. Submit your code solution for testing.
5. View the test results and feedback for your code submission.
6. Repeat the process to solve and test more coding questions.

## Contributing

Contributions to the Project SolveCode application are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue on the GitHub repository. You can also fork the repository, make your changes, and submit a pull request.

## License

The Project SolveCode application is open-source software released under the [MIT License](https://opensource.org/licenses/MIT).

## Acknowledgements

- This project was inspired by coding practice platforms and the Sphere Engine API.
- Special thanks to the developers and contributors of the libraries and technologies used in this project.
