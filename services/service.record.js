const {undpDb} = require("../database");

const getRecord = (userId, countryId, sdgId) => {
    return undpDb.getRecord(userId, countryId, sdgId).then((res) => {
        return res;
    }).catch((err) => err);
};

const updateRecord = (userId, countryId, updateData) => {
    return undpDb.updateRecord(userId, countryId, updateData).then((res) => {
        return res;
    }).catch((err) => err);

};

module.exports = {
    getRecord,
    updateRecord
};
