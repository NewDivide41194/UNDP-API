const { surveydb } = require("../database");

const getSdgSector = () => {
  return surveydb
    .getSdgSector()
    .then((res) => {
      const result = res[0];
      return result;
    })
    .catch((err) => err);
};

const getSdgDigitalDevelopment=()=>{
  return surveydb.getSdgDigitalDevelopment().then((res) => {
    const result = res[0];
    return result;
  })
  .catch((err) => err);
}

module.exports = { getSdgSector,getSdgDigitalDevelopment };
