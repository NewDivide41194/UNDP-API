const { undpDb } = require("../database");

const getRecord = (userId, countryId, sdgId,targetId) => {
  return undpDb
    .getRecord(userId, countryId, sdgId,targetId)
    .then((res) => {
      const result = res[0];
      return result;
    })
    .catch((err) => err);
};


const updateRecord = (userId, countryId, sdgId,targetId) => {
  return undpDb
    .updateRecord(userId, countryId, sdgId,targetId)
    .then((res) => {
      const result = res[0];
      return result;
    })
    .catch((err) => err);
};

module.exports = { getRecord,updateRecord };
