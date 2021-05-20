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

const addAnswer = (other, optionChoiceId, userId, questionId, surey_headers_id,  keyValue, totalQuestionCount, answeredDate, buildingType, countryId, subQuestionId, surveySectionId) => {
  return surveyDb.addAnswer(other, optionChoiceId, userId, questionId, surey_headers_id, keyValue, totalQuestionCount, answeredDate, buildingType, countryId, subQuestionId, surveySectionId)
}

const deleteAnswer = (userId, survey_headers_id, countryId, surveySectionId) => {
  return surveyDb.deleteAnswer(userId, survey_headers_id, countryId, surveySectionId);
}
module.exports = { getSection, getQuestion,addAnswer,deleteAnswer };
