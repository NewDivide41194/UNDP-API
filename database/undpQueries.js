const mysql = require("mysql2");
const util = require("util");

require("dotenv").config();

const mypool = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME_1,
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

const getTargetDetail = (sdgId, targetId, sectorId, countryId) => {
  let query = util.promisify(mypool.query).bind(mypool);
  const sql = "CALL target_detail(?,?,?,?)";

  return query(sql, [sdgId, targetId, sectorId, countryId])
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

const getRecord = (userId, countryId, sdgId) => {
  let query = util.promisify(mypool.query).bind(mypool);
  const sql = "CALL get_record(?,?,?)";

  return query(sql, [userId, countryId, sdgId])
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

const updateRecord = (userId, countryId, updateData) => {
  let updateQuery = "";

  updateData.forEach((value) => {
    let singleQuery =
      "UPDATE tbl_sdg_sector_aligned SET sector_id=?, ict_component=?, status_update_id=?, people=?, planet=?, prosperity=?, peace=? WHERE id=?;";

    let { sectorId, ictComponent, statusUpdateId } = value.detailView1;
    let { people, planet, prosperity, peace } = value.detailView2.themes;

    updateQuery += mysql.format(singleQuery, [
      sectorId,
      ictComponent,
      statusUpdateId,
      people,
      planet,
      prosperity,
      peace,
      value.id,
    ]);
  });
  let query = util.promisify(mypool.query).bind(mypool);

  return query(updateQuery)
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
  getTargetDetail,
  getRecord,
  updateRecord,
};
