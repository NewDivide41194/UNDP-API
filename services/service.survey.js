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

const getQuestion = (userId, surveyHeaderId, surveySectionId, countryId) => {
  return surveyDb
    .getQuestion(userId, surveyHeaderId, surveySectionId, countryId)
    .then((res) => {
      const result = res;
      return result;
    })
    .catch((err) => err);
};

module.exports = { getSection, getQuestion };
