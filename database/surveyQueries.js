const mysql = require("mysql2");
const util = require("util");

require("dotenv").config();

const mypool = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME_2,
  multipleStatements: true,
});

const getSection = (surveyHeaderId) => {
  let query = util.promisify(mypool.query).bind(mypool);
  const sql = "CALL section(?)";
  return query(sql, [surveyHeaderId])
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

const getQuestion = (userId, surveyHeaderId, surveySectionId, countryId) => {
  let query = util.promisify(mypool.query).bind(mypool);
  const sql = "CALL get_questions(?,?,?,?)";
  return query(sql, [userId, surveyHeaderId, surveySectionId, countryId])
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

const addAnswer = (other, optionChoiceId, userId, questionId, survey_headers_id, building_id, keyValue, totalQuestionCount, answeredDate, buildingType, countryId, subQuestionId, surveySectionId) => {
  let query = util.promisify(mypool.query).bind(mypool);
  const sql = "CALL add_answers(?,?,?,?,?,?,?,?,?,?,?)";
  return query(sql, [
    other,
    optionChoiceId,
    userId,
    questionId,
    survey_headers_id,
    building_id,
    answeredDate,
    keyValue,
    countryId,
    subQuestionId,
    surveySectionId,
  ])
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

const deleteAnswer = (userId, survey_headers_id, building_id, countryId, surveySectionId) => {
  let query = util.promisify(mypool.query).bind(mypool);
  const userIdParsedInt = parseInt(userId)
  const surveyHeadersIdParsedInt = parseInt(survey_headers_id)
  const buildingIdParsedInt = parseInt(building_id)
  const surveySectionIdParsedInt = parseInt(surveySectionId)
  const countryIdParsedInt = parseInt(countryId)

  const sql = "CALL delete_answers(?,?,?,?,?)";
  return query(sql, [
    userIdParsedInt,
    surveyHeadersIdParsedInt,
    buildingIdParsedInt,
    countryIdParsedInt,
    surveySectionIdParsedInt
  ])
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};


module.exports = { getSection, getQuestion, addAnswer, deleteAnswer };
