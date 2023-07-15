const axios = require("axios");

const accessToken = process.env.SPHERE_ACCESS_TOKEN;
const endpoint = process.env.SPHERE_ENDPOINT;

const submitCode = async (code, testCases) => {
  const submissionData = {
    compilerId: 1,
    source: code,
    input: testCases,
  };

  try {
    const response = await axios.post(
      `https://${endpoint}.compilers.sphere-engine.com/api/v4/submissions?access_token=${accessToken}`,
      submissionData
    );

    if (response.status === 201) {
      return response.data.id;
    } else if (response.status === 401) {
      console.log("Invalid access token");
      throw new Error("Invalid access token");
    } else if (response.status === 402) {
      console.log("Unable to create submission");
      throw new Error("Unable to create submission");
    } else if (response.status === 400) {
      const { error_code, message } = response.data;
      console.log(
        `Error code: ${error_code}, details available in the message: ${message}`
      );
      throw new Error(message);
    }
  } catch (error) {
    console.log("Connection problem:", error.message);
    throw error;
  }
};
const getResponse = async (submissionId) => {
  try {
    const response = await axios.get(
      `https://${endpoint}.compilers.sphere-engine.com/api/v4/submissions/${submissionId}?access_token=${accessToken}`
    );

    if (response.status === 200) {
      return response.data;
    } else if (response.status === 401) {
      console.log("Invalid access token");
    } else if (response.status === 400) {
      const { error_code, message } = response.data;
      console.log(
        `Error code: ${error_code}, details available in the message: ${message}`
      );
    }
  } catch (error) {
    console.log("Connection problem:", error.message);
  }
};

const getStringFromLink = async (solutionOutput) => {
  const response = await axios.get(solutionOutput);
  return response.data;
};

module.exports = {
  submitCode,
  getResponse,
  getStringFromLink,
};
