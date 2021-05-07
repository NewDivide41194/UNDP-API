const mysql = require("mysql2");
const util = require("util");

require("dotenv").config();

const mypool = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

const getSdgSector = () => {
  let query = util.promisify(mypool.query).bind(mypool);
  const sql = "CALL sdg_sector";
  return query(sql)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

const getSdgDigitalDevelopment = () => {
  let query = util.promisify(mypool.query).bind(mypool);
  const sql = "CALL sdg_aligned";
  
  return query(sql)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

const getTargetDetail = (sdgId,targetId,sectorId,countryId) => {
  let query = util.promisify(mypool.query).bind(mypool);
  const sql = "CALL target_detail(?,?,?,?)";
  
  return query(sql,[sdgId,targetId,sectorId,countryId])
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};
module.exports = {
  getSdgSector,
  getSdgDigitalDevelopment,
  getTargetDetail
};
