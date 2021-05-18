const { surveyDb } = require("../database");

const getSection = (surveyHeaderId) => {
  return surveyDb
    .getSection(surveyHeaderId)
    .then((res) => {
      const result = res[0];
      return result;
    })
    .catch((err) => err);
};

const getQuestion = (userId,  countryId,surveyHeaderId, surveySectionId) => {
  return surveyDb
    .getQuestion(userId,  countryId,surveyHeaderId, surveySectionId)
    .then((res) => {
      return res;
    })
    .catch((err) => err);
};

module.exports = { getSection, getQuestion };
