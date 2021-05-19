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

const addAnswer = (other, optionChoiceId, userId, questionId, surey_headers_id, building_id, keyValue, totalQuestionCount, answeredDate, buildingType, countryId, subQuestionId, surveySectionId) => {
  return surveyDb.addAnswer(other, optionChoiceId, userId, questionId, surey_headers_id, building_id, keyValue, totalQuestionCount, answeredDate, buildingType, countryId, subQuestionId, surveySectionId)
}

const deleteAnswer = (userId, survey_headers_id, building_id, countryId, surveySectionId) => {
  return surveydb.deleteAnswer(userId, survey_headers_id, building_id, countryId, surveySectionId);
}
module.exports = { getSection, getQuestion,addAnswer,deleteAnswer };
