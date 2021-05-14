const { undpDb } = require("../database");

const getSdgSector = () => {
  return undpDb
    .getSdgSector()
    .then((res) => {
      const result = res[0];
      return result;
    })
    .catch((err) => err);
};

const getSdgDigitalDevelopment=()=>{
  return undpDb.getSdgDigitalDevelopment().then((res) => {
    const result = res[0];
    return result;
  })
  .catch((err) => err);
}

const getTargetDetail=(sdgId,targetId,sectorId,countryId)=>{
  return undpDb.getTargetDetail(sdgId,targetId,sectorId,countryId).then((res) => {
    const result = res[0];
    const ministries=res[1]
    const title=res[2]
    return [result,ministries,title];
  })
  .catch((err) => err);
}

module.exports = { getSdgSector,getSdgDigitalDevelopment,getTargetDetail };
